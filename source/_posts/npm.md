---
title: npm
date: 2022-12-14 22:49:10
tags:
- Frontend
- Tool
categories:
- [Frontend, Tool]
thumbnail: https://www.bleepstatic.com/content/posts/2018/07/12/npm.png
---

### npm

[npm官网](https://www.npmjs.com/)

[官方英文文档](https://docs.npmjs.com/)

[中文文档](https://www.npmjs.com.cn/)



包：node.js 中的第三方模块

由第三方个人或团队开发的开源代码集



包类型：

*   项目包
    *   开发依赖包    被记录到devDependencies节点的包，仅开发中使用
    *   核心依赖包    被记录到dependencies节点的包，开发发布后均使用
*   全局包



命令：

```
npm -v
查看npm版本


npm help
查看npm帮助


npm init
初始化包环境
创建package.json包配置文件
* -yes -y 使用默认设置初始化包环境


npm install <package_name>
npm i <package_name>
下载npm包
在当前目录中创建node_modules目录（如果尚不存在）并将包下载到该目录
同时在该目录下添加package-lock.json文件，记录下载的包的信息，如包的版本号、下载url等
<package_name>@<tag> <package_name>@<edition> 方式下载指定版本和标签的包
未指定package_name参数时会根据package.json的dependencies属性下载包
* -global -g 全局安装包
* --save-dev -D 把包配置到devDependencies内


npm list
npm ls
列出所有已安装的包
* -global -g 显示全局安装的包
* -all -a 显示所有包及其所有的依赖项
* -depth=<number> 显示包及其给定深度的依赖项

npm uninstall <package_name>
卸载npm包
* --save 从package-lock.json文件dependencies属性中移除包
* --save-dev 从package-lock.json文件devDependencies属性中移除包
* -g 删除全局包

npm update
npm update -g
npm update -g <package_name>
升级npm包

npm outdated
npm outdated -g --depth=0
检测npm包是否为最新
```



包管理配置文件：package.json项目根目录

项目名称、版本号、描述等‘

项目中使用的包：区分仅开发使用与开发及部署均使用

安装的包会自动更新至package.json文件

*   **name**   项目名称：字符串
*   **version**   项目版本号：字符串
*   **description**   包内容描述：字符串
*   **keywords**  项目的关键词：字符串数组
*   homePage 项目主页：字符串
*   bugs 项目报告错误的网址：字符串数组
*   **license** 项目的许可证：字符串
*   **author**  作者：字符串        可使用name、email、url替代
*   **contributors**  贡献者：字符串数组
*   funding  贡献方式：字符串or字符串数组or对象（type & url）
*   files  包作为依赖项需包含的条目
*   **main**   标记包的根目录模块
*   **browser**   同上，特别指明为浏览器环境
*   bin    命令名称到本地文件的映射|
*   man    指定为man程序查找的文件名|
*   directories    指定包结构|
*   repository    指定代码所在位置，常为各种git仓库
*   scripts    指定在包生命周期运行的代码|
*   config   设置持续使用配置参数
*   **dependencies**    项目开发与发布均使用的包
*   **devDependencies**    项目开发内使用的包
*   peerDependencies    项目使用的插件|
*   peerDependenciesMeta    标记插件是否为必需|

*   bundledDependencies/bundleDependencies    发布包时将捆绑的包名称|
*   optionalDependencies    可以使用依赖项|
*   overrides    规定依赖项版本|
*   engines    规定适用的node版本
*   os    规定使用的操作系统版本
*   cpu    规定适用的cpu版本
*   **private**    规定能否发布私有存储库
*   publishConfig    规定发布配置
*   workspaces    描述用作工作空间的文件夹的直接路径



版本号：

*   第一位数字：大版本
*   第二位数字：功能版本
*   第三位数字：bug修复版本



其他：

将node_modules文件夹添加到.gitignore文件内，以使git上传时剔除npm包
