# 修复远程仓库地址

## 问题
`error: remote origin already exists.` - 远程仓库 origin 已存在

## 解决方案

### 方法 1: 更新现有远程仓库地址（推荐）

```powershell
# 更新 origin 的 URL
git remote set-url origin https://github.com/nkjackie/baoyang.git
```

### 方法 2: 先删除再添加

```powershell
# 删除现有的 origin
git remote remove origin

# 重新添加
git remote add origin https://github.com/nkjackie/baoyang.git
```

### 验证配置

```powershell
# 查看所有远程仓库
git remote -v

# 应该显示：
# origin  https://github.com/nkjackie/baoyang.git (fetch)
# origin  https://github.com/nkjackie/baoyang.git (push)
```

### 然后推送到 GitHub

```powershell
# 确保主分支名为 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```
