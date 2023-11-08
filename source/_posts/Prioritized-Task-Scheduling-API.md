---
title: Prioritized Task Scheduling API
date: 2023-11-08 11:39:12
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
uniqueId: '2023-11-08 03:39:12/Prioritized Task Scheduling API.html'
mathJax: false
---

Prioritized Task Scheduling API 提供了标准化的任务的优先级排序的方式

通过该 API 能够设定和改变任务优先级，延迟将任务添加至调度程序，终止任务或监听任务优先级改变事件

该 API 定义的任务优先级分类是比较粗糙的，开发者可以根据需要自定义更加细化的任务优先级分类

该 API 通过 `scheduler` 全局属性暴露 `Scheduler` 实例使用

## 创建任务

调用 `Scheduler` 接口的 `postTask()` 方法以创建任务

方法传入一个回调函数，代表该任务的内容

方法亦传入一个可选的配置项：

其 `priority` 选项指定任务的优先级，接收一个字符串，值为 `user-blocking` `user-visible` `background`，默认值为 `user-visible`

其 `signal` 选项提供任务的控制器，可以为一个 `TaskSignal` 或 `AbortSignal`，用于终止任务或调整任务优先级

其 `delay` 选项指定任务添加至任务队列的延迟时间，默认为 `0`

方法的返回值是一个 Promise，其具体值取决于回调函数的返回值或抛出的异常

```js
scheduler.postTask(() => 'a task', {
  priority: 'user-visible',
})
  .then((result) => {
    console.log('execute success with:', result)
  })
  .catch((error) => {
    console.error('execute fail with:', error)
  })
```

> 任务优先级
>
> `user-blocking` 优先级最高，表明该任务可能阻止用户与网页交互
>
> `user-visible` 优先级一般，表面该任务会让用户察觉但不致阻止用户与网页交互
>
> `background` 优先级最低，表面该用户不会对用户产生影响

任务的执行顺序优先按任务优先级执行，其次按照定义顺序执行

## 延迟任务

在任务创建时向 `delay` 选项传入一个正整数

```js
scheduler.postTask(() => 'a task', {
  delay: 1000,
})
```

## 终止任务

在任务创建时向 `signal` 选项传入一个 `TaskSignal` 或 `AbortSignal` 参数

在必要时候调用 `AbortController` 或 `TaskController` 的 `abort()` 方法以终止任务

```js
const controllor = new AbortController()

scheduler.postTask(() => 'a task', {
  signal: controllor.signal,
})

controllor.abort()
```

## 更改任务优先级

在任务创建时向 `signal` 选项传入一个 `TaskSignal` 参数

在必要时候调用 `TaskController` 的 `setPriority()` 方法以重新设置任务的优先级

```js
const controller = new TaskController()

scheduler.postTask(() => 'a task', {
  signal: controllor.signal,
})

controller.setPriority("background")
```

调用 `TaskController()` 构造函数创建一个 `TaskController` 实例

构造函数接收一个可选的配置项，其参数 `priority` 指定初始的任务优先级，默认值为 `"user-visible"`

`TaskController` 接口的 `signal` 属性返回一个 `TaskSignal` 实例，反映与当前 `TaskController` 相对的 `TaskSignal` 实例

使用 `TaskController` 接口的 `setPriority()` 方法更改当前任务的优先级

方法接收一个字符串，代表任务新的优先级

此外，`TaskSignal` 实例的 `priority` 只读属性反映 signal 对应的任务的优先级

`TaskSignal` 实例的 `prioritychange` 事件在 signal 对应的任务的优先级改变时触发，返回一个 `TaskPriorityChangeEvent` 事件，其 `previousPriority` 参数指定改变前的任务的优先级

```js
controller.signal.addEventListener("prioritychange", (e) => {
  console.log('previous', e.previousPriority)
  console.log('current', controller.signal.priority /* 或 e.target.priority */)
})
```

## 类型

```ts
type TaskPriority = "user-blocking" | "user-visible" | "background"

interface SchedulerPostTaskOptions {
  signal?: AbortSignal
  priority?: TaskPriority
  delay?: number
}

type SchedulerPostTaskCallback = Function

interface Scheduler {
  postTask(callback: SchedulerPostTaskCallback, options?: SchedulerPostTaskOptions): Promise<any>
}

interface TaskPriorityChangeEvent extends Event {
  constructor(type: string, priorityChangeEventInitDict: TaskPriorityChangeEventInit)

  readonly previousPriority: TaskPriority
}

interface TaskPriorityChangeEventInit extends EventInit {
  previousPriority: TaskPriority
}

interface TaskControllerInit {
  priority: TaskPriority
}

interface TaskController extends AbortController {
  constructor(init: TaskControllerInit)

  setPriority(priority: TaskPriority): void
}

interface TaskSignal extends AbortSignal {
  readonly priority: TaskPriority

  onprioritychange: ((this: TaskSignal, ev: TaskPriorityChangeEvent) => any) | null
}

interface WindowOrWorkerGlobalScope {
  readonly scheduler: Scheduler
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Prioritized_Task_Scheduling_API>
* <https://wicg.github.io/scheduling-apis/>
