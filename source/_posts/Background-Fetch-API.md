---
title: Background Fetch API
date: 2023-09-13 15:43:44
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
uniqueId: '2023-09-13 15:43:44/Background Fetch API.html'
mathJax: false
---

后台获取 API 提供了一种管理可能需要大量时间的下载的方法，例如电影、音频文件和软件等。

其提供了一种让浏览器在后台执行某些获取的方法。然后，浏览器以用户可见的方式执行提取，向用户显示进度并为他们提供取消下载的方法。下载完成后，浏览器就会在 ServiceWorker 触发相关事件，此时应用程序可以根据需要对响应执行某些操作。

如果用户在离线状态下启动进程，后台获取 API 将启用。一旦网络连接，该过程就会开始。如果网络离线，该过程将暂停，直到用户再次上线。

后台获取 API 通过 `BackgroundFetchManager` 接口提供，并基于 `ServiceWorkerRegistration` 接口的 `backgroundFetch` 属性向开发者暴露。

## 发起 Background Fetch

`BackgroundFetchManager` 接口的 `fetch()` 方法用于注册一条后台获取。

方法接收一个字符串参数作为该后台获取的 ID；

然后接收一个 Request 或者一组 Request，可以是代表 URL 的字符串（会被传递给 Request 构造函数）或者 Request 实例；

最后接收一组可选的配置项，用于配置浏览器向用户展示的获取进度条对话框：

配置项的 `title` 参数指定对话框的标题；

配置项的 `icons` 参数指定对话框的一组图标，浏览器会从中选择一个图标用于对话框的展示：每个图标的 `src` 参数指定图标路径、`sizes` 参数指定图标的大小（格式同 link 标签的 sizes 属性的格式相同）、`type` 参数指定图标的 MIME 类型、`label` 参数指定图标的名称；

配置项的 `downloadTotal` 参数指定预计的获取资源总大小（字节），若实际获取资源总大小超出该数值，获取会终止；

方法返回一个 Promise 的 `BackgroundFetchRegistration` 实例。

```js
const ID = 'fetch'

window.navigator.serviceWorker.ready.then((registration) => {
  registration.backgroundFetch.fetch(
    ID,
    ["/ep-5.mp3", "ep-5-artwork.jpg"],
    {
      title: "Episode 5: Interesting things.",
      icons: [
        {
          sizes: "300x300",
          src: "/ep-5-icon.png",
          type: "image/png",
          label: "ep-icon",
        },
      ],
      downloadTotal: 60 * 1024 * 1024,
    },
  )
})
```

## Background Fetch 信息

可以使用 `BackgroundFetchManager` 接口的 `get()` 方法根据给定的 ID 获取对应的 Background Fetch。 若存在，方法返回一个 Promise 的 `BackgroundFetchRegistration` 接口实例，否则返回一个 Promise 的 `undefined`。

此外，可以使用 `BackgroundFetchManager` 接口的 `getIds()` 方法获取当前所有 Background Fetch 的 ID 列表，返回一个 Promise 的字符串数组。

`BackgroundFetchRegistration` 接口用于表示后台获取的实时信息，以及一些控制方法。

`BackgroundFetchRegistration` 接口的 `id` 属性表示后台获取的 ID。

`BackgroundFetchRegistration` 接口的 `downloaded` 属性表示后台获取已下载资源的大小，初始值为 0。

`BackgroundFetchRegistration` 接口的 `downloadTotal` 属性表示后台获取将下载资源的总大小，该值在初始化时设置，若未设置则为 0。

`BackgroundFetchRegistration` 接口的 `uploaded` 属性表示后台获取已成功发送内容的大小，初始值为 0。

`BackgroundFetchRegistration` 接口的 `uploadTotal` 属性表示后台获取将发送内容的总大小。

`BackgroundFetchRegistration` 接口的 `recordsAvailable` 属性表示当前是否有可以获取的请求及响应，该值同样用于表示是否可以调用 `match()` 和 `matchAll()`。

`BackgroundFetchRegistration` 接口的 `result` 属性表示后台获取是否成功，可能的值为 `''` `success` `failure`。

