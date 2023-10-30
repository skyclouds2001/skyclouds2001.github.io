---
title: Vibration API
date: 2023-10-30 22:14:06
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
uniqueId: '2023-10-30 14:14:06/Vibration API.html'
mathJax: false
---

Vibration API 允许调用设备的振动功能

若设备不支持振动，调用该方法不会具有任何效果

## 振动

`Navigator` 接口的 `vibrate()` 方法负责执行振动

方法传入一个数值或一个数值数组，代表振动的模式

方法返回一个 boolean，表示是否因为方法参数的合法性导致能否进行振动

```js
navigator.vibrate(200)
navigator.vibrate([200])
navigator.vibrate([200, 100, 200])
navigator.vibrate(0)
```

若传入一个数值或仅有一个数值的数组，代表执行给定时间的一次振动

若传入一个数值数组，按照振动时间、暂停时间的循环执行振动

振动模式数组有一个用户代理定义的最大长度，传入超出此长度限制的数组会被截取至规定的长度

若传入参数前已有振动运行，会停止已有的振动并执行新的振动模式

若传入 0 或空数组或全 0 的数组，代表停止振动

需要注意的是，该方法要求在页面可见或存在用户交互的情况下调用，否则不具备效果

## 类型

```ts
interface Navigator {
  vibrate(pattern: VibratePattern): boolean
}

type VibratePattern = number | number[]
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API>
* <https://w3c.github.io/vibration/>
