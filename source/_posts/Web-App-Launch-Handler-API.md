---
title: Web App Launch Handler API
date: 2023-11-19 03:31:34
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
uniqueId: '2023-11-18 19:31:34/Web App Launch Handler API.html'
mathJax: false
---

Web App Launch Handler API 允许管理 Progressive Web App 的启动导航方式（针对已开启的 PWA 应用）

## 配置启动行为

通过配置 manifest 文件的 `launch_handler` 字段来管理应用启动行为

该字段的唯一子字段 `client_mode` 指定应用启动时导航的行为，允许的值如下

* `auto` 由用户代理根据平台等因素决定行为，亦是默认值（如移动端使用 `navigate-existing`，桌面端使用 `navigate-new`）
* `navigate-new` 将创建新的浏览上下文以加载目标 URL
* `navigate-existing` 最近交互的浏览上下文将聚焦并导航至目标 URL
* `focus-existing` 最近交互的浏览上下文将聚焦并用于处理目标 URL（但不会自动导航）

该子字段亦允许指定多个值，以提供后备的执行行为

## 手动执行启动行为

通过 `LaunchQueue` 接口使用，该接口实例通过 `window.launchQueue` 暴露

`LaunchQueue` 接口的 `setConsumer()` 方法用于管理应用的启动导航行为

该方法接收一个回调方法，代表在发生应用启动导航行为时需调用的回调方法，并传递一个 `LaunchParams` 实例

`LaunchParams` 接口的 `targetURL` 属性返回一个 `string`，代表导航的目标 URL，可能为 `null`

`LaunchParams` 接口的 `files` 属性返回一个 `FileSystemHandle` 数组，代表通过 POST 方法传递的文件

```js
window.launchQueue.setConsumer((launchParams) => {
  if (launchParams.targetURL) {
    const params = new URL(launchParams.targetURL).searchParams

    const track = params.get("track")
    if (track) {
      audio.src = track
      title.textContent = new URL(track).pathname.substr(1)
      audio.play()
    }
  }
})
```

## 类型

```ts
type LaunchConsumer = (params: LaunchParams) => any

interface LaunchParams {
  readonly targetURL?: string
  readonly files: ReadonlyArray<FileSystemHandle>
}

interface LaunchQueue {
  setConsumer(consumer: LaunchConsumer): void
}

interface Window {
  readonly launchQueue: LaunchQueue
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Launch_Handler_API>
* <https://wicg.github.io/web-app-launch/>