`BackgroundFetchRegistration` 接口的 `failureReason` 属性表示后台获取错误的原因，可能的值为 `''` `'aborted'` `'bad-status'` `'fetch-error'` `'quota-exceeded'` `'download-total-exceeded'`。

`BackgroundFetchRegistration` 接口的 `match()` 方法用于匹配当前后台获取中的后台请求。返回一个 Promise 的 `BackgroundFetchRecord` 接口实例或 undefined，表示首个匹配。

`BackgroundFetchRegistration` 接口的 `matchAll()` 方法用于匹配当前后台获取中的后台请求。返回一个 Promise 的 `BackgroundFetchRecord` 接口实例数组，表示所有的匹配。

两方法支持传入一个请求实例 Request 或 URL 或路径字符串，同时支持传入一个可选的配置项，`ignoreSearch` 参数指定是否忽略搜索参数，`ignoreMethod` 参数指定是否忽略请求方法，`ignoreVary` 参数指定是否忽略 Vary 响应头。

`BackgroundFetchRecord` 接口用于表示单个后台请求及响应信息。

`BackgroundFetchRecord` 接口的 `request` 属性表示请求信息，返回一个 `Request`。

`BackgroundFetchRecord` 接口的 `responseReady` 属性表示响应信息，返回一个 Promise 的 `Response`。

`BackgroundFetchRegistration` 接口的 `progress` 事件在当前后台获取的信息更新时触发，包括 `downloaded` 属性、`uploaded` 属性、 `result` 属性、`failureReason` 属性，事件只抛出一个普通的 `Event` 事件。

## 注销 Background Fetch

`BackgroundFetchRegistration` 接口的 `abort()` 方法用于终止当前后台获取。返回一个 Promise 的 boolean，表示是否终止成功。

```js
const ID = 'fetch'

window.navigator.serviceWorker.ready.then((registration) => {
  registration.backgroundFetch.get(ID).then((registration) => {
    registration.abort()
  })
})
```

## Background Fetch 结束处理

`ServiceWorkerGlobalScope` 接口的 `backgroundfetchclick` 事件在用户点击浏览器提供的下载进度条弹出框时触发。返回一个 `BackgroundFetchEvent` 事件。

`ServiceWorkerGlobalScope` 接口的 `backgroundfetchabort` 事件在后台获取被取消时触发。返回一个 `BackgroundFetchEvent` 事件。

`ServiceWorkerGlobalScope` 接口的 `backgroundfetchfail` 事件在后台获取失败时触发，即至少有一个后台获取内的网络请求失败。返回一个 `BackgroundFetchUpdateUIEvent` 事件。

`ServiceWorkerGlobalScope` 接口的 `backgroundfetchsuccess` 事件在后台获取完成时触发，此时所有后台获取内的网络请求已经完成。返回一个 `BackgroundFetchUpdateUIEvent` 事件。

```js
self.addEventListener('backgroundfetchsuccess', (e) => {
  e.waitUntil(() =>
    self.caches.open('movies').then((cache) =>
      e.registration.matchAll().then((records) =>
        Promise.all(
          records.map((record) =>
            record.responseReady.then((response) =>
              cache.put(record.request, response)
            )
          )
        )
      )
    ).then(() =>
      e.updateUI({
          title: 'Move download complete',
      })
    )
  )
})

self.addEventListener('backgroundfetchfail', (e) => {
  e.waitUntil(() =>
    self.caches.open('movies').then((cache) =>
      e.registration.recordsAvailable && e.registration.matchAll().then((records) =>
        Promise.all(
          records.map((record) =>
            record.responseReady.then((response) =>
              cache.put(record.request, response)
            )
          )
        )
      )
    ).then(() =>
      e.updateUI({
        title: 'Download Fail',
      })
    )
  )
})

self.addEventListener('backgroundfetchabort', (e) => {
  e.waitUntil(() =>
    self.caches.open('movies').then((cache) =>
      e.registration.recordsAvailable && e.registration.matchAll().then((records) =>
        Promise.all(
          records.map((record) =>
            record.responseReady.then((response) =>
              cache.put(record.request, response)
            )
          )
        )
      )
    )
  )
})

self.addEventListener('backgroundfetchclick', (e) => {
  if (e.registration.result === 'success') {
    self.clients.openWindow('/play-movie');
  } else {
    self.clients.openWindow('/movie-download-progress');
  }
})
```

