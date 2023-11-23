---
title: History API
date: 2023-11-23 15:15:19
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
uniqueId: '2023-11-23 07:15:19/History API.html'
mathJax: false
---

History API 提供了管理浏览会话历史记录的方式

通过 `window.history` 暴露的 `History` 接口实例使用

## 浏览会话历史记录前进后退

`History` 接口的 `back()` 方法使浏览会话历史记录后退一条

`History` 接口的 `forward()` 方法使浏览会话历史记录前进一条

```js
history.back()
history.forward()
```

## 浏览会话历史记录指定跳转

`History` 接口的 `go()` 方法使浏览会话历史记录前进或后退指定数量的记录

传递正数则前进，传递负数则后退

特别的，传递 `1` 等价于调用 `history.forward()`，传递 `-1` 等价于调用 `history.back()`，传递 `0` 或不传递参数等价于调用 `location.reload()`

```js
history.go(-1)
history.go(1)
history.go(0)
history.go()
```

## 浏览会话历史记录信息

`History` 接口的 `length` 只读属性指定当前浏览会话历史记录的数量

```js
history.length
```

`History` 接口的 `scrollRestoration` 属性读取或设置浏览会话历史记录默认的导航恢复滚动行为

值 `auto` 代表会存储滚动位置，恢复后会自动滚动到存储的位置

值 `manual` 代表不会存储滚动位置，恢复后不会自动滚动到存储的位置

```js
history.scrollRestoration
```

## 浏览会话历史记录数据

`History` 接口的 `state` 只读属性反映当前浏览会话历史记录对应的数据，初始为 `null` 直至调用 `pushState()` 方法或 `replaceState()` 方法修改

`History` 接口的 `pushState()` 方法向浏览会话历史记录中添加一条历史记录，并更新数据与 URL

`History` 接口的 `replaceState()` 方法在浏览会话历史记录中替换当前历史记录，并更新数据与 URL

两方法接收一个 `state` 参数，可以为任意可序列化的对象或 null，代表与对应的浏览会话历史记录相关的数据

两方法接收一个 `unused` 参数，因历史原因保留但不再使用，建议传递一个空字符串

两方法接收一个可选的 `url` 参数，代表与对应的浏览会话历史记录的 URL，受同源策略限制

## 监听浏览会话历史记录变化

`Window` 接口的 `popstate` 事件在浏览会话历史记录变化时触发，返回一个 `PopStateEvent` 事件

可通过 `PopStateEvent` 事件的 `state` 参数读取对应浏览会话历史记录的数据

## 类型

```ts
interface History {
  readonly length: number
  scrollRestoration: ScrollRestoration
  readonly state: any
  back(): void
  forward(): void
  go(delta?: number): void
  pushState(data: any, unused: string, url?: string | URL | null): void
  replaceState(data: any, unused: string, url?: string | URL | null): void
}

declare var History: {
  prototype: History
}

type ScrollRestoration = "auto" | "manual"
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/History_API>
* <https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-history-interface>
