---
title: Cookie Store API
date: 2023-11-09 23:09:33
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
uniqueId: '2023-11-09 15:09:33/Cookie Store API.html'
mathJax: false
---

Cookie Store API 提供了异步地管理 Cookie 的方式，同时允许在 ServiceWorker 中使用

在该 API 之前，使用 cookie 的方式是通过读写 `document.cookie` 属性，但其是单线程同步的，可能会阻碍事件循环；并且其无法在 ServiceWorker 中使用

## Cookie 的读写

Window 环境中通过 `Window` 接口的 `cookieStore` 属性使用

Window 环境中通过 `ServiceWorkerGlobalScope` 接口的 `cookieStore` 属性使用

```js
window.cookieStore
self.cookieStore
```

### 读取单条 Cookie

`CookieStore` 接口的 `get()` 方法用于获取单条 Cookie

方法接收一个字符串，代表 Cookie 的名称；或接收一个对象，其 `name` 参数与 `url` 参数均需指定

方法返回一个 Promise 的 `CookieListItem` 结构，代表匹配到的 Cookie 信息；反之返回 `undefined`

```js
const cookie = await window.cookieStore.get('cookie')
const cookie = await window.cookieStore.get({
  name: 'cookie',
  url: 'https://www.example.com',
})
```

### 读取多条 Cookie

`CookieStore` 接口的 `getAll()` 方法用于获取单条 Cookie

方法接收一个字符串，代表 Cookie 的名称；或接收一个对象，其 `name` 参数与 `url` 参数均需指定

方法返回一个 Promise 的 `CookieList` 结构，代表匹配到的所有 Cookie

```js
const cookies = await window.cookieStore.getAll('key')
const cookies = await window.cookieStore.getAll({
  name: 'key',
  url: 'https://www.example.com',
})
```

### 设置 Cookie

`CookieStore` 接口的 `set()` 方法用于设置 Cookie

方法可以接收两个字符串，分别代表 Cookie 的名称与值；亦可以接收一个配置项，各项如下所示：

* `name` 属性必需
* `value` 属性必需
* `expires` 属性可选，默认 `null`
* `domain` 属性可选，默认 `null`
* `path` 属性可选，默认 `"/"`
* `sameSite` 属性可选，默认 `"strict"`
* `partitioned` 属性可选，默认 `false`

方法返回一个 Promise

```js
await window.cookieStore.set('key', 'value')
await window.cookieStore.set({
  name: 'key',
  value: 'value',
  expires: null,
  domain: null,
  path: '/',
  sameSite: 'strict',
  partitioned: false,
})
```

### 移除 Cookie

`CookieStore` 接口的 `delete()` 方法用于移除 Cookie

方法接收一个字符串，代表 Cookie 的名称；或接收一个对象，其 `name` 参数必需指定；`path` 参数 `domain` 参数 `partitioned` 参数可选

方法返回一个 Promise

```js
await window.cookieStore.delete('key')
await window.cookieStore.delete({
  name: 'key',
  path: '/',
  domain: null,
  partitioned: false,
})
```

### Cookie 详细信息

`CookieList` 结构相当于 `CookieListItem` 结构的数组

`CookieListItem` 结构反映了 Cookie 的详细信息

`CookieListItem` 结构的 `name` 属性返回一个字符串，代表 Cookie 的名称

`CookieListItem` 结构的 `value` 属性返回一个字符串，代表 Cookie 的值

`CookieListItem` 结构的 `domain` 属性返回一个字符串，代表 Cookie 的域，该属性可能返回 `null`

`CookieListItem` 结构的 `path` 属性返回一个字符串，代表 Cookie 的路径

`CookieListItem` 结构的 `expires` 属性返回一个数字，代表 Cookie 的过期时间，该属性可能返回 `null`

`CookieListItem` 结构的 `secure` 属性返回一个布尔值，代表 Cookie 的严格上下文策略

`CookieListItem` 结构的 `sameSite` 属性返回一个字符串，代表 Cookie 的同域策略，为 `"strict"` `"lax"` `"none"` 之一

`CookieListItem` 结构的 `partitioned` 属性返回一个布尔值，代表 Cookie 的分区策略

## 监听 Cookie 变化

`CookieStore` 接口的 `change` 事件在任一 Cookie 变化时触发，返回一个 `CookieChangeEvent` 事件

`CookieChangeEvent` 接口的 `changed` 属性返回一个 `CookieListItem` 结构只读数组，表示被修改的 Cookie

`CookieChangeEvent` 接口的 `deleted` 属性返回一个 `CookieListItem` 结构只读数组，表示被移除的 Cookie

```js
window.cookieStore.addEventListener('change', (e) => {
  e.changed
  e.deleted
})
```

但该事件仅在 Window 环境中可用

## 订阅 Cookie 变化

ServiceWorker 中允许通过 `CookieStoreManager` 接口的方法动态控制 Cookie 变化的订阅

可通过 `ServiceWorkerRegistration` 接口的 `cookies` 属性获取到 `CookieStoreManager` 实例

```js
self.registration.cookies
```

### 获取订阅

`CookieStoreManager` 接口的 `getSubscriptions()` 方法用于获取当前所有的订阅

方法返回一个对象数组，数组各项包含 `name` 参数和 `url` 参数

```js
const subscriptions = await self.registration.cookies.getSubscriptions()
```

### 添加订阅

`CookieStoreManager` 接口的 `subscribe()` 方法用于添加订阅

方法传入一个对象数组参数，各项的 `name` 参数与 `url` 参数均需指定

方法返回一个 Promise

