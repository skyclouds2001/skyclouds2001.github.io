---
title: Pyodide
date: 2023-11-01 14:34:58
tags:
  - Frontend
  - Other
categories:
  - Frontend
  - Other
thumbnail:
cover:
toc: true
recommend: 1
keywords:
uniqueId: '2023-11-01 06:34:58/Pyodide.html'
mathJax: false
---

Pyodide 是一个在浏览器环境中运行的 Python 解释器，利用了 CPython 技术和 WebAssembly 技术，从而可以在浏览器中运行 Python 软件包；并且 Pyodide 保证了 Python 与 JavaScript 的兼容，允许 Python 使用浏览器的 API

## 基本使用

使用 CDN 形式向项目中引入 Pyodide 软件包

```html
<script defer src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"></script>
```

然后调用已注入到全局的 `loadPyodide()` 方法获取到 `Pyodide` 实例

```js
const pyodide = await loadPyodide()
```

调用 `Pyodide` 实例的 `runPython()` 方法以执行 Python 代码

该方法传入的字符串，代表需要执行的 Python 代码

该方法的返回值，执行 Python 代码的输出

```js
pyodide.runPython(`print('Hello world!')`)
```

> 调用 print() 方法的效果相当于调用 console.log() 方法

```js
pyodide.runPython('1 + 2')
pyodide.runPython('2 ** 10')
pyodide.runPython(`
import sys
sys.version
`)
```

> 同样可以在 `Pyodide` 中使用内置软件包，也可以导入外部软件包

`Pyodide` 实例的 `runPythonAsync()` 方法用于异步执行 Python 代码

```js
await pyodide.runPythonAsync('1 * 1')
```

## JS 获取 Python 作用域

Python 全局作用域通过 `pyodide.globals` 对象暴露

调用其 `get()` 方法以获取 Python 全局作用域的变量

```js
pyodide.runPython('x = 1')
pyodide.runPython(`y = 'xes'`)
pyodide.runPython('z = [2, 4]')

pyodide.globals.get('x')
pyodide.globals.get('y')
pyodide.globals.get('z').toJs()
```

> Python 中复杂类型变量，如列表等，可以通过调用 `toJs()` 来转换为一个 JS 对象

调用其 `set()` 方法以设置 Python 全局作用域的变量

```js
pyodide.globals.set('xx', 'xxxxx')
pyodide.globals.set('alert', alert)
pyodide.globals.set('square', x => x ** 2)

pyodide.runPython('print(xx)')
pyodide.runPython(`alert('xxxx')`)
pyodide.runPython('print(square(20))')
```

可以设置普通变量、对象、函数，以及 JS 或 DOM 内置函数等等

## Python 获取 JS 作用域

在 Python 中导入 JS 包以使用 JS 的全局变量

```python
import js

js.confirm('message')
```

使用类似与调用 `window` 变量

## Worker 环境使用

使用 `importScripts()` 方法导入 CDN 脚本，随后通过暴露在全局的 `loadPyodide()` 方法使用

```js
self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js")
```

特别的，若在 ServiceWorker 中使用，需要导入 XMLHttpRequest 的 shim 包，因为该类在 ServiceWorker 中无法使用但 Pyodide 依赖于该包，如

```js
importScripts("./node_modules/xhr-shim/src/index.js")
self.XMLHttpRequest = self.XMLHttpRequestShim
```

模块 Worker 环境下需要改变导入方式为 ESM

```js
import "./node_modules/xhr-shim/src/index.js"
self.XMLHttpRequest = self.XMLHttpRequestShim
import "./pyodide.asm.js"
import { loadPyodide } from "./pyodide.mjs"
```

## 文件系统

Pyodide 基于 Emscripten File System API 实现了自定义的文件系统

在 Python 环境中直接调用相关文件操作方法；通过 `pyodide.FS` 对象向浏览器环境暴露对文件系统的操作

```py
with open("/hello.txt", "r") as fh:
      data = fh.read()
print(data)

with open("/hello.txt", "r") as fh:
      data = fh.read()
print(data)
```

```js
const file = pyodide.FS.readFile("/hello.txt", { encoding: "utf8" })

pyodide.FS.writeFile("/hello.txt", data, { encoding: "utf8" })
```

需要注意的是，Pyodide 默认使用的是 MEMFS，可以通过调用其 mount 方法绑定至其他的文件系统

```js
pyodide.FS.mount(pyodide.FS.filesystems.NODEFS, { root: "." }, "/mnt")
```

或者可以使用原生 File System API 绑定至 Origin Private File System 或 Native File System

```js
const root = await navigator.storage.getDirectory()

const nativefs = await pyodide.mountNativeFS("/mnt", root)

await nativefs.syncfs()
```
