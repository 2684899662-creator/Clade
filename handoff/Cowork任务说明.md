# 交给 Cowork 的任务说明（LabScheduler v3.0 精灵重构）

交接内容在 GitHub 仓库 2684899662-creator/Clade 的分支 claude/session-read-nx9mn3：程序本体是根目录的 index.html，其余资料在 handoff/ 文件夹。把下面「可直接粘贴的指令」发给 Cowork 即可，不需要上传任何文件。

## 可直接粘贴的指令
请从 GitHub 仓库 2684899662-creator/Clade 的分支 claude/session-read-nx9mn3 取 LabScheduler v3.0（APP_VERSION 2026.10.08.10）：程序是根目录 index.html，出图设定卡、元素表、预览图、源码分片在 handoff/ 文件夹（下文路径都相对 handoff/）。请按顺序完成：
1. 重新打包 exe：在我电脑上找到原来的 LabScheduler 服务端源码文件夹（含 main.go、app.rc），用本包里的 index.html 替换其中的 index.html，然后执行
   `GOOS=windows GOARCH=amd64 go build -ldflags "-s -w" -o LabScheduler.exe .`
   把 app.rc 里的版本号改成 3,0,0,0 再编译。新 exe 放在我电脑上和 index.html 同一个文件夹，不改动程序的任何业务逻辑。找不到源码就停下来告诉我。
2. 重点 50 只出图：名单在 assets/spirits/KEY50.txt；每只的设定卡在 assets/spirits/{类别}/{id}/art_brief.md。按卡出 lv1.png ~ lv5.png（512×512 起、透明背景），放进同一文件夹（在我电脑上建好同样的 assets/spirits 目录结构，和 exe 放在一起）。画风与禁止项以设定卡为准：赛尔号式粗描边赛璐璐、主色 ≤ 3、Q 版不拟人、LV1 保留蛋壳、脚下不画光圈、不默认加翅膀 / 光环 / 皇冠、画面不出现文字。可参考 docs/preview/ 里的矢量版构图。
3. 验收：双击新 exe 打开程序，进后台「美术资源」点「扫描资源目录」，确认这 50 只显示图片、其余仍是矢量；缺图的阶段会自动用矢量顶上。
4. 把新 exe、50 只的 PNG 和一份做了什么 / 没做什么的说明整理在我电脑上的 LabScheduler 文件夹里，并告诉我位置。

## 包内容
- 根目录 index.html：程序本体（单文件）
- assets/spirits/：370 只的出图设定卡（art_brief.md）+ KEY50.txt
- docs/元素表_370只.csv：完整元素表；docs/preview/：示例、素材库、370 只总览图
- src/parts/p41~p52.js：精灵建模层源码分片（改元素表改 p52.js）
- README_更新说明.md：这一版的改动与校验结果
