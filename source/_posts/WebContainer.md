---
title: WebContainer
date: 2024-12-19 21:51:17
tags:
  - Frontend
  - Library
categories:
  - Frontend
  - Library
thumbnail: 
cover:
toc: true
recommend: 1
keywords:
uniqueId: '2024-12-19 21:51:17/WebContainer.html'
mathJax: false
---

WebContainer 是一个基于 WebAssembly 的能在浏览器内执行 Node.js 应用程序和操作系统命令的库

## 基本使用

### 准备工作

由于 WebContainer 需要使用 SharedArrayBuffer 功能，而该功能需要设置跨域隔离 cross-origin isolated，因此需要设置 COOP 和 COEP 标头

```http
Cross-Origin-Opener-Policy: same-origin

Cross-Origin-Embedder-Policy: require-corp
// or Cross-Origin-Embedder-Policy: credentialless
```

### 启动系统

调用 `WebContainer` 类的 `boot` 静态方法启动系统

```js
import { WebContainer } from '@webcontainer/api'

const webcontainerInstance = await WebContainer.boot()
```

此方法只能被调用一次，在系统启动之后，系统注销之前，调用该方法会报错

### 挂载文件

调用 `WebContainer` 实例的 `mount` 方法一次性挂载大量文件到文件系统中，这比直接调用文件系统方法单次挂载文件更有校性能优势

```js
const files = {
  'index.js': {
    file: {
      contents: `
import express from 'express'

const app = express()

app.get('/', (req, res) => {
res.send('Welcome to a WebContainer app!')
})

app.listen(8888, () => {
console.log(\`App is live at http://localhost:8888\`)
})`,
    },
  },
  'package.json': {
    file: {
      contents: `
      {
        "name": "webcontainer",
        "type": "module",
        "dependencies": {
          "express": "latest",
          "nodemon": "latest"
        },
        "scripts": {
          "start": "nodemon index.js"
        }
      }`,
    },
  },
}

