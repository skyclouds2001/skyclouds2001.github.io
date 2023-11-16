---
title: Page Visibility API
date: 2023-11-16 15:36:03
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
uniqueId: '2023-11-16 07:36:03/Page Visibility API.html'
mathJax: false
---

Page Visibility API 用于反馈当前文档的可见性

## 读取可见性

`Document` 接口的 `visibilityState` 属性返回一个 `string`，代表当前文档的可见性，值为 `visible` 或 `hidden`

`Document` 接口的 `hidden` 属性返回一个 `boolean`，代表当前文档是否隐藏

```js
document.hidden
document.visibilityState
```

## 监视可见性改变

`Document` 接口的 `visibilitychange` 事件在当前文档的可见性改变时触发，返回一个 `Event`

```js
document.addEventListener('visibilitychange', () => {
  //
})
```

## 类型

```ts
interface Document {
  readonly hidden: boolean
  readonly visibilityState: DocumentVisibilityState
  onvisibilitychange: ((this: Document, ev: Event) => any) | null
}

type DocumentVisibilityState = 'hidden' | 'visible'
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API>
* <https://html.spec.whatwg.org/multipage/interaction.html#page-visibility>
