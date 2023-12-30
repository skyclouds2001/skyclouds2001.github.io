---
title: Background Tasks API
date: 2023-12-30 21:41:27
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
uniqueId: '2023-12-30 13:41:27/Background Tasks API.html'
mathJax: false
---

Background Tasks API 允许创建后台任务

这些后台任务会在用户代理认为空闲时执行，从而可以优先执行高级别的任务

## 使用

使用 `Window` 接口的 `requestIdleCallback()` 方法注册后台任务，需要传入一个代表后台任务的回调方法，返回任务 ID

并且，可以可选地传入一个配置项参数，其 `timeout` 选项指定超时时间；后台任务在达到超时时间后会正常放入任务队列中执行

传入的回调方法在调用时，会传入一个 `IdleDeadline` 对象，该对象的 `didTimeout` 只读属性指示是否是因为超时而调用该方法，`timeRemaining()` 方法返回一个时间戳，指示当前空余任务周期的剩余时间

使用 `Window` 接口的 `cancelIdleCallback()` 方法取消之前调用 `requestIdleCallback()` 注册后台任务，需要传入任务 ID

```js
const handle = window.requestIdleCallback(() => {
  // to do something
}, {
  timeout: 60 * 1000,
})

window.cancelIdleCallback(handle)
```

## 类型

```ts
interface Window {
  cancelIdleCallback(handle: number): void
  requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestOptions): number
}

interface IdleRequestCallback {
  (deadline: IdleDeadline): void
}

interface IdleDeadline {
  readonly didTimeout: boolean
  timeRemaining(): DOMHighResTimeStamp
}

interface IdleRequestOptions {
  timeout?: number
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API>
* <https://w3c.github.io/requestidlecallback/>
