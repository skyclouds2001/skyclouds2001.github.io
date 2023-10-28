---
title: Keyboard Lock API
date: 2023-10-24 19:31:18
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
uniqueId: '2023-10-24 11:31:18/Keyboard Lock API.html'
mathJax: false
---

Keyboard Lock API 允许控制键盘的输入形式，捕获键盘的输入从而进行自定义的处理（特别是针对一些特殊按键）

通过 `navigator.keyboard` 暴露的 `Keyboard` 接口实例使用

该 API 的使用要求有用户交互的发生

## 启用键盘锁定

使用 `Keyboard` 接口的 `lock()` 方法启用键盘锁定

方法可以传递一个可选的 `keyCodes` 字符串数组参数，代表要锁定的键值码；不传递则代表锁定所有的按键

方法返回一个 Promise

方法可能抛出 `AbortError`，若在该方法完成前又重新调用了该方法

方法可能抛出 `InvalidAccessError`，若任一 `keyCodes` 中的项非法

方法可能抛出 `InvalidStateError`，若方法未在活跃浏览器上下文中调用

```js
navigator.keyboard.lock()
navigator.keyboard.lock(['KeyW', 'KeyA', 'KeyS', 'KeyD'])
```

若调用多次调用 `lock()` 方法且中途未调用 `unlock()` 方法，则只有最后一次指定的 `keyCodes` 有效

## 停止键盘锁定

使用 `Keyboard` 接口的 `unlock()` 方法停止键盘锁定

```js
navigator.keyboard.unlock()
```

## 相关接口

```ts
interface Keyboard extends EventTarget {
  lock(keyCodes?: string[]): Promise<void>
  unlock(): void
}

interface Navigator {
  readonly keyboard: Keyboard
}
```
