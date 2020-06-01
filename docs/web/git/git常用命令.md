# git常用命令

::: tip
git base 命令工具常用命令(自用)，编辑器自带git工具忽略
:::

## 配置

```
// 全局配置邮箱用户名
git config --global user.name "用户名"
git config --global user.email "邮箱"
// 查看
git config user.email
git config user.name 
// 查看全部配置
git config --list
```

## 配置SSH

```
// 生成密钥
ssh-keygen -t rsa -C "这里换上你的邮箱"
// window查看  C盘找
// mac查看  cat /Users/电脑用户名/.ssh/id_rsa.pub
```

## 创建git仓库

```
// 远程仓库去github或gitee创建
mkdir text  // 创建文件夹
cd text  // 切换文件夹
git init // 初始化
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin 远程仓库地址  // 远程仓库取别名
git push -u origin master // 推送到远程仓库
```

## 克隆项目

```
// 配置了ssh
git clone '远程仓库地址'
```

## 项目提交

```
git add .	// 缓存所有文件
git status // 查看修改
git pull  // 先拉最新代码
git commit -m '' // 再保存本地
git push   // 再推送远程仓库 
```

## 删除远程仓库文件

```
git pull origin master
git rm -r --cached xxxx（要删除的文件名）
git commit -m""
git push -u origin master
```

## 远程仓库

```
git remote add origin <git-repo> // 添加远程仓库并命名为 origin
git remote set-url origin <git-repo> // 修改远程仓库的地址
git remote -v // 列出所有的远程仓库
git remote show origin // 列出远程仓库 origin 的详细信息
```

## 回滚

```
git log
git reset --hard xxxx(git log日志的版本号)
```

## 分支

```
git branch // 列出本地分支
git branch -r // 远程分支
git checkout 分支名字 // 切换分支
git merge  分支名字 // 合并分支
```
