---
title: Clipboard API
date: 2023-11-02 20:51:52
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
uniqueId: '2023-11-02 12:51:52/Clipboard API.html'
mathJax: false
---

Clipboard API 允许异步地读写剪切板

剪切板操作通过 `Navigator` 接口的 `clipboard` 属性暴露的 `Clipboard` 接口实例使用

剪切板的部分操作需要获得 `clipboard-write` 权限和 `clipboard-read` 权限

## 读写文本

使用 `Clipboard` 接口的 `writeText()` 方法向剪切板中写入文本

方法接收一个字符串参数，代表向剪切板写入的文本内容

```js
navigator.clipboard.writeText('data')
```

若存在用户交互，方法调用会自动授予 `clipboard-write` 权限

使用 `Clipboard` 接口的 `readText()` 方法从剪切板中读取文本

方法返回一个字符串，代表从剪切板读取的文本内容

```js
const data = await navigator.clipboard.readText()
```

方法调用需要用户授予 `clipboard-read` 权限

## 读写复杂格式

使用 `Clipboard` 接口的 `write()` 方法向剪切板中写入复杂格式内容

方法接收一个 `ClipboardItem` 数组，代表要向剪切板写入的数据

> 调用 `ClipboardItem()` 构造函数创建 `ClipboardItem` 实例
>
> 需传入一个数据对象，该对象要求键为数据的 MIME 类型，值为实际数据（允许为 Promise）

```js
navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob(['data'], { type: 'text/plain' }),
    }),
])
```

方法调用需要用户授予 `clipboard-write` 权限

使用 `Clipboard` 接口的 `read()` 方法从剪切板中读取复杂格式内容

方法返回一个 `ClipboardItem` 数组，代表要从剪切板读取的数据

> `ClipboardItem` 实例的 `types` 属性反映其支持的 MIME 类型
>
> `ClipboardItem` 实例的 `getType()` 方法根据指定的 MIME 类型返回对应的 `Blob`

```js
const datas = await navigator.clipboard.read()

const blob = await datas.at(0).getType('text/plain')
```

方法调用需要用户授予 `clipboard-read` 权限

## 类型

```ts
interface Clipboard extends EventTarget {
  read(): Promise<ClipboardItems>
  readText(): Promise<string>
  write(data: ClipboardItems): Promise<void>
  writeText(data: string): Promise<void>
}

declare var Clipboard: {
  prototype: Clipboard
}

interface ClipboardItem {
  readonly types: ReadonlyArray<string>
  getType(type: string): Promise<Blob>
}

declare var ClipboardItem: {
  prototype: ClipboardItem
  new(items: Record<string, string | Blob | PromiseLike<string | Blob>>): ClipboardItem
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API>
* <https://w3c.github.io/clipboard-apis/>