`BackgroundFetchEvent` 接口继承自 `ExtendableEvent` 接口，其 `registration` 属性代表与之对应的 `BackgroundFetchRegistration` 实例。

`BackgroundFetchUpdateUIEvent` 接口继承自 `BackgroundFetchEvent` 接口，其 `updateUI()` 方法用于更新浏览器提供的下载进度条弹出框的信息。接收一组参数，包括 `icons` 及 `title` 参数，与 `BackgroundFetchManager` 接口的 `fetch()` 方法中的相应参数相同。返回一个 Promise。

## 权限 API

该 API 调用需要用户授予 `background-fetch` 权限，可以调用 `Permission.query()` 方法检查用户是否已授予了该权限

## 示例

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/background-fetch.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/background-fetch.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/background-fetch.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/background-fetch.js)

## 类型

```ts
type BackgroundFetchFailureReason = "" | "aborted" | "bad-status" | "fetch-error" | "quota-exceeded" | "download-total-exceeded";
type BackgroundFetchResult = "" | "success" | "failure";

interface BackgroundFetchEvent extends ExtendableEvent {
  readonly registration: BackgroundFetchRegistration;
}

interface BackgroundFetchUpdateUIEvent extends BackgroundFetchEvent {
  updateUI(options?: BackgroundFetchUIOptions);
}

interface BackgroundFetchManager {
  fetch(id: string, requests: RequestInfo | RequestInfo[], options?: BackgroundFetchOptions): Promise<BackgroundFetchRegistration>;
  get(id: string): Promise<BackgroundFetchRegistration | undefined>;
  getIds(): Promise<ReadonlyArray<string>>;
}

interface BackgroundFetchOptions extends BackgroundFetchUIOptions {
  downloadTotal: number;
}

interface BackgroundFetchRecord {
  readonly request: Request;
  readonly responseReady: Promise<Response>;
}

interface BackgroundFetchRegistration extends EventTarget {
  abort(): Promise<boolean>;
  readonly downloaded: number;
  readonly downloadTotal: number;
  readonly failureReason: BackgroundFetchFailureReason;
  readonly id: string;
  match(request: RequestInfo, options?: CacheQueryOptions): Promise<BackgroundFetchRecord | undefined>;
  matchAll(request?: RequestInfo, options?: CacheQueryOptions): Promise<BackgroundFetchRecord[]>;
  readonly recordsAvailable: boolean;
  readonly result: BackgroundFetchResult;
  readonly uploaded: number;
  readonly uploadTotal: number;
  onprogress: ((this: BackgroundFetchRegistration, ev: Event) => any) | null;
}

interface BackgroundFetchUIOptions {
  icons: ReadonlyArray<ImageResource>;
  title: string;
}

interface ImageResource {
  src: string;
  sizes: string;
  type: string;
  label: string;
}

interface ServiceWorkerRegistration extends EventTarget {
  readonly backgroundFetch: BackgroundFetchManager;
}

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  onbackgroundfetchabort: ((this: ServiceWorkerGlobalScope, ev: BackgroundFetchUpdateUIEvent) => any) | null;
  onbackgroundfetchclic: ((this: ServiceWorkerGlobalScope, ev: BackgroundFetchUpdateUIEvent) => any) | null;
  onbackgroundfetchfail: ((this: ServiceWorkerGlobalScope, ev: BackgroundFetchUpdateUIEvent) => any) | null;
  onbackgroundfetchsuccess: ((this: ServiceWorkerGlobalScope, ev: BackgroundFetchUpdateUIEvent) => any) | null;
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Background_Fetch_API>
* <https://wicg.github.io/background-fetch/>
