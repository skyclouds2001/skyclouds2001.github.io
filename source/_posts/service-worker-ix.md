---
title: service-worker-ix
date: 2023-09-16 00:35:28
tags:
- Frontend
- JavaScript
- Browser
categories:
- [Frontend, Other]
thumbnail:
---

## ServiceWorker 使用 - Client & Worker

### 在 Worker 中获取 Client

Service Worker 中使用 Clients 接口提供对 Client 接口的访问，而使用 Client 接口表示受 Service Worker 控制的各执行上下文

受 Service Worker 控制的各执行上下文可以是 Worker、Shared Worker 以及 Window，分别被单个 Client 代表（其中 Window 被 WindowClient 代表）

* Clients 接口的 get() 方法根据给定的 id 获取对应的 Client 实例

接收一个字符串，代表 Client 的 id

返回一个 Promise 的 Client（或 undefined）

* Clients 接口的 matchAll() 方法获取所有匹配的 Client 实例

接收一组可选的配置项

配置项的 type 参数指定需匹配的 Client 类型，允许的值为 "window", "worker", "sharedworker" 和 "all"，默认为 "window"

配置项的 includeUncontrolled 参数指定是否返回未受控制的 Client，默认为 false

返回一个 Promise 的 Client 数组

* Clients 接口的 claim() 方法将所有匹配的 Client 实例置于当前 Service Worker 的控制之下

返回一个 Promise

* Clients 接口的 openWindow() 方法创建新的顶层上下文并加载给定的 URL

要求该 URL 需与 Service Worker 同源，并且要求最近需与用户发生交互

Firefox 中要求该方法必须在通知点击回调方法中调用

返回一个 Promise 的 WindowClient 实例或 null
