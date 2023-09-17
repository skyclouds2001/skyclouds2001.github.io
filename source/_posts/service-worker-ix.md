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

* `WindowClient` 接口的 `focused` 属性返回一个布尔值，代表对应的 Window 执行上下文是否处于聚焦状态

* `WindowClient` 接口的 `visibilityState` 属性返回一个字符串枚举，可能的值为 `"hidden"`、`"visible"`、`"prerender"`，代表对应的 Window 执行上下文的可见性类型

* `WindowClient` 接口的 `focus()` 方法控制对应的执行上下文聚焦

  返回一个 Promise 的 `WindowClient` 实例

* `WindowClient` 接口的 `navigate()` 方法控制对应的执行上下文加载指定 URL

  方法接收一个字符串或 URL 实例，代表 URL

  若 Service Worker 执行上下文与 URL 同源，返回 Promise 的 `WindowClient`；否则返回 Promise 的 `null`

### 在 Client 中获取 Worker

#### `ServiceWorkerContainer`

在 Service Worker 中，`ServiceWorkerContainer` 接口包含 Service Worker 的相关状态与相关控制方法，用于实现对 Service Worker 的管理

* `ServiceWorkerContainer` 接口的 `ready` 属性返回一个 Promise 的 `ServiceWorkerRegistration`，表示与当前页面匹配的 Service Worker 的注册对象；该属性与 `ServiceWorkerGlobalScope` 接口的 `registration` 属性类似

* `ServiceWorkerContainer` 接口的 `controller` 属性返回一个 `ServiceWorker` 或 `null`，表示是否存在与当前页面匹配的 Service Worker 的对象；该属性与 `ServiceWorkerGlobalScope` 接口的 `serviceWorker` 属性类似

* `ServiceWorkerContainer` 接口的 `getRegistration()` 方法根据给定的 URL （或使用当前 Client 的 URL）返回与之匹配的 `ServiceWorkerRegistration` 对象

  方法可以接受一个参数

  方法返回一个 Promise 的 ServiceWorkerRegistration 或者 undefined，根据是否存在对应的注册对象

* `ServiceWorkerContainer` 接口的 `getRegistrations()` 方法获取所有与当前 Client 相关的 `ServiceWorkerRegistration` 对象

  返回一个  `ServiceWorkerRegistration` 的数组

* `ServiceWorkerContainer` 接口的 `startMessages()` 方法强制当前上下文提前开始接收发送自 Service Worker 的消息

* `ServiceWorkerContainer` 接口的 `controllerchange` 事件在控制当前 Client 的 Service Worker 变化时触发，返回一个 `Event` 事件

#### `ServiceWorkerRegistration`

在 Service Worker 中，`ServiceWorkerRegistration` 接口表示 Service Worker 的注册对象

* `ServiceWorkerRegistration` 接口的 `active` 属性返回一个 `ServiceWorker` 或者 `null`，代表最新注册的 `state` 属性为 `activating` 或 `activated` 的 ServiceWorker

* `ServiceWorkerRegistration` 接口的 `installing` 属性返回一个 `ServiceWorker` 或者 `null`，代表最新注册的 `state` 属性为 `installing` 的 ServiceWorker

* `ServiceWorkerRegistration` 接口的 `waiting` 属性返回一个 `ServiceWorker` 或者 `null`，代表最新注册的 `state` 属性为 `installed` 的 ServiceWorker

* `ServiceWorkerRegistration` 接口的 `scope` 属性返回一个字符串，该属性值由 Service Worker 注册时指定的值决定

* `ServiceWorkerRegistration` 接口的 `updateViaCache` 属性返回一个字符串枚举，可能的值为 `'all'`、`'imports'`、`'none'`，该属性值由 Service Worker 注册时指定的值决定

* `ServiceWorkerRegistration` 接口的 `updatefound` 事件在新的 Service Worker 开始下载时触发，返回一个 `Event` 事件

#### `ServiceWorker`

在 Service Worker 中，`ServiceWorker` 接口表示 Service Worker 对象

* `ServiceWorker` 接口的 `scriptURL` 属性返回一个字符串，表示 Service Worker 的注册脚本 URL

