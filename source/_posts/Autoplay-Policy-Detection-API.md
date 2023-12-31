---
title: Autoplay Policy Detection API
date: 2024-01-01 04:54:43
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
uniqueId: '2023-12-31 20:54:43/Autoplay Policy Detection API.html'
mathJax: false
---

Autoplay Policy Detection API 允许获取音频的自动播放模式

该 API 通过 `Navigator` 接口的 `getAutoplayPolicy()` 方法提供相关功能

## 使用

方法可以传入一个字符串，需为 `mediaelement` 与 `audiocontext` 之一；亦可以传入一个 `HTMLMediaElement` 元素或一个 `AudioContext` 实例

方法返回一个字符串，值为 `allowed` 或 `allowed-muted` 或 `disallowed`，分别代表允许自动播放，允许静音状态下的自动播放（仅针对媒体元素而言）以及不允许自动播放

若参数不符合约束时，抛出 `TypeError` 异常

## 类型

```ts
interface Navigator {
  getAutoplayPolicy(type: AutoplayPolicyMediaType): AutoplayPolicy
  getAutoplayPolicy(element: HTMLMediaElement): AutoplayPolicy
  getAutoplayPolicy(context: AudioContext): AutoplayPolicy
}

type AutoplayPolicyMediaType = "mediaelement" | "audiocontext"
type AutoplayPolicy = "allowed" | "allowed-muted" | "disallowed"
```

## 链接

* <https://w3c.github.io/autoplay/>
