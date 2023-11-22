---
title: Pointer Lock API
date: 2023-10-24 16:39:54
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
uniqueId: '2023-10-24 08:39:54/Pointer Lock API.html'
mathJax: false
---

Pointer Lock API 允许控制鼠标的输入形式，将鼠标的移动从光标位置移动转换为自定义的形式（同时隐藏光标）

指针锁定与鼠标捕获比较类似，但其是持久的，即不会自动释放鼠标；并且其不受浏览器边界的限制；最大特点是，其会隐藏光标

## 启用指针锁定

通过调用对应 `Element` 接口上的 `requestPointerLock()` 方法以启用指针锁定

方法默认无参数，新提案支持传入一组配置项，唯一参数 `unadjustedMovement` 指定是否启用操作系统级别的鼠标位置适配，目前为部分浏览器支持

方法默认无返回值，但新提案支持返回 Promise，目前为部分浏览器支持

方法调用要求存在用户交互且为活跃文档，并且不允许连续调用该方法，并且 `<iframe>` 标签中的调用需要设置允许 `allow-pointer-lock` 沙箱策略并且除 该`<iframe>` 标签之外的其他 `<iframe>` 标签必须未处于指针调用状态，否则调用会失败

```js
el.requestPointerLock()
```

## 停止指针锁定

通过调用 `Document` 接口上的 `exitPointerLock()` 方法以停止指针锁定

```js
document.exitPointerLock()
```

## 指针锁定信息

`Document` 接口或 `ShadowRoot` 接口的 `pointerLockElement` 属性返回当前启用指针锁定的元素，若不存在则返回 `null`

`Document` 接口的 `pointerlockchange` 事件在指针锁定状态改变时触发，返回一个 `Event` 事件

`Document` 接口的 `pointerlockerror` 事件在指针锁定状态改变失败时触发，返回一个 `Event` 事件'

`MouseEvent` 接口的 `movementX` 属性与 `movementY` 属性仅在 `mousemove` 事件中可用，反映了前后两个 `mousemove` 事件的鼠标移动的坐标

## 沙箱策略

该 API 在 `<iframe>` 标签中的调用受到 `allow-pointer-lock` 沙箱策略的控制，需要将 `sandbox` 的属性指定为允许

## 类型

```ts
interface Document {
  exitPointerLock(): void
  onpointerlockchange: ((this: Document, ev: Event) => any) | null
  onpointerlockerror: ((this: Document, ev: Event) => any) | null
}

interface DocumentOrShadowRoot {
  readonly pointerLockElement: Element | null
}

interface Element {
  requestPointerLock(): void
}

interface MouseEvent {
  readonly movementX: number
  readonly movementY: number
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API>
* <https://w3c.github.io/pointerlock/>