* `ServiceWorker` 接口的 `state` 属性返回一个字符串枚举，可能的值包括 `"parsed"`、`"installing"`、`"installed"`、`"activating"`、`"activated"`、`"redundant"`，表示 Service Worker 的状态

  * `"parsed"` Service Worker 在下载完成并且验证可运行后的初始值
  * `"installing"` Service Worker 在安装中
  * `"installed"` Service Worker 安装完成
  * `"activating"` Service Worker 在激活中
  * `"activated"` Service Worker 激活完成
  * `"redundant"` Service Worker 被替代或安装失败

* `ServiceWorker` 接口的 `statechange` 事件在 Service Worker 的状态更新时触发，返回一个 `Event` 事件

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

interface ServiceWorkerEventMap extends AbstractWorkerEventMap {
    "statechange": Event;
}

interface ServiceWorker extends EventTarget, AbstractWorker {
    readonly scriptURL: string;
    readonly state: ServiceWorkerState;
    postMessage(message: any, transfer: Transferable[]): void;
    postMessage(message: any, options?: StructuredSerializeOptions): void;
    onstatechange: ((this: ServiceWorker, ev: Event) => any) | null;
    addEventListener<K extends keyof ServiceWorkerEventMap>(type: K, listener: (this: ServiceWorker, ev: ServiceWorkerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ServiceWorkerEventMap>(type: K, listener: (this: ServiceWorker, ev: ServiceWorkerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare var ServiceWorker: {
    prototype: ServiceWorker;
    new(): ServiceWorker;
};

interface ServiceWorkerContainer extends EventTarget {
    readonly controller: ServiceWorker | null;
    readonly ready: Promise<ServiceWorkerRegistration>;
    getRegistration(clientURL?: string | URL): Promise<ServiceWorkerRegistration | undefined>;
    getRegistrations(): Promise<ReadonlyArray<ServiceWorkerRegistration>>;
    register(scriptURL: string | URL, options?: RegistrationOptions): Promise<ServiceWorkerRegistration>;
    startMessages(): void;
    oncontrollerchange: ((this: ServiceWorkerContainer, ev: Event) => any) | null;
    onmessage: ((this: ServiceWorkerContainer, ev: MessageEvent) => any) | null;
    onmessageerror: ((this: ServiceWorkerContainer, ev: MessageEvent) => any) | null;
    addEventListener<K extends keyof ServiceWorkerContainerEventMap>(type: K, listener: (this: ServiceWorkerContainer, ev: ServiceWorkerContainerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ServiceWorkerContainerEventMap>(type: K, listener: (this: ServiceWorkerContainer, ev: ServiceWorkerContainerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare var ServiceWorkerContainer: {
    prototype: ServiceWorkerContainer;
    new(): ServiceWorkerContainer;
};

interface ServiceWorkerRegistrationEventMap {
    "updatefound": Event;
}

interface ServiceWorkerRegistration extends EventTarget {
    readonly active: ServiceWorker | null;
    readonly installing: ServiceWorker | null;
    readonly navigationPreload: NavigationPreloadManager;
    readonly pushManager: PushManager;
    readonly scope: string;
    readonly updateViaCache: ServiceWorkerUpdateViaCache;
    readonly waiting: ServiceWorker | null;
    getNotifications(filter?: GetNotificationOptions): Promise<Notification[]>;
    showNotification(title: string, options?: NotificationOptions): Promise<void>;
    unregister(): Promise<boolean>;
    update(): Promise<void>;
    onupdatefound: ((this: ServiceWorkerRegistration, ev: Event) => any) | null;
    addEventListener<K extends keyof ServiceWorkerRegistrationEventMap>(type: K, listener: (this: ServiceWorkerRegistration, ev: ServiceWorkerRegistrationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof ServiceWorkerRegistrationEventMap>(type: K, listener: (this: ServiceWorkerRegistration, ev: ServiceWorkerRegistrationEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare var ServiceWorkerRegistration: {
    prototype: ServiceWorkerRegistration;
    new(): ServiceWorkerRegistration;
};
```