```js
self.registration.cookies.subscribe([
  {
    name: 'key',
    url: '/',
  },
])
```

### 移除订阅

`CookieStoreManager` 接口的 `unsubscribe()` 方法用于移除订阅

方法传入一个对象数组参数，各项的 `name` 参数与 `url` 参数均需指定

方法返回一个 Promise

```js
self.registration.cookies.unsubscribe([
  {
    name: 'key',
    url: '/',
  },
])
```

### 监听 Cookie 变化

`ServiceWorkerGlobalScope` 接口的 `cookiechange` 事件在订阅的 Cookie 发生变化时触发，返回一个  `ExtendableCookieChangeEvent` 事件

`ExtendableCookieChangeEvent` 接口的 `changed` 属性返回一个 `CookieListItem` 结构只读数组，表示被修改的 Cookie

`ExtendableCookieChangeEvent` 接口的 `deleted` 属性返回一个 `CookieListItem` 结构只读数组，表示被移除的 Cookie

```js
self.addEventListener('cookiechange', (e) => {
  e.changed
  e.deleted
})
```

## 示例

<div id="cookie-store" role="article">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <hr />

  <form>
    <label for="name">name</label>
    <input id="name" />
    <label for="value">value</label>
    <input id="value" />
    <button id="submit">submit</button>
  </form>

  <style>
    #cookie-store {
      gap: 25px;
      backdrop-filter: invert(100%);
    }
  </style>

  <script type="module">
    const generateRecordHTML = (cookie) => {
      const record = document.createElement('tr');
      const name = document.createElement('td');
      name.innerText = cookie.name;
      record.appendChild(name);
      const value = document.createElement('td');
      value.innerText = cookie.value;
      record.appendChild(value);
      const operation = document.createElement('td');
      operation.innerText = 'Delete';
      operation.addEventListener('click', () => {
        if (window.confirm('delete cookie')) {
          window.cookieStore.delete(cookie);
          list.removeChild(record);
        }
      });
      record.appendChild(operation);
      return record;
    };
    const list = document.querySelector('#cookie-store table tbody');
    const cookies = await window.cookieStore.getAll();
    const fragment = document.createDocumentFragment();
    for (const cookie of cookies) {
      fragment.appendChild(generateRecordHTML(cookie));
    }
    list.appendChild(fragment);
    const name = document.querySelector('#cookie-store #name');
    const value = document.querySelector('#cookie-store #value');
    const submit = document.querySelector('#cookie-store #submit');
    submit.addEventListener('click', () => {
      const cookie = {
        name: name.value,
        value: value.value,
      };
      window.cookieStore.set(cookie);
      list.appendChild(generateRecordHTML(cookie));
    });
  </script>
</div>

## 类型

```ts
interface CookieStore extends EventTarget {
  get(name: string): Promise<CookieListItem | undefined>
  get(options?: CookieStoreGetOptions): Promise<CookieListItem | undefined>

  getAll(name: string): Promise<CookieList>
  getAll(options?: CookieStoreGetOptions): Promise<CookieList>

  set(name: string, value: string): Promise<undefined>
  set(options: CookieInit): Promise<undefined>

  delete(name: string): Promise<undefined>
  delete(options: CookieStoreDeleteOptions): Promise<undefined>

  onchange: ((this: CookieStore, ev: CookieChangeEvent) => any) | null
}

interface CookieStoreGetOptions {
  name: string
  url: string
}

enum CookieSameSite {
  "strict",
  "lax",
  "none"
}

interface CookieInit {
  name: string
  value: string
  expires?: DOMHighResTimeStamp | null
  domain?: string | null
  path?: string
  sameSite?: CookieSameSite
  partitioned?: boolean
}

interface CookieStoreDeleteOptions {
  name: string
  domain?: string | null
  path?: string
  partitione?: boolean
}

interface CookieListItem {
  name: string
  value: string
  domain?: string
  path: string
  expires?: DOMHighResTimeStamp
  secure: boolean
  sameSite: CookieSameSite
  partitioned: boolean
}

type CookieList = Array<CookieListItem>

interface CookieStoreManager {
  subscribe(subscriptions: Array<CookieStoreGetOptions>): Promise<undefined>
  getSubscriptions(): Promise<Array<CookieStoreGetOptions>>
  unsubscribe(subscriptions: Array<CookieStoreGetOptions>): Promise<undefined>
}

interface ServiceWorkerRegistration {
  readonly cookies: CookieStoreManager
}

interface CookieChangeEvent extends Event {
  constructor(type: string, eventInitDict?: CookieChangeEventInit)
  readonly changed: ReadonlyArray<CookieListItem>
  readonly deleted: ReadonlyArray<CookieListItem>
}

interface CookieChangeEventInit extends EventInit {
  changed: CookieList
  deleted: CookieList
}

interface ExtendableCookieChangeEvent extends ExtendableEvent {
  constructor(type: string, eventInitDict?: ExtendableCookieChangeEventInit)
  readonly changed: ReadonlyArray<CookieListItem>
  readonly deleted: ReadonlyArray<CookieListItem>
}

interface ExtendableCookieChangeEventInit extends ExtendableEventInit {
  changed: CookieList
  deleted: CookieList
}

interface Window {
  readonly cookieStore: CookieStore
}

interface ServiceWorkerGlobalScope {
  readonly cookieStore: CookieStore

  oncookiechange: ((this: ServiceWorkerGlobalScope, ev: ExtendableCookieChangeEvent) => any) | null
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API>
* <https://wicg.github.io/cookie-store/>
