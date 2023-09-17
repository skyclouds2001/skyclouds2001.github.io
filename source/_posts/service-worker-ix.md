---
title: service-worker-ix
date: 2023-09-16 00:35:28
tags:
- Frontend
- JavaScript
- Browser
categories:
- [Frontend, Other]
thumbnail:
---

## ServiceWorker 使用 - Client 与 Worker 的交互

### 在 Worker 中获取 Client

#### `Clients`

在 Service Worker 中，`Clients` 接口提供对 `Client` 接口的访问

* `Clients` 接口的 `get()` 方法根据给定的 id 获取对应的 `Client` 实例

  接收一个字符串，代表 `Client` 的 id

  返回一个 Promise 的 `Client`（或 `undefined`）

* `Clients` 接口的 `matchAll()` 方法获取所有匹配的 `Client` 实例

  接收一组可选的配置项

  配置项的 `type` 参数指定需匹配的 `Client` 类型，允许的值为 `"window"`, `"worker"`, `"sharedworker"` 和 `"all"`，默认为 `"window"`

  配置项的 `includeUncontrolled` 参数指定是否返回未受控制的 `Client`，默认为 `false`

  返回一个 Promise 的 Client 数组

* `Clients` 接口的 `claim()` 方法将所有匹配的 `Client` 实例置于当前 Service Worker 的控制之下

  返回一个 Promise

* `Clients` 接口的 `openWindow()` 方法创建新的顶层上下文并加载给定的 URL

  要求该 URL 需与 Service Worker 同源，并且要求调用前一段时间用户需发生交互行为

  Firefox 中要求该方法必须在通知点击回调方法中调用

  返回一个 Promise 的 `WindowClient` 实例或 `null`

#### `Client`

在 Service Worker 中，`Client` 接口表示受 Service Worker 控制的执行上下文

其中 `WindowClient` 接口继承自 `Client` 接口，表示受 Service Worker 控制的 Window 执行上下文

受 Service Worker 控制的各执行上下文可以是 Worker、Shared Worker 以及 Window

* `Client` 接口的 `id` 属性返回一个字符串，代表对应的执行上下文的 ID

* `Client` 接口的 `type` 属性返回一个字符串枚举，可能为 `"window"`、`"worker"`、`"sharedworker"` 之一，代表对应的执行上下文的类型

* `Client` 接口的 `url` 属性返回一个字符串，代表对应的执行上下文的 URL

* `Client` 接口的 `frameType` 属性返回一个字符串枚举，可能为 `"auxiliary"`、`"top-level"`、`"nested"`、`"none"` 之一，代表对应的执行上下文的类型

* `Client` 接口的 `postMessage()` 方法向对应的执行上下文发送消息，会在对应的执行上下文上触发 message 事件

  接收一个可结构化克隆的任意数据，代表需传递的消息

  可以接收一组可转移所有权的对象列表

  亦可接收一组序列化的配置项（唯一属性 transfer 为可转移所有权的对象列表）

  方法无返回值

* `WindowClient` 接口的 `focused` 属性返回一个布尔值，代表对应的 Window 执行上下文是否处于聚焦状态

* `WindowClient` 接口的 `visibilityState` 属性返回一个字符串枚举，可能的值为 `"hidden"`、`"visible"`、`"prerender"`，代表对应的 Window 执行上下文的可见性类型

* `WindowClient` 接口的 `focus()` 方法控制对应的执行上下文聚焦

  返回一个 Promise 的 `WindowClient` 实例

* `WindowClient` 接口的 `navigate()` 方法控制对应的执行上下文加载指定 URL

  方法接收一个字符串，代表 URL

  若 Service Worker 执行上下文与 URL 同源，返回 Promise 的 `WindowClient`；否则返回 Promise 的 `null`

### 在 Client 中获取 Worker

#### `ServiceWorkerContainer`

#### `ServiceWorkerRegistration`

#### `ServiceWorker`

### 相关接口

```ts
interface Client {
  readonly frameType: FrameType;
  readonly id: string;
  readonly type: ClientTypes;
  readonly url: string;
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: StructuredSerializeOptions): void;
}

declare var Client: {
  prototype: Client;
  new(): Client;
};

interface Clients {
  claim(): Promise<void>;
  get(id: string): Promise<Client | undefined>;
  matchAll<T extends ClientQueryOptions>(options?: T): Promise<ReadonlyArray<T["type"] extends "window" ? WindowClient : Client>>;
  openWindow(url: string | URL): Promise<WindowClient | null>;
}

declare var Clients: {
  prototype: Clients;
  new(): Clients;
};

interface WindowClient extends Client {
  readonly focused: boolean;
  readonly visibilityState: DocumentVisibilityState;
  focus(): Promise<WindowClient>;
  navigate(url: string | URL): Promise<WindowClient | null>;
}

declare var WindowClient: {
  prototype: WindowClient;
  new(): WindowClient;
};
```
