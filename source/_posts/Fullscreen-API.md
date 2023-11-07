---
title: Fullscreen API
date: 2023-10-25 19:28:58
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
uniqueId: '2023-10-25 11:28:58/Fullscreen API.html'
mathJax: false
---

Fullscreen API 允许某个特定的元素管理全屏模式

## 启用全屏模式

通过调用 `Element` 接口上的 `requestFullscreen()` 方法以启用全屏模式

方法传入一个可选的配置项，其唯一 `navigationUI` 可选参数控制是否展示 navigation UI，值为 `"auto"` `"show"` `"hide"` 之一，默认值为 `"auto"`

方法返回一个 Promise

方法可能抛出 `TypeError` 异常，如当前文档并非处于活跃状态、当前元素未处于文档中、当前元素不允许使用全屏模式、当前元素是一个激活的 popover 元素、当前元素是 `<dialog>` 元素、当前元素不是 `HTML` `SVG` `MathML` 元素等等

```js
element.requestFullscreen()
```

## 停止全屏模式

通过调用 `Document` 接口上的 `exitFullscreen()` 方法以停止全屏模式

方法返回一个 Promise

```js
document.exitFullscreen()
```

## 全屏模式信息

`Document` 接口上的 `fullscreenEnabled` 属性反映了全屏模式是否可用，返回 `boolean` 值

`Document` 接口或 `ShadowRoot` 接口上的 `fullscreenElement` 属性反映了当前处于全屏模式的元素，返回 `Element` 值或 `null` 值

`Document` 接口或 `Element` 接口上的 `fullscreenchange` 事件在文档或元素的全屏状态改变时触发，返回一个 `Event` 事件

`Document` 接口或 `Element` 接口上的 `fullscreenerror` 事件在文档或元素的全屏状态改变失败时触发，返回一个 `Event` 事件

> 通常，监听 Web 程序内的全屏状态改变，通过监听 `Document` 接口上的即可，文档内元素的相应事件会冒泡至文档

## 权限策略

该 API 调用受到 `fullscreen` 权限策略的控制，可以通过 `Permissions-Policy` 响应头指定，或通过 `<iframe>` 标签的 `allow` 属性指定

默认为 `self`，即允许在当前上下文或内嵌的其他同源上下文中使用

## 类型

```ts
interface Document {
  readonly fullscreenElement: Element | null
  readonly fullscreenEnabled: boolean
  exitFullscreen(): Promise<void>
  onfullscreenchange: ((this: Document, ev: Event) => any) | null
  onfullscreenerror: ((this: Document, ev: Event) => any) | null
}

interface ShadowRoot {
  readonly fullscreenElement: Element | null
}

interface Element {
  requestFullscreen(options?: FullscreenOptions): Promise<void>
  onfullscreenchange: ((this: Element, ev: Event) => any) | null
  onfullscreenerror: ((this: Element, ev: Event) => any) | null
}

interface FullscreenOptions {
  navigationUI?: FullscreenNavigationUI
}

type FullscreenNavigationUI = 'auto' | 'hide' | 'show'
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API>
* <https://fullscreen.spec.whatwg.org/>
