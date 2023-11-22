---
title: Navigation API
date: 2023-11-21 19:41:20
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
uniqueId: '2023-11-21 11:41:20/Navigation API.html'
mathJax: false
---

Navigation API 提供了启动、拦截和管理浏览器导航行为的能力，同时允许检查应用的历史条目

该 API 是对 History API 和 Location 的扩展和补充

该 API 旨在提供 SPA (Single-Page Applications) 应用所需的功能

该 API 通过 `Window` 接口的 `navigation` 指定属性访问全局的 `Navigation` 实例使用

## 导航历史记录获取

`Navigation` 接口的 `entries()` 方法返回所有导航历史记录

方法返回一个 `NavigationHistoryEntry` 数组

```js
function getNavigateEntries() {
  return window.navigation.entries()
}
```

`Navigation` 接口的 `currentEntry` 只读属性返回一个 `NavigationHistoryEntry`，返回当前的导航历史记录

`Navigation` 接口的 `transition` 只读属性返回一个 `NavigationTransition` 或 `null`，返回当前进行中的导航

```js
async function handleTransition() {
  if (navigation.transition != null) {
    showLoadingSpinner();
    await navigation.transition.finished;
    hideLoadingSpinner();
  }
}
```

## 导航历史记录操作

`Navigation` 接口的 `navigate()` 方法用于导航至指定 URL，并更新导航历史记录

方法接受一个字符串参数，代表导航目标的 URL

方法接受一个可选的配置项：参数 `info` 允许传递自定义的任何类型的数据，该参数可通过触发的 `navigate` 事件后通过返回的 `NavigateEvent` 事件的 `info` 参数传递；参数 `state` 允许传递自定义的任何可结构化克隆类型的数据，该参数可通过与之相应的 `NavigationHistoryEntry` 实例的 `getState()` 方法获取；参数 `history` 允许传递 `auto` （默认 `push`，特定情况下 `replace`） `push` （新增一条 NavigationHistoryEntry 记录） `replace` （替代当前 `NavigationHistoryEntry` 记录） 字符串中之一，默认值 `auto`

两方法均返回一个对象，对象的 `committed` 参数在可见 URL 改变，同时新的 `NavigationHistoryEntry` 实例创建时完成，对象的 `finished` 参数在所有 `intercept()` 方法完成时完成（等价于 `NavigationTransition` 接口的 `finished` 属性完成，同时 `navigatesuccess` 事件触发），两参数均返回 Promise 的 `NavigationHistoryEntry` 实例

方法可能抛出 `SyntaxError` 异常，如 URL 解析失败

方法可能抛出 `NotSupportedError` 异常，如 `history` 选项设定为 push 且当前显示 about:blank 页面或 URL 协议为 javascript

方法可能抛出 `DataCloneError` 异常，如 `state` 选项数据无法被结构化克隆

方法可能抛出 `InvalidStateError` 异常，如当前文档未处于活跃状态或当前文档处于卸载中状态或当前记录处于第一条或最后一条

方法可能抛出 `AbortError` 异常，若当前导航被终止

```js
async function handleNavigate() {
  await window.navigation.navigate('/newPage', {
    info: { newInfo: 'newInfo' },
    state: { newState: 'newState' },
  }).finished
}
```

`Navigation` 接口的 `reload()` 方法用于重新加载当前 URL

方法接受一个可选的配置项：参数 `info` 允许传递自定义的任何类型的数据，该参数可通过触发的 `navigate` 事件后通过返回的 `NavigateEvent` 事件的 `info` 参数传递；参数 `state` 允许传递自定义的任何可结构化克隆类型的数据，该参数可通过与之相应的 `NavigationHistoryEntry` 实例的 `getState()` 方法获取

两方法均返回一个对象，对象的 `committed` 参数在可见 URL 改变，同时新的 `NavigationHistoryEntry` 实例创建时完成，对象的 `finished` 参数在所有 `intercept()` 方法完成时完成（等价于 `NavigationTransition` 接口的 `finished` 属性完成，同时 `navigatesuccess` 事件触发），两参数均返回 Promise 的 `NavigationHistoryEntry` 实例

方法可能抛出 `DataCloneError` 异常，如 `state` 选项数据无法被结构化克隆

方法可能抛出 `InvalidStateError` 异常，如当前文档未处于活跃状态或当前文档处于卸载中状态或当前记录处于第一条或最后一条

```js
async function handleReload() {
  await window.navigation.reload({
    state: { ...navigation.currentEntry.getState(), newState: 'newState' },
  }).finished
}
```

`Navigation` 接口的 `updateCurrentEntry()` 方法用于更新当前导航历史记录的 `state` 数据，同时避免执行重新加载和导航操作

