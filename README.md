# Clade
## 局域网运行（LabScheduler.exe）
- `dist/LabScheduler.exe` + `dist/LabScheduler.html` 放在同一个文件夹，双击 exe 启动；窗口里会显示「局域网访问：http://<本机IP>:8080/」，其他电脑用浏览器打开这个地址即可。
- 数据保存在 exe 所在目录的 `csv/`（文件名与原来一致）；每个文件每小时自动备份一份到 `csv/backup/`，保留 14 天。
- 端口：`LabScheduler.exe -port 9000`；首次运行 Windows 防火墙询问时选「允许专用网络」。
- exe 目录下有 `LabScheduler.html` 时优先用它，更新页面只需替换这个文件，不用重新编译。
- 联动回调：在 exe 目录放 `linkage_secret.txt`（写入签名密钥）即启用 `POST /api/linkage`。
- 重新编译：`server/build.sh`（需要 Go 1.22+）。
