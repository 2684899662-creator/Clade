// LabScheduler 局域网服务端：单文件页面 + 程序目录/csv 读写 + 资源目录 + 联动回调。
// 浏览器打开 http://<本机IP>:<端口>/ 即可多人同时使用；数据保存在程序目录/csv。
package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	_ "embed"
	"encoding/hex"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"
)

const appVersion = "3.0.1"

//go:embed LabScheduler.html
var embeddedHTML []byte

// 与页面 CSV_FILES 一致
var csvFiles = map[string]string{
	"equipment": "equipment.csv", "schedule": "schedule.csv", "samples": "samples.csv", "reports": "reports.csv",
	"accounts": "accounts.csv", "translations": "translations.csv", "loginTime": "login_time.csv", "archives": "archives.csv",
	"insertions": "insertions.csv", "auditLog": "audit_log.csv", "holidays": "holidays.csv",
	"feedLog": "feed_log.csv", "feedConfig": "feed_config.csv", "growth": "growth.csv",
}

const linkageFile = "linkage.csv"

var (
	baseDir  string
	csvDir   string
	writeMu  sync.Mutex
	nonceMu  sync.Mutex
	nonces   = map[string]time.Time{}
	idRe     = regexp.MustCompile(`^[A-Za-z0-9_-]{8,64}$`)
	typeRe   = regexp.MustCompile(`^[a-z0-9_]{1,40}$`)
	eventRe  = regexp.MustCompile(`^[A-Za-z0-9_.:-]{1,80}$`)
	sourceRe = regexp.MustCompile(`^[A-Za-z0-9_ .-]{0,40}$`)
)

// 注入到页面 <head> 的桥接脚本：提供 window.csvApi（readAll / writeAll / checkRemote），页面据此走「程序目录/csv」模式
const bridgeJS = `<script>/* LabScheduler LAN bridge */(function(){
var lastVer='', base={};
function j(u,o){return fetch(u,Object.assign({cache:'no-store'},o||{})).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();});}
window.csvApi={server:true,
 readAll:function(){return j('api/csv').then(function(d){lastVer=d.version;base={};var o={ok:true,dirName:d.dirName,linkage:d.linkage||''};for(var k in d.files){o[k]=d.files[k];base[k]=d.files[k];}return o;}).catch(function(e){return {ok:false,error:String(e&&e.message||e)};});},
 writeAll:function(snap){var ch={},n=0;for(var k in snap){if(base[k]!==snap[k]){ch[k]=snap[k];n++;}}if(!n)return Promise.resolve({ok:true,unchanged:true});
  return j('api/csv',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({base:lastVer,files:ch})}).then(function(d){if(d.ok){for(var k in ch)base[k]=ch[k];lastVer=d.stale?'stale:'+d.version:d.version;}return d;}).catch(function(e){return {ok:false,error:String(e&&e.message||e)};});},
 checkRemote:function(){return j('api/csv/version').then(function(d){return !!lastVer&&d.version!==lastVer;}).catch(function(){return false;});}
};})();</script>`

func main() {
	port := flag.Int("port", envInt("LAB_PORT", 8080), "监听端口")
	dir := flag.String("dir", "", "数据目录（默认：程序所在目录）")
	flag.Parse()

	if *dir != "" {
		baseDir = *dir
	} else if exe, err := os.Executable(); err == nil {
		baseDir = filepath.Dir(exe)
	} else {
		baseDir, _ = os.Getwd()
	}
	baseDir, _ = filepath.Abs(baseDir)
	csvDir = filepath.Join(baseDir, "csv")
	if err := os.MkdirAll(csvDir, 0o755); err != nil {
		log.Fatalf("无法创建 CSV 目录 %s：%v", csvDir, err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/", handlePage)
	mux.HandleFunc("/api/csv", handleCSV)
	mux.HandleFunc("/api/csv/version", handleVersion)
	mux.HandleFunc("/api/assets", handleAssets)
	mux.HandleFunc("/api/linkage", handleLinkage)
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, 200, map[string]any{"ok": true, "app": "LabScheduler", "version": appVersion, "dataVersion": dataVersion()})
	})
	for _, d := range []string{"photo", "assets"} {
		fs := http.StripPrefix("/"+d+"/", http.FileServer(noListFS{http.Dir(filepath.Join(baseDir, d))}))
		mux.Handle("/"+d+"/", noCache(fs))
	}

	addr := fmt.Sprintf("0.0.0.0:%d", *port)
	ln, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("端口 %d 无法监听（可能已被占用）：%v", *port, err)
	}
	fmt.Printf("LabScheduler %s 已启动\n数据目录：%s\n", appVersion, csvDir)
	fmt.Printf("本机访问：http://localhost:%d/\n", *port)
	for _, ip := range lanIPs() {
		fmt.Printf("局域网访问：http://%s:%d/\n", ip, *port)
	}
	fmt.Println("关闭此窗口即停止服务。")
	srv := &http.Server{Handler: logRequests(mux), ReadHeaderTimeout: 10 * time.Second}
	log.Fatal(srv.Serve(ln))
}

