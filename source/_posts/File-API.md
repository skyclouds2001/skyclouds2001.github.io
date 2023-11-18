---
title: File API
date: 2023-11-18 03:35:27
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
uniqueId: '2023-11-17 19:35:27/File API.html'
mathJax: false
---

File API 允许获取文件及其内容

## 二进制对象

`Blob` 接口用于表示二进制对象

`Blob` 接口的 `Blob()` 构造方法用于创建一个二进制对象

方法接受一个可选的对象数组，各项可以为 `string`、`ArrayBuffer` 及 `Blob` 本身，代表创建的二进制对象的内容

方法接受一个可选的配置项：

`type` 可选参数接收一个 `string`，指定二进制对象的 MIME 类型，默认值为空字符串

`endings` 可选参数接收一个 `string`，指定二进制对象编码时对换行符的处理方式，值 `transparent` 代表对换行符不作处理，值 `native` 代表转换换行符为系统支持的形式，默认值为 `transparent`

```js
const blob = new Blob(['text', new ArrayBuffer(10), new Blob()], { type: 'text/plain', endings: 'native' })
```

`Blob` 接口的 `size` 属性返回一个 `number`，代表二进制对象中数据的大小

`Blob` 接口的 `type` 属性返回一个 `string`，代表二进制对象的 MIME 类型

```js
blob.size
blob.type
```

`Blob` 接口的 `slice()` 方法用于截取二进制对象

方法的 `start` 可选参数接收一个 `number`，代表截取的起始位置，默认值为 `0`

方法的 `end` 可选参数接收一个 `number`，代表截取的终止位置，默认值同 `size` 参数

方法的 `contentType` 可选参数接收一个 `string`，代表新二进制对象的 `type` 参数

方法返回一个新二进制对象

```js
const b = blob.slice(1, 11)
```

`Blob` 接口的 `stream()` 方法用于将二进制对象转换为流，返回一个 `ReadableStream`

`Blob` 接口的 `text()` 方法用于将二进制对象转换为 UTF-8 格式的字符串，返回一个 Promise 的 `string`

`Blob` 接口的 `arrayBuffer()` 方法用于将二进制对象转换为 Buffer，返回一个 Promise 的 `ArrayBuffer`

```js
const stream = blob.stream()
const text = await blob.text()
const arrayBuffer = await blob.arrayBuffer()
```

## 文件对象

`File` 接口用于表示文件对象

`File` 接口的 `File()` 构造方法用于创建一个文件对象

方法接受一个对象数组，各项可以为 `string`、`ArrayBuffer` 及 `Blob` 本身，代表创建的文件对象的内容

方法接受一个可选的配置项：

`type` 可选参数接收一个 `string`，指定二进制对象的 MIME 类型，默认值为空字符串

`endings` 可选参数接收一个 `string`，指定二进制对象编码时对换行符的处理方式，值 `transparent` 代表对换行符不作处理，值 `native` 代表转换换行符为系统支持的形式，默认值为 `transparent`

`lastModified` 可选参数接收一个 `number`，指定文件最后更改时间

```js
const file = new File(['text', new ArrayBuffer(10), new Blob()], 'file', { type: 'text/plain', endings: 'native', lastModified: Date.now() })
```

`File` 接口的 `name` 属性返回一个 `string`，代表文件对象的名称

`File` 接口的 `lastModified` 属性返回一个 `number`，代表文件对象的最后更改时间，若无则返回当前时间

```js
file.name
file.lastModified
```

## 文件列表对象

`FileList` 接口用于表示文件列表对象

`FileList` 接口的 `length` 属性返回一个 `number`，代表文件列表长度

`FileList` 接口的 `item()` 方法根据给定的 index 返回对应的文件

`FileList` 接口支持使用 `[]` 访问。亦支持使用 iterator 遍历

## 文件异步读取对象

`FileReader` 接口用于异步地读取文件

`FileReader` 接口的 `FileReader()` 构造方法用于创建异步读取文件对象

`FileReader` 接口的 `EMPTY` 常量值为 `0`，表示实例刚刚创建但尚未开始读取文件

`FileReader` 接口的 `LOADING` 常量值为 `1`，表示正在开始读取文件

`FileReader` 接口的 `DONE` 常量值为 `2`，表示读取文件完成，无论是否读取成功或失败抑或手动终止

`FileReader` 接口的 `readyState` 属性返回一个 `string`，代表文件读取进度，值为 `EMPTY`、`LOADING`、`DONE` 之一

`FileReader` 接口的 `result` 属性返回一个 `string` 或 `ArrayBuffer` 或 `null`，表示文件读取结果，具体返回值类型取决于调用的方法

`FileReader` 接口的 `error` 属性返回一个 `DOMException` 或 `null`，表示文件读取错误

`FileReader` 接口的 `readAsArrayBuffer()` 方法用于异步地将二进制对象读取为 ArrayBuffer

`FileReader` 接口的 `readAsDataURL()` 方法用于异步地将二进制对象读取为 Object URL

`FileReader` 接口的 `readAsText()` 方法用于异步地将二进制对象读取为指定编码的 string

