---
title: Push API
date: 2023-09-10 23:58:21
tags:
- Frontend
- Web API
categories:
- Frontend
- Web API
thumbnail: 
toc: true
recommend: 1
keywords: 
uniqueId: '2023-09-10 23:58:21/Push API.html'
mathJax: false
---

{% asset_img 推送消息.png %}

网页或者浏览器不在线的时候，推送消息无法被推送到客户端浏览器，此时推送消息就会被 FCM 服务器保存起来，等到网页或者浏览器上线的时候，FCM 服务器才会推送消息到网页或者浏览器

## 生成服务器公秘钥对

可以使用 web-push 来生成服务器公秘钥对。

```js
const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

const { publicKey, privateKey } = vapidKeys
```

其中私钥放在服务器保存，公钥用于注册推送订阅。

## 创建消息推送服务

可以利用 ServiceWorkerRegistration 接口的 pushManager 属性获取到当前 ServiceWorker 对应的 PushManager 接口实例。

PushManager 接口的 `subscribe()` 方法用于订阅一个消息推送服务。

其接收一组可选的配置项，`userVisibleOnly` 可选参数指定返回的推送是否只用于创建对用户可见的通知（不指定 true 会在一些浏览器中报错），`applicationServerKey` 可选参数指定服务的公钥（某些浏览器中是必须的参数）。

返回一个 Promise 的 PushSubscription 接口实例，代表当前推送消息。

在当前 ServiceWorker 没有创建消息推送服务时，新的消息推送会被创建。

```js
window.navigator.serviceWorker.ready.then((registration) => {
  // 订阅消息推送
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: '',
  }).then((subscription) => {
    console.log(subscription)
  })
})
```

```js
self.registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: '',
}).then((subscription) => {
  console.log(subscription)
})
```

## 获取推送消息服务

PushManager 接口的 `getSubscription()` 方法用于获取已经订阅的消息推送服务。

返回一个 Promise 的 PushSubscription 接口实例，代表当前已订阅的消息推送服务，否则返回一个 Promise 的 null。

```js
window.navigator.serviceWorker.ready.then((registration) => {
  // 获取已订阅的消息推送
  registration.pushManager.getSubscription().then((subscription) => {
    if (subscription != null) {
      console.log(subscription)
    }
  })
})
```

```js
self.registration.pushManager.getSubscription().then((subscription) => {
  if (subscription != null) {
    console.log(subscription)
  }
})
```

> PushSubscription 接口代表了订阅的消息推送。
>
> `endpoint` 属性代表与消息推送联系的 endpoint。
>
> `expirationTime` 属性代表订阅的消息推送的到期时间。
>
> `options` 属性代表创建消息推送时的选项。
>
> `getKey()` 方法返回一个 ArrayBuffer，代表客户端公钥的密钥，可以将其发送到服务器用于加密推送消息数据。支持传入一个代表用于生成客户端密钥的加密方法的参数，可以是 p256dh 或 auth。
>
> `toJSON()` 方法标准化地转换消息推送的信息，目前仅包含 endpoint 参数。
>
> `unsubscribe()` 方法取消消息推送的订阅，返回一个 Promise 的布尔值，代表是否成功取消了消息订阅。

## 发送推送消息

可以使用 web-push 在服务端来发送推送消息。

```js
import express from 'express'
import webpush from 'web-push'

const vapidKeys = {
    "publicKey": "BHXrxJPYpQSwGMwcN-HprCaU_Po9POIUvqWFLFq9UUNHP5SNJKxk_Io59y8_twMTOuB5SbpbcPBwHFo2kBUj7vQ", // 之前生成的 publicKey
    "privateKey": "Yhd4XF08Efh8HNF_8RDJ9VL6pF-Gos-3KOmgyMEUSf8" // 之前生成的 privateKey
}

// 在 google cloud platform 中创建的项目 ID
webpush.setGCMAPIKey('<Your GCM API Key Here>')

// 服务器运营者的联系邮箱
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const app = express()

app.get('/push', (req, res) => {
    // 这里的 pushSubscription 就是上面注册成功后返回的 subscription 对象
    const pushSubscription = {
      "endpoint": "https://fcm.googleapis.com/fcm/send/cSAH1Q7Fa6s:APA91bEgYeKNXMSO1rcGAOPzt3L9fMhyjL-zSPV5JfiKwgqtbx_Q4de_8plEY_QViLnhfe6-0fUgdo7Z3Gqpml3zIBSfO6IISDYdF9kzL2h_dbZ_FE_YKbKOG70gMG_A74xwK1vsocCv", // 推送订阅网址
      "keys": {
        "p256dh": "BAqZaMLZn_rtYeR7WsBLqBWG7uMiOGRyCx2uhOqm0ZaJwDdQac-ubAyRRdLXJVZDOrNe-B3mCTy3g0vHCkeyYyo", // 用户公钥
        "auth": "fxDt8RtB92KHpQM7HetBUw" // 用户身份验证秘密
      }
    }
    
    webpush.sendNotification(pushSubscription, 'Hello world')
      .then(result => {
        res.send(result);
      })
})

app.listen(1701, () => {
    console.log('Server start success at http://localhost:1701');
})
```

