---
title: Window Controls Overlay API
date: 2023-10-03 03:44:41
tags:
  - Frontend
  - Web API
categories:
  - Frontend
  - Web API
toc: true
thumbnail: 
cover: 
recommend: 1
keywords: 
uniqueId: '2023-10-02 19:44:41/Window Controls Overlay API.html'
mathJax: false
---

Window Controls Overlay API 给 PWA 应用提供了管理默认系统的应用标题栏的能力，允许应用完全掌控应用窗口的区域，不过仅支持 PC 端 PWA 应用

该 API 通过 `WindowControlsOverlay` 接口提供了相关功能，并通过 `navigator.windowControlsOverlay` 对外暴露该接口实例

使用该 API 需要在 PWA 应用的 Manifest 文件的 `display_override` 选项指定 `window-controls-overlay`

{% asset_img info.png %}

## `WindowControlsOverlay` 的信息

`WindowControlsOverlay` 接口的 `visible` 只读属性表示了应用标题栏的可见性

`WindowControlsOverlay` 接口的 `getTitlebarAreaRect()` 方法返回了应用标题栏的几何信息，方法返回一个 `DOMRect` 接口实例

`WindowControlsOverlay` 接口的 `geometrychange` 事件在应用标题栏的可见性和几何信息变化时触发，事件返回一个 `WindowControlsOverlayGeometryChangeEvent` 事件实例

```js
navigator.windowControlsOverlay.addEventListener('geometrychange', (e) => {
  const { visible, titlebarAreaRect: rect } = e

  if (visible) {
    console.log('visible')

    console.log('rect info', rect)
  } else {
    console.log('not visible')
  }
})
```

## 相关的 CSS 环境变量

* `titlebar-area-x` 应用标题栏左上角横坐标

* `titlebar-area-y` 应用标题栏左上角纵坐标

* `titlebar-area-width` 应用标题栏宽度

* `titlebar-area-height` 应用标题栏高度

可以通过 `env()` CSS 函数使用 CSS 环境变量

```css
env(titlebar-area-x)
env(titlebar-area-y)
env(titlebar-area-width)
env(titlebar-area-height)
```

## 示例

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/PWA-eg](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/PWA-eg)

## 类型

```ts
interface Navigator {
  readonly windowControlsOverlay: WindowControlsOverlay
}

interface WindowControlsOverlay extends EventTarget {
  readonly visible: boolean
  getTitlebarAreaRect(): DOMRect
  ongeometrychange: ((this: WindowControlsOverlay, ev: WindowControlsOverlayGeometryChangeEvent) => any) | null
}

interface WindowControlsOverlayGeometryChangeEvent extends Event {
  readonly titlebarAreaRect: DOMRect
  readonly visible: boolean
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API>
* <https://wicg.github.io/window-controls-overlay/>
