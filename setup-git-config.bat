@echo off
chcp 65001 >nul
echo ========================================
echo Git 和 GitHub 配置助手
echo ========================================
echo.

echo [步骤 1] 配置 Git 用户信息
echo.
set /p GIT_USERNAME="请输入你的 GitHub 用户名: "
set /p GIT_EMAIL="请输入你的 GitHub 邮箱: "

if "%GIT_USERNAME%"=="" (
    echo [错误] 用户名不能为空
    pause
    exit /b 1
)

if "%GIT_EMAIL%"=="" (
    echo [错误] 邮箱不能为空
    pause
    exit /b 1
)

echo.
echo 正在配置 Git 用户信息...
git config --global user.name "%GIT_USERNAME%"
git config --global user.email "%GIT_EMAIL%"

if %errorlevel% equ 0 (
    echo [成功] Git 用户信息已配置
    echo   用户名: %GIT_USERNAME%
    echo   邮箱: %GIT_EMAIL%
) else (
    echo [错误] 配置失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo [步骤 2] 选择认证方式
echo ========================================
echo.
echo 请选择 GitHub 认证方式:
echo   1. HTTPS (需要 Personal Access Token)
echo   2. SSH (需要配置 SSH 密钥)
echo.
set /p AUTH_METHOD="请输入选项 (1 或 2): "

if "%AUTH_METHOD%"=="1" (
    echo.
    echo [信息] 你选择了 HTTPS 方式
    echo.
    echo 请按照以下步骤创建 Personal Access Token:
    echo   1. 访问: https://github.com/settings/tokens
    echo   2. 点击 "Generate new token (classic)"
    echo   3. 勾选 "repo" 权限
    echo   4. 生成并复制 Token
    echo.
    echo 推送代码时，用户名输入: %GIT_USERNAME%
    echo 密码输入: 你的 Personal Access Token
    echo.
) else if "%AUTH_METHOD%"=="2" (
    echo.
    echo [信息] 你选择了 SSH 方式
    echo.
    echo 检查 SSH 密钥...
    if exist "%USERPROFILE%\.ssh\id_ed25519.pub" (
        echo [发现] 已存在 SSH 密钥
        echo.
        echo 你的公钥内容:
        type "%USERPROFILE%\.ssh\id_ed25519.pub"
        echo.
        echo 请复制上面的公钥内容，然后:
        echo   1. 访问: https://github.com/settings/keys
        echo   2. 点击 "New SSH key"
        echo   3. 粘贴公钥并保存
        echo.
    ) else (
        echo [未发现] SSH 密钥不存在
        echo.
        set /p GEN_KEY="是否现在生成 SSH 密钥? (y/n): "
        if /i "%GEN_KEY%"=="y" (
            echo.
            echo 正在生成 SSH 密钥...
            ssh-keygen -t ed25519 -C "%GIT_EMAIL%"
            echo.
            if exist "%USERPROFILE%\.ssh\id_ed25519.pub" (
                echo [成功] SSH 密钥已生成
                echo.
                echo 你的公钥内容:
                type "%USERPROFILE%\.ssh\id_ed25519.pub"
                echo.
                echo 请复制上面的公钥内容，然后:
                echo   1. 访问: https://github.com/settings/keys
                echo   2. 点击 "New SSH key"
                echo   3. 粘贴公钥并保存
                echo.
            )
        )
    )
) else (
    echo [警告] 无效选项，跳过认证配置
)

echo.
echo ========================================
echo [步骤 3] 初始化 Git 仓库
echo ========================================
echo.
if exist .git (
    echo [信息] Git 仓库已存在
) else (
    echo 正在初始化 Git 仓库...
    git init
    if %errorlevel% equ 0 (
        echo [成功] Git 仓库已初始化
    ) else (
        echo [错误] 初始化失败
    )
)

echo.
echo ========================================
echo 配置完成！
echo ========================================
echo.
echo 当前 Git 配置:
git config --global --list | findstr "user"
echo.
echo 下一步操作:
echo   1. 在 GitHub 上创建新仓库
echo   2. 使用以下命令连接并推送:
echo      git add .
echo      git commit -m "Initial commit"
echo      git remote add origin [你的仓库地址]
echo      git branch -M main
echo      git push -u origin main
echo.
echo 详细说明请查看: GITHUB_SETUP.md
echo.
pause
