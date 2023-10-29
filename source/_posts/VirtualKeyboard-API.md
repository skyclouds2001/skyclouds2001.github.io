---
title: VirtualKeyboard API
date: 2023-10-29 14:13:52
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
uniqueId: '2023-10-29 06:13:52/VirtualKeyboard API.html'
mathJax: false
---

VirtualKeyboard API 允许控制设备的虚拟键盘的几何信息和展示及隐藏（特别是针对平板、智能手机等无法提供机械键盘的设备）

通过 `navigator.virtualKeyboard` 暴露的 `VirtualKeyboard` 接口实例使用

## 虚拟键盘展示隐藏

`VirtualKeyboard` 接口的 `show()` 方法展示虚拟键盘

`VirtualKeyboard` 接口的 `hide()` 方法隐藏虚拟键盘

`VirtualKeyboard` 接口的 `geometrychange` 事件在虚拟键盘的可见性变化或浏览器窗口重定位时触发，返回一个 `Event` 事件，通常使用该事件来监听具体虚拟键盘的可见性的时机

```js
navigator.virtualKeyboard.show()

navigator.virtualKeyboard.hide()

navigator.virtualKeyboard.addEventListener('geometrychange', (e) => {
    //
})
```

需要在因为用户交互产生的行为中调用

需要当前聚焦元素的 `virtualkeyboardpolicy` 属性指定为 `manual` 或 `inputmode` 指定为除 `none` 之外的其他值

其中 `show()` 方法额外需要当前聚焦的元素为表单元素或者当前聚焦元素需要指定 `contenteditable` 属性为 `true`

## 虚拟键盘几何位置信息

`VirtualKeyboard` 接口的 `boundingRect` 只读属性给出虚拟键盘的几何位置信息，返回一个 `DOMRect`，默认值均设置为 `0`

```js
navigator.virtualKeyboard.boundingRect
```

同时 CSS 环境变量 `keyboard-inset-top` `keyboard-inset-right` `keyboard-inset-bottom` `keyboard-inset-left` `keyboard-inset-width` `keyboard-inset-height` 可以通过 `env()` CSS 函数使用

```css
env(keyboard-inset-top)
env(keyboard-inset-right)
env(keyboard-inset-bottom)
env(keyboard-inset-left)
env(keyboard-inset-width)
env(keyboard-inset-height)
```

## 管理虚拟键盘几何位置

`VirtualKeyboard` 接口的 `overlaysContent` 属性用于指定虚拟键盘的几何位置策略，返回一个 boolean，默认 `false`

```js
navigator.virtualKeyboard.overlaysContent
```

将该值设定为 `true` 以阻止浏览器默认的虚拟键盘调度策略，从而允许利用相关的 API 属性方法和 CSS 环境变量自定义地调整网页的布局

## 指定元素的虚拟键盘策略

全局 `virtualkeyboardpolicy` 属性用于指定特定元素的虚拟键盘策略，默认为空字符串

指定为空字符串或 `auto` 表示使用默认的虚拟键盘策略

指定为 `manual` 表示阻止使用默认的虚拟键盘策略

## 接口

```ts
interface ElementContentEditable {
  virtualKeyboardPolicy: '' | 'auto' | 'manual'
}

interface VirtualKeyboard extends EventTarget {
  show(): void
  hide(): void
  readonly boundingRect: DOMRect
  overlaysContent: boolean
  ongeometrychange: ((this: VirtualKeyboard, ev: Event) => any) | null
}

interface Navigator {
  readonly virtualKeyboard: VirtualKeyboard
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/VirtualKeyboard_API>
* <https://w3c.github.io/virtual-keyboard/>
