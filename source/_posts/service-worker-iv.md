---
title: ServiceWorker IV
date: 2023-09-10 21:26:07
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
uniqueId: '2023-09-10 21:26:07/ServiceWorker IV.html'
mathJax: false
---

## Service Worker 使用 - 通知 Notification

### 创建通知

ServiceWorkerRegistration 接口的 `showNotification()` 方法用于在对应的 Service Worker 上创建一条（系统）通知，该通知的相关操作会在对应的 Service Worker 全局上下文上触发相应的事件。

该方法接受一个字符串作为通知的标题，并接受一组配置项作为通知的选项，相关参数类似 Notification 构造函数的选项；返回一个无参的 Promise。

浏览器环境中可以利用 `navigator.serviceWorker.ready` 等属性或方法获取到 ServiceWorkerRegistration 实例以创建通知。

```js
window.navigator.serviceWorker.ready.then((registration) => {
  registration.showNotification('Hello', {
    body: 'this is a notification',
    icon: '<url>',
    actions: [
      {
        title: 'Yes',
        action: 'Yes',
      },
      {
        title: 'No',
        action: 'No',
      },
    ],
  })
})
```

Service Worker 环境可以利用 `self.registration` 属性获取到当前 Service Worker 对应的 ServiceWorkerRegistration 实例以创建通知。

```js
self.registration.showNotification('Hello', {
  body: 'this is a notification',
  icon: '<url>',
  actions: [
    {
      title: 'Yes',
      action: 'Yes',
    },
    {
      title: 'No',
      action: 'No',
    },
  ],
})
```

*需要注意的是，ServiceWorker 内无法调用 Notification 构造函数来创建通知。*

### 请求通知权限

需要注意的是，创建一条 Notification 需要用户授予通知权限，可以使用 `Notification.permission` 属性检测用户是否授予了通知权限，并使用 `Notification.requestPermission()` 静态方法向用户请求通知权限。

```js
if (Notification.permission === 'granted') {
  // just go to create the notification
} else if (Notification.permission != 'denied') {
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      // then go to create the notification
    }
  })
}
```

### 获取通知

ServiceWorkerRegistration 接口的 `getNotifications()` 方法用于获取在对应的 Service Worker 上创建的（系统）通知。

该方法支持传入一组筛选项，其仅支持 tag 参数，以筛选返回结果的通知；该方法返回一个 Promise 的 Notification 列表

可以使用该方法获取到通知再进行修改。

```js
window.navigator.serviceWorker.ready.then((registration) => {
  registration.getNotifications({
    tag: 'tag',
  }).then((notifications) => {
    // use notifications to do something
  })
})
```

```js
self.registration.getNotifications({
  tag: 'tag',
}).then((notifications) => {
  //
})
```

### 通知处理

当与当前 Service Worker 对应的通知被点击时，在 Service Worker 全局触发 notificationclick 事件。

```js
self.addEventListener('notificationclick', (e) => {
  // 返回一个 NotificationEvent 事件对象
  console.log('Notification click', e)
})
```

当与当前 Service Worker 对应的通知被关闭时，在 Service Worker 全局触发 notificationclose 事件。

```js
self.addEventListener('notificationclose', (e) => {
  // 返回一个 NotificationEvent 事件对象
  console.log('Notification close', e)
})
```

> NotificationEvent 接口继承自 ExtendableEvent 接口
>
> * `notification` 属性代表触发事件的 Notification 实例
>
> * `action` 顺序代表触发事件的 action 的 ID

### 源码链接

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/notification.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/notification.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/notification.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/notification.js)
