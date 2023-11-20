---
title: Touch Events
date: 2023-11-20 14:32:58
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
uniqueId: '2023-11-20 06:32:58/Touch Events.html'
mathJax: false
---

Touch Events 定义与用户触摸交互的事件

## 触摸事件列表

|    事件名称     | 事件类型       |                         事件目标                         | 事件是否冒泡 | 事件是否可取消 |     事件描述      |
|:-----------:|------------|:----------------------------------------------------:|:------:|:-------:|:-------------:|
| touchstart  | TouchEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |  视情况而定  |  触摸点放置到触摸面上   |
|  touchmove  | TouchEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |  视情况而定  |  触摸点在触摸面上移动   |
|  touchend   | TouchEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |  视情况而定  |  触摸点从触摸板上移除   |
| touchcancel | TouchEvent | Window,Document,HTMLElement,SVGElement,MathMLElement |   是    |    否    | 触摸行为被特定于实现被中断 |

## 触摸事件

`TouchEvent` 接口表示一个触摸事件

`TouchList` 接口表示一组触摸点

`Touch` 接口表示单个触摸点

## 类型

```ts
interface GlobalEventHandlers {
  ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined
  ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined
  ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined
  ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined
}

interface Touch {
  readonly clientX: number
  readonly clientY: number
  readonly force: number
  readonly identifier: number
  readonly pageX: number
  readonly pageY: number
  readonly radiusX: number
  readonly radiusY: number
  readonly rotationAngle: number
  readonly screenX: number
  readonly screenY: number
  readonly target: EventTarget
}

declare var Touch: {
  prototype: Touch
  new(touchInitDict: TouchInit): Touch
}

interface TouchInit {
  altitudeAngle?: number
  azimuthAngle?: number
  clientX?: number
  clientY?: number
  force?: number
  identifier: number
  pageX?: number
  pageY?: number
  radiusX?: number
  radiusY?: number
  rotationAngle?: number
  screenX?: number
  screenY?: number
  target: EventTarget
  touchType?: TouchType
}

interface TouchEvent extends UIEvent {
  readonly altKey: boolean
  readonly changedTouches: TouchList
  readonly ctrlKey: boolean
  readonly metaKey: boolean
  readonly shiftKey: boolean
  readonly targetTouches: TouchList
  readonly touches: TouchList
}

declare var TouchEvent: {
  prototype: TouchEvent
  new(type: string, eventInitDict?: TouchEventInit): TouchEvent
}

interface TouchEventInit extends EventModifierInit {
  changedTouches?: Touch[]
  targetTouches?: Touch[]
  touches?: Touch[]
}

interface TouchList {
  readonly length: number
  item(index: number): Touch | null
  [index: number]: Touch
}

declare var TouchList: {
  prototype: TouchList
}

type TouchType = 'direct' | 'stylus'
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Touch_events>
* <https://w3c.github.io/touch-events/>
