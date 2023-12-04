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

## 导航历史记录跳转监听

`Navigation` 接口的 `currententrychange` 事件在当前导航记录内容变化时触发，返回一个 `NavigationCurrentEntryChangeEvent` 事件

可能原因包括，相同文档内导航 `forward()` `back()` `traverseTo()`；替换当前记录 `navigate()` 方法并设置 `history` 参数为 `replace`；更新当前记录数据 `updateCurrentEntry()` 等等

> `NavigationCurrentEntryChangeEvent` 事件继承自 `Event` 事件，反映了 `currententrychange` 事件触发时返回的事件实例
> 
> `NavigationCurrentEntryChangeEvent` 事件的 `from` 只读属性返回一个 `NavigationHistoryEntry`，代表来源的导航历史记录
> 
> `NavigationCurrentEntryChangeEvent` 事件的 `navigationType` 只读属性返回一个 `string`，值为 `push` （至新纪录） `replace` （替换当前记录） `reload` （重新加载当前记录） `traverse` （至已有记录） 之一；若因为调用 `Navigation` 接口的 `updateCurrentEntry()` 方法导致的，返回 `null`

```js
window.navigation.addEventListener("currententrychange", () => {
  const data = window.navigation.currentEntry.getState()
  // to do something with the data

  window.navigation.currentEntry.addEventListener("dispose", () => {
    // do something when disposing
  })
})
```

`Navigation` 接口的 `navigate` 事件在任一导航类型事件发生时触发，返回一个 `NavigateEvent` 事件

> `NavigateEvent` 事件继承自 `Event` 事件，反映了 `navigate` 事件触发时返回的事件实例
> 
> `NavigateEvent` 事件的 `destination` 只读属性返回一个 `NavigationDestination` 实例，反映导航的目标
> 
> > `NavigationDestination` 接口类似于 `NavigationHistoryEntry` 接口，除其不支持 `dispose` 事件外类似
> 
> `NavigateEvent` 事件的 `navigationType` 只读属性返回一个 `string`，值为 `push`（至新纪录） `replace`（替换当前记录） `reload`（重新加载当前记录） `traverse`（至已有记录）之一，代表导航的类型
> 
> `NavigateEvent` 事件的 `canIntercept` 只读属性返回一个 `boolean`，表示导航是否可被拦截并重写 URL（通常跨域导航无法被拦截）
>
> `NavigateEvent` 事件的 `userInitiated` 只读属性返回一个 `boolean`，表示导航是否因用户行为而发生的
>
> `NavigateEvent` 事件的 `hashChange` 只读属性返回一个 `boolean`，表示导航是否是一个片段导航，即仅 URL 的 hash 部分发生改变
>
> `NavigateEvent` 事件的 `signal` 只读属性返回一个 `AbortSignal`，其会在导航取消时终止（一个使用场合是传递给导航内的 fetch 函数以安全地取消请求）
>
> `NavigateEvent` 事件的 `formData` 只读属性返回一个 `FormData`，若导航因为提交表单发生；否则返回 `null`
>
> `NavigateEvent` 事件的 `downloadRequest` 只读属性返回一个 `string`，代表请求下载的文件名，若请求因为点击 download 的链接导致；否则返回 `null`
>
> `NavigateEvent` 事件的 `info` 只读属性返回在导航操作中传递的 `info` 参数；若为传递则返回 `undefined`
>
> `NavigateEvent` 事件的 `hasUAVisualTransition` 只读属性返回一个 `boolean`，表示用户代理是否进行了可视化的导航过渡进程
>
> `NavigateEvent` 事件的 `intercept()` 方法允许拦截导航并控制导航的行为
>
> `NavigateEvent` 事件的 `scroll()` 方法允许主动触发导航滚动行为

`Navigation` 接口的 `navigateerror` 事件在导航操作失败时触发，返回一个 `Event` 事件

`Navigation` 接口的 `navigatesuccess` 事件在导航操作成功完成时触发，返回一个 `Event` 事件

此时刻 `intercept()` 方法中传递的所有 Promise 均完成且 `NavigationTransition.finished` 同样完成

```js
window.navigation.addEventListener("navigatesuccess", () => {
  loadingIndicator.hidden = true
})

window.navigation.addEventListener("navigateerror", (event) => {
  loadingIndicator.hidden = true

  showMessage(`Failed to load page: ${event.message}`)
})
```

## 导航历史记录信息

`NavigationHistoryEntry` 接口表示单条导航历史记录

`NavigationHistoryEntry` 接口的 `id` 只读属性返回一个 `string`，代表当前导航历史记录的 id，该值是一个唯一的由用户代理生成的值

`NavigationHistoryEntry` 接口的 `index` 只读属性返回一个 `number`，代表当前导航历史记录在导航历史记录列表中的下标，若不在时返回 `-1`

`NavigationHistoryEntry` 接口的 `key` 只读属性返回一个 `string`，代表当前导航历史记录在导航历史记录列表中的位置的 key，该值是一个唯一的由用户代理生成的值，可以用于 `Navigation` 接口的 `traverseTo()` 方法

`NavigationHistoryEntry` 接口的 `sameDocument` 只读属性返回一个 `boolean`，代表当前的当前导航历史记录对应的 document 对象是否与 document 对象相同

`NavigationHistoryEntry` 接口的 `url` 只读属性返回一个 `string`，代表当前导航历史记录的绝对 URL，若受 Referer Policy 限制可能返回 `null`