以上三个方法接收一个 `Blob` 对象，无返回值

`FileReader` 接口的 `abort()` 方法用于终止读取进程

`FileReader` 接口的 `abort` 事件在读取文件进程被终止时触发，即调用 `abort()` 方法

`FileReader` 接口的 `error` 事件在读取文件进程失败时触发

`FileReader` 接口的 `load` 事件在读取文件进程成功完成时触发

`FileReader` 接口的 `loadend` 事件在读取文件进程完成时触发，无论成功与否

`FileReader` 接口的 `loadstart` 事件在读取文件进程开始时触发

`FileReader` 接口的 `progress` 事件在读取文件进程中周期性触发

事件均返回一个 `ProgressEvent`

```js
const reader = new FileReader()

reader.addEventListener('load', () => {
  console.log(reader.result)
})

reader.readAsText(blob)
```

## 文件同步读取对象

`FileReaderSync` 接口用于同步地读取文件内容

该接口仅在除 ServiceWorker 外的其他 Worker 环境中可用

`FileReaderSync` 接口的 `FileReaderSync()` 构造方法用于创建同步读取文件对象

`FileReaderSync` 接口的 `readAsArrayBuffer()` 方法用于同步地将二进制对象读取为 ArrayBuffer

`FileReaderSync` 接口的 `readAsDataURL()` 方法用于同步地将二进制对象读取为 Object URL

`FileReaderSync` 接口的 `readAsText()` 方法用于同步地将二进制对象读取为指定编码的 string

以上三个方法接收一个 `Blob` 对象，返回一个 `string`

以上三个方法可能抛出 `NotFoundError`，若资源不存在（如已被删除）

以上三个方法可能抛出 `NotReadableError`，若资源因为权限问题无法被读取（如资源锁）或资源快照与本地存储不符

以上三个方法可能抛出 `SecurityError`，若资源被用户代理判断为网络使用不安全，或进行了过于频繁的读取，或已被第三方修改

以上三个方法可能抛出 `EncodingError`，若资源被编码为 data URL 且超出了用户代理限制

```js
const reader = new FileReaderSync()

const buffer = reader.readAsArrayBuffer()
const url = reader.readAsDataURL()
const text = reader.readAsText()
```

## Object URL

使用 URL 接口的 `createObjectURL()` 创建一个 Object URL

方法接收一个 `Blob` 或 `MediaSource` 参数，代表源二进制对象

方法返回一个 `string`，代表创建的 Object URL

使用 URL 接口的 `revokeObjectURL()` 释放一个已创建的 Object URL

方法接收一个 `string`，代表需释放的 Object URL

以上两方法在除 ServiceWorker 外的其他环境中可用

## 类型

```ts
interface Blob {
  readonly size: number
  readonly type: string

  slice(start?: number, end?: number, contentType?: string): Blob

  stream(): ReadableStream
  text(): Promise<string>
  arrayBuffer(): Promise<ArrayBuffer>
}

declare var Blob: {
  new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob
  prototype: Blob
}

enum EndingType {
  transparent = 'transparent',
  native = 'native',
}

interface BlobPropertyBag {
  type?: string
  endings?: EndingType
}

type BlobPart = Blob | string | BufferSource

interface File extends Blob {
  readonly name: string
  readonly lastModified: number
}

declare var File: {
  new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File
  prototype: File
}

interface FilePropertyBag extends BlobPropertyBag {
  lastModified?: number
}

interface FileList {
  item(index: number): File | null
  readonly length: number
  [index: number]: File
  [Symbol.iterator](): IterableIterator<File>
}

declare var FileList: {
  prototype: FileList
}

interface FileReader extends EventTarget {
  readAsArrayBuffer(blob: Blob): void
  readAsBinaryString(blob: Blob): void
  readAsText(blob: Blob, encoding?: string): void
  readAsDataURL(blob: Blob): void

  abort(): void

  readonly EMPTY: 0
  readonly LOADING: 1
  readonly DONE: 2

  readonly readyState: FileReader['EMPTY' | 'LOADING' | 'DONE']

  readonly result: string | ArrayBuffer | null

  readonly error: DOMException | null

  onloadstart: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null
  onprogress: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null
  onabort: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null
  onloadend: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null
}

declare var FileReader: {
  new(): FileReader
  prototype: FileReader
  readonly EMPTY: 0
  readonly LOADING: 1
  readonly DONE: 2
}

interface FileReaderSync {
  readAsArrayBuffer(blob: Blob): ArrayBuffer
  readAsBinaryString(blob: Blob): string
  readAsText(blob: Blob, encoding?: string): string
  readAsDataURL(blob: Blob): string
}

declare var FileReaderSync: {
  new(): FileReaderSync
  prototype: FileReaderSync
}

declare var URL: {
  new(url: string | URL, base?: string | URL): URL
  prototype: URL
  createObjectURL(obj: Blob | MediaSource): string
  revokeObjectURL(url: string): void
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/File_API>
* <https://w3c.github.io/FileAPI/>
