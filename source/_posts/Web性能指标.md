---
title: Web性能指标
date: 2024-10-28 20:12:37
tags:
  - Frontend
  - Other
categories:
  - Frontend
  - Other
thumbnail:
cover:
toc: true
recommend: 1
keywords:
uniqueId: '2024-10-28 20:12:37/Web性能指标.html'
mathJax: false
---

## LCP

LCP，即最大内容绘制（Largest Contentful Paint），是视口中可见的最大图片、文本块或视频的呈现时间，其目标是 **< 2.5s**

其是 FMP 和 SI 的替代

其考虑的元素包括 `<img>` 元素、`<svg>` 元素内的 `<image>` 元素、`<video>` 元素（封面图）、使用 `url()` 函数加载背景图片的元素、包含文本节点或其他内嵌级文本元素子级的块级元素

其报告的元素的尺寸通常是用户在视口内可见的尺寸，超出的元素的尺寸会被裁剪

浏览器会在绘制第一帧后立即报告 LCP 指标。但是，在渲染后续帧后，只要最大的内容元素发生变化，新的 LCP 指标就会报告；直到用户开始与网页互动为止

JavaScript API 示例如下（用于计算指标时，应当忽略后台标签页、单独计算往返缓存标签页、考虑 iframe 中的标签页、预渲染网页需从 activationStart 开始计算）：

```js
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('LCP candidate:', entry.startTime, entry);
  }
}).observe({type: 'largest-contentful-paint', buffered: true});
```

## CLS

CLS，即累积布局偏移（Cumulative Layout Shift），测量页面整个生命周期内发生的每次意外布局偏移中的最大布局偏移分数，其目标是 **< 0.1**

JavaScript API 示例如下：

```js
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('Layout shift:', entry);
  }
}).observe({type: 'layout-shift', buffered: true});
```

## INP

INP，即 Interaction to Next Paint，测量用户访问网页期间发生的所有交互行为的延迟时间，其目标是 **< 200ms**

它是 FID 的替代

## FID

FID，即首次输入延迟（First Input Delay），测量从用户首次与页面交互到浏览器对交互作出响应所经过的时间，其目标是 **< 100ms**

通常该指标在 FCP 和 TTI 之间

## FCP

FCP，即首次内容绘制（First Contentful Paint），测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间，其目标是 **< 1.8s**

## TTI

TTI，即可交互时间（Time to Interactive），测量页面从开始加载到主要子资源完成渲染并能够响应用户交互所需的时间，其目标是尽可能降低 FCP 与 TTI 的差值，其目标是 **< 3.8s**

## TBT

TBT，即总阻塞时间（Total Blocking Time），测量 FCP 与 TTI 之间的总时间，其目标是 **< 30ms**

## SI

SI，即速度指数（Speed Index），测量页面可视区域中内容的填充速度，其目标是 **> 75**
