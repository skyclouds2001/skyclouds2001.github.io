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

相关示例见下具体凭证类型章节

### 存储凭证

调用 `CredentialsContainer` 接口的 `store()` 方法存储凭证

方法需要传入一个 `Credential` 接口或其子接口的实例，代表需要保存的凭证

方法返回一个 `Promise`

示例如下所示

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

相关示例见下具体凭证类型章节

### 阻止自动登录

调用 `CredentialsContainer` 接口的 `preventSilentAccess()` 方法用于未来访问时阻止自动登录功能

方法返回一个 `Promise`

此方法可以在用户退出网站时调用，以避免用户登录信息在下次访问时不会自动传递

## 通用凭证

`Credential` 抽象接口表示通用凭证，其子接口表示各种具体类型的凭证

`Credential` 接口的 `id` 只读属性返回一个字符串，表示凭证的标识符

`Credential` 接口的 `type` 只读属性返回一个字符串，表示凭证的具体类型

> 子接口与类型的映射如下：
>
> |          子接口          |  `type` 属性值  |
> |:---------------------:|:------------:|
> | `PasswordCredential`  |  `password`  |
> | `FederatedCredential` | `federated`  |
> | `PublicKeyCredential` | `public-key` |
> |    `OTPCredential`    |    `otp`     |
> | `IdentityCredential`  |  `identity`  |

## 密码凭证

`PasswordCredential` 接口表示密码凭证

### 凭证信息

`PasswordCredential` 接口的 `iconURL` 只读属性返回一个字符串，表示凭证的图标的 URL

`PasswordCredential` 接口的 `name` 只读属性返回一个字符串，表示凭证的名称

`PasswordCredential` 接口的 `password` 只读属性返回一个字符串，表示凭证所包含的密码

### 创建密码凭证

可以调用 `PasswordCredential()` 构造函数创建密码凭证

可以向构造函数传入一个 `HTMLFormElement` 实例参数（至少需要包含 `id` 和 `password` 字段，可以包含一个 `csrf_token` 字段）

```html
<form id="form">
  <label for="id">Username:</label>
  <input type="text" name="id" autocomplete="username" />
  <label for="password">Password:</label>
  <input type="password" name="password" autocomplete="current-password" />
  <input type="hidden" name="csrf_token" value="*****" />
</form>
```

```js
const form = document.getElementById("form");
const credential = new PasswordCredential(form);
```

也可以直接向构造函数传入一个配置项参数

```js
const data = {
  id: "xxxxxx",
  password: "xxxxxx",
  origin: "www.example.com",
};
const credential = new PasswordCredential(data);
```

亦可以通过 `CredentialsContainer` 接口的 `create()` 方法创建凭证

需要在配置项中传入 `password` 选项，其为一个对象，对象结构同传入 `PasswordCredential()` 构造函数的配置项结构

```js
navigator.credentials
  .create({
    password: {
      id: "xxxxxx",
      password: "xxxxxx",
      origin: "www.example.com",
    }
  })
```

### 读取密码凭证

通过 `CredentialsContainer` 接口的 `get()` 方法读取凭证，从而可用于凭证验证

需要在配置项中传入 `password` 选项，其接收一个布尔值，默认为 `false`

```js
navigator.credentials.get({
  password: true,
})
```

## 联合凭证

## 类型

```ts
interface Navigator {
  readonly credentials: CredentialsContainer
}

interface CredentialsContainer {
  get(options?: CredentialRequestOptions): Promise<Credential | null>
  store(credential: Credential): Promise<undefined>
  create(options?: CredentialCreationOptions): Promise<Credential | null>
  preventSilentAccess(): Promise<undefined>
}

interface CredentialUserData {
  readonly name: string
  readonly iconURL: string
}

enum CredentialMediationRequirement {
  "silent",
  "optional",
  "conditional",
  "required",
}

interface CredentialRequestOptions {
  mediation?: CredentialMediationRequirement
  signal?: AbortSignal
}

interface CredentialCreationOptions {
  signal?: AbortSignal
}

interface CredentialData {
  id: string
}

interface Credential {
  readonly id: string
  readonly type: string
}

interface PasswordCredential extends Credential, CredentialUserData {
  constructor(form: HTMLFormElement): PasswordCredential
  constructor(data: PasswordCredentialData): PasswordCredential
  readonly password: string
}

interface CredentialRequestOptions {
  password?: boolean
}

interface PasswordCredentialData extends CredentialData {
  name?: string
  iconURL?: string
  origin: string
  password: string
}

type PasswordCredentialInit = PasswordCredentialData | HTMLFormElement

interface CredentialCreationOptions {
  password?: PasswordCredentialInit
}

interface FederatedCredential extends Credential, CredentialUserData {
  constructor(data: FederatedCredentialInit): FederatedCredential
  readonly provider: string
  readonly protocol?: string
}

interface FederatedCredentialRequestOptions {
  providers: string[]
  protocols: string[]
}

interface CredentialRequestOptions {
  federated?: FederatedCredentialRequestOptions
}

interface FederatedCredentialInit extends CredentialData {
  name?: string
  iconURL?: string
  origin: string
  provider: string
  protocol?: string
}

interface CredentialCreationOptions {
  federated?: FederatedCredentialInit
}
```

## 链接

- <https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API>
- <https://w3c.github.io/webappsec-credential-management/>
