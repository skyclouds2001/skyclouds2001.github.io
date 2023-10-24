---
title: ServiceWorker V
date: 2023-08-31 23:47:47
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
uniqueId: '2023-08-31 23:47:47/ServiceWorker V.html'
mathJax: false
---

ServiceWorker 的缓存策略是基于 CacheStorage 实现的。

## CacheStorage

CacheStorage 提供了可由 ServiceWorker 或其他类型的 Worker 或 window 范围访问的所有命名缓存的主目录，同时负责维护字符串名称到相应 Cache 实例的映射。

可以通过 `self.caches` 访问全局的 CacheStorage 实例。

* CacheStorage 接口的 `open()` 方法根据指定的 cacheName 获取对应的 Cache 实例，返回一个 `Promise<Cache>`，表示对应的 Cache 实例。若对应的 Cache 实例不存在，则会创建新的 Cache 实例。

```js
const STORE_NAME = 'key'

self.caches.open(STORE_NAME).then((cache) => {
  // 返回一个 Cache 实例
  console.log('worker | cache', cache)
})
```

* CacheStorage 接口的 `has()` 方法根据指定的 cacheName 检测是否存在对应的 Cache 实例，返回一个 `Promise<boolean>`，表示是否存在对应的 Cache 实例。

```js
const STORE_NAME = 'key'

self.caches.has(STORE_NAME).then((has) => {
 // 返回一个 boolean
  console.log('worker | has cache', has)
})
```

* CacheStorage 接口的 `delete()` 方法根据指定的 cacheName 移除对应的 Cache 实例，返回一个 `Promise<boolean>`，表示是否存在对应的 Cache 实例并且已完成删除操作。

```js
const STORE_NAME = 'key'

self.caches.delete(STORE_NAME).then((deleted) => {
  // 返回一个 boolean
  console.log('worker | has deleted cache', deleted)
})
```

* CacheStorage 接口的 `keys()` 方法获取所有 Cache 实例的索引的列表，返回一个 `Promise<string[]>`。

```js
self.caches.keys().then((keys) => {
  // 返回一个 string[]
  console.log('worker | all caches keys', keys)
})
```

* CacheStorage 接口的 `match()` 方法根据给定的 Request 实例或 URL 实例或 URL 字符串确定存储中是否存在对应的 Response，若存在则返回一个 `Promise<Response>` ，反之则返回一个 `Promise<undefined>`。该方法支持传入一组配置项，cacheName 参数指定搜索目标 Cache 实例的索引，ignoreSearch 参数指定是否考虑 URL 中的查询字符串，ignoreMethod 参数指定是否匹配请求方法，ignoreVary 指定是否匹配 Vary 头。

```js
self.caches.match(
  '/cache',
  {
    ignoreSearch: false,
    ignoreMethod: false,
    ignoreVary: false,
  }
).then((data) => {
  // 返回一个 Response | undefined
  if (data) {
    console.log('worker | have resource', data)
  } else {
    console.log('worker | not have resource', data)
  }
})

self.caches.match(new URL('/cache'))

self.caches.match(new Request('/cache'))
```

## Cache

* Cache 接口的 `put()` 方法将键/值对存储到当前 Cache 实例中，键可以是一个代表 URL 的字符串、一个 URL 实例或一个 Request 实例，值是一个 Response 实例。该方法会覆盖与之匹配的键/值对。

```js
self.caches.open('key').then((cache) => {
  cache.put('/cache', new Response('cache'))
  cache.put(new URL('/cache'), new Response('cache'))
  cache.put(new Request('/cache'), new Response('cache'))
})
```

* Cache 接口的 `add()` 方法根据给定的 URL 获取响应并存储到当前 Cache 实例中，参数可以是一个代表 URL 的字符串、一个 URL 实例或一个 Request 实例。该方法会覆盖与之匹配的键/值对。
* Cache 接口的 `addAll()` 方法根据给定的 URL 列表获取响应并存储到当前 Cache 实例中，列表项可以是一个代表 URL 的字符串或一个 Request 实例。该方法会覆盖与之匹配的键/值对。

```js
self.caches.open('key').then((cache) => {
  cache.add('/cache')
  cache.add(new URL('/cache'))
  cache.add(new Request('/cache'))

  cache.addAll(['/cache', new Request('/cache')])
})
```

> 该方法可以视为 `put()` 方法的简化用法。
>
> `add()` 方法和 `addAll()` 方法会忽略非 200 状态码的响应，若仍需要存储响应，应当采用 `put()` 方法。
>
> `put()` 方法、`add()` 方法和 `addAll()` 方法的 URL 参数必须是 HTTP 或 HTTPS，否则会抛出 TypeError 错误。

* Cache 接口的 `match()` 方法根据给定的 URL 在当前 Cache 实例中检索首个关联的响应，参数可以是一个代表 URL 的字符串、一个 URL 实例或一个 Request 实例，此外还支持传入一组可选的配置项，若存在则返回一个 `Promise<Response>` ，反之则返回一个 `Promise<undefined>`。
* Cache 接口的 `matchAll()` 方法根据给定的 URL 在当前 Cache 实例中检索所有关联的响应，参数可以是一个代表 URL 的字符串、一个 URL 实例或一个 Request 实例，此外还支持传入一组可选的配置项，返回一个 `Promise<Response[]>`。