await webcontainerInstance.mount(files)
```

### 执行命令

调用 `WebContainer` 实例的 `spawn` 方法执行命令，如下载 npm 依赖

```js
const installProcess = await webcontainerInstance.spawn('npm', ['install'])
```

或运行本地服务器

```js
await webcontainerInstance.spawn('npm', ['run', 'start'])
```

### 监听事件

可以监听 `WebContainer` 实例上一系列事件以执行对应的操作

```js
webcontainerInstance.on('server-ready', (port, url) => {
  el.src = url
})
```

### 注销系统

调用 `WebContainer` 实例的 `teardown` 方法注销系统运行

```js
webcontainerInstance.teardown()
```

## 文件系统机制

### 文件系统结构

文件系统结构中，包括文件，目录和链接，其数据结构如下所示：

```js
{
    // This is a file - provide its path as a key:
  'package.json': {
    // Because it's a file, add the "file" key
    file: {
      // Now add its contents
      contents: `
{
  "name": "vite-starter",
  "private": true,
  // ...
  "devDependencies": {
    "vite": "^4.0.4"
  }
}
      `,
    },
  },
  src: {
    // Because it's a directory, add the "directory" key
    directory: {
      // Here we will add files
      // This is a file - provide its path as a key:
      'main.js': {
        // Because it's a file, add the "file" key
        file: {
          contents: `
console.log('Hello from WebContainers!')
          `,
        },
      },
      'main.cache.js': {
        file: {
          symlink: './main.js',
        },
      },
    },
  },
}
```

对于文件，通过 `file.contents` 键指定文件的内容

对于目录，通过 `directory` 键指定目录中包含的文件

对于链接，通过 `file.contents` 键指定链接所指向的目标

### 文件系统挂载

使用 `WebContainer` 实例的 `mount` 方法一次性挂载大量文件（及目录）到文件系统中

```js
await webcontainerInstance.mount(files)
```

文件系统数据需要遵循 `FileSystemTree` 类型的结构（可以自 `@webcontainer/api` 中导出）

```js
/** @type {import('@webcontainer/api').FileSystemTree} */
```

默认情况下，文件会被挂载到根目录下；可以指定 `mountPoint` 参数以挂载到其他目录下

```js
await webcontainerInstance.mount(files, { mountPoint: 'custom-mount-point' })
```

### 文件系统操作

主要的文件系统操作包括读取文件、读取目录、删除文件目录、写入文件、创建目录，通过 `WebContainer` 实例的 `fs` 属性使用

1. 读取文件 `readFile`

    ```js
    const file = await webcontainerInstance.fs.readFile('/package.json')
    const file = await webcontainerInstance.fs.readFile('/package.json', 'utf-8')
    ```

2. 读取目录 `readdir`

    ```js
    const files = await webcontainerInstance.fs.readdir('/src')

    for (const file of files) {
      console.log('file or dir name: ', file)
    }
    ```

    `withFileTypes` 参数指定返回值的是否为 `Dirent` 类型对象数组

    ```js
    const files = await webcontainerInstance.fs.readdir('/src', {
      withFileTypes: true,
    })

    for (const file of files) {
      if (file.isFile()) {
        console.log('file name: ', file.name)
      }
      if (file.isDirectory()) {
        console.log('dir name: ', file.name)
      }
    }
    ```

    `encoding` 参数指定返回值的类型

    ```js
    const files = await webcontainerInstance.fs.readdir('/src', { encoding: 'buffer' })
    ```

3. 删除文件目录 `rm`

    ```js
    await webcontainerInstance.fs.rm('/src/main.js');
    ```

    删除非空目录时需要指定 `recursive` 参数以递归删除

    ```js
    await webcontainerInstance.fs.rm('/src', { recursive: true });
    ```

4. 写入文件 `writeFile`

    ```js
    await webcontainerInstance.fs.writeFile('/src/main.js', 'console.log("Hello from WebContainers!")')

    await webcontainerInstance.fs.writeFile(
      '/src/main.js',
      '\xE5\x8D\x83\xE8\x91\x89\xE5\xB8\x82\xE3\x83\x96\xE3\x83\xAB\xE3\x83\xBC\xE3\x82\xB9',
      { encoding: 'latin1' }
    )
    ```

5. 创建目录 `mkdir`

    ```js
    await webcontainerInstance.fs.mkdir('src')
    ```

    传递 `recursive` 参数以递归创建目录

    ```js
    await webcontainerInstance.fs.mkdir('this/is/my/nested/folder', { recursive: true })
    ```

### 文件系统快照

可以使用 `@webcontainer/snapshot` 包提供的 `snapshot` 方法来生成一个本地文件系统的快照

```js
import { snapshot } from '@webcontainer/snapshot'

const folderSnapshot = await snapshot(SOURCE_CODE_FOLDER)
```

从而可以提供给客户端挂载到文件系统上

```js
const snapshotResponse = await fetch('/snapshot');
const snapshot = await snapshotResponse.arrayBuffer();

await webcontainer.mount(snapshot)
```

## 线程机制

使用 `WebContainer` 实例的 `spawn` 方法执行命令

第一个参数表示命令的名称，第二个参数表示命令的参数，第三个参数表示执行命令的额外选项

方法返回的是一个 `WebContainerProcess` 实例

```js
const installProcess = await webcontainerInstance.spawn('npm', ['install'])

await webcontainerInstance.spawn('ls', ['src', '-l'])
```

可以通过 `WebContainerProcess` 实例的 `exit` 属性，其返回一个兑现 `number` 值的 `Promise`，兑现后返回线程执行结果的状态码

### 线程输入输出

`WebContainerProcess` 实例的 `input` 属性返回 `WritableStream<string>` 值，向线程传入输入数据

`WebContainerProcess` 实例的 `output` 属性返回 `ReadableStream<string>` 值，接收对于线程终端的输出

```js
installProcess.output.pipeTo(new WritableStream({
  write(data) {
    console.log(data)
  }
}))
```

### 中止线程

调用 `WebContainerProcess` 实例的 `kill` 方法中止线程的执行

```js
installProcess.kill()
```

## 状态事件

系统包含多个事件响应

`server-ready` 事件，当服务完全可接收请求时触发
`port` 事件，当端口被线程开启或关闭时触发
`error` 事件，当内部错误抛出时触发

```js
webcontainerInstance.on('server-ready', (port, url) => {
  el.src = url
})
```

通常可以通过 `WebContainer` 实例的 `on` 方法监听对应的事件并绑定事件回调函数
