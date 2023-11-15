---
title: UI Events
date: 2023-11-15 11:44:20
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
uniqueId: '2023-11-15 03:44:20/UI Events.html'
mathJax: false
---

UI Events 定义了与用户交互的事件

## 事件类型

|       事件类型       |       事件描述       |                                                                       事件列表                                                                       |
|:----------------:|:----------------:|:------------------------------------------------------------------------------------------------------------------------------------------------:|
|     UIEvent      | 作为其他用户交互事件的基类的事件 |                                                  load<br/>unload<br/>abort<br/>error<br/>select                                                  |
|    FocusEvent    |  涉及页面的聚焦和失焦的事件   |                                                     blur<br/>focus<br/>focusin<br/>focusout                                                      |
|    MouseEvent    |    涉及鼠标移动的事件     | mousedown<br/>mouseenter<br/>mouseleave<br/>mousemove<br/>mouseout<br/>mouseover<br/>mouseup<br/>auxclick<br/>click<br/>contextmenu<br/>dblclick |
|    WheelEvent    |    涉及鼠标滚动的事件     |                                                                      wheel                                                                       |
|    InputEvent    |     涉及输入的事件      |                                                              beforeinput<br/>input                                                               |
|  KeyboardEvent   |   涉及键盘敲击相关的事件    |                                                                keydown<br/>keyup                                                                 |
| CompositionEvent |    涉及组合输入的事件     |                                            compositionstart<br/>compositionupdate<br/>compositionend                                             |

## 事件列表

|       事件名称        |       事件类型       |          事件目标           | 事件是否冒泡 | 事件是否可取消 |        事件描述         |
|:-----------------:|:----------------:|:-----------------------:|:------:|:-------:|:-------------------:|
|       load        |     UIEvent      | Window Document Element |   否    |    否    | DOM 实现从环境中加载资源或依赖资源 |
|      unload       |     UIEvent      | Window Document Element |   否    |    否    | DOM 实现从环境中删除资源或依赖资源 |
|       abort       |     UIEvent      |     Window Element      |   否    |    否    |     用户代理加载资源被中止     |
|       error       |     UIEvent      |     Window Element      |   否    |    否    | 用户代理加载资源失败或解析执行资源失败 |
|      select       |     UIEvent      |         Element         |   是    |    否    |      用户选择一些文字       |
|       blur        |    FocusEvent    |     Window Element      |   否    |    否    |      事件目标失去焦点       |
|       focus       |    FocusEvent    |     Window Element      |   否    |    否    |      事件目标获得焦点       |
|      focusin      |    FocusEvent    |     Window Element      |   是    |    否    |      事件目标获得焦点       |
|     focusout      |    FocusEvent    |     Window Element      |   是    |    否    |      事件目标失去焦点       |
|     auxclick      |   PointerEvent   |         Element         |   是    |    是    |     按下并释放非主指针按钮     |
|       click       |   PointerEvent   |         Element         |   是    |    是    |     按下并释放主指针按钮      |
|    contextmenu    |   PointerEvent   |         Element         |   是    |    是    |     打开上下文菜单时触发      |
|     dblclick      |    MouseEvent    |         Element         |   是    |    是    |    两次按下并释放主指针按钮     |
|     mousedown     |    MouseEvent    |         Element         |   是    |    是    |      元素上按下指针按钮      |
|    mouseenter     |    MouseEvent    |         Element         |   否    |    否    |    指针按钮移入元素及其子元素    |
|    mouseleave     |    MouseEvent    |         Element         |   否    |    否    |    指针按钮移出元素及其子元素    |
|     mousemove     |    MouseEvent    |         Element         |   是    |    是    |     指针按钮在元素内移动      |
|     mouseout      |    MouseEvent    |         Element         |   是    |    是    |    指针按钮移出元素及其子元素    |
|     mouseover     |    MouseEvent    |         Element         |   是    |    是    |    指针按钮移入元素及其子元素    |
|      mouseup      |    MouseEvent    |         Element         |   是    |    是    |      元素上释放指针按钮      |
|       wheel       |    WheelEvent    |         Element         |   是    |    是    |       鼠标滚轮滚动        |
|    beforeinput    |    InputEvent    |         Element         |   是    |    是    |      DOM 将要更新       |
|       input       |    InputEvent    |         Element         |   是    |    否    |      DOM 已经更新       |
|      keydown      |  KeyboardEvent   |         Element         |   是    |    是    |       按下键盘按键        |
|       keyup       |  KeyboardEvent   |         Element         |   是    |    是    |       释放键盘按键        |
| compositionstart  | CompositionEvent |         Element         |   是    |    是    |       组合输入将开始       |
| compositionupdate | CompositionEvent |         Element         |   是    |    否    |        组合输入中        |
|  compositionend   | CompositionEvent |         Element         |   是    |    否    |       组合输入结束        |

