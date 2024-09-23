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

宏任务（普通脚本，`setTimeout()`，`setInterval()`，I/O，UI 渲染）

微任务（`Promise`，`MutationObserver`）

特殊任务 `process.nextTick()` 当前 event loop tick 将结束时且下一个 event loop tick 将开始时执行

特殊任务 `setImmediate()` 下一轮 event loop tick 的 macrotask 阶段将结束时执行

## 事件循环（Node）

- 同步任务
- 发出异步请求
- 规划定时器生效的时间
- 执行 `process.nextTick()` 的回调

- timers - 处理 `setTimeout()` 和 `setInterval()` 的回调函数
- I/O callbacks - 剩余的回调函数（`setTimeout()`、`setInterval()`、`setImmediate()` 及关闭请求回调函数之外）
- idle, prepare - 内部使用
- poll - 轮询时间，等待还未返回的 I/O 事件
- check - 执行 `setImmediate()` 的回调
- close callbacks - 关闭请求的回调

## 继承模式

- 原型链继承

  ```js
    SubType.prototype = new SuperType()
    SubType.prototype.constructor = SubType
  ```

- 构造函数继承

  ```js
    SuperType.call(this, superProp)
  ```

- 组合式继承

  ```js
    function SuperType(superProp){
      this.superProp = superProp
    }
    SuperType.prototype.printSuperProp = function(){
      console.log(this.superProp)
    }

    function SubType(superProp, subProp){
      SuperType.call(this, superProp)
      this.subProp = subProp
    }
    SubType.prototype = new SuperType()
    SubType.prototype.constructor = SubType
    SubType.prototype.printSubProp = function(){
      console.log(this.subProp)
    }
  ```

- 寄生组合式继承

  ```js
    function SuperType(superProp){
      this.superProp = superProp
    }
    SuperType.prototype.printSuperProp = function(){
      console.log(this.superProp)
    }

    function SubType(superProp, subProp){
      SuperType.call(this, superProp)
      this.subProp = subProp
    }
    SubType.prototype = Object.create(SuperType.prototype)
    SubType.prototype.constructor = SubType
    SubType.prototype.printSubProp = function(){
      console.log(this.subProp)
    }
  ```
