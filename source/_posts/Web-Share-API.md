---
title: Web Share API
date: 2023-10-30 12:03:44
tags:
  - Frontend
  - Web API
categories:
  - Frontend
  - Web API
thumbnail:
cover:
toc: true
recommend: 1
keywords:
uniqueId: '2023-10-30 04:03:44/Web Share API.html'
mathJax: false
---

Web Share API 允许分享文字、链接、文件或其他内容到用户指定的分享目标

## 分享操作

使用 `Navigator` 接口上的 `share()` 方法分享内容

方法允许传递一组可选的分享内容，包括 `title` 字段；`text` 字段；`url` 字段；`files` 字段

方法返回一个 Promise

方法可能抛出 `InvalidStateError` 异常，若当前文档未处于活跃状态；或当前存在其他分享操作

方法可能抛出 `NotAllowedError` 异常，若当前未被授予 `web-share` 权限；或分享操作未因用户交互行为调用；或分享的文件因为隐私问题被拒绝

方法可能抛出 `TypeError` 异常，若校验分享数据失败

> `title` `text` `url` `files` 四个字段均为空
>
> 仅存在 `files` 字段且其为空数组
>
> 用户代理实现不支持分享文件
>
> 用户代理确信任一分享的文件存在恶意行为
>
> 存在 `url` 字段且解析 URL 失败
>
> 存在 `url` 字段且其协议不是可分享的协议类型，如 http https 等；或为不可分享的协议类型，如 file、ws、wss、javascript 或本地协议等

方法可能抛出 `AbortError` 异常，若用户代理无法获取到可用的分享目标；或用户退出选取分享目标过程

方法可能抛出 `DataError` 异常，若尝试启动分享目标失败；或传递分享数据失败

## 检测分享

使用 `Navigator` 接口上的 `canShare()` 方法检测内容能否被成功分享，传递的参数同 `share()` 方法，返回一个 `boolean`

通常在调用 `share()` 方法之前先行调用该方法以检测能否成功分享

若调用 `share()` 方法会成功，则 `canShare()` 方法一定返回 `true`；反之返回 `false`

## 类型

```ts
interface Navigator {
  share(data?: ShareData): Promise<undefined>
  canShare(data?: ShareData): boolean
}

interface ShareData {
  files?: File[]
  title?: string
  text?: string
  url?: string
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API>
* <https://w3c.github.io/web-share/>
