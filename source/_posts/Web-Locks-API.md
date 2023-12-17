---
title: Web Locks API
date: 2023-12-17 02:48:59
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
uniqueId: '2023-12-16 18:48:59/Web Locks API.html'
mathJax: false
---

Web Locks API 允许网页中的脚本异步地使用锁以控制任务的重复执行

该 API 可通过 `Navigator` 接口的 `locks` 属性或 `WorkerNavigator` 接口的 `locks` 属性使用

## 概念

该 API 中锁的概念与操作系统中的锁的概念类似

获取锁后，在执行任务时保持锁，完成任务后释放锁

在锁被保持时，同域内执行的其他脚本无法获取相同的锁，而是被放到执行队列中，在当前任务完成后并且锁被释放时，队列中的任务依次执行

因此多组执行脚本不会同时执行相同的任务，可用于数据同步等功能

另外，该 API 可能会出现死锁问题，因此需要谨慎避免复杂的嵌套锁，或设置合理的超时时间，亦注意合理地排序

该 API 支持的一些功能如，从异步任务中返回值，共享锁和独占锁模式，有条件获得锁，查询当前所有锁的状态，防止死锁的逃生舱

## 获取锁

`LockManager` 接口的 `request()` 方法用于请求获取锁

方法传入一个 `name` 参数，接受一个字符串，代表锁的标识符

方法可选地传入 `options` 参数，接收一个对象，代表锁的配置项

> 配置项的 `mode` 选项指定锁的模式，可以为 `exclusive` 或 `shared` 之一，默认为 `exclusive`
>
> > `exclusive` 表示对应的锁单个时间段内最多只能存在一个
> >
> > `shared` 表示对应的锁单个时间段内允许存在多个
>
> 配置项的 `ifAvailable` 选项指定是否在锁已被授予其他任务时继续调用，需要是一个布尔值，默认为 `false`
>
> 配置项的 `steal` 选项指定是否强制释放已被授予其他任务的锁，需要是一个布尔值，默认为 `false`
>
> 配置项的 `signal` 选项用于终止锁的请求，需要是一个 `AbortSignal`

方法传入一个 `callback` 参数，接受一个回调方法，代表锁的对应任务，在锁被授予时调用

> 该回调方法调用时会传入一个 `Lock` 实例，代表当前锁
>
> 该回调方法允许返回一个 Promise，任务执行时锁会等待 Promise 兑现或拒绝之后再释放

方法返回一个 Promise，兑现的值取决于 `callback` 回调方法的返回值

若当前文档未处于活跃状态，`InvalidStateError` 异常会被抛出

若当前环境无法获取到锁管理器，`SecurityError` 异常会被抛出

若 `name` 参数以 `-` 开头，或 `ifAvailable` 选项和 `steal` 选项同时指定为 `true`，或 `steal` 选项被指定为 `true` 并且 `mode` 选项被指定为 `shared`，或 `signal` 选项被指定且 `ifAvailable` 选项和 `steal` 选项之一被指定为 `true`，`NotSupportedError` 异常会被抛出

若 `signal` 选项被指定且已被终止，`AbortError` 异常会被抛出

> `Lock` 接口
>
> 其 `name` 参数指代请求锁时传递的锁标识符
>
> 其 `mode` 参数指代请求锁时传递的锁的模式

## 枚举锁

`LockManager` 接口的 `query()` 方法用于枚举当前域下所有的锁的状态

返回一个 Promise，兑现一个包含 `held` 属性和 `pending` 属性的对象，分别代表保持状态的锁和锁的进行中的请求；两属性均返回一个对象数组，包含类似 `Lock` 对象的 `name` 属性和 `mode` 属性以及 `clientId` 属性，该属性与 `Client` 接口的 `id` 属性相同

该方法生成的锁的状态只是在调用时间那一刻的快照，在调用之后实际状态可能随时发生改变

若当前文档未处于活跃状态，`InvalidStateError` 异常会被抛出

若当前环境无法获取到锁管理器，`SecurityError` 异常会被抛出

## 类型

```ts
interface NavigatorLocks {
  readonly locks: LockManager
}

interface Navigator extends NavigatorLocks {}

interface WorkerNavigator extends NavigatorLocks {}

interface Lock {
  readonly mode: LockMode
  readonly name: string
}

declare var Lock: {
  prototype: Lock
}

interface LockManager {
  query(): Promise<LockManagerSnapshot>
  request(name: string, callback: LockGrantedCallback): Promise<any>
  request(name: string, options: LockOptions, callback: LockGrantedCallback): Promise<any>
}

declare var LockManager: {
  prototype: LockManager
}

type LockMode = "exclusive" | "shared"

interface LockGrantedCallback {
  (lock: Lock | null): any
}

interface LockInfo {
  clientId?: string
  mode?: LockMode
  name?: string
}

interface LockManagerSnapshot {
  held?: LockInfo[]
  pending?: LockInfo[]
}

interface LockOptions {
  ifAvailable?: boolean
  mode?: LockMode
  signal?: AbortSignal
  steal?: boolean
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API>
* <https://w3c.github.io/web-locks/>
