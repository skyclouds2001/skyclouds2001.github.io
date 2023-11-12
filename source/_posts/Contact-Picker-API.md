---
title: Contact Picker API
date: 2023-11-12 03:37:51
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
uniqueId: '2023-11-11 19:37:51/Contact Picker API.html'
mathJax: false
---

Contact Picker API 允许用户从通讯录选择记录并与网页应用分享

该 API 通过 `ContactsManager` 接口使用，并通过 `Navigator.contacts` 向用户暴露

## 检测支持的参数

调用 `ContactsManager` 接口的 `getProperties()` 方法以获取当前设备支持的参数列表

方法返回 Promise 的字符串列表，值具体在 `"address"` `"email"` `"icon"` `"name"` `"tel"` 之中，代表设备通讯录支持的参数类型

```js
const properties = await navigator.contacts.getProperties()
```

## 获取通讯录记录

调用 `ContactsManager` 接口的 `select()` 方法以获取通讯录记录

方法接收一个字符串数组，值需要在 `"address"` `"email"` `"icon"` `"name"` `"tel"` 之中，代表需要获取的通讯录记录的参数

方法可以接收一个可选的配置项参数，其 `multiple` 选项指定是否支持选择多条记录，默认 `false`

方法返回一个对象数组，代表获取到的通讯录记录；数组各项均包含 `"address"` `"email"` `"icon"` `"name"` `"tel"` 字段

若方法未在顶层浏览上下文调用，或当前已有其他该方法的调用，或启动通讯录选择器失败，则抛出 `InvalidStateError` 异常

若方法非因为用户交互调用，则抛出 `SecurityError` 异常

若方法传入一个空数组，或传入的数组任一项当前设备不支持，则抛出 `TypeError` 异常

```js
const contacts = await navigator.contacts.select(properties)
```

## 通讯录记录细节

* `"address"` 返回 `ContactAddress` 数组，代表各记录的地址

* `"email"` 返回 `string` 数组，代表各记录的邮箱

* `"icon"` 返回 `Blob` 数组，代表各记录的图标

* `"name"` 返回 `string` 数组，代表各记录的名称

* `"tel"` 返回 `string` 数组，代表各记录的电话

## 类型

```ts
interface Navigator {
  readonly contacts: ContactsManager
}

type ContactProperty = "address" | "email" | "icon" | "name" | "tel"

interface ContactAddress {
  toJSON(): Object
  readonly city: string
  readonly country: string
  readonly dependentLocality: string
  readonly organization: string
  readonly phone: string
  readonly postalCode: string
  readonly recipient: string
  readonly region: string
  readonly sortingCode: string
  readonly addressLine: string[]
}

interface ContactInfo {
  address: ContactAddress[]
  email: string[]
  icon: Blob[]
  name: string[]
  tel: string[]
}

interface ContactsSelectOptions {
  multiple?: boolean
}

interface ContactsManager {
  getProperties(): Promise<ContactProperty[]>
  select(properties: ContactProperty[], options?: ContactsSelectOptions): Promise<ContactInfo[]>
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Contact_Picker_API>
* <https://w3c.github.io/contact-picker/>