## 事件顺序

### 聚焦事件顺序

聚焦 A 元素后聚焦 B 元素

focus A -> focusin A -> blur A -> focusout A -> focus B -> focusin B

### 鼠标事件顺序

指针设备移入 A 元素后移出

mouseover A -> mouseenter A -> mousemove A -> mouseout A -> mouseleave A

指针设备移入 A 元素后移入 B 元素后移出，其中 B 元素为 A 元素的子元素

mouseover A -> mouseenter A -> mousemove A -> mouseout A -> mouseover B -> mouseenter B -> mousemove B -> mouseout B -> mouseleave B -> mouseover A -> mousemove A -> mouseout A -> mouseleave A

指针设备移入 C 元素后移出，且 B 元素为 A 元素的子元素，C 元素为 B 元素的子元素，A 元素 B 元素 C 元素在空间上完全重叠

mouseover C -> mouseenter A -> mouseenter B -> mouseenter C -> mousemove C -> mouseout C -> mouseleave  -> mouseleave B -> mouseleave A

指针设备在元素上点击

mousedown {-> mousemove} -> mouseup -> click

指针设备在元素上双击

mousedown {-> mousemove} -> mouseup -> click {-> mousemove} -> mousedown {-> mousemove} -> mouseup -> click -> dblclick

### 输入事件顺序

用户输入

beforeinput -> input

### 键盘事件顺序

键盘按下按键

keydown {-> beforeinput} {-> input} -> keyup

键盘连续按下按键

keydown {-> beforeinput} {-> input} -> keydown {-> beforeinput} {-> input} -> ... -> keyup

### 组合输入顺序

组合输入

compositionstart -> compositionupdate -> compositionend

连续组合输入

compositionstart -> compositionupdate -> compositionupdate -> ... -> compositionend

### 键盘+组合输入顺序

keydown -> compositionstart -> compositionupdate -> keyup -> keydown -> compositionstart -> compositionupdate -> keyup -> ... -> keydown -> compositionend -> keyup

### 输入+组合输入顺序

beforeinput -> compositionupdate -> input -> compositionend

## 类型

