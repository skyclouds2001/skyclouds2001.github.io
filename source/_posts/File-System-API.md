---
title: File System API
date: 2023-10-05 15:53:12
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
uniqueId: '2023-10-05 07:53:12/File System API.html'
mathJax: false
---

File System API 允许使用内置文件系统，包含读取、修改和移除文件，扩展的 File System Access API 允许访问本地文件系统

* `FileSystemHandle` 接口作为文件句柄或目录句柄的通用接口
* `FileSystemFileHandle` 接口作为文件句柄的接口
* `FileSystemDirectoryHandle` 接口作为目录句柄的接口
* `FileSystemSyncAccessHandle` 接口作为同步访问句柄的接口
* `FileSystemWritableFileStream` 接口作为读写本地文件流的接口
* `StorageManager` 接口上的 `getDirectory()` 方法用于获取 Origin Private File System 的根目录句柄

通常而言，File System API 需要用户明确的许可，但 OPFS —— Origin Private File System 机制除外。

通常 File System API 的大多数操作是异步的，支持同步的 `FileSystemSyncAccessHandle` 接口仅在 Web Worker 内可用且仅允许使用于 OPFS。

## 初始化

### 获取 OPFS 的根目录句柄

使用 `StorageManager` 接口的 `getDirectory()` 方法获取 OPFS 的根目录句柄

返回一个 Promise 的 `FileSystemDirectoryHandle` 对象

并在用户代理无法使用请求的文件目录建立本地 OPFS 索引时抛出 SecurityError 异常

## 文件及目录操作

通过 `FileSystemHandle` 接口进行文件目录相关的操作，该接口是 `FileSystemFileHandle` 接口与 `FileSystemDirectoryHandle` 接口的父接口

### 句柄类型

`FileSystemHandle` 接口的 `kind` 属性返回一个字符串枚举值，代表句柄的类型

当当前句柄为 `FileSystemFileHandle` 时，返回 `'file'`

当当前句柄为 `FileSystemDirectoryHandle` 时，返回 `'directory'`

### 句柄名称

`FileSystemHandle` 接口的 `name` 属性返回一个字符串，代表句柄对应的文件或目录的名称

### 句柄比较

`FileSystemHandle` 接口的 `isSameEntry()` 方法判断当前句柄与传入的句柄是否指向同一个文件或目录

方法接收一个 `FileSystemHandle`

方法返回一个 Promise 的 boolean

### 权限操作

`FileSystemHandle` 接口的 `queryPermission()` 方法用于枚举当前句柄的指定权限

`FileSystemHandle` 接口的 `requestPermission()` 方法用于请求当前句柄的指定权限

方法均支持传入一组可选的描述符，唯一 mode 参数可以为 `'read'` 或 `'readwrite'` 之一，默认为 `'read'`

方法均返回一个 Promise 的 `PermissionStatus` 接口实例

## 文件操作

通过 `FileSystemFileHandle` 接口进行文件相关的操作，该接口继承自 `FileSystemHandle` 接口

### 获取文件

`FileSystemFileHandle` 接口的 `getFile()` 方法可以用于读取文件相关信息及用于网络传输

返回一个 Promise 的 `File` 对象

抛出一个 `NotAllowedError` 若未授予访问权限

### 获取同步访问句柄

`FileSystemFileHandle` 接口的 `createSyncAccessHandle()` 方法可以用于同步读写文件内容，但仅允许在专属 Worker 内部使用，且目前仅适用于 OPFS 机制

返回一个 Promise 的 `FileSystemSyncAccessHandle` 对象

抛出一个 `NotAllowedError` 若未授予访问权限

抛出一个 `NoModificationAllowedError` 若无法建立文件锁

抛出一个 `InvalidStateError` 若句柄无法表示 OPFS 中的文件

### 获取可写文件流

`FileSystemFileHandle` 接口的 `createWritable()` 方法可以用于修改文件内容

可以传入一组可选的配置项，唯一选项 keepExistingData 指定

返回一个 Promise 的 `FileSystemWritableFileStream` 对象

抛出一个 `NotAllowedError` 若未授予访问权限

## 目录操作

通过 `FileSystemDirectoryHandle` 接口进行目录相关的操作，该接口继承自 `FileSystemHandle` 接口

### 目录遍历

`FileSystemDirectoryHandle` 接口支持异步遍历，包含 `[@@asyncIterator]()` 以及 `entries()`、`keys()`、`values()` 等方法

### 获取路径

`FileSystemDirectoryHandle` 接口的 `resolve()` 方法用于获取当前句柄到指定句柄的相对路径

需要传入一个 `FileSystemHandle`，代表目标句柄

返回一个 Promise 的字符串数组或 `null`

### 获取子目录

`FileSystemDirectoryHandle` 接口的 `getDirectoryHandle()` 方法用于获取当前目录下的指定名称的子目录的句柄

