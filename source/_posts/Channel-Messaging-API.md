---
title: Channel Messaging API
date: 2024-01-15 22:10:53
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
uniqueId: '2024-01-15 14:10:53/Channel Messaging API.html'
mathJax: false
---

Channel Messaging API 支持在多个浏览上下文中执行的脚本之间传递消息

其核心为 `MessageChannel` 接口与 `MessagePort` 接口

## 消息频道

`MessageChannel` 接口表示单个消息频道

使用 `MessageChannel()` 构造函数创建新的 `MessageChannel` 实例，此时其 `port1` 和 `port2` 只读属性均返回一个 `MessagePort` 实例，表示消息频道的端口

## 消息端口

`MessagePort` 接口表示单个消息端口

### 启动

调用 `start()` 方法启动消息端口，仅在仅通过 `addEventListener()` 方法监听事件的情况下预先调用

### 消息发送

调用 `postMessage()` 方法向绑定的另外一个消息端口发送消息（或转让可转移对象的所有权）

方法第一个参数表示要发送的消息，接收一个可序列化值

方法第二个参数表示可转移对象，接收一个数组或一个包含 `transfer` 键的对象

### 消息接收

`message` 事件在接收到消息时触发一个 `MessageEvent` 事件

`messageerror` 事件在接收到消息但解析失败时触发一个 `MessageEvent` 事件

### 停止

调用 `close()` 方法停止消息端口

## 类型

```ts
interface MessageChannel {
  readonly port1: MessagePort
  readonly port2: MessagePort
}

declare var MessageChannel: {
  prototype: MessageChannel
  new(): MessageChannel
}

interface MessagePort extends EventTarget {
  close(): void
  postMessage(message: any, transfer: Transferable[]): void
  postMessage(message: any, options?: StructuredSerializeOptions): void
  start(): void
  onmessage: ((this: MessagePort, ev: MessageEvent) => any) | null
  onmessageerror: ((this: MessagePort, ev: MessageEvent) => any) | null
}

declare var MessagePort: {
  prototype: MessagePort
  new(): MessagePort
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API>
* <https://html.spec.whatwg.org/multipage/web-messaging.html#channel-messaging>
