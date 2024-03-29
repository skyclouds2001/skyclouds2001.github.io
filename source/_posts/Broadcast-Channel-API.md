---
title: Broadcast Channel API
date: 2023-11-02 15:30:25
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
uniqueId: '2023-11-02 07:30:25/Broadcast Channel API.html'
mathJax: false
---

Broadcast Channel API 允许在同源的浏览上下文中交换数据

## 创建广播频道

通过直接调用 `BroadcastChannel()` 构造函数来创建一个广播频道

需要传递一个字符串参数，代表广播频道的名称

若该名称的广播频道已经创建，则会复用并加入已有的广播频道

```js
const bc = new BroadcastChannel('bc')
```

传递的广播频道名称可以经由 `BroadcastChannel` 实例的 `name` 只读属性读取

## 发送消息

通过调用 `BroadcastChannel` 实例的 `postMessage()` 方法来向广播频道发送消息

```js
bc.postMessage('message')
```

发送的消息会经由结构化克隆算法处理，因此任意可由结构化克隆算法处理的类型的数据均可发送

## 订阅消息

通过监听 `BroadcastChannel` 实例的 `message` 事件监听成功接收的消息

```js
bc.addEventListener('message', (e) => {
    console.log(e.data)
})
```

通过监听 `BroadcastChannel` 实例的 `messageerror` 事件监听接收失败的消息

```js
bc.addEventListener('messageerror', (e) => {
    console.log(e.data)
})
```

## 关闭广播频道

通过调用 `BroadcastChannel` 实例的 `close()` 方法来断开与广播频道的连接

```js
bc.close()
```

广播频道在没有任一浏览上下文连接至其时被回收

## 示例

<div id="broadcast-channel" style="gap: 25px" role="article">
  <span>收到的信息为：</span>
  <label>
    <input type="text" />
  </label>
  <button>发送</button>
  <script type="module">
    const name = 'broadcast-channel';
    const span = document.querySelector('#broadcast-channel span');
    const input = document.querySelector('#broadcast-channel input');
    const button = document.querySelector('#broadcast-channel button');
    const broadcast = new BroadcastChannel(name);
    broadcast.addEventListener('message', (e) => {
      span.innerText = '接收到信息为：' + e.data;
    });
    button.addEventListener('click', () => {
      broadcast.postMessage(input.value);
    });
  </script>
</div>

## 类型

```ts
interface BroadcastChannel extends EventTarget {
  readonly name: string
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null
  onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null
  close(): void
  postMessage(message: any): void
}

declare var BroadcastChannel: {
  prototype: BroadcastChannel
  new(name: string): BroadcastChannel
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API>
* <https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts>