方法可能抛出 `DataCloneError` 异常，如 `state` 选项数据无法被结构化克隆

方法可能抛出 `InvalidStateError` 异常，如 `Navigation.currentEntry` 为 `null`，即当前页面为 `about:blank`

```js
function updateCurrentState() {
  window.navigation.updateCurrentEntry({
    state: { newState: 'newState' },
  })
}
```

## 导航历史记录前进或后退

`Navigation` 接口的 `canGoBack` 只读属性返回一个 `boolean`，表示当前是否可以进行导航后退，例如当前记录为导航历史记录中第一条

`Navigation` 接口的 `canGoForward` 只读属性返回一个 `boolean`，表示当前是否可以进行导航前进，例如当前记录为导航历史记录中最后一条

`Navigation` 接口的 `back()` 方法在导航历史记录向后导航一条记录

`Navigation` 接口的 `forward()` 方法在导航历史记录向前导航一条记录

两方法均接受一个可选的配置项，配置项唯一参数 `info` 允许传递自定义的任何类型的数据，该参数通过触发的 `navigate` 事件后通过返回的 `NavigateEvent` 事件的 `info` 参数传递

两方法均返回一个对象，对象的 `committed` 参数在可见 URL 改变，同时新的 `NavigationHistoryEntry` 实例创建时完成，对象的 `finished` 参数在所有 `intercept()` 方法完成时完成（等价于 `NavigationTransition` 接口的 `finished` 属性完成，同时 `navigatesuccess` 事件触发），两参数均返回 Promise 的 `NavigationHistoryEntry` 实例

两方法均在导航目标超出范围时抛出 `InvalidStateError` 异常，如当前文档未处于活跃状态或当前文档处于卸载中状态或当前记录处于第一条或最后一条

```js
async function goBack() {
  if (window.navigation.canGoBack) {
    await window.navigation.back().finished
  }
}

async function goForward() {
  if (window.navigation.canGoForward) {
    await window.navigation.forward().finished
  }
}
```

## 导航历史记录指定跳转

`Navigation` 接口的 `traverseTo()` 方法在导航历史记录中导航至指定历史记录

方法接受一个字符串参数，代表指定历史记录的唯一标识，与 `NavigationHistoryEntry` 实例的 `key` 参数类似

方法接受一个可选的配置项，配置项唯一参数 `info` 允许传递自定义的任何类型的数据，该参数通过触发的 `navigate` 事件后通过返回的 `NavigateEvent` 事件的 `info` 参数传递

方法在导航目标超出范围时抛出 `InvalidStateError` 异常，如当前文档未处于活跃状态或 `key` 参数对应的记录不存在

```js
function initBackToHomeButton() {
  BackToHomeButton.onclick = window.navigation.traverseTo(window.navigation.currentEntry.key)
}
```

## 示例

<div id="navigation" role="article">
  <style></style>

  <script type="module"></script>
</div>

## 类型

```ts
interface Window {
  readonly navigation: Navigation
}

interface Navigation extends EventTarget {
  entries(): NavigationHistoryEntry[]
  readonly currentEntry?: NavigationHistoryEntry
  updateCurrentEntry(options: NavigationUpdateCurrentEntryOptions): void
  readonly transition?: NavigationTransition

  navigate(url: string, options?: NavigationNavigateOptions): NavigationResult
  reload(options?: NavigationReloadOptions): NavigationResult

  readonly canGoBack: boolean
  readonly canGoForward: boolean

  back(options?: NavigationOptions): NavigationResult
  forward(options?: NavigationOptions): NavigationResult
  traverseTo(key: string, options?: NavigationOptions): NavigationResult

  oncurrententrychange: ((this: Navigation, ev: NavigationCurrentEntryChangeEvent) => any) | null
  onnavigate: ((this: Navigation, ev: NavigateEvent) => any) | null
  onnavigateerror: ((this: Navigation, ev: NavigateEvent) => any) | null
  onnavigatesuccess: ((this: Navigation, ev: NavigateEvent) => any) | null
}

declare var Navigation: {
  new (): Navigation
  prototype: Navigation
}

interface NavigationUpdateCurrentEntryOptions {
  state: any
}

interface NavigationOptions {
  info?: any
}

interface NavigationNavigateOptions extends NavigationOptions {
  state?: any
  history?: NavigationHistoryBehavior
}

interface NavigationReloadOptions extends NavigationOptions {
  state?: any
}

interface NavigationResult {
  committed: Promise<NavigationHistoryEntry>
  finished: Promise<NavigationHistoryEntry>
}

enum NavigationHistoryBehavior {
  "auto",
  "push",
  "replace",
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API>
* <https://html.spec.whatwg.org/multipage/nav-history-apis.html#navigation-api>
