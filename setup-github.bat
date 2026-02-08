@echo off
chcp 65001 >nul
echo ========================================
echo 初始化 Git 并连接 GitHub
echo ========================================
echo.

REM 检查是否已初始化 git
if exist .git (
    echo [信息] Git 仓库已存在
) else (
    echo [步骤 1] 初始化 Git 仓库...
    git init
    echo [完成] Git 仓库初始化成功
    echo.
)

REM 检查是否已有远程仓库
git remote -v >nul 2>&1
if %errorlevel% equ 0 (
    echo [信息] 当前远程仓库:
    git remote -v
    echo.
    set /p ADD_NEW="是否要添加新的远程仓库? (y/n): "
    if /i "%ADD_NEW%"=="y" goto :add_remote
) else (
    goto :add_remote
)

:add_remote
echo.
echo [步骤 2] 添加 GitHub 远程仓库
echo 请输入您的 GitHub 仓库地址 (例如: https://github.com/username/repo.git)
set /p REPO_URL="GitHub 仓库 URL: "
if "%REPO_URL%"=="" (
    echo [错误] 仓库地址不能为空
    pause
    exit /b 1
)

git remote add origin "%REPO_URL%" 2>nul
if %errorlevel% neq 0 (
    echo [警告] 远程仓库已存在，尝试更新...
    git remote set-url origin "%REPO_URL%"
)
echo [完成] 远程仓库已设置: %REPO_URL%
echo.

echo [步骤 3] 添加所有文件到暂存区...
git add .
echo [完成] 文件已添加到暂存区
echo.

echo [步骤 4] 提交更改...
git commit -m "Initial commit"
if %errorlevel% neq 0 (
    echo [警告] 提交失败，可能没有更改需要提交
)
echo.

echo [步骤 5] 推送到 GitHub...
echo 注意: 如果是第一次推送，可能需要设置上游分支
set /p PUSH_NOW="是否现在推送到 GitHub? (y/n): "
if /i "%PUSH_NOW%"=="y" (
    git branch -M main
    git push -u origin main
    if %errorlevel% equ 0 (
        echo [完成] 代码已成功推送到 GitHub!
    ) else (
        echo [错误] 推送失败，请检查:
        echo   1. GitHub 仓库是否存在
        echo   2. 是否已配置 GitHub 认证
        echo   3. 是否有推送权限
    )
)

echo.
echo ========================================
echo 设置完成！
echo ========================================
echo.
echo 后续操作:
echo   1. 查看状态: git status
echo   2. 提交更改: git add . ^&^& git commit -m "描述"
echo   3. 推送到 GitHub: git push
echo.
pause
