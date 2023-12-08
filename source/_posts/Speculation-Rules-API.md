---
title: Speculation Rules API
date: 2023-12-08 12:35:20
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
uniqueId: '2023-12-08 04:35:20/Speculation Rules API.html'
mathJax: false
---

Speculation Rules API 设计以用于支持改善导航的性能，通过允许指定一系列规则以实现对未来文档资源的预加载

它主要用于增强和改进 `<link rel="prefetch">` 的功能以及替代仅由 Chrome 支持的 `<link rel="prerender">` 非标准弃用特性，通过提供可配置的语法实现

特别注意的是，它仅支持文档资源的加载，不支持子资源的加载，那种情况下应当使用 `<link rel="prefetch">`

## Speculation Rules 语法

Speculation Rules 通过 `<script type="speculationrules">` 指定，支持 JSON 格式的语法

```html
<script type="speculationrules">
  {
    "prerender": [
      {
        "source": "list",
        "urls": ["extra.html", "extra2.html"]
      }
    ],
    "prefetch": [
      {
        "source": "list",
        "urls": ["next.html", "next2.html"],
        "requires": ["anonymous-client-ip-when-cross-origin"],
        "referrer_policy": "no-referrer"
      }
    ]
  }
</script>
```

需要注意的是，`<script>` 标签的 `src` `async` `nomodule` `defer` `crossorigin` `integrity` 和 `referrerpolicy` 等属性不应当指定

整个 JSON 为一个对象，分别可以指定 `prefetch` 键和 `prerender` 键，均接收一个对象数组，分别代表提前获取文档资源及提前获取并加载渲染文档资源的规则

规则对象需指定 `source` 键，代表指定当前规则的模式，目前唯一允许的值为 `list`，表示 URL 将来自一组列表

规则对象需指定 `urls` 键，接收一个字符串数组，代表需要加载的资源 URL 的列表（相对路径觉得路径均可）

规则对象可以指定 `requires` 键，代表指定解析规则的要求，目前唯一允许的值为 `anonymous-client-ip-when-cross-origin`，仅适用于 `prefetch` 场景，表示规则是否匹配与用户代理能否在跨域请求中避免向远程服务器暴露本地用户的 IP 地址

规则对象可以指定 `referrer_policy` 键，代表获取资源时使用的 referrer policy，允许的值同 `Referrer-Policy` 头

## prefetch 与 prerender 比较

prefetch 允许提前获取文档资源并缓存

prefetch 相较于 `<link rel="prefetch">` 可用于加载跨域页面且不受 `Cache-Control` 头影响

prerender 允许提前获取文档资源并进行预渲染，包括获取并加载所有子资源，执行 JavaScript 以及获取及加载由 JavaScript 执行产生的子资源，绝大多数 API 会延迟执行直至页面被激活

跨域的 prerender 要求文档资源的 `Supports-Loading-Mode` 响应头设定为 `credentialed-prerender` 以允许执行预加载

prerender 相较于 `<link rel="prerender">` 可用于加载跨域页面且不受 `Cache-Control` 头影响，并且其是标准且将得到未来大多数浏览器的支持，该特性是否有效受用户代理的设定的影响

## prefetch 与 prerender 检测

服务端可通过 Sec-Purpose 请求头检测请求的文档是否为 prefetch 或 prerender

对于 prefetch 而言：

```http
Sec-Purpose: prefetch
```

对于 prerender 而言：

```http
Sec-Purpose: prefetch;prerender
```

可以通过返回非 200 状态码和 304 状态码的响应来阻止 prefetch 或 prerender

客户端可分别利用 `PerformanceResourceTiming` 接口的 `deliveryType` 属性 或 `Document` 接口的 `prerendering` 属性检测

## DOM 相关

`Document` 接口的 `prerendering` 属性返回一个 `boolean`，表示当前文档是否在预渲染进程中

`Document` 接口的 `prerenderingchange` 事件在预渲染文档被激活时触发（如用户访问当前文档），返回一个 `Event`

## HTTP 相关

`Supports-Loading-Mode` 响应头允许启用多个高风险的加载模式

目前仅支持值 `credentialed-prerender` 以允许跨域同站的预渲染模式

## Content Security Policy 相关

允许在 Content Security Policy 中使用 `inline-speculation-rules` 值，以限制 `<script type="speculationrules">` 的使用以控制资源加载

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API>
* <https://wicg.github.io/nav-speculation/speculation-rules.html>