/* ---------- 页面 ---------- */
func handlePage(w http.ResponseWriter, r *http.Request) {
	p := r.URL.Path
	if p == "/favicon.ico" {
		http.NotFound(w, r)
		return
	}
	if p != "/" && p != "/index.html" && p != "/LabScheduler.html" {
		http.NotFound(w, r)
		return
	}
	html := embeddedHTML
	// 程序目录下有 LabScheduler.html（或 index.html）时优先使用：更新页面不用重新编译
	for _, name := range []string{"LabScheduler.html", "index.html"} {
		if b, err := os.ReadFile(filepath.Join(baseDir, name)); err == nil && len(b) > 0 {
			html = b
			break
		}
	}
	out := injectBridge(html)
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	w.Write(out)
}

func injectBridge(html []byte) []byte {
	lower := bytes.ToLower(html)
	if i := bytes.Index(lower, []byte("<head>")); i >= 0 {
		i += len("<head>")
		return append(append(append([]byte{}, html[:i]...), []byte(bridgeJS)...), html[i:]...)
	}
	return append([]byte(bridgeJS), html...)
}

/* ---------- CSV ---------- */
type writeReq struct {
	Base  string            `json:"base"`
	Files map[string]string `json:"files"`
}

func handleCSV(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		files := map[string]string{}
		for key, name := range csvFiles {
			if b, err := os.ReadFile(filepath.Join(csvDir, name)); err == nil {
				files[key] = string(b)
			}
		}
		linkage := ""
		if b, err := os.ReadFile(filepath.Join(csvDir, linkageFile)); err == nil {
			linkage = string(b)
		}
		writeJSON(w, 200, map[string]any{"ok": true, "files": files, "linkage": linkage, "dirName": "程序目录/csv", "version": dataVersion()})
	case http.MethodPost:
		r.Body = http.MaxBytesReader(w, r.Body, 128<<20)
		var req writeReq
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeJSON(w, 400, map[string]any{"ok": false, "error": "请求格式错误：" + err.Error()})
			return
		}
		for key := range req.Files {
			if _, ok := csvFiles[key]; !ok {
				writeJSON(w, 400, map[string]any{"ok": false, "error": "未知的 CSV：" + key})
				return
			}
		}
		writeMu.Lock()
		defer writeMu.Unlock()
		before := dataVersion()
		stale := req.Base != "" && req.Base != before
		keys := make([]string, 0, len(req.Files))
		for k := range req.Files {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, key := range keys {
			if err := writeAtomic(csvFiles[key], []byte(req.Files[key])); err != nil {
				writeJSON(w, 500, map[string]any{"ok": false, "error": err.Error()})
				return
			}
		}
		writeJSON(w, 200, map[string]any{"ok": true, "version": dataVersion(), "stale": stale, "written": keys})
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func handleVersion(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, 200, map[string]any{"version": dataVersion()})
}

// 数据版本：所有 CSV 的大小 + 修改时间（含外部用 Excel 修改），任意一台电脑保存后其他电脑 5 秒内自动读取
func dataVersion() string {
	h := sha256.New()
	names := []string{linkageFile}
	for _, n := range csvFiles {
		names = append(names, n)
	}
	sort.Strings(names)
	for _, n := range names {
		if st, err := os.Stat(filepath.Join(csvDir, n)); err == nil {
			fmt.Fprintf(h, "%s|%d|%d;", n, st.Size(), st.ModTime().UnixNano())
		}
	}
	return hex.EncodeToString(h.Sum(nil))[:16]
}

