---
title: Window Management API
date: 2023-11-04 02:39:55
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
uniqueId: '2023-11-03 18:39:55/Window Management API.html'
mathJax: false
---

Window Management API 允许获取连接到设备的显示器的详细信息，并将窗口放置在指定的屏幕上

## 检测是否多屏

`Screen` 接口的 `isExtended` 属性指示当前用户设备是否支持多屏

被 `window-management` 权限策略禁止时，始终返回 `false`

```js
screen.isExtended
```

## 监测屏幕变化

`Screen` 接口的 `change` 事件在屏幕的参数变化时触发，返回一个 `Event` 事件，针对 `width` `height` `availWidth` `availHeight` `colorDepth` `orientation` 属性

`ScreenDetailed` 接口的 `change` 事件亦支持 `left` `top` `availLeft` `availTop` `devicePixelRatio` `label` `isPrimary` `isInternal` 属性

```js
screen.addEventListener('change', (e) => {
  //
})
```

## 获取屏幕信息

调用 `Window` 接口的 `getScreenDetails()` 方法获取用户端可用的所有

返回一个 Promise 的 `ScreenDetails` 实例

被 `window-management` 权限策略禁止或明确被用户拒绝授予 `window-management` 权限时，会抛出 `NotAllowedError` 异常

```js
const screenDetails = await window.getScreenDetails()
```

`ScreenDetails` 接口反映了所有设备可用的屏幕的信息，该接口继承自 `EventTarget` 接口

`ScreenDetails` 接口的 `currentScreen` 属性返回一个 `ScreenDetailed` 实例，代表当前浏览器窗口所在的屏幕

`ScreenDetails` 接口的 `screens` 属性返回一个 `ScreenDetailed` 实例数组，代表当前设备可用的屏幕

```js
const screens = screenDetails.screens
const current = screenDetails.currentScreen
```

`ScreenDetails` 接口的 `currentscreenchange` 事件在浏览器窗口移动至其他屏幕或当前屏幕的任意属性改变时触发，返回一个 `Event` 事件

`ScreenDetails` 接口的 `screenschange` 事件在当前设备可用的屏幕变化时触发，返回一个 `Event` 事件

```js
screenDetails.addEventListener('currentscreenchange', () => {
  current = screenDetails.currentScreen
})
screenDetails.addEventListener('screenschange', () => {
  screens = screenDetails.screens
})
```

`ScreenDetailed` 接口反映了单个设备可用的屏幕的信息，该接口继承自 `Screen` 接口

`ScreenDetailed` 接口的 `availLeft` 属性返回一个 number，代表可用屏幕区域的 x 坐标

`ScreenDetailed` 接口的 `availTop` 属性返回一个 number，代表可用屏幕区域的 y 坐标

`ScreenDetailed` 接口的 `devicePixelRatio` 属性返回一个 number，代表屏幕的 device pixel ratio（当前屏幕时，等价于 `window.devicePixelRatio`）

`ScreenDetailed` 接口的 `isInternal` 属性返回一个 boolean，指示是否为设备内部的屏幕

`ScreenDetailed` 接口的 `isPrimary` 属性返回一个 boolean，指示是否为操作系统的主屏幕

`ScreenDetailed` 接口的 `label` 属性返回一个 string，代表屏幕的描述性标签

`ScreenDetailed` 接口的 `left` 属性返回一个 number，代表总屏幕区域的 x 坐标

`ScreenDetailed` 接口的 `top` 属性返回一个 number，代表总屏幕区域的 y 坐标

## 指定屏幕打开窗口

调用 `Window` 接口的 `open()` 方法时，通过 `windowFeatures` 可选参数指定打开窗口的 `left` `top` `width` `height` 参数，从而实现指定屏幕打开窗口

```js
const left = screenDetails.currentScreen.availLeft
const top = screenDetails.currentScreen.availTop
const width = screenDetails.currentScreen.availWidth / 2
const height = screenDetails.currentScreen.availHeight / 2

window.open('about:blank', '_blank', `left=${left},top=${top},width=${width},height=${height}`)
```

## 指定屏幕放置全屏

`Element` 接口 `requestFullscreen()` 方法的配置项支持传入 `screen` 参数，指定将全屏的窗口放置至指定屏幕

```js
el.requestFullscreen({
  screen:
    screen.isExtended
    ? screenDetails.screens.filter(s => s !== screenDetails.currentScreen).at(0)
    : screenDetails.currentScreen,
})
```

## 权限策略

该 API 受 `window-management` 权限策略的限制（无论是通过 `Permissions-Policy` 响应头指定抑或是通过 `iframe` 元素的 `allow` 属性指定）

默认为 `self`，即允许在当前上下文或内嵌的其他同源上下文中使用

## 权限 API

该 API 调用需要用户授予 `window-management` 权限，可以调用 `Permission.query()` 方法检查用户是否已授予了该权限

## 类型

```ts
interface Screen extends EventTarget {
  readonly isExtended: boolean

  onchange: ((this: Screen, ev: Event) => any) | null
}

interface Window {
  getScreenDetails(): Promise<ScreenDetails>
}

interface ScreenDetails extends EventTarget {
  readonly screens: ScreenDetailed[]
  readonly currentScreen: ScreenDetailed

  onscreenschange: ((this: ScreenDetails, ev: Event) => any) | null
  oncurrentscreenchange: ((this: ScreenDetails, ev: Event) => any) | null
}

interface ScreenDetailed extends Screen {
  readonly availLeft: number
  readonly availTop: number
  readonly left: number
  readonly top: number
  readonly isPrimary: boolean
  readonly isInternal: boolean
  readonly devicePixelRatio: number
  readonly label: string
}

interface FullscreenOptions {
  screen: ScreenDetailed
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Window_Management_API>
* <https://w3c.github.io/window-management/>
