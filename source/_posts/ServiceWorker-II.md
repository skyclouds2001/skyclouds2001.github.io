---
title: ServiceWorker II
date: 2023-09-20 15:04:36
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
uniqueId: '2023-09-20 15:04:36/ServiceWorker II.html'
mathJax: false
---

## ServiceWorker 全局上下文

`ServiceWorkerGlobalScope` 接口代表 ServiceWorker 的全局上下文，在 ServiceWorker 内通过 self 全局变量或者 globalThis 全局变量访问（该接口继承自 `WorkerGlobalScope`）。

### `ServiceWorkerGlobalScope`

*以下代表在 `ServiceWorkerGlobalScope` 接口本身的属性、方法和事件*：

* `ServiceWorkerGlobalScope` 接口的 `clients` 属性代表一个 `Clients` 实例，可用于获取 `Client` （可执行上下文）实例。

* `ServiceWorkerGlobalScope` 接口的 `registration` 属性代表一个 `ServiceWorkerRegistration` 实例，即当前 ServiceWorker 注册的引用。

* `ServiceWorkerGlobalScope` 接口的 `serviceWorker` 属性代表一个 `ServiceWorker` 实例，即当前 ServiceWorker 实例的引用。

* `ServiceWorkerGlobalScope` 接口的 `skipWaiting` 方法强制当前 ServiceWorker 从等待状态变成激活状态，返回一个该 ServiceWorker 激活后完成的 Promise。其在 install 事件的回调中调用才具有实际意义。

### `WorkerGlobalScope`

*以下代表继承自 `WorkerGlobalScope` 接口的属性、方法和事件*：

* `WorkerGlobalScope` 接口的 `location` 属性代表一个 `WorkerLocation` 实例，是 `Location` 的字集。

* `WorkerGlobalScope` 接口的 `navigator` 属性代表一个 `WorkerNavigator` 实例，是 `Navigator` 的字集。

* `WorkerGlobalScope` 接口的 `self` 属性代表 `WorkerGlobalScope` 接口本身。

* `WorkerGlobalScope` 接口的 `importScripts` 方法同步导入一组脚本文件并执行，接受一组参数，代表脚本文件的 URL，其可以为绝对路径或相对路径（相对文档路径）。

* `WorkerGlobalScope` 接口的 `error` 事件在 ServiceWorker 内发生脚本错误时触发，返回一个 `Event` 实例。

* `WorkerGlobalScope` 接口的 `languagechange` 事件在用户的首选语言更改时触发，返回一个 `Event` 实例。

* `WorkerGlobalScope` 接口的 `online` 事件在浏览器获得网络访问权限并且 `navigator.onLine` 值切换到 `true` 时触发，返回一个 `Event` 实例。

* `WorkerGlobalScope` 接口的 `offline` 事件在浏览器获得网络访问权限并且 `navigator.onLine` 值切换到 `false` 时触发，返回一个 `Event` 实例。

* `WorkerGlobalScope` 接口的 `rejectionhandled` 事件在 ServiceWorker 内处理的 Promise 拒绝事件时触发，返回一个 `Event` 实例。

* `WorkerGlobalScope` 接口的 `unhandledrejection` 事件在 ServiceWorker 内未处理的 Promise 拒绝事件时触发，返回一个 `Event` 实例。

*以下代表暴露在全局的属性、方法和事件*：

```js
self.fonts
self.caches
self.crossOriginIsolated
self.crypto
self.indexedDB
self.isSecureContext
self.origin
self.performance
```

```js
self.atob()
self.btoa()
self.clearInterval()
self.clearTimeout()
self.createImageBitmap()
self.fetch()
self.queueMicrotask()
self.reportError()
self.setInterval()
self.setTimeout()
self.structuredClone()
```

## 示例

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.js)

## 类型

```ts
interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  readonly clients: Clients;
  readonly registration: ServiceWorkerRegistration;
  readonly serviceWorker: ServiceWorker;
  onactivate: ((this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any) | null;
  onfetch: ((this: ServiceWorkerGlobalScope, ev: FetchEvent) => any) | null;
  oninstall: ((this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any) | null;
  onmessage: ((this: ServiceWorkerGlobalScope, ev: ExtendableMessageEvent) => any) | null;
  onmessageerror: ((this: ServiceWorkerGlobalScope, ev: MessageEvent) => any) | null;
  onnotificationclick: ((this: ServiceWorkerGlobalScope, ev: NotificationEvent) => any) | null;
  onnotificationclose: ((this: ServiceWorkerGlobalScope, ev: NotificationEvent) => any) | null;
  onpush: ((this: ServiceWorkerGlobalScope, ev: PushEvent) => any) | null;
  onpushsubscriptionchange: ((this: ServiceWorkerGlobalScope, ev: Event) => any) | null;
  skipWaiting(): Promise<void>;
}

interface WorkerGlobalScope extends EventTarget, FontFaceSource, WindowOrWorkerGlobalScope {
  readonly location: WorkerLocation;
  readonly navigator: WorkerNavigator;
  readonly self: WorkerGlobalScope & typeof globalThis;
  onerror: ((this: WorkerGlobalScope, ev: ErrorEvent) => any) | null;
  onlanguagechange: ((this: WorkerGlobalScope, ev: Event) => any) | null;
  onoffline: ((this: WorkerGlobalScope, ev: Event) => any) | null;
  ononline: ((this: WorkerGlobalScope, ev: Event) => any) | null;
  onrejectionhandled: ((this: WorkerGlobalScope, ev: PromiseRejectionEvent) => any) | null;
  onunhandledrejection: ((this: WorkerGlobalScope, ev: PromiseRejectionEvent) => any) | null;
  importScripts(...urls: (string | URL)[]): void;
}

interface WindowOrWorkerGlobalScope {
  readonly caches: CacheStorage;
  readonly crossOriginIsolated: boolean;
  readonly crypto: Crypto;
  readonly fonts: FontFaceSet;
  readonly indexedDB: IDBFactory;
  readonly isSecureContext: boolean;
  readonly origin: string;
  readonly performance: Performance;
  atob(data: string): string;
  btoa(data: string): string;
  clearInterval(id: number | undefined): void;
  clearTimeout(id: number | undefined): void;
  createImageBitmap(image: ImageBitmapSource, options?: ImageBitmapOptions): Promise<ImageBitmap>;
  createImageBitmap(image: ImageBitmapSource, sx: number, sy: number, sw: number, sh: number, options?: ImageBitmapOptions): Promise<ImageBitmap>;
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  queueMicrotask(callback: VoidFunction): void;
  reportError(e: any): void;
  setInterval(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
  setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;
  structuredClone<T = any>(value: T, options?: StructuredSerializeOptions): T;
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API>
* <https://w3c.github.io/ServiceWorker/>
