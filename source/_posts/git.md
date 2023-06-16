---
title: git
date: 2022-08-09 23:45:51
tags:
- Frontend
- Tool
categories:
- [Frontend, Tool]
thumbnail: https://git-scm.com/images/logo@2x.png
---

## git

#### 版本控制

版本控制软件

操作简便|易于对比|易于回溯|不易丢失|协作方便

本地版本控制系统->集中化版本控制系统->分布式版本控制系统

#### git

快照：在原有文件基础上重新生成一个文件，类似于备份

操作：本地执行，云端同步

#### git 文件状态

- 未跟踪（untracked）未被 git 管理
- 未修改（unmodified）工作区文件内容与 git 仓库内文件相同

- **已修改**（modified）表示修改了文件，但还没保存到 git 本地仓库中，自上次检出后，作了修改但还没有放到暂存区域
- **已暂存**（staged）表示对一个已修改文件的当前版本做了标记以使之包含在下次提交的快照中，文件已修改并放入暂存区
- **已提交**（committed）表示数据已经安全地保存在 git 仓库中，Git 目录中保存着特定版本的文件

#### git 项目阶段

- **工作区**是对项目的某个版本独立提取出来的内容，供用户修改与使用

- **暂存区**是一个文件，保存了下次将要提交的文件列表信息

- Git **仓库目录**是 Git 用来保存项目的元数据和对象数据库的地方

#### git 全局配置

文件路径 C:/Users/用户名文件夹/.gitconfig 文件

查看所有全局配置项 `git config --list --global`

#### git 帮助

`git help <verb>`

#### git 初始化仓库

- 将尚未进行版本控制的本地目录转换为 Git 仓库

`git init`

- 从其它服务器克隆一个已存在的 Git 仓库

`git clone <url> [<storagename>]`

- 允许 https 协议等，以及 git 协议与 SSH 协议

#### git 文件操作

`git status` 检测文件所处状态

* git status -s

* git status --short

标记 A 表示新建的文件

标记 M 表示修改的文件

标记?? 表示未修改的文件

`git diff` 显示尚未暂存的改动

`git add <filename>` 开始跟踪新文件&将已跟踪新文件放至暂存区

`git commit [-m "message"]` 从暂存区提交更新至 git 仓库

​ `git commit -a [-m "message"]` 一次性将跟踪的文件暂存并提交

`git checkout -- <filename>` 撤销对文件的修改：将对应工作区文件修改还原成 git 仓库中保存的版本

`git reset HEAD <filename>` 从暂存区移除文件

`git rm {-f|--cached} <filename>` -f 从仓库与工作区移除文件:--cached 仅从仓库移除文件，但保留工作区文件

`git mv <filefrom> <fileto>` 移动文件或重命名文件

#### git 忽略文件

创建 `.gitignore` 的文件列出要忽略的文件的模式

- 所有空行或者以 `#` 开头的行都会被 Git 忽略
- 可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中
- 匹配模式可以以（`/`）开头防止递归
- 匹配模式可以以（`/`）结尾指定目录
- 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（`!`）取反
  - glob 模式是指 shell 所使用的简化了的正则表达式
  - 星号（`*`）匹配零个或多个任意字符
  - `[abc]` 匹配任何一个列在方括号中的字符 （这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）
  - 问号（`?`）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符， 表示所有在这两个字符范围内的都可以匹配（比如 `[0-9]` 表示匹配所有 0 到 9 的数字）
  - 使用两个星号（`**`）表示匹配任意中间目录，比如 `a/**/z` 可以匹配 `a/z` 、 `a/b/z` 或 `a/b/c/z` 等

```text
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```

[参考链接](https://github.com/github/gitignore)

#### git 查看文件历史

`git log`

​ `-<number>` 显示指定的提交历史

按 q 退出

#### 开源

开源：open source code

开源许可协议：open source license

​ GPL MIT 等

开源项目托管平台：github、gitlab、gitee

#### 远程仓库访问方式

- HTTPS 无需配置，每次需输入账号密码

`git remote add <本地版本库> <远程仓库url>` git remote add origin gitutl-https
`git push <远程主机名> <本地分支名>:<远程分支名>` git push origin master

- SSH 需额外配置，每次无需输入账号密码

SSH key

- 个人私钥
- git 服务器公钥

#### 分支

查看、创建、切换、合并、删除、跟踪、拉取

主分支 master
实际用于保存及记录整个项目已完成及审计的代码

功能分支：专门用于开发新功能的分支

###### 查看分支

`git branch`

分支前的 \* 代表当前分支

###### 创建分支

`git branch <branch-name>`

相较于当前分支创建分支

创建分支时不改变原所在分支

###### 切换分支

`git checkout <new-branch-name>`

###### 快速创建切换分支

`git checkout -b <new-branch-name>`

###### 合并分支

`git merge <branch-name>`

将指定分支合并到当前分支

若两分支存在分歧，需要主动处理冲突

###### 删除分支

`git branch -d <branch-name>`

`git branch -D <branch-name>` 强制删除

###### 推送分支至远程仓库

`git push -u <remote-repository> <local-branch>:<remote-branch>` 第一次

之后直接 git push 即可

###### 查看远程仓库分支列表

`git remote show <remote-repository>`

###### 跟踪[远程仓库]分支

`git checkout <remote-branch>`

`git checkout <local-branch> <remote-repository>/<remote-branch>` 同时重命名本地分支

###### 拉取[远程仓库最新]分支

`git pull` 相较于当前分支

###### 删除[远程仓库]分支

`git push <remote-repository> --delete <remote-branch>`

