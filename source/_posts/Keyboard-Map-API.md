---
title: Keyboard Map API
date: 2023-10-28 16:40:59
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
uniqueId: '2023-10-28 08:40:59/Keyboard Map API.html'
mathJax: false
---

Keyboard Map API 允许获取键盘按键码至键盘按键名的映射

通过 `navigator.keyboard` 暴露的 `Keyboard` 接口实例使用

## 获取键盘映射

`Keyboard` 接口的 `getLayoutMap()` 方法提供了获取键盘映射的方法

方法返回一个 Promise 的 `KeyboardLayoutMap` 实例

```js
navigator.keyboard.getLayoutMap().then((layoutMap) => {
  const code = 'KeyW'
  const key = layoutMap.get(code)
})
```

`KeyboardLayoutMap` 接口反映了一组键值对对象，键名为键盘按键码，键值为键盘按键名；它是一个只读的类 map 对象

## 键盘映射更改

`Keyboard` 接口的 `layoutchange` 事件在键盘映射改变时触发

该事件尚未得到主流浏览器的支持

## 类型

```ts
interface Keyboard extends EventTarget {
  lock(keyCodes?: string[]): Promise<void>
  unlock(): void
}

interface Navigator {
  readonly keyboard: Keyboard
}

interface KeyboardLayoutMap {
  forEach(callbackfn: (value: string, key: string, map: Map<string, string>) => void, thisArg?: any): void
  get(key: string): string | undefined
  has(key: string): boolean
  readonly size: number
  entries(): IterableIterator<[string, string]>
  keys(): IterableIterator<string>
  values(): IterableIterator<string>
  [Symbol.iterator](): IterableIterator<[string, string]>
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Keyboard_API>
* <https://wicg.github.io/keyboard-map/>