// 先写临时文件再替换；覆盖前每个文件每小时留一份备份（csv/backup，保留 14 天）
func writeAtomic(name string, data []byte) error {
	dst := filepath.Join(csvDir, name)
	if old, err := os.ReadFile(dst); err == nil {
		if bytes.Equal(old, data) {
			return nil
		}
		bdir := filepath.Join(csvDir, "backup")
		if err := os.MkdirAll(bdir, 0o755); err == nil {
			bk := filepath.Join(bdir, strings.TrimSuffix(name, ".csv")+"."+time.Now().Format("20060102-15")+".csv")
			if _, err := os.Stat(bk); errors.Is(err, os.ErrNotExist) {
				_ = os.WriteFile(bk, old, 0o644)
				pruneBackups(bdir)
			}
		}
	}
	tmp := dst + ".tmp"
	if err := os.WriteFile(tmp, data, 0o644); err != nil {
		return fmt.Errorf("写入 %s 失败：%w", name, err)
	}
	var err error
	for i := 0; i < 5; i++ { // Windows 下文件被 Excel 等占用时稍后重试
		if err = os.Rename(tmp, dst); err == nil {
			return nil
		}
		time.Sleep(200 * time.Millisecond)
	}
	_ = os.Remove(tmp)
	return fmt.Errorf("保存 %s 失败（文件可能被 Excel 占用）：%w", name, err)
}

func pruneBackups(dir string) {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return
	}
	cut := time.Now().AddDate(0, 0, -14)
	for _, e := range entries {
		if info, err := e.Info(); err == nil && info.ModTime().Before(cut) {
			_ = os.Remove(filepath.Join(dir, e.Name()))
		}
	}
}

/* ---------- 资源目录（assets/spirits） ---------- */
func handleAssets(w http.ResponseWriter, r *http.Request) {
	root := filepath.Join(baseDir, "assets", "spirits")
	files := []string{}
	_ = filepath.WalkDir(root, func(p string, d os.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return nil
		}
		if strings.EqualFold(filepath.Ext(p), ".png") {
			rel, _ := filepath.Rel(baseDir, p)
			files = append(files, filepath.ToSlash(rel))
		}
		return nil
	})
	sort.Strings(files)
	writeJSON(w, 200, map[string]any{"ok": true, "files": files})
}

/* ---------- 联动回调：程序目录/linkage_secret.txt 存在时启用，HMAC 签名 + 时间窗 + nonce 防重放，event_id 幂等 ---------- */
func linkageSecret() string {
	if s := strings.TrimSpace(os.Getenv("LAB_LINKAGE_SECRET")); s != "" {
		return s
	}
	b, err := os.ReadFile(filepath.Join(baseDir, "linkage_secret.txt"))
	if err != nil {
		return ""
	}
	return strings.TrimSpace(string(b))
}

