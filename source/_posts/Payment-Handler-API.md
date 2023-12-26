---
title: Payment Handler API
date: 2023-12-26 19:43:24
tags:
  - Frontend
  - Web API
categories:
  - Frontend
  - Web API
thumbnail:
cover:
toc: true
keywords:
recommend: 1
uniqueId: '2023-12-26 11:43:24/Payment Handler API.html'
mathJax: false
---

Payment Handler API 允许网站直接处理支付请求，而非重定向至额外的页面处理支付请求

网站可以使用 Payment Request API 创建支付请求，随后交由 Payment Handler API 处理，如寻找可用于支付的 APP、将它们作为可选的选项提供给用户、当用户选定后打开支付窗口以便用户输入支付细节以及与支付 APP 交互

## 基本流程

### 创建支付请求

通常首先调用 `PaymentRequest()` 构造方法创建一个支付请求

在支持的浏览器中，会根据传入的 `supportedMethods` 参数去请求对应的支付方式 manifest 文件

> 默认首先检测响应是否包含 `Link` 响应头，并且响应头是否包含 `rel="payment-method-manifest"`，那么将利用该参数指定的 URL 下载对应的资源解析后作为 manifest 文件
>
> 否则将解析响应，并将结果作为支付方式 manifest 文件

该支付方式 `manifest` 文件通常需要包含 `default_applications` 字段和 `supported_origins` 字段

> `default_applications` 字段表示支付应用的默认来源（通常是应用的 manifest 文件），在目标应用未下载时使用
>
> `supported_origins` 字段表示允许代替当前支付应用处理当前支付请求的其他支付应用，在目标应用未下载且列表中应用已下载时替代使用
> 
> 两字段均接收字符串数组

### 支付可用性

此时或之前调用 `PaymentRequest` 接口的 `canMakePayment()` 方法，检测对应支付方式是否可用（如支付方式被发现，处理支付方式的 APP 已下载或基于网络的支付应用已注册）

在 Payment Handler API 中，增加了触发在 `ServiceWorkerGlobalScope` 中的 `canmakepayment` 事件，该事件会在调用 `PaymentRequest()` 构造方法之后于对应支付应用注册的 Service Worker 中触发

在此事件回调中，可以调用 `CanMakePaymentEvent` 事件的 `respondWith()` 方法自定义支付方式的是否支持的信息

### 处理支付

随后在与用户发生交互后，调用 `PaymentRequest` 接口的 `show()` 方法显示浏览器提供的支付方式选择页面，此过程中会使用到支付方式 `manifest` 文件的 `name` 字段和 `icons` 字段

调用该方法之后，会在 `ServiceWorkerGlobalScope` 中触发 `paymentrequest` 事件，从而可以开始进行处理支付请求

如可以调用 `PaymentRequestEvent` 事件的 `openWindow()` 方法打开支付方式页面，用于用户填写支付请求信息

亦可以调用 `PaymentRequestEvent` 事件的 `respondWith()` 方法将支付请求执行结果返回给用户

### 管理支付

可以通过 `ServiceWorkerRegistration` 接口的 `paymentManager` 只读属性暴露的 `PaymentManager` 实例

如设置 `userHint` 属性向浏览器提供提示信息，可以在展示支付支付方式页面时显示

亦如调用 `enableDelegations()` 方法设置委托支付应用收集而非交由浏览器收集的支付信息

## 支付可用性

`ServiceWorkerGlobalScope` 中的 `canmakepayment` 事件在支付应用能够提供服务时，在其 Service Worker 中触发，返回一个 `CanMakePaymentEvent` 事件；通常在调用 `PaymentRequest()` 构造方法之后触发

调用 `CanMakePaymentEvent` 事件的 `respondWith()` 方法允许 Service Worker 控制发出可以处理支付请求的信号；方法需要传入一个兑现一个布尔值的 `Promise`

## 处理支付

`ServiceWorkerGlobalScope` 中的 `paymentrequest` 事件在支付请求创建时触发，返回一个 `PaymentRequestEvent` 事件；通常在调用 `PaymentRequest` 接口的 `show()` 方法之后触发

调用 `PaymentRequestEvent` 事件的 `openWindow()` 方法；方法传入一个字符串参数，代表执行支付的网站 URL（需要同源）；方法返回一个兑现一个 `WindowClient` 实例的 `Promise`

调用 `PaymentRequestEvent` 事件的 `respondWith()` 方法返回自定义的支付请求执行结果；方法需要传入一个兑现一个对象的 `Promise`

## 管理支付

`PaymentManager` 接口用于管理支付相关内容，通过 `ServiceWorkerRegistration` 接口的 `paymentManager` 只读属性使用

`PaymentManager` 接口的 `userHint` 属性用于设置显示支付方式页面时展示的信息，即 hint

`PaymentManager` 接口的 `enableDelegations()` 方法设置委托支付应用收集而非交由浏览器收集的支付信息

方法接收一个字符串数组参数，代表设置的支付信息，各项需为 `payerEmail` `payerName` `payerPhone` `shippingAddress` 之一 （分别代表支付者的邮箱、姓名、手机号和居住地址）

方法返回一个 `Promise`

## 类型

```ts
AbortPaymentEvent

CanMakePaymentEvent

PaymentManager

PaymentRequestEvent
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Payment_Handler_API>
* <https://w3c.github.io/payment-handler/>
