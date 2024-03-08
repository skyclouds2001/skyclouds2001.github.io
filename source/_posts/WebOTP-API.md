---
title: WebOTP API
date: 2024-02-06 01:16:11
tags:
  - Frontend
  - Web API
categories:
  - Frontend
thumbnail:
cover:
  - Web API
toc: true
recommend: 1
keywords:
uniqueId: '2024-02-05 17:16:11/WebOTP API.html'
mathJax: false
---

WebOTP API 是对 Credential Management API 的扩展，允许开发者请求用户访问短信验证码，以便方便地完成表单等填写

## 使用

使用 `CredentialsContainer.get()` 方法并指定 `otp` 选项请求短信验证凭证

其中 `otp` 选项传递一个对象，其唯一选项 `transport` 接收一个字符串数组，其唯一合法项为 `sms`

方法返回一个 `Promise`，其兑现一个 `OTPCredential` 实例

方法在传入的 `signal` 选项对应的 `AbortSignal` 已终止时抛出 `AbortError` 异常；在方法被权限策略拒绝时抛出 `SecurityError` 异常

`OTPCredential` 接口表示短信验证凭证

其 `code` 只读属性代表一个字符串，表示收到的短信验证码

```js
navigator.credentials
  .get({
    otp: {
      transport: ["sms"],
    },
  })
  .then((otp) => {
    console.log(otp.code)
  })
  .catch((err) => {
    console.error(err)
  })
```

## 步骤

1. 首先用户填写其手机号码，网页将其发送到应用服务器
2. 随后调用 navigator.credentials.get() 方法执行相关操作
3. 接着应用服务器向指定的手机号发送验证码短信
4. 随后用户代理会弹窗提醒用户是否允许网页访问验证码
5. 用户授权后可通过 navigator.credentials.get() 方法执行结果获取到验证码并可将其填写在网页上
6. 最终填写结果会发送给应用服务器进行验证，并进行后续一些操作

## 短信格式限制

限制短信最后一行必须以 @ 开头，后接调用 API 的网页的域名；随后以空格分隔，以 # 开头，后接短信验证码

```text
Your verification code is 123456.

@www.example.com #123456
```

若其在内嵌第三方网页中调用；且第一段需为顶层网页的域名；最后一行还需要增加以 # 开头，后接内嵌第三方网页的域名

```text
Your verification code is 123456.

@top-level.example.com #123456 @embedded.com
```

## 替代策略

可以利用 autocomplete 属性的 one-time-code 值在某种程度上提示用户代理自动填充短信验证码

```html
<input autocomplete="one-time-code" required/>
```

## 权限策略

该 API 调用受到 `otp-credentials` 权限策略的控制，可以通过 `Permissions-Policy` 响应头指定，或通过 `<iframe>` 标签的 `allow` 属性指定

默认值是 `self`，即允许同源的浏览上下文使用该 API

## 类型

```ts
interface OTPCredential extends Credential {
  readonly code: string
}

interface CredentialRequestOptions {
  otp: OTPCredentialRequestOptions
}

interface OTPCredentialRequestOptions {
  transport?: OTPCredentialTransportType[]
}

enum OTPCredentialTransportType {
  "sms",
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/WebOTP_API>
* <https://wicg.github.io/web-otp/>
