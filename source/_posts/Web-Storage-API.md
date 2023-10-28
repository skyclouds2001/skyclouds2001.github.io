---
title: Web Storage API
date: 2023-10-21 15:56:34
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
uniqueId: '2023-10-21 07:56:34/Web Storage API.html'
mathJax: false
---

Web Storage API 可用于保存键值对形式的数据，包括 localStorage 和 sessionStorage 两种，键值对均要求为字符串（非字符串类型数据会隐式转换为字符串）

sessionStorage 会话存储的数据仅在当前会话中有效，若关闭标签页或浏览器则会失效

localStorage 本地存储的数据长期有效

Web Storage API 同样受同源策略限制，不同源的 Storage 无法共享

## Storage 的获取

通过 `window.sessionStorage` 访问会话存储对应的 `Storage` 实例

通过 `window.localStorage` 访问本地存储对应的 `Storage` 实例

## Storage 的操作

`Storage` 接口提供了一些对会话存储或本地存储的操作方法

### 读取键值对

`Storage` 接口的 `getItem()` 方法用于获取指定键名对应的键值，若数据不存在则返回 `null`

```js
window.localStorage.getItem('k')
```

### 设置键值对

`Storage` 接口的 `setItem()` 方法用于设置键值对

```js
window.localStorage.setItem('k', 'v')
```

### 清除键值对

`Storage` 接口的 `removeItem()` 方法用于移除指定键名对应的键值

```js
window.localStorage.removeItem('k')
```

### 清空存储

`Storage` 接口的 `clear()` 方法用于清除整个存储

```js
window.localStorage.clear()
```

### 其他

`Storage` 接口的 `length` 属性返回存储的长度

`Storage` 接口支持直接使用键名索引来获取或设置对应的键值，支持直接使用 `delete` 关键字移除对应的键值

`Storage` 接口的 `key()` 方法用于获取指定索引的值，索引的顺序是由浏览器决定的，因此该顺序是不可靠的，若数据不存在则返回 `null`

```js
window.localStorage.length
window.localStorage.k
window.localStorage['k']
window.localStorage.k = 'v'
window.localStorage['k'] = 'v'
delete window.localStorage.k
delete window.localStorage['k']
window.localStorage.key(0)
```

## 存储更改

会话存储或本地存储的更改会在与之同域的会话中触发全局 `Window` 的 `storage` 事件，并返回一个 `StorageEvent` 事件

`StorageEvent` 事件的 `storageArea` 属性返回存储变化的 `Storage` 实例

`StorageEvent` 事件的 `url` 属性返回存储变化的文档的 URL

`StorageEvent` 事件的 `key` 属性返回存储变化的键名

`StorageEvent` 事件的 `oldValue` 属性返回存储变化的原键值或 `null`

`StorageEvent` 事件的 `newValue` 属性返回存储变化的现键值或 `null`

```js
window.addEventListener('storage', (e) => {
  console.log(e.key)
  console.log(e.oldValue)
  console.log(e.newValue)
  console.log(e.url)
  console.log(e.storageArea)
})
```

## 类型

```ts
interface Window {
  readonly localStorage: Storage
  readonly sessionStorage: Storage
  onstorage: ((this: WindowEventHandlers, ev: StorageEvent) => any) | null
}

interface Storage {
  readonly length: number
  clear(): void
  getItem(key: string): string | null
  key(index: number): string | null
  removeItem(key: string): void
  setItem(key: string, value: string): void
  [name: string]: any
}

interface StorageEvent extends Event {
  readonly key: string | null
  readonly newValue: string | null
  readonly oldValue: string | null
  readonly storageArea: Storage | null
  readonly url: string
  initStorageEvent(type: string, bubbles?: boolean, cancelable?: boolean, key?: string | null, oldValue?: string | null, newValue?: string | null, url?: string | URL, storageArea?: Storage | null): void
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API>
* <https://html.spec.whatwg.org/multipage/webstorage.html>