若使用 firebase 架构可使用 firebase 来实现消息推送。

## 监听消息推送

ServiceWorkerGlobalScope 接口的 `push` 事件在每次收到一条推送消息时触发。

返回一个 PushEvent 事件。

```js
self.addEventListener('push', (e) => {
  console.log(e)

  self.registration.showNotification(e.data?.json().title ?? 'New Notification')
})
```

> PushEvent 接口继承自 ExtendableEvent 接口。
>
> 其 data 属性代表该推送消息的内容，是一个 PushMessageData 实例。
>
> PushMessageData 接口包括多种处理推送的消息的方法，类似于 fetch API 中的方法，但允许被调用多次。
> 其 `arrayBuffer()` 方法、`blob()` 方法、`json()` 方法、`text()` 方法分别将结果转换成 ArrayBuffer、Blob、JSON 解析结果、字符串。
> 推送的消息能够自动被加解密，无需做额外的处理。

## 消息推送权限

PushManager 接口的 `permissionState()` 方法用于获取当前的请求消息推送权限。

参数同 subscribe 方法的参数。

返回一个 Promise 的 'prompt'、'denied'、'granted' 的字符串枚举。

```js
self.registration.pushManager.permissionState({
  userVisibleOnly: true,
  applicationServerKey: '',
}).then((state) => {
  switch(state) {
    case "denied":
      break
    case "granted":
      break
    case "prompt":
      break
  }
})
```

## 其他

PushManager 接口的 `supportedContentEncodings` 静态属性返回一组消息推送支持的加密方式。

ServiceWorkerGlobalScope 接口的 `pushsubscriptionchange` 事件在更新订阅的消息推送时触发（可能原因包括消息推送服务刷新、消息推送服务失效等）。

## 相关接口

```ts
type PushEncryptionKeyName = "auth" | "p256dh";

interface PushSubscriptionJSON {
  endpoint?: string;
  expirationTime?: EpochTimeStamp | null;
  keys?: Record<string, string>;
}

interface PushSubscriptionOptionsInit {
  applicationServerKey?: BufferSource | string | null;
  userVisibleOnly?: boolean;
}

interface PushEvent extends ExtendableEvent {
  readonly data: PushMessageData | null;
}

interface PushManager {
  getSubscription(): Promise<PushSubscription | null>;
  permissionState(options?: PushSubscriptionOptionsInit): Promise<PermissionState>;
  subscribe(options?: PushSubscriptionOptionsInit): Promise<PushSubscription>;
}

interface PushMessageData {
  arrayBuffer(): ArrayBuffer;
  blob(): Blob;
  json(): any;
  text(): string;
}

interface PushSubscription {
  readonly endpoint: string;
  readonly expirationTime: EpochTimeStamp | null;
  readonly options: PushSubscriptionOptions;
  getKey(name: PushEncryptionKeyName): ArrayBuffer | null;
  toJSON(): PushSubscriptionJSON;
  unsubscribe(): Promise<boolean>;
}

interface PushSubscriptionOptions {
  readonly applicationServerKey: ArrayBuffer | null;
  readonly userVisibleOnly: boolean;
}

interface ServiceWorkerRegistration extends EventTarget {
  readonly pushManager: PushManager;
}

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  onpush: ((this: ServiceWorkerGlobalScope, ev: PushEvent) => any) | null;
  onpushsubscriptionchange: ((this: ServiceWorkerGlobalScope, ev: Event) => any) | null;
}
```

## 源码链接

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/push.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/push.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/push.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/push.js)