需要传入一个字符串参数，代表目录的名称，与 `FileSystemHandle.name` 相符

可以传入一组配置项，唯一参数 `create` 为一个布尔值，指定目录不存在情况下是否创建目录，默认值为 `false`

返回一个 Promise 的 `FileSystemDirectoryHandle` 对象

抛出一个 `TypeError` 若 `name` 参数不是字符串或为非法的文件系统名称

抛出一个 `TypeMismatchError` 若匹配到的为文件而非目录

抛出一个 `NotFoundError` 若未找到目录且 `create` 选项设定为 `false`

抛出一个 `NotAllowedError` 若未授予访问权限

### 获取子文件

`FileSystemDirectoryHandle` 接口的 `getFileHandle()` 方法用于获取当前目录下的指定名称的子文件的句柄

需要传入一个字符串参数，代表目录的名称，与 `FileSystemHandle.name` 相符

可以传入一组配置项，唯一参数 `create` 为一个布尔值，指定目录不存在情况下是否创建目录，默认值为 `false`

返回一个 Promise 的 `FileSystemFileHandle` 对象

抛出一个 `TypeError` 若 `name` 参数不是字符串或为非法的文件系统名称

抛出一个 `TypeMismatchError` 若匹配到的为目录而非文件

抛出一个 `NotFoundError` 若未找到文件且 `create` 选项设定为 `false`

抛出一个 `NotAllowedError` 若未授予访问权限

### 删除子目录或子文件

`FileSystemDirectoryHandle` 接口的 `removeEntry()` 方法用于删除当前目录下的指定名称的子目录或子文件的句柄

需要传入一个字符串参数，代表目录的名称，与 `FileSystemHandle.name` 相符

可以传入一组配置项，唯一参数 `recursive` 为一个布尔值，指定是否递归删除，默认值为 `false`

返回一个 Promise 的 `undefined`

抛出一个 `TypeError` 若 `name` 参数不是字符串或为非法的文件系统名称

抛出一个 `InvalidModificationError` 若目标为目录，并且包含子文件或子目录，并且 `recursive` 设置为 `false`

抛出一个 `NotFoundError` 若未找到文件或目录

抛出一个 `NotAllowedError` 若未授予访问权限

## 文件读取

文件读取通过 `FileSystemFileHandle` 接口的 `getFile()` 方法获取到对应的 `File` 实例实现

## 文件修改

文件修改通过 `FileSystemFileHandle` 接口的 `createWritable()` 方法获取到对应的 `FileSystemWritableFileStream` 实例实现

`FileSystemWritableFileStream` 接口继承自 `WritableStream` 接口

*`FileSystemWritableFileStream` 接口的更改不会立即反映到实际的文件上，仅在关闭流之后才会同步其产生的更改；原因是对流的更改，至少会存储到一个临时文件中，仅在流关闭之后，才会将更改同步到实际的文件中*

### 移动指针

使用 `FileSystemWritableFileStream` 接口的 `seek()` 方法移动文件指针的位置

需要传入一个正整数 `position` 参数，代表文件指针的位置

返回一个 Promise

抛出一个 `NotAllowedError` 若未授予访问权限

抛出一个 `TypeError` 若 `position` 参数不是正整数或未传递

### 文件写入

使用 `FileSystemWritableFileStream` 接口的 `write()` 方法用于向文件中写入内容

可以传入一个 `data` 参数，代表需要写入文件的内容，可以是 `ArrayBuffer` `TypedArray` `DataView` `Blob` 或 `string`

亦可以传入一组配置项：

`type` 选项传入一组字符串枚举，指定操作的模式，可以是 `"write"` `"seek"` 或 `"truncate"`

`data` 选项，代表需要写入文件的内容，可以是 `ArrayBuffer` `TypedArray` `DataView` `Blob` 或 `string`，在 `"write"` 模式下是必须的

`position` 选项，代表需要移动的文件指针的目标位置，是一个正整数，在 `"seek"` 模式下是必须的；同样可以在 `"write"` 模式下使用，此时代表写入内容的目标位置

`size` 选项，代表需要文件流的大小，是一个正整数，在 `"truncate"` 模式下是必须的

返回一个 Promise

抛出一个 `NotAllowedError` 若未授予访问权限

抛出一个 `TypeError` 若传入参数非法

抛出一个 `InvalidStateError` 若 `position` 选项的值超出文件大小

### 文件尺寸修改

使用 `FileSystemWritableFileStream` 接口的 `truncate()` 方法改变文件的尺寸；方法可能会改变文件指针的位置

需要传入一个正整数 `size` 参数，代表目标的文件尺寸；若参数超出原有尺寸，则扩大当前文件并使用空内容填充扩大的部分，反之会裁剪当前文件

返回一个 Promise

抛出一个 `NotAllowedError` 若未授予访问权限

