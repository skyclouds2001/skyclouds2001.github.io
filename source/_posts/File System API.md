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

File System API 与扩展的 File System Access API 提供了管理设备本地文件系统的功能，包括读取、修改和管理文件的功能

- `FileSystemHandle` 接口作为文件句柄或目录句柄的通用接口
- `FileSystemFileHandle` 接口作为文件句柄的接口
- `FileSystemDirectoryHandle` 接口作为目录句柄的接口
- `FileSystemSyncAccessHandle` 接口作为同步访问句柄的接口
- `FileSystemWritableFileStream` 接口作为读写本地文件流的接口
- `Window` 接口上的 `showOpenFilePicker()`、`showSaveFilePicker()`、`showDirectoryPicker()` 方法及 `DataTransferItem` 接口的 `getAsFileSystemHandle()` 方法用于获取文件句柄或目录句柄
- `StorageManager` 接口上的 `getDirectory()` 方法用于获取 OPFS 的根目录句柄

通常而言，File System API 需要用户明确的许可，但 OPFS —— Origin Private File System 机制除外。

通常 File System API 的大多数操作是异步的，支持同步的 `FileSystemSyncAccessHandle` 接口仅在 Web Worker 内可用针对 OPFS 使用。

## 初始化

### 获取用户选择资源的文件句柄

使用 `Window` 接口的  `showOpenFilePicker()` 方法选取单个或多个文件，返回对应的文件句柄

方法传入一组可选的配置项

- `excludeAcceptAllOption` 可选选项指定选择器是否启用筛选文件类型的选项，默认值是 false

- `id` 选项用于和当前目录配对，会自动记忆与之相关的目录，后续选择时若指定相同的 id 可以自动打开与之前选择相同的目录，接收一个字符串

- `startIn` 选项指定初始打开目录，接收一个 `FileSystemHandle` 或预设的目录 `"desktop"` `"documents"` `"downloads"` `"music"` `"pictures"` 或 `"videos"`

- `multiple` 可选选项指定是否允许多选，默认值是 false

- `types` 选项指定允许选择的文件类型，传递一个数组，数组各项支持 `accept` 选项，指定文件类型的 MIME 类型和 `description` 可选选项，指定文件类型的描述

返回一个 Promise 的 `FileSystemFileHandle` 数组

方法在用户未选择目录或用户代理拒绝目录访问时抛出 `AbortError` 异常

方法要求在调用需基于发生用户交互

### 获取用户新增资源的文件句柄

使用 `Window` 接口的 `showSaveFilePicker()` 方法新增文件（可以是已有文件或新文件），返回对应的文件句柄

方法传入一组可选的配置项

- `excludeAcceptAllOption` 可选选项同上

- `id` 选项同上

- `startIn` 选项同上

- `suggestedName` 可选选项指定建议的新增文件名称

- `types` 选项同上

返回一个 Promise 的 `FileSystemFileHandle`

方法在用户未选择目录或用户代理拒绝目录访问时抛出 `AbortError` 异常

方法要求在调用需基于发生用户交互

### 获取用户选择资源的目录句柄

使用 `Window` 接口的 `showDirectoryPicker()` 选取目录，返回对应的目录句柄

方法传入一组可选的配置项

- `id` 选项同上

- `mode` 可选选项用于指定权限模式，接收字符串枚举 `"read"` 或 `"readwrite"`，默认值为 `"read"`

- `startIn` 选项同上

返回一个 Promise 的 `FileSystemDirectoryHandle`

方法在用户未选择目录或用户代理拒绝目录访问时抛出 `AbortError` 异常

方法要求在调用需基于发生用户交互

### 获取拖动资源的文件句柄或目录句柄

使用 `DataTransferItem` 接口的 `getAsFileSystemHandle()` 方法获取拖动资源的文件句柄或目录句柄

返回一个 Promise 的 `FileSystemFileHandle` 或 `FileSystemDirectoryHandle`

### 获取 OPFS 的根目录句柄

使用 `StorageManager` 接口的 `getDirectory()` 方法获取 OPFS 的根目录句柄

返回一个 Promise 的 `FileSystemDirectoryHandle` 对象

并在用户代理无法使用请求的文件目录建立本地 OPFS 索引时抛出 SecurityError 异常

## 文件操作
