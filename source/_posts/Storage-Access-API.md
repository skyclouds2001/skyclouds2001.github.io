---
title: Storage Access API
date: 2023-11-06 16:06:39
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
uniqueId: '2023-11-06 08:06:39/Storage Access API.html'
mathJax: false
---

Storage Access API 允许第三方上下文中跨站内容（如嵌入 `<iframe>` 标签中）获取对未分区 cookie （即以传统方式存储的 cookie，仅允许在第一方上下文（直接加载在浏览器选项卡中）中访问）的访问权限

通常出于隐私性考虑，默认用户代理会阻止第三方上下文中跨站内容对未分区 cookie 的访问，但一些场景下，开发者期望启用第三方内容对未分区 cookie 访问的功能

## 请求文档访问第三方 Cookie 权限

`Document` 接口的 `requestStorageAccess()` 方法用于请求文档访问第三方 Cookie 权限

方法返回一个 Promise

方法可能抛出 `InvalidStateError` 异常，若当前文档尚未进入 active 状态

方法可能抛出 `NotAllowedError` 异常，若当前文档未处于安全上下文状态，或受权限策略阻止，或当前文档或其顶层文档的 origin 为空，或受 `<iframe>` 标签沙箱策略的限制，或请求权限被拒绝（如之前已被拒绝，或当前未处于用户激活状态且未授予权限）

```js
document.requestStorageAccess().then(() => {
  console.log('granted')
}).catch(() => {
  console.log('denied')
})
```

## 检测文档访问第三方 Cookie 权限

`Document` 接口的 `hasStorageAccess()` 方法用于检测文档访问第三方 Cookie 权限

方法返回一个 Promise 的 `boolean`，表示是否已允许文档访问第三方 Cookie

方法可能抛出 `InvalidStateError` 异常，若当前文档尚未进入 active 状态

```js
document.hasStorageAccess().then((sym) => {
  if (sym) {
    console.log('has access')
  } else {
    console.log('not has access')
  }
})
```

## 沙箱策略

该 API 的调用受到 `allow-storage-access-by-user-activation` 沙箱策略的控制，在 `<iframe>` 标签中的调用需要将 `sandbox` 的属性指定为允许

（同时为使用该 API，也需要指定 `allow-scripts` 与 `allow-same-origin` 沙箱策略）

## 权限策略

该 API 调用受到 `storage-access` 权限策略的控制，可以通过 `Permissions-Policy` 响应头指定，或通过 `<iframe>` 标签的 `allow` 属性指定

默认值是 `*`

## 权限 API

该 API 调用需要获得用户 `storage-access` 权限的允许，可以调用 `Permission.query()` 方法检查用户是否已授予了该权限

## 类型

```ts
interface Document {
  hasStorageAccess(): Promise<boolean>
  requestStorageAccess(): Promise<undefined>
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API>
* <https://privacycg.github.io/storage-access/>
