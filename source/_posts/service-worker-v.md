---
title: service-worker-V
date: 2023-09-10 23:58:21
tags:
- Frontend
- JavaScript
- Browser
categories:
- [Frontend, Other]
thumbnail:
---

## Service Worker 使用 - 推送消息

{% asset_img 推送消息.png %}

### 生成服务器公秘钥对

可以使用 web-push 来生成服务器公秘钥对

```js
const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

const { publicKey, privateKey } = vapidKeys
```

其中私钥放在服务器保存，公钥用于注册推送订阅

### 创建推送消息

```js
window.navigator.serviceWorker.ready.then((registration) => {
  // 订阅推送消息
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: '',
  }).then((subscription) => {
    console.log(subscription)
  })

  // 获取已订阅的推送消息
  registration.pushManager.getSubscription().then((subscription) => {
    if (subscription != null) {
      console.log(subscription)
    }
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

self.registration.pushManager.getSubscription().then((subscription) => {
  if (subscription != null) {
    console.log(subscription)
  }
})
```

### 发送推送消息

可以使用 web-push 来发送推送消息

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

若使用 firebase 架构可使用 firebase 来实现消息推送

### 监听推送消息

```js
self.addEventListener('push', (e) => {
  console.log(e)

  self.registration.showNotification(e.data?.json().title)
})
```

### 其他

网页或者浏览器不在线的时候，推送消息是无法被推送到你的浏览器的，此时推送消息就会被FCM服务器保存起来，等到网页或者浏览器上线的时候，FCM 服务器才会推送消息到网页或者浏览器
