---
title: Credential Management API
date: 2024-01-30 18:10:22
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
uniqueId: '2024-01-30 10:10:22/Credential Management API.html'
mathJax: false
---

Credential Management API 允许网站存储和检索密码、公钥与联合凭证

用户无需显式登录即可直接登录、查看登录站点的联合账户及恢复会话

## 通用凭证管理

凭证管理主要通过 `CredentialsContainer` 接口提供的各类方法实现

通过 `Navigator` 接口的 `credentials` 只读属性获取其实例

### 创建凭证

可以直接使用对应凭证具体类型的构造函数创建新凭证

或调用 `CredentialsContainer` 接口的 `create()` 方法用于创建新凭证

方法可以传入一个可选的配置项

配置项中 `signal` 可选参数接收一个 `AbortSignal` 实例，可用于编程式终止创建进程

此外，必须向配置项中传入 `password` `federated` `publicKey` 中某个选项，以创建对应的具体类型的凭证，具体选项细节见下及 Web Authentication API 内容

方法返回一个 `Promise`，其兑现一个 `Credential` 实例，或 `null`（若无法创建凭证）

### 存储凭证

调用 `CredentialsContainer` 接口的 `store()` 方法存储凭证

方法需要传入一个 `Credential` 接口或其子接口的实例，代表需要保存的凭证

方法返回一个 `Promise`

```js
try {
  await navigator.credentials.store(credential)

  console.log('success')
} catch {
  console.log('failure')
}
```

### 读取凭证

调用 `CredentialsContainer` 接口的 `get()` 方法用于获取已存储的凭证，从而用于执行身份验证等用途

方法可以传入一个可选的配置项

配置项中 `signal` 可选参数接收一个 `AbortSignal` 实例，可用于编程式终止读取进程

配置项中 `mediation` 可选参数接收 `silent` `optional` `conditional` `required` 之一，默认为 `optional`，指定用户是否会在每次访问时请求登录

> - `silent` 不会要求用户进行身份验证
> - `optional` 若凭据无需用户中介即可移交，则会直接移交；反之则会要求用户进行身份验证
> - `conditional` 凭据将会通过非模态对话框提供给用户并指示凭证的来源，其相当于自动填充可用的凭证
> - `required` 始终要求用户进行登录身份验证

此外，可以向配置项中传入 `password` `federated` `publicKey` `otp` `identity` 中多个选项，以仅读取对应的具体类型的凭证，具体选项细节见下及 Web Authentication API、WebOTP API、Federated Credential Management API 等内容

### 阻止自动登录

调用 `CredentialsContainer` 接口的 `preventSilentAccess()` 方法用于未来访问时阻止自动登录功能

方法返回一个 `Promise`

此方法可以在用户退出网站时调用，以避免用户登录信息在下次访问时不会自动传递

## 类型

```ts

```

## 链接

- <https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API>
- <https://w3c.github.io/webappsec-credential-management/>
