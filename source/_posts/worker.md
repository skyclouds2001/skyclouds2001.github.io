---
title: worker
date: 2023-09-21 12:36:10
tags:
  - Frontend
  - Web API
categories:
  - Frontend
  - Web API
thumbnail: 
toc: true
recommend: 1
keywords: 
uniqueId: '2023-09-21 04:36:10/worker.html'
mathJax: false
---

Web Worker 是 HTML 标准定义的 Web API 的一部分，可以在后台运行一个耗时的任务，避免因长期执行 JS 任务而阻塞用户界面渲染与交互

Web Worker 可以被 Window 环境创建，也可以被其他的 Worker 创建

Web Worker 是独立于主线程的一个线程，具有独立的作用域，其中运行的任务不会阻塞主线程

Web Worker 中的全局作用域与 Window 的全局作用域不同，其中部分 API 在 Worker 中不可用或为限制版本

Web Worker 线程与主线程之间的通信通过 message 机制实现，传递的数据通过结构化拷贝算法传递，因此通常不存在处理线程安全的需要

## 创建 Worker

通过调用 `Worker()` 构造函数，传入 Worker 脚本的 URL，来创建一个 Worker

```js
const worker = new Worker('./worker.js')
```

Worker 脚本需要与 Client 同域

> Worker 构造函数支持传入一组可选的配置项
> 其 `type` 参数指定脚本的类型，值可以是 `classic` 或 `module`，默认值是 `classic`
> 其 `name` 参数指定 Worker 的名称，在 debug 时候有一定作用
> 其 credentials 参数指定 Worker 的 credentials 选项，允许的值可以是 `omit`、`same-origin` 或 `include`

## Worker 消息传递

无论是 Worker 端还是 Client 端，通过调用 `postMessage()` 方法实现发送消息，通过监听 `message` 事件实现接收消息

Client 发送消息

```js
worker.postMessage('message from client')
```

Client 接收消息

```js
worker.addEventListener('message', (e) => {
  console.log('receive message in client: ', e.data)
})
```

Worker 发送消息

```js
self.postMessage('message from worker')
```

Worker 发送消息

```js
self.addEventListener('message', (e) => {
  console.log('receive message in worker: ', e.data)
})
```

### 可传递消息

当然，传递的消息可以不仅仅是 string 类型，可以是其他任何可以被结构化拷贝算法执行的数据，包括：

* number
* string
* boolean
* null
* undefined
* bigint
* 普通 object
* Array
* RegExp
* Date
* Error
* Set
* Map
* Blob
* ArrayBuffer
* TypedArray
* 等等

此外，可以选择传入一组数组或包含 transfer 参数的配置项，定义需要转移所有权的对象

所有权被转移后，对应对象在原环境内不再可用，而是仅在新环境内可用

### 可转移对象

可以转移的对象可以是：

* ArrayBuffer
* MessagePort
* ReadableStream
* WritableStream
* TransformStream
* WebTransportReceiveStream
* AudioData
* ImageBitmap
* VideoFrame
* OffscreenCanvas
* RTCDataChannel

### 可共享对象

SharedArrayBuffer 可以用于多个线程之间的共享数据，并利用 Atomics 实现线程同步与线程锁功能。

启用该 API 需要 secure context，并且需要 cross-origin isolate，可以通过检测 isSecureContext 和 crossOriginIsolated 属性来确定是否可以使用 SharedArrayBuffer

## 卸载 Worker

通过调用 worker 实例的 `terminate()` 方法，来卸载一个 Worker

```js
worker.terminate()
```

或者调用 Worker 环境中的 `close()` 方法，来卸载当前的 Worker

```js
self.close()
```

卸载是立即执行的，不会等待 worker 内部任务的完成

## 补充

Worker 对象或者 Worker 全局环境的 `messageerror` 事件会在传递的消息无法解析时触发，可用用于监听发送失败的消息

Worker 全局环境的 `importScripts()` 方法可以导入一组同源的脚本文件，并在 Worker 全局环境下执行

## 源码链接

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/worker.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/worker.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/worker.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/worker.js)
