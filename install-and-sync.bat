@echo off
chcp 65001 >nul
echo ========================================
echo 安装依赖并同步到 GitHub
echo ========================================
echo.

echo [步骤 1] 安装 npm 依赖...
echo.
call npm install
if %errorlevel% neq 0 (
    echo [错误] 依赖安装失败
    pause
    exit /b 1
)
echo [完成] 依赖安装成功
echo.

echo [步骤 2] 添加文件到 Git 暂存区...
git add .
if %errorlevel% neq 0 (
    echo [错误] 添加文件失败
    pause
    exit /b 1
)
echo [完成] 文件已添加到暂存区
echo.

echo [步骤 3] 提交更改...
git commit -m "chore: 安装依赖并更新项目文件"
if %errorlevel% neq 0 (
    echo [警告] 提交失败，可能没有更改需要提交
    echo 继续执行推送...
)
echo.

echo [步骤 4] 推送到 GitHub...
echo 注意: 如果远程有冲突，可能需要先拉取
echo.
set /p FORCE_PUSH="是否强制推送（覆盖远程）? (y/n，默认n): "
if /i "%FORCE_PUSH%"=="y" (
    echo 正在强制推送...
    git push -u origin main --force
) else (
    echo 尝试正常推送...
    git push -u origin main
    if %errorlevel% neq 0 (
        echo.
        echo [提示] 推送失败，可能远程有冲突
        echo 请运行以下命令解决:
        echo   git pull origin main --allow-unrelated-histories
        echo   git push -u origin main
        echo.
        echo 或者强制推送:
        echo   git push -u origin main --force
    )
)

echo.
echo ========================================
echo 操作完成！
echo ========================================
echo.
pause
