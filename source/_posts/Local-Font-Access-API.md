---
title: Local Font Access API
date: 2023-09-20 12:38:21
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
uniqueId: '2023-09-20 12:38:21/Local Font Access API.html'
mathJax: false
---

Local Font Access API 向开发者提供了获取用户本地安装的字体的信息的方式，包括字体名称、字体样式及字体族等等

## 获取本地字体

调用 `window.queryLocalFonts()` 方法来获取本地安装的字体

方法允许传入一组可选的配置项，其 `postscriptNames` 参数允许传入一组字符串数组，代表希望筛选的 postscriptName 名称

方法会返回 Promise 的 `FontData` 数组，表示本地安装的字体的列表

方法可能抛出 `NotAllowedError` 异常，表示用户拒绝授予开发者 `'local-fonts'` 权限

方法可能抛出 `SecurityError` 异常，表示该 API 受 Permissions Policy 的限制无法被调用或调用该方法并非缘于用户交互行为

```js
window.queryLocalFonts().then((fonts) => {
  // to do something
})
```

## 处理本地字体

字体信息使用 `FontData` 接口表示

`FontData` 接口的 `family` 属性表示字体的字体族，可以用于 CSS 的 `font-family` 属性或者 `@font-face` 规则中的 `local()` 函数等；

`FontData` 接口的 `fullName` 属性表示字体的全名，通常是一个用户可辨识的名称，可以用于向用户展示；

`FontData` 接口的 `postscriptName` 属性表示字体的 PostScript 名称，可以用于唯一地辨识字体；

`FontData` 接口的 `style` 属性表示字体的样式，可以用于 CSS 的  `font-style` 属性；

```js
async function logFonts() {
  const fonts = await window.queryLocalFonts()

  for (const data of fonts) {
    console.log(data.postscriptName)
    console.log(data.fullName)
    console.log(data.family)
    console.log(data.style)
  }
}
```

`FontData` 接口的 `blob()` 方法以 Blob 形式返回字体的源数据；

```js
async function getFontFormat(font) {
  const data = await fontData.blob()

  const version = await data.slice(0, 4).text()

  let format: 'unknown' | 'truetype' | 'cff' = 'unknown'

  switch (format) {
    case "\x00\x01\x00\x00":
    case "true":
    case "typ1":
      format = "truetype"
      break
    case "OTTO":
      format = "cff"
      break
  }

  return format
}
```

## 权限策略

该 API 调用受到 `local-fonts` 权限策略的控制，可以通过 `Permissions-Policy` 响应头指定，或通过 `<iframe>` 标签的 `allow` 属性指定

默认为 `self`，即允许在当前上下文或内嵌的其他同源上下文中使用

## 权限 API

该 API 调用需要用户授予 `local-fonts` 权限，可以调用 `Permission.query()` 方法检查用户是否已授予了该权限

## 类型

```ts
interface Window {
  queryLocalFonts: (options?: QueryOptions) => Promise<FontData[]>
}

interface QueryOptions {
  postscriptNames?: string[]
}

interface FontData {
  readonly family: string
  readonly fullName: string
  readonly postscriptName: string
  readonly style: string
  blob: () => Promise<Blob>
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API>
* <https://wicg.github.io/local-font-access/>
