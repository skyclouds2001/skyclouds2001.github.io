---
title: Content Index API
date: 2023-10-01 20:12:19
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
uniqueId: '2023-10-01 12:12:19/Content Index API.html'
mathJax: false
---

Content Index API 允许网站注册离线启用的内容，向用户告知网站支持的离线内容并允许开发者对其进行管理

该 API 仅支持 HTML 文档对应的 URL，不支持如媒体资源等类型的 URL

该 API 仅支持列举已注册的内容，不支持进行查找等操作

一般的使用方式是利用一个列表页，用于展示已注册的内容

需要注意的是，该 API 并非直接缓存内容，实际的缓存需要利用 Cache Storage 等策略实施

介于该 API 依赖于 ServiceWorker，因此该 API 同样需在 Secure Context 下使用，且需遵循同源策略

通过 `ServiceWorkerRegistration.index` 暴露 `ContentIndex` 接口实例使用

## 添加离线内容

通过 `ContentIndex` 接口的 `add()` 方法添加离线内容

方法支持传入一组配置项

- 参数 `id` 指定离线内容的唯一标识符
- 参数 `url` 指定离线内容的 URL，需要与当前网页或脚本同源
- 参数 `title` 指定离线内容的标题
- 参数 `description` 指定离线内容的描述
- 可选参数 `icons` 指定离线内容的图标组，每组图标对象支持指定 `src` 参数和 可选的 `sizes` 及 `type` 参数，默认值是一个空数组
- 可选参数 `category` 指定离线内容的类别，可选的值为 `''`、`'homepage'`、`'article'`、`'video'`、`'audio'`，默认值是 `''`

方法返回一个 Promise 的 `undefined`

方法在以下情况下会抛出一个 `TypeError` 异常

- 当前 ContentIndex 对应的 ServiceWorker 未激活或 ServiceWorker 未包含 FetchEvent
- `id`、 `title`、 `description`、 `url` 参数未指定或参数类型不为字符串或参数为空串
- `icons` 参数某个 icon 的 URL 的类型不是图像或获取对应 icon 出现网络异常

```js
self.registration.index.add({
  id: 'post',
  url: '/posts/post.html',
  title: 'Post',
  description: 'Post Information',
  icons: [
    {
      src: '/media/dark.png',
      sizes: '128x128',
      type: 'image/png',
    },
  ],
  category: 'article',
})
```

## 获取离线内容

通过 `ContentIndex` 接口的 `getAll()` 方法获取离线内容

方法返回一个 Promise 的代表离线内容的数组，结构同 `ContentIndex.add()` 方法的配置项参数

```js
self.registration.index.getAll()
```

## 删除离线内容

通过 `ContentIndex` 接口的 `delete()` 方法删除离线内容

方法传入一个代表待删除的离线内容的 `id` 的字符串

方法返回一个 Promise 的 `undefined`

```js
self.registration.index.delete(id).then(() => (
  self.caches.open('v1').then((cache) => (
    cache.delete(e.id)
  ))
))
```

需要注意的是，调用该方法同时，需要手动从存储中移除对应的离线内容

此外，当离线内容被通过用户代理移除而非手动调用 `ContentIndex.delete()` 方法移除时，会在 ServiceWorker 全局触发 `contentdelete` 事件，并返回一个 `ContentIndexEvent` 事件

> `ContentIndexEvent` 事件继承自 `ExtendableEvent` 事件，其属性 `id` 反映了被删除的离线内容的 `id`

```js
self.addEventListener('contentdelete', (e) => {
  e.waitUntil(
    self.caches.open('v1').then((cache) => (
      cache.delete(e.id)
    ))
  )
})
```

通常利用该事件同步移除与待移除页面的相关的资源存储

## 相关接口

```ts
type ContentCategory = "" | "homepage" | "article" | "video" | "audio"

interface ContentDescription {
  id: string
  title: string
  description: string
  category?: ContentCategory
  icons?: ImageResource[];
  url: string
}

interface ContentIndex {
  add(description: ContentDescription): Promise<undefined>
  delete(id: string): Promise<undefined>
  getAll(): Promise<ContentDescription[]>
};
```
