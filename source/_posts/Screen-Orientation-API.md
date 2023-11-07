---
title: Screen Orientation API
date: 2023-11-07 22:15:33
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
uniqueId: '2023-11-07 14:15:33/Screen Orientation API.html'
mathJax: false
---

Screen Orientation API 允许获取屏幕朝向信息和监听屏幕朝向信息变化

该 API 通过 `ScreenOrientation` 接口提供服务，并通过 `window.screen.orientation` 暴露该接口的实例

## 获取屏幕朝向信息

`ScreenOrientation` 接口的 `type` 只读属性返回一个字符串，表示当前屏幕朝向的类型，值为 `portrait-primary` `portrait-secondary` `landscape-primary` `landscape-secondary` 之一

`ScreenOrientation` 接口的 `angel` 只读属性返回一个数字，表示当前屏幕朝向的角度

## 监听屏幕朝向信息变化

`ScreenOrientation` 接口的 `change` 事件在当前屏幕朝向变化时触发，返回一个 `Event`

## 锁定屏幕朝向信息变化

`ScreenOrientation` 接口的 `lock()` 方法锁定系统默认的屏幕朝向变化

方法传入一个字符串参数，代表锁定的类型，值可以为 `any` `landscape` `landscape-primary` `landscape-secondary` `natural` `portrait` `portrait-primary` `portrait-secondary` 之一

方法返回一个 Promise

```js
await window.screen.orientation.lock('any')
```

`ScreenOrientation` 接口的 `unlock()` 方法解除锁定系统默认的屏幕朝向变化

```js
window.screen.orientation.unlock()
```

## 沙箱策略

该 API 在 `<iframe>` 标签中的调用受到 `allow-orientation-lock` 沙箱策略的控制，需要将 `sandbox` 的属性指定为允许

## 类型

```ts
interface Screen {
  readonly orientation: ScreenOrientation
}

interface ScreenOrientation extends EventTarget {
  readonly angle: number
  readonly type: OrientationType
  onchange: ((this: ScreenOrientation, ev: Event) => any) | null
  lock(orientation: OrientationLockType): Promise<void>
  unlock(): void
}

type OrientationLockType = "any" | "landscape" | "landscape-primary" | "landscape-secondary" | "natural" | "portrait" | "portrait-primary" | "portrait-secondary"

type OrientationType = "landscape-primary" | "landscape-secondary" | "portrait-primary" | "portrait-secondary"
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Screen_Orientation_API>
* <https://w3c.github.io/screen-orientation/>