func handleLinkage(w http.ResponseWriter, r *http.Request) {
	secret := linkageSecret()
	if r.Method == http.MethodGet {
		writeJSON(w, 200, map[string]any{"ok": true, "enabled": secret != ""})
		return
	}
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	if secret == "" {
		writeJSON(w, 503, map[string]any{"ok": false, "error": "linkage disabled"})
		return
	}
	body, err := io.ReadAll(http.MaxBytesReader(w, r.Body, 16<<10))
	if err != nil {
		writeJSON(w, 400, map[string]any{"ok": false, "error": "body too large"})
		return
	}
	ts, nonce, sig := r.Header.Get("X-Lab-Timestamp"), r.Header.Get("X-Lab-Nonce"), r.Header.Get("X-Lab-Signature")
	t, err := strconv.ParseInt(ts, 10, 64)
	if err != nil || abs64(time.Now().Unix()-t) > 300 {
		writeJSON(w, 401, map[string]any{"ok": false, "error": "bad timestamp"})
		return
	}
	if !idRe.MatchString(nonce) {
		writeJSON(w, 401, map[string]any{"ok": false, "error": "bad nonce"})
		return
	}
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(ts + "\n" + nonce + "\n"))
	mac.Write(body)
	want := hex.EncodeToString(mac.Sum(nil))
	if !hmac.Equal([]byte(strings.ToLower(sig)), []byte(want)) {
		writeJSON(w, 401, map[string]any{"ok": false, "error": "bad signature"})
		return
	}
	nonceMu.Lock()
	for k, v := range nonces {
		if time.Since(v) > 10*time.Minute {
			delete(nonces, k)
		}
	}
	if _, used := nonces[nonce]; used {
		nonceMu.Unlock()
		writeJSON(w, 409, map[string]any{"ok": false, "error": "nonce reused"})
		return
	}
	nonces[nonce] = time.Now()
	nonceMu.Unlock()

	var ev struct {
		EventID    string `json:"event_id"`
		Type       string `json:"type"`
		Source     string `json:"source"`
		Ref        string `json:"ref"`
		Count      int    `json:"count"`
		OccurredAt string `json:"occurred_at"`
	}
	if err := json.Unmarshal(body, &ev); err != nil || !eventRe.MatchString(ev.EventID) || !typeRe.MatchString(ev.Type) || !sourceRe.MatchString(ev.Source) {
		writeJSON(w, 400, map[string]any{"ok": false, "error": "bad payload"})
		return
	}
	if ev.Count < 1 {
		ev.Count = 1
	}
	if ev.Count > 1000 {
		ev.Count = 1000
	}
	occurred := ev.OccurredAt
	if _, err := time.Parse(time.RFC3339, occurred); err != nil {
		occurred = ""
	}
	refHash := ""
	if ev.Ref != "" {
		s := sha256.Sum256([]byte(secret + "|" + ev.Ref))
		refHash = hex.EncodeToString(s[:])[:16]
	}

	writeMu.Lock()
	defer writeMu.Unlock()
	path := filepath.Join(csvDir, linkageFile)
	old, _ := os.ReadFile(path)
	if bytes.Contains(old, []byte("\""+ev.EventID+"\",")) {
		writeJSON(w, 200, map[string]any{"ok": true, "duplicate": true})
		return
	}
	var buf bytes.Buffer
	if len(old) == 0 {
		buf.WriteString("\uFEFF" + csvLine([]string{"事件ID", "类型", "来源", "引用(脱敏)", "数量", "发生时间", "接收时间", "状态"}))
	} else {
		buf.Write(old)
	}
	buf.WriteString(csvLine([]string{ev.EventID, ev.Type, ev.Source, refHash, strconv.Itoa(ev.Count), occurred, time.Now().UTC().Format(time.RFC3339), "ok"}))
	if err := writeAtomic(linkageFile, buf.Bytes()); err != nil {
		writeJSON(w, 500, map[string]any{"ok": false, "error": err.Error()})
		return
	}
	writeJSON(w, 200, map[string]any{"ok": true})
}

func csvLine(cols []string) string {
	q := make([]string, len(cols))
	for i, c := range cols {
		q[i] = `"` + strings.ReplaceAll(c, `"`, `""`) + `"`
	}
	return strings.Join(q, ",") + "\r\n"
}

/* ---------- 工具 ---------- */
type noListFS struct{ fs http.FileSystem }

func (n noListFS) Open(name string) (http.File, error) {
	f, err := n.fs.Open(name)
	if err != nil {
		return nil, err
	}
	if st, err := f.Stat(); err == nil && st.IsDir() {
		f.Close()
		return nil, os.ErrNotExist
	}
	return f, nil
}

func noCache(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-cache")
		h.ServeHTTP(w, r)
	})
}

func logRequests(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			log.Printf("%s %s %s", r.RemoteAddr, r.Method, r.URL.Path)
		}
		h.ServeHTTP(w, r)
	})
}

func writeJSON(w http.ResponseWriter, code int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(v)
}

func lanIPs() []string {
	out := []string{}
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return out
	}
	for _, a := range addrs {
		if ipn, ok := a.(*net.IPNet); ok && !ipn.IP.IsLoopback() && ipn.IP.To4() != nil {
			out = append(out, ipn.IP.String())
		}
	}
	return out
}

func envInt(k string, d int) int {
	if v, err := strconv.Atoi(os.Getenv(k)); err == nil && v > 0 {
		return v
	}
	return d
}

func abs64(x int64) int64 {
	if x < 0 {
		return -x
	}
	return x
}