```js
self.caches.open('key').then((cache) => {
  cache.match(
  '/cache',
  {
    ignoreSearch: false,
    ignoreMethod: false,
    ignoreVary: false,
  }).then((response) => {
    console.log('worker | cache match', response)
  })
  cache.match(new URL('/cache')).then((response) => {
    console.log('worker | cache match', response)
  })
  cache.match(new Request('/cache')).then((response) => {
    console.log('worker | cache match', response)
  })

  cache.matchAll(
    '/cache',
    {
      ignoreSearch: false,
      ignoreMethod: false,
      ignoreVary: false,
    }
  ).then((responses) => {
    console.log('worker | caches match', responses)
  })
  cache.matchAll(new URL('/cache')).then((responses) => {
    console.log('worker | caches match', responses)
  })
  cache.matchAll(new Request('/cache')).then((responses) => {
    console.log('worker | caches match', responses)
  })
})
```

* Cache 接口的 `delete()` 方法从当前 Cache 实例中移除对应的响应。参数可以是一个代表 URL 的字符串、一个 URL 实例或一个 Request 实例，此外还支持传入一组可选的配置项。返回一个 `Promise<boolean>`，表示是否存在对应的响应并且已完成删除操作。

```js
self.caches.open('key').then((cache) => {
  cache.delete('/cache').then((success) => {
    console.log('worker | cache delete', success)
  })
  cache.delete(new URL('/cache')).then((success) => {
    console.log('worker | cache delete', success)
  })
  cache.delete(new Request('/cache')).then((success) => {
    console.log('worker | cache delete', success)
  })
})
```

* Cache 接口的 `keys()` 方法获取当前 Cache 实例的响应索引的列表，参数可以是一个代表 URL 的字符串、一个 URL 实例或一个 Request 实例，同时支持传入一组配置项，返回一个 `Promise<string[]>`。

```js
self.caches.open('key').then((cache) => {
  cache.keys().then((keys) => {
    console.log('worker | all keys in cache', keys)
  })
})
```

> `keys()` 方法的返回值按照插入的顺序返回。

## 缓存机制

ServiceWorker 的缓存策略是基于 ServiceWorker 环境全局 fetch 事件的，可以在 fetch 事件中监听请求，然后对请求进行拦截，最后返回自定义的响应

拦截请求并从缓存检索响应，若响应存在则直接返回缓存的响应，反之则发起请求获取响应，缓存获取到的响应再返回响应。

```js
self.addEventListener('fetch', (e) => {
  e.respondWith(
    self.caches
      .match(e.request, {
          cacheName: 'v2',
      })
      .then((response) => {
        if (response != null) {
          return response
        } else {
          return fetch(e.request.clone())
            .then((response) => {
              const res = response.clone()

              self.caches.open('v2').then((cache) => {
                cache.put(e.request, res)
              })

              return response
            })
            .catch(() => caches.match('/404'))
        }
      })
  )
})
```

在 install 阶段预先获取资源并进行缓存。

```js
self.addEventListener('install', (e) => {
  e.waitUntil(
    self.caches
      .open('v2')
      .then((cache) =>
        cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/main.js',
        ])
      )
  )
})
```

在 activate 阶段移除失效的 Cache 实例或失效的资源。

```js
self.addEventListener('activate', (e) => {
  const CACHES_NEED_MOVE = ['v1']

  e.waitUntil(
    self.caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (CACHES_NEED_MOVE.includes(key)) {
            return self.caches.delete(key)
          }
        })
      )
    )
  )
})
```

## 相关接口

```ts
interface Cache {
  add(request: RequestInfo | URL): Promise<void>;
  addAll(requests: RequestInfo[]): Promise<void>;
  delete(request: RequestInfo | URL, options?: CacheQueryOptions): Promise<boolean>;
  keys(request?: RequestInfo | URL, options?: CacheQueryOptions): Promise<ReadonlyArray<Request>>;
  match(request: RequestInfo | URL, options?: CacheQueryOptions): Promise<Response | undefined>;
  matchAll(request?: RequestInfo | URL, options?: CacheQueryOptions): Promise<ReadonlyArray<Response>>;
  put(request: RequestInfo | URL, response: Response): Promise<void>;
}

interface CacheStorage {
  delete(cacheName: string): Promise<boolean>;
  has(cacheName: string): Promise<boolean>;
  keys(): Promise<string[]>;
  match(request: RequestInfo | URL, options?: MultiCacheQueryOptions): Promise<Response | undefined>;
  open(cacheName: string): Promise<Cache>;
}

interface WindowOrWorkerGlobalScope {
  readonly caches: CacheStorage;
}

declare var caches: CacheStorage;
```

## 源码链接

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/cache-storage.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/cache-storage.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/cache-storage.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/cache-storage.js)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/fetch-cache.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/fetch-cache.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/fetch-cache.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/fetch-cache.js)
