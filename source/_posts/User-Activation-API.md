---
title: User Activation API
date: 2023-11-15 20:55:22
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
uniqueId: '2023-11-15 12:55:22/User Activation API.html'
mathJax: false
---

User Activation API 用于检测当前网页的用户激活状态

该 API 通过 `UserActivation` 提供相关功能，并通过 `navigator.userActivation` 暴露实例使用

一些 API 的调用受用户激活行为的限制，在不满足条件时会抛出异常，可以使用该 API 检测是否已满足调用的条件

## 用户激活状态

用户激活状态的改变受如下事件的影响：

事件的 `isTrusted` 属性被设置为 `true`

事件的 `type` 属性为 `keydown`（需要不为 Esc 键或用户代理保留的快捷键）、`mousedown`、`pointerdown`（需要 `pointerType` 为 `mouse`）、`pointerup`（需要 `pointerType` 不为 `mouse`）、`touchend`

### 粘性激活

表示用户已经进行了交互行为

可通过 `UserActivation` 接口的 `hasBeenActive` 属性检测

### 瞬时激活

表示用户最近进行了交互行为

可通过 `UserActivation` 接口的 `isActive` 属性检测

## 类型

```ts
interface UserActivation {
  readonly hasBeenActive: boolean
  readonly isActive: boolean
}

declare var UserActivation: {
  prototype: UserActivation
}

interface Navigator {
  readonly userActivation: UserActivation
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/UserActivation>
* <https://html.spec.whatwg.org/multipage/interaction.html#tracking-user-activation>
