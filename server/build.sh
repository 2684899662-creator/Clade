#!/bin/sh
# 生成 dist/LabScheduler.html 与 dist/LabScheduler.exe（Windows x64）
set -e
cd "$(dirname "$0")"
cp ../index.html LabScheduler.html
mkdir -p ../dist
cp ../index.html ../dist/LabScheduler.html
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" -o ../dist/LabScheduler.exe .
echo "built: dist/LabScheduler.html dist/LabScheduler.exe"