抛出一个 `TypeError` 若 `size` 参数不是正整数或未传递

## 文件同步读写

文件同步读写通过 `FileSystemFileHandle` 接口的 `createSyncAccessHandle()` 方法获取到对应的 `FileSystemSyncAccessHandle` 实例实现

`FileSystemSyncAccessHandle` 实例仅支持在专属 Worker 中使用，且目前仅适用于 OPFS 机制

因为其无需进行权限检查，其相对而言具有更好的性能

*创建 `FileSystemSyncAccessHandle` 实例会创建与之对应的文件锁，阻止对该文件创建其他的 `FileSystemSyncAccessHandle` 实例或 `FileSystemWritableFileStream` 实例，直到 `FileSystemSyncAccessHandle` 实例被销毁*

### 读

`FileSystemSyncAccessHandle` 接口的 `read()` 方法读取文件内容

方法传入一个 `buffer` 参数，可以是 `ArrayBuffer` `SharedArrayBuffer` `TypedArray` 或 `DataView`，代表用于存储读取文件内容的缓存区

方法支持传入一个可选的配置项：其 `at` 参数指定开始读取文件内容的起始位置

方法返回一个正整数，代表读取的文件内容的字节数

方法在若对应的句柄已关闭的情况下，抛出一个 `InvalidStateError`

### 写

`FileSystemSyncAccessHandle` 接口的 `write()` 方法向文件写入内容

方法传入一个 `buffer` 参数，可以是 `ArrayBuffer` `SharedArrayBuffer` `TypedArray` 或 `DataView`，代表将用于写入的文件内容

方法可以传入一个可选的配置项：其 `at` 参数指定开始写入文件内容的起始位置

方法返回一个正整数，代表写入的文件内容的字节数

方法在若对应的句柄已关闭的情况下，抛出一个 `InvalidStateError`

### 读取尺寸

`FileSystemSyncAccessHandle` 接口的 `getSize()` 方法返回文件的尺寸

方法返回一个正整数，代表文件内容的字节数

方法在若对应的句柄已关闭的情况下，抛出一个 `InvalidStateError`

### 更改尺寸

`FileSystemSyncAccessHandle` 接口的 `truncate()` 方法用于更改文件的尺寸

方法传入一个 `newSize` 参数，需要是一个正整数，代表将更改的文件的目标大小

方法在若对应的句柄已关闭的情况下，抛出一个 `InvalidStateError`

方法在若对应的句柄已关闭的情况下，抛出一个 `InvalidStateError`

### 刷新缓冲区

`FileSystemSyncAccessHandle` 接口的 `flush()` 方法用于将缓冲的更改同步至存储，通常只在特定时间段需要将缓冲的更改同步至存储时使用，否则可以让底层自行处理

### 关闭句柄

`FileSystemSyncAccessHandle` 接口的 `close()` 方法用于关闭当前句柄，释放文件锁

## 类型

```ts
interface FileSystemHandle {
  readonly kind: FileSystemHandleKind
  readonly name: string
  isSameEntry(other: FileSystemHandle): Promise<boolean>
}

interface FileSystemFileHandle extends FileSystemHandle {
  readonly kind: 'file'
  createSyncAccessHandle(): Promise<FileSystemSyncAccessHandle>
  createWritable(options?: FileSystemCreateWritableOptions): Promise<FileSystemWritableFileStream>
  getFile(): Promise<File>
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  readonly kind: 'directory'
  getDirectoryHandle(name: string, options?: FileSystemGetDirectoryOptions): Promise<FileSystemDirectoryHandle>
  getFileHandle(name: string, options?: FileSystemGetFileOptions): Promise<FileSystemFileHandle>
  removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void>
  resolve(possibleDescendant: FileSystemHandle): Promise<string[] | null>
}

interface FileSystemWritableFileStream extends WritableStream {
  seek(position: number): Promise<void>
  truncate(size: number): Promise<void>
  write(data: FileSystemWriteChunkType): Promise<void>
}

interface FileSystemSyncAccessHandle {
  close(): void;
  flush(): void;
  getSize(): number;
  read(buffer: AllowSharedBufferSource, options?: FileSystemReadWriteOptions): number;
  truncate(newSize: number): void;
  write(buffer: AllowSharedBufferSource, options?: FileSystemReadWriteOptions): number;
}

interface FileSystemCreateWritableOptions {
  keepExistingData?: boolean
}

interface FileSystemGetDirectoryOptions {
  create?: boolean
}

interface FileSystemGetFileOptions {
  create?: boolean
}

interface FileSystemReadWriteOptions {
  at?: number
}

interface FileSystemRemoveOptions {
  recursive?: boolean
}

type FileSystemWriteChunkType = BufferSource | Blob | string | WriteParams
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/File_System_API>
* <https://fs.spec.whatwg.org/>