```ts
interface UIEvent extends Event {
  readonly detail: number
  readonly view: Window | null
  /** @deprecated */
  readonly which: number
  /** @deprecated */
  initUIEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: Window | null, detailArg?: number): void
}

declare var UIEvent: {
  prototype: UIEvent
  new(type: string, eventInitDict?: UIEventInit): UIEvent
}

interface UIEventInit extends EventInit {
  detail?: number
  view?: Window | null
  /** @deprecated */
  which?: number
}

interface FocusEvent extends UIEvent {
  readonly relatedTarget: EventTarget | null
}

declare var FocusEvent: {
  prototype: FocusEvent
  new(type: string, eventInitDict?: FocusEventInit): FocusEvent
}

interface FocusEventInit extends UIEventInit {
  relatedTarget?: EventTarget | null
}

interface MouseEvent extends UIEvent {
  readonly altKey: boolean
  readonly button: number
  readonly buttons: number
  readonly clientX: number
  readonly clientY: number
  readonly ctrlKey: boolean
  readonly metaKey: boolean
  readonly movementX: number
  readonly movementY: number
  readonly offsetX: number
  readonly offsetY: number
  readonly pageX: number
  readonly pageY: number
  readonly relatedTarget: EventTarget | null
  readonly screenX: number
  readonly screenY: number
  readonly shiftKey: boolean
  readonly x: number
  readonly y: number
  getModifierState(keyArg: string): boolean
  /** @deprecated */
  initMouseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null): void
}

declare var MouseEvent: {
  prototype: MouseEvent
  new(type: string, eventInitDict?: MouseEventInit): MouseEvent
}

interface MouseEventInit extends EventModifierInit {
  button?: number
  buttons?: number
  clientX?: number
  clientY?: number
  movementX?: number
  movementY?: number
  relatedTarget?: EventTarget | null
  screenX?: number
  screenY?: number
}

interface EventModifierInit extends UIEventInit {
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  modifierAltGraph?: boolean
  modifierCapsLock?: boolean
  modifierFn?: boolean
  modifierFnLock?: boolean
  modifierHyper?: boolean
  modifierNumLock?: boolean
  modifierScrollLock?: boolean
  modifierSuper?: boolean
  modifierSymbol?: boolean
  modifierSymbolLock?: boolean
  shiftKey?: boolean
}

interface WheelEvent extends MouseEvent {
  readonly deltaMode: number
  readonly deltaX: number
  readonly deltaY: number
  readonly deltaZ: number
  readonly DOM_DELTA_PIXEL: 0x00
  readonly DOM_DELTA_LINE: 0x01
  readonly DOM_DELTA_PAGE: 0x02
}

declare var WheelEvent: {
  prototype: WheelEvent
  new(type: string, eventInitDict?: WheelEventInit): WheelEvent
  readonly DOM_DELTA_PIXEL: 0x00
  readonly DOM_DELTA_LINE: 0x01
  readonly DOM_DELTA_PAGE: 0x02
}

interface WheelEventInit extends MouseEventInit {
  deltaMode?: number
  deltaX?: number
  deltaY?: number
  deltaZ?: number
}

interface InputEvent extends UIEvent {
  readonly data: string | null
  readonly dataTransfer: DataTransfer | null
  readonly inputType: string
  readonly isComposing: boolean
  getTargetRanges(): StaticRange[]
}

declare var InputEvent: {
  prototype: InputEvent
  new(type: string, eventInitDict?: InputEventInit): InputEvent
}

interface InputEventInit extends UIEventInit {
  data?: string | null
  dataTransfer?: DataTransfer | null
  inputType?: string
  isComposing?: boolean
  targetRanges?: StaticRange[]
}

interface KeyboardEvent extends UIEvent {
  readonly altKey: boolean
  /** @deprecated */
  readonly charCode: number
  readonly code: string
  readonly ctrlKey: boolean
  readonly isComposing: boolean
  readonly key: string
  /** @deprecated */
  readonly keyCode: number
  readonly location: number
  readonly metaKey: boolean
  readonly repeat: boolean
  readonly shiftKey: boolean
  getModifierState(keyArg: string): boolean
  /** @deprecated */
  initKeyboardEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: Window | null, keyArg?: string, locationArg?: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, metaKey?: boolean): void
  readonly DOM_KEY_LOCATION_STANDARD: 0x00
  readonly DOM_KEY_LOCATION_LEFT: 0x01
  readonly DOM_KEY_LOCATION_RIGHT: 0x02
  readonly DOM_KEY_LOCATION_NUMPAD: 0x03
}

declare var KeyboardEvent: {
  prototype: KeyboardEvent
  new(type: string, eventInitDict?: KeyboardEventInit): KeyboardEvent
  readonly DOM_KEY_LOCATION_STANDARD: 0x00
  readonly DOM_KEY_LOCATION_LEFT: 0x01
  readonly DOM_KEY_LOCATION_RIGHT: 0x02
  readonly DOM_KEY_LOCATION_NUMPAD: 0x03
}

interface KeyboardEventInit extends EventModifierInit {
  /** @deprecated */
  charCode?: number
  code?: string
  isComposing?: boolean
  key?: string
  /** @deprecated */
  keyCode?: number
  location?: number
  repeat?: boolean
}

interface CompositionEvent extends UIEvent {
  readonly data: string
  /** @deprecated */
  initCompositionEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: WindowProxy | null, dataArg?: string): void
}

declare var CompositionEvent: {
  prototype: CompositionEvent
  new(type: string, eventInitDict?: CompositionEventInit): CompositionEvent
}

interface CompositionEventInit extends UIEventInit {
  data?: string
}

interface MutationEvent extends Event {
  /** @deprecated */
  readonly attrChange: number
  /** @deprecated */
  readonly attrName: string
  /** @deprecated */
  readonly newValue: string
  /** @deprecated */
  readonly prevValue: string
  /** @deprecated */
  readonly relatedNode: Node | null
  /** @deprecated */
  initMutationEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, relatedNodeArg?: Node | null, prevValueArg?: string, newValueArg?: string, attrNameArg?: string, attrChangeArg?: number): void
  readonly MODIFICATION: 1
  readonly ADDITION: 2
  readonly REMOVAL: 3
}

/** @deprecated */
declare var MutationEvent: {
  prototype: MutationEvent
  new(): MutationEvent
  readonly MODIFICATION: 1
  readonly ADDITION: 2
  readonly REMOVAL: 3
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/UI_Events>
* <https://w3c.github.io/uievents/>
