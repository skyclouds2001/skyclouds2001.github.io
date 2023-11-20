---
title: Pointer Events
date: 2023-11-20 21:08:46
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
uniqueId: '2023-11-20 13:08:46/Pointer Events.html'
mathJax: false
---

Pointer Events 定义指针相关的一系列事件

旨在为 Mouse Events 和 Touch Events 在不同平台上提供统一的行为

## 指针事件列表

|        事件名称        | 事件类型         |                         事件目标                         | 事件是否冒泡 | 事件是否可取消 |                事件描述                |
|:------------------:|--------------|:----------------------------------------------------:|:------:|:-------:|:----------------------------------:|
|    pointerenter    | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   否    |    否    |            指针移入元素及其子元素             |
|    pointerleave    | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   否    |    否    |            指针移出元素及其子元素             |
|    pointerdown     | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    是    |              元素上按下指针               |
|    pointermove     | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    是    |              指针在元素内移动              |
|     pointerup      | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    是    |              元素上释放指针               |
|    pointerover     | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    是    |            指针移入元素及其子元素             |
|     pointerout     | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    是    |            指针移出元素及其子元素             |
|   pointercancel    | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    否    |              指针操作被取消               |
|  pointerrawupdate  | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    否    | 指针操作不触发 pointerdown 与 pointerup 事件 |
| gotpointercapture  | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    否    |              进入指针捕获模式              |
| lostpointercapture | PointerEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    否    |              离开指针捕获模式              |

其中 `pointerrawupdate` 事件仅限严格模式使用

## 指针事件

`PointerEvent` 接口表示一个指针事件

## 指针捕获

`Element` 接口的 `setPointerCapture()` 方法用于给指定的指针ID设置一个指针捕获

`Element` 接口的 `releasePointerCapture()` 方法用于给指定的指针ID释放一个指针捕获

`Element` 接口的 `hasPointerCapture()` 方法用于检测当前元素是否处于指定的指针ID下的指针捕获状态，返回一个 `boolean`

以上三个方法均接受一个 `number` 参数，代表指针 ID

## 触摸点数量

`Navigator` 接口的 `maxTouchPoints` 只读属性返回 `number`，代表设备能够同时支持的触摸点的最大数量

## 类型

```ts
interface Element {
  hasPointerCapture(pointerId: number): boolean
  releasePointerCapture(pointerId: number): void
  setPointerCapture(pointerId: number): void
}

interface GlobalEventHandlers {
  ongotpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onlostpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onpointercancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onpointerrawupdate: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
  onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null
}

interface Navigator {
  readonly maxTouchPoints: number
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events>
* <https://w3c.github.io/pointerevents/>
