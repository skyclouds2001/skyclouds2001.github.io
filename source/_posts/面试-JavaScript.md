---
title: 面试-JavaScript
date: 2023-09-27 00:18:54
tags:
  - Interview
categories:
  - Interview
thumbnail: 
cover: 
toc: true
recommend: 1
keywords: 
uniqueId: '2023-09-26 16:18:54/面试-JavaScript.html'
mathJax: false
---

## 宏任务与微任务

宏任务（普通脚本，setTimeout，setInterval，I/O，UI 渲染）

微任务（Promise，MutationObserver）

特殊任务 `process.nextTick()` 当前 event loop tick 将结束时且下一个 event loop tick 将开始时执行

特殊任务 `setImmediate()` 下一轮 event loop tick 的 macrotask 阶段将结束时执行

## 事件循环（Node）

- 同步任务
- 发出异步请求
- 规划定时器生效的时间
- 执行process.nextTick()的回调

- timers - 处理setTimeout()和setInterval()的回调函数
- I/O callbacks - 剩余的回调函数（setTimeout、setInterval、setImmediate及关闭请求回调函数之外）
- idle, prepare - 内部使用
- poll - 轮询时间，等待还未返回的 I/O 事件
- check - 执行setImmediate()的回调
- close callbacks - 关闭请求的回调
