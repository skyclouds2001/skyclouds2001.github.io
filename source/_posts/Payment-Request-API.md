---
title: Payment Request API
date: 2023-12-25 18:07:43
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
uniqueId: '2023-12-25 10:07:43/Payment Request API.html'
mathJax: false
---

Payment Request API 允许用户创建个人的付款方式以及选择偏好程度，并提供给网站及开发者使用

## 创建支付请求

调用 PaymentRequest() 构造方法创建一个 PaymentRequest 实例，代表实际的支付请求

方法需要传入一个对象数组参数，表示受网站支持的支付方式列表

> 该对象具有如下一些参数：
>
> - `supportedMethods` 参数，接收一个字符串，表示支付方式的标识符，可以为一个指向支付平台的 URL 或一个标准化的支付方式标识符
>
> - `data` 可选参数，接收一个可序列化的对象，表示支付方式的额外信息
>
> 注意 `supportedMethods` 参数的不同取值可能影响 `data` 参数的取值
>
> 当 `supportedMethods` 参数指定为 `secure-payment-confirmation` 时， `data` 参数需要为一个 SecurePaymentConfirmationRequest 结构的对象

方法需要传入一个对象参数，表示当前支付请求的信息

> 该对象具有如下一些参数：
>
> - `total` 参数，接收一个对象，表示支付请求的总条目
>
>   > 该对象具有如下一些参数：
>   >
>   > - `label` 参数，接收一个字符串，表示支付请求的条目名称
>   >
>   > - `amount` 参数，接收一个数值，表示支付请求的条目价格
>   >
>   > - `pending` 可选参数，接收一个布尔值，表示支付请求的条目名称；默认为 false
>
> - `id` 可选参数，接收一个字符串，表示支付请求的 ID；若不指定浏览器将自动生成
>
> - `displayItems` 可选参数，接收一个对象数组，表示支付请求的条目细节；默认为空数组；结构同 `total` 参数
>
> - `modifiers` 可选参数，接收一个对象数组，表示支付请求针对特定支付方式的修改，如用于针对不同支付渠道调整支付总额
>
>   > 该对象具有如下一些参数：
>   >
>   > - `supportedMethods` 参数，接收一个字符串，表示支付方式的标识符，可以为一个指向支付平台的 URL 或一个标准化的支付方式标识符
>   >
>   > - `total` 可选参数，接收一个对象，表示支付请求的总条目，结构同 `total` 可选参数
>   >
>   > - `additionalDisplayItems` 可选参数，接收一个对象数组，表示额外的支付请求的总条目，结构同 `total` 可选参数
>   >
>   > - `data` 可选参数，接收一个可序列化的对象，表示支付方式的额外信息

## 显示支付请求

调用 `PaymentRequest` 接口的 `show()` 方法显示已创建的支付请求

方法接收一个可选的对象参数，表示更新的支付请求参数，会覆盖原有的支付请求参数

> 该对象具有如下一些参数：
>
> `id` 可选参数 `displayItems` 可选参数与 `modifiers` 可选参数，同 `PaymentRequest` 构造函数的第二参数的相应参数
>
> `paymentMethodErrors` 可选参数

方法返回一个 `Promise`，其兑现一个 `PaymentResponse` 实例，表示支付请求的结果

## 取消支付请求

调用 `PaymentRequest` 接口的 `abort()` 方法提前终止支付请求，同时移除任何由其产生的界面

方法返回一个 `Promise`

## 支付请求可用性

调用 `PaymentRequest` 接口的 `canMakePayment()` 方法检测给定的支付请求是否受用户代理支持

方法返回一个 `Promise`，其兑现一个布尔值，表示给定支付请求能否正常完成

可以在调用 `show()` 方法前预先调用 `canMakePayment()` 方法，以检测对应方支付请求能否正常进行；或尽早使用类似参数新建实例，调用该实例的 `canMakePayment()` 方法检测是否受支持，再在必要时候新建另一个实例执行真正的支付请求

## 支付请求信息

可以通过 `PaymentRequest` 接口的 `id` 只读属性返回一个字符串，反映当前支付请求的 ID，由构造时传入的 `id` 参数决定

可以监听 `PaymentRequest` 接口的 `paymentmethodchange` 事件监听因为用户在界面中更改支付方式产生的变化，返回一个 `PaymentMethodChangeEvent` 事件

> `PaymentMethodChangeEvent` 事件继承自 `PaymentRequestUpdateEvent` 事件
>
> 其 `methodDetails` 只读属性，返回一个对象或 `null`，表示当前支付请求细节
>
> 其 `methodName` 只读属性，返回一个字符串，表示当前的支付请求方式

> `PaymentRequestUpdateEvent` 事件继承自 `Event` 事件
>
> 其 `updateWith()` 方法，接收一个对象参数或一个兑现一个对象的 `Promise`，表示更新的支付请求参数；结构同 `show()` 方法的参数

## 支付结果操作

`PaymentResponse` 接口的 `complete()` 方法通知用户代理支付请求已经完成

方法传入一个字符串可选参数，值为 `fail` `success` `unknown` 之一，表示支付请求的结果；默认为 `unknown`

方法传入一个对象可选参数，其 `data` 参数接收一个对象，表示额外的支付请求信息

方法返回一个 `Promise`

`PaymentResponse` 接口的 `retry()` 方法请求用户重新发起支付请求

方法传入一个对象可选参数，其 `error` 参数接收一个字符串，表示错误信息；其 `paymentMethod` 参数接收一个字符串，表示支付请求方法

方法返回一个 `Promise`

## 支付结果信息

`PaymentResponse` 接口表示支付结果

其 `requestId` 只读属性返回一个字符串，反映当前支付结果对应的支付请求的 ID，由构造时传入的 `id` 参数决定

其 `methodName` 只读属性返回一个字符串，反映当前支付结果方式

其 `details` 只读属性返回一个对象或 `null`，反映当前支付结果细节，通常由支付平台返回

其 `toJSON()` 方法返回一个序列化的对象，表示当前的支付结果

## 类型

```ts
PaymentRequest

PaymentResponse

PaymentMethodChangeEvent

PaymentRequestUpdateEvent
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API>
* <https://w3c.github.io/payment-request/>
