# GitHub 配置指南

本指南将帮助你在 Cursor 中配置 GitHub。

## 📋 前置准备

1. 确保已安装 Git（通常 Cursor 已内置）
2. 拥有 GitHub 账号（如果没有，请先注册：https://github.com）

---

## 🔧 步骤 1: 配置 Git 用户信息

首先需要配置你的 Git 用户名和邮箱（这些信息会出现在你的提交记录中）。

### 方法 A: 在 Cursor 终端中配置

1. 在 Cursor 中按 `` Ctrl+` `` 打开终端
2. 运行以下命令（替换为你的信息）：

```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```

### 方法 B: 在 Cursor 设置中配置

1. 按 `Ctrl+,` 打开设置
2. 搜索 "git config"
3. 或直接编辑设置 JSON，添加：
```json
{
  "git.enabled": true,
  "git.path": "git"
}
```

---

## 🔐 步骤 2: 选择认证方式

GitHub 支持两种认证方式：**HTTPS** 和 **SSH**。

### 方式 A: HTTPS（推荐新手）

**优点**：简单易用，无需配置密钥  
**缺点**：每次推送需要输入 Personal Access Token

#### 设置步骤：

1. **创建 Personal Access Token (PAT)**
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token" → "Generate new token (classic)"
   - 填写 Note（如：Cursor Git）
   - 选择过期时间
   - 勾选权限：至少需要 `repo` 权限
   - 点击 "Generate token"
   - **重要**：复制生成的 token（只显示一次！）

2. **使用 Token**
   - 推送代码时，用户名输入你的 GitHub 用户名
   - 密码输入刚才复制的 Personal Access Token

### 方式 B: SSH（推荐长期使用）

**优点**：一次配置，永久使用，更安全  
**缺点**：需要生成和配置 SSH 密钥

#### 设置步骤：

1. **检查是否已有 SSH 密钥**
   ```bash
   ls -al ~/.ssh
   ```
   如果看到 `id_rsa.pub` 或 `id_ed25519.pub`，说明已有密钥。

2. **生成新的 SSH 密钥**（如果没有）
   ```bash
   ssh-keygen -t ed25519 -C "你的GitHub邮箱"
   ```
   - 按 Enter 使用默认路径
   - 设置密码（可选，但推荐）

3. **复制公钥**
   ```bash
   # Windows PowerShell
   cat ~/.ssh/id_ed25519.pub | clip
   
   # 或手动查看并复制
   cat ~/.ssh/id_ed25519.pub
   ```

4. **添加到 GitHub**
   - 访问：https://github.com/settings/keys
   - 点击 "New SSH key"
   - Title: 填写描述（如：My Windows PC）
   - Key: 粘贴刚才复制的公钥
   - 点击 "Add SSH key"

5. **测试连接**
   ```bash
   ssh -T git@github.com
   ```
   如果看到 "Hi username! You've successfully authenticated..." 说明配置成功。

---

## 🚀 步骤 3: 在 Cursor 中初始化并连接 GitHub

### 3.1 初始化 Git 仓库

1. 在 Cursor 中按 `Ctrl+Shift+G` 打开源代码管理面板
2. 点击 "Initialize Repository" 按钮
3. 或使用终端：
   ```bash
   git init
   ```

### 3.2 创建 .gitignore（已存在，跳过）

项目已有 `.gitignore` 文件，无需创建。

### 3.3 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库名称（如：my-project）
3. 选择 Public 或 Private
4. **不要**勾选 "Initialize this repository with a README"（因为本地已有代码）
5. 点击 "Create repository"

### 3.4 连接本地仓库到 GitHub

#### 方法 A: 使用 Cursor 界面

1. 在源代码管理面板，点击 "..." 菜单
2. 选择 "Publish to GitHub"
3. 选择仓库类型（Public/Private）
4. 输入仓库名称
5. Cursor 会自动创建仓库并推送代码

#### 方法 B: 使用终端命令

```bash
# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/仓库名.git
# 或使用 SSH：
# git remote add origin git@github.com:你的用户名/仓库名.git

# 重命名主分支为 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

---

## ✅ 验证配置

运行以下命令检查配置：

```bash
# 检查 Git 配置
git config --list

# 检查远程仓库
git remote -v

# 检查分支
git branch
```

---

## 🔄 日常使用

配置完成后，日常操作：

1. **查看更改**：源代码管理面板会自动显示更改
2. **提交代码**：
   - 在源代码管理面板输入提交信息
   - 点击 ✓ 提交
3. **推送到 GitHub**：
   - 点击 "..." → "Push"
   - 或使用终端：`git push`

---

## ❓ 常见问题

### Q: 推送时提示认证失败？
- **HTTPS**：检查 Personal Access Token 是否正确
- **SSH**：运行 `ssh -T git@github.com` 测试连接

### Q: 如何切换认证方式？
```bash
# 查看当前远程地址
git remote -v

# 切换到 HTTPS
git remote set-url origin https://github.com/用户名/仓库名.git

# 切换到 SSH
git remote set-url origin git@github.com:用户名/仓库名.git
```

### Q: 忘记保存 Personal Access Token？
重新生成一个新的 Token 并更新。

---

## 📚 更多资源

- [GitHub 官方文档](https://docs.github.com)
- [Git 官方文档](https://git-scm.com/doc)
- [GitHub CLI](https://cli.github.com)（可选，命令行工具）