`NavigationHistoryEntry` 接口的 `getState()` 方法返回与当前导航历史记录绑定的 state 数据的拷贝，若不存在则返回 `undefined`

`NavigationHistoryEntry` 接口的 `dispose` 事件在当前导航历史记录被移除时触发，返回一个 `Event` 事件

## 导航历史记录进程

`NavigationTransition` 接口代表正在进行中的导航（即尚未触发 `navigatesuccess` 或 `navigateerror` 事件的导航），通过 `Navigation` 接口的 `transition` 属性访问

`NavigationTransition` 接口的 `navigationType` 只读属性返回一个 `string`，值为 `push`（至新纪录） `replace`（替换当前记录） `reload`（重新加载当前记录） `traverse`（至已有记录）之一，代表导航的类型

`NavigationTransition` 接口的 `from` 只读属性返回一个 `NavigationHistoryEntry`，代表来源的导航历史记录

`NavigationTransition` 接口的 `finished` 只读属性返回一个 Promise，在 `navigatesuccess` 或 `navigateerror` 事件触发同时兑现或拒绝

```js
async function handleTransition() {
  if (navigation.transition != null) {
    showLoadingSpinner();
    await navigation.transition.finished;
    hideLoadingSpinner();
  }
}
```

## 导航历史记录拦截

`NavigateEvent` 事件的 `intercept()` 方法允许拦截导航并控制导航的行为

方法允许接收一个配置项：

选项 `handler` 指定拦截器的处理回调方法，回调方法允许返回一个 Promise

选项 `focusReset` 指定导航的聚焦行为，值可以为 `after-transition`（默认值）或 `manual`

选项 `scroll` 指定导航的滚动行为，值可以为 `after-transition`（默认值）或 `manual`

```js
window.navigation.addEventListener("navigate", (event) => {
  if (shouldNotIntercept(navigateEvent)) {
    return;
  }
  const url = new URL(event.destination.url);

  if (url.pathname.startsWith("/articles/")) {
    event.intercept({
      async handler() {
        const articleContent = await getArticleContent(url.pathname);
        renderArticlePage(articleContent);

        event.scroll();

        const secondaryContent = await getSecondaryContent(url.pathname);
        addSecondaryContent(secondaryContent);
      },
    });
  }
});
```

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
  onnavigateerror: ((this: Navigation, ev: Event) => any) | null
  onnavigatesuccess: ((this: Navigation, ev: Event) => any) | null
}

declare var Navigation: {
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

enum NavigationType {
 "push",
 "replace",
 "reload",
 "traverse",
}

interface NavigationHistoryEntry extends EventTarget {
  readonly url: string | null
  readonly key: string
  readonly id: string
  readonly index: number
  readonly sameDocument: boolean

  getState(): any

  ondispose: ((this: NavigationHistoryEntry, ev: Event) => any) | null
}

declare var NavigationHistoryEntry: {
  prototype: NavigationHistoryEntry
}

interface NavigationTransition {
  readonly navigationType: NavigationType
  readonly from: NavigationHistoryEntry
  readonly finished: Promise<undefined>
}

declare var NavigationTransition: {
  prototype: NavigationTransition
}

interface NavigationCurrentEntryChangeEvent extends Event {
  readonly navigationType: NavigationType | null
  readonly from: NavigationHistoryEntry
}

declare var NavigationCurrentEntryChangeEvent: {
  new(DOMString type, NavigationCurrentEntryChangeEventInit eventInitDict): NavigationCurrentEntryChangeEvent
  prototype: NavigationCurrentEntryChangeEvent
}

interface NavigationCurrentEntryChangeEventInit extends EventInit {
  navigationType?: NavigationType
  from: NavigationHistoryEntry
}

interface NavigateEvent extends Event {
  readonly navigationType: NavigationType
  readonly destination: NavigationDestination
  readonly canIntercept: boolean
  readonly userInitiated: boolean
  readonly hashChange: boolean
  readonly signal: AbortSignal
  readonly formData?: FormData
  readonly downloadRequest?: string
  readonly info: any
  readonly hasUAVisualTransition: boolean

  intercept(options?: NavigationInterceptOptions): void
  scroll(): void
}

declare var NavigateEvent: {
  new(type: string, eventInitDict: NavigateEventInit): NavigateEvent
  prototype: NavigateEvent
}

interface NavigateEventInit extends EventInit {
  navigationType?: NavigationType
  destination: NavigationDestination
  canIntercept?: boolean
  userInitiated?: boolean
  hashChange?: boolean
  signal: AbortSignal
  formData?: FormData
  downloadRequest?: string
  info: any
  hasUAVisualTransition?: boolean
}

interface NavigationInterceptOptions {
  handler: NavigationInterceptHandler
  focusReset: NavigationFocusReset
  scroll: NavigationScrollBehavior
}

enum NavigationFocusReset {
  "after-transition",
  "manual",
}

enum NavigationScrollBehavior {
  "after-transition",
  "manual",
}

type NavigationInterceptHandler = () => Promise<undefined>

interface NavigationDestination {
  readonly url: string
  readonly key: string
  readonly id: string
  readonly index: number
  readonly sameDocument: boolean

  getState(): any
}

declare var NavigationDestination: {
  prototype: NavigationDestination
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API>
* <https://html.spec.whatwg.org/multipage/nav-history-apis.html#navigation-api>
