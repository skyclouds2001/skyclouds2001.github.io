---
title: SharedWorker
date: 2023-09-22 02:31:34
tags:
  - Frontend
  - Web API
categories:
  - Frontend
  - Web API
toc: true
recommend: 1
keywords:
uniqueId: '2023-09-22 02:31:34/SharedWorker.html'
mathJax: false
thumbnail:
---

SharedWorker 是 HTML 标准定义的 Web API 的一部分，是一种特殊的 Worker，支持在多个上下文（例如 window、iframe 甚至 Worker）之间共享

同时，SharedWorker 的全局上下文 `SharedWorkerGlobalScope` 也与 Worker 不同

## 创建 SharedWorker

和 Worker 一样，通过调用 `SharedWorker()` 构造函数来创建

```js
const worker = new SharedWorker('./worker.js')
```

> `SharedWorker()` 构造函数支持传入一组可选的配置项，与 `Worker()` 构造函数相同
> `SharedWorker()` 构造函数也支持直接传入一个字符串，同配置项的 `name` 参数；特别的，`SharedWorker()` 中的 `name` 参数作为唯一的一个标识符，在创建新的与之前的拥有相同 URL 的 SharedWorker 时有一定作用

SharedWorker 通过脚本文件 URL 和 name 参数确定是否为同一个 SharedWorker

## SharedWorker 消息传递

与 Worker 不同，Client 端通过创建的 SharedWorker 实例上的 `port` 属性暴露的 `MessagePort` 接口实例，调用其上的 `postMessage()` 方法实现发送消息

Client 端通过监听 SharedWorker 实例上的 `message` 事件实现接收到消息

```js
worker.port.start()

worker.port.postMessage('message from client')

worker.port.close()

worker.port.addEventListener('message', (e) => {
  console.log('receive message in client: ', e.data)
})
```

SharedWorker 环境下接收消息，需要监听 `connect` 事件，从而获取到新的对应的 MessagePort 实例；监听 MessagePort 实例的 `message` 事件接收消息

SharedWorker 环境下接收消息，同样需要通过调用 MessagePort 实例的 `postMessage()` 方法实现发送消息

```js
self.addEventListener('connect', (e) => {
  const port = e.ports.at(0)

  port.addEventListener('message', (e) => {
    console.log('receive message in worker: ', e.data)
  })

  port.start()

  port.postMessage('message from worker')

  port.close()
})
```

通常，在 `connect` 事件回调函数内，会把接收到的 port 存储下来，以便之后使用

```js
const ports = []

self.addEventListener('connect', (e) => {
  const port = e.ports.at(0)

  port.addEventListener('message', handleReceiveMessage)

  port.start()

  ports.push(port)
})

function sendMessage() {
  for (const port of ports) {
    port.postMessage('message from worker')
  }
}
```

## 卸载 SharedWorker

仅支持在 SharedWorker 环境内调用 `close()` 方法，来卸载当前 Worker

```js
self.close()
```

## SharedWorker 生命周期

SharedWorker 生命周期与 Client 端的生命周期独立，当任一页面创建 SharedWorker 时其生命周期开始，在没有页面使用 SharedWorker 时其生命周期结束

## SharedWorker 全局环境

SharedWorker 全局环境通过 `SharedWorkerGlobalScope` 表示，该接口继承自 `WorkerGlobalScope`，它与 Worker 全局环境差别不大

## 示例

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/shared-worker.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/shared-worker.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/shared-worker.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/shared-worker.js)

## 类型

```ts
interface SharedWorker extends EventTarget, AbstractWorker {
  constructor(scriptURL: string | URL, options?: string | WorkerOptions);
  readonly port: MessagePort;
}

interface SharedWorkerGlobalScope extends WorkerGlobalScope {
  readonly name: string;
  close(): void;
  onconnect: ((this: SharedWorkerGlobalScope, ev: MessageEvent) => any) | null;
}

interface WorkerOptions {
  credentials?: RequestCredentials
  name?: string
  type?: WorkerType
}

type WorkerType = 'classic' | 'module'
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API>
* <https://html.spec.whatwg.org/multipage/workers.html>
