# Git 和 GitHub 配置命令（PowerShell 版本）
# 在 PowerShell 中直接运行这些命令，无需 bash

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git 和 GitHub 配置命令" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 Git 是否安装
Write-Host "[检查] Git 版本..." -ForegroundColor Yellow
git --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "[错误] Git 未安装，请先安装 Git for Windows" -ForegroundColor Red
    Write-Host "下载地址: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit
}
Write-Host ""

# 2. 配置 Git 用户信息（请修改为你的信息）
Write-Host "[配置] Git 用户信息..." -ForegroundColor Yellow
Write-Host "请运行以下命令（替换为你的信息）：" -ForegroundColor Cyan
Write-Host 'git config --global user.name "你的GitHub用户名"' -ForegroundColor Green
Write-Host 'git config --global user.email "你的GitHub邮箱"' -ForegroundColor Green
Write-Host ""

# 3. 检查当前配置
Write-Host "[检查] 当前 Git 配置..." -ForegroundColor Yellow
git config --global --list | Select-String "user"
Write-Host ""

# 4. 初始化 Git 仓库（如果还没有）
if (-not (Test-Path .git)) {
    Write-Host "[初始化] Git 仓库..." -ForegroundColor Yellow
    git init
    Write-Host "[完成] Git 仓库已初始化" -ForegroundColor Green
} else {
    Write-Host "[信息] Git 仓库已存在" -ForegroundColor Cyan
}
Write-Host ""

# 5. 查看当前状态
Write-Host "[状态] 当前 Git 状态..." -ForegroundColor Yellow
git status
Write-Host ""

# 6. 常用命令提示
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "常用 Git 命令：" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "# 添加所有文件" -ForegroundColor White
Write-Host "git add ." -ForegroundColor Green
Write-Host ""
Write-Host "# 提交更改" -ForegroundColor White
Write-Host 'git commit -m "提交信息"' -ForegroundColor Green
Write-Host ""
Write-Host "# 添加远程仓库（HTTPS）" -ForegroundColor White
Write-Host "git remote add origin https://github.com/用户名/仓库名.git" -ForegroundColor Green
Write-Host ""
Write-Host "# 添加远程仓库（SSH）" -ForegroundColor White
Write-Host "git remote add origin git@github.com:用户名/仓库名.git" -ForegroundColor Green
Write-Host ""
Write-Host "# 推送到 GitHub" -ForegroundColor White
Write-Host "git branch -M main" -ForegroundColor Green
Write-Host "git push -u origin main" -ForegroundColor Green
Write-Host ""
