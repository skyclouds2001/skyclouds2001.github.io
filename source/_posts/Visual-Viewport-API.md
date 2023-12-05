---
title: Visual Viewport API
date: 2023-12-05 16:32:10
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
uniqueId: '2023-12-05 08:32:10/Visual Viewport API.html'
mathJax: false
---

Visual Viewport API 提供了查询和监测屏幕可视区域的功能

该 API 通过 `Window` 接口的 `visualViewport` 属性暴露的 `VisualViewport` 实例使用

## VisualViewport 概念

Viewport 有两个相对的概念 —— Layout Viewport 和 Visual Viewport，Layout Viewport 包含当前文档用户可见的内容，而 Visual Viewport 仅包含当前文档用户当前可见的内容。例如，屏幕键盘等功能仅影响 Visual Viewport，不影响 Layout Viewport；缩放页面时，Visual Viewport 发生变化，而 Layout Viewport 不变

## 获取 VisualViewport 信息

主要通过 `VisualViewport` 接口的属性获取 Visual Viewport 信息

`VisualViewport` 接口的 `width` 属性返回一个 `number`，表示 Visual Viewport 的宽度

`VisualViewport` 接口的 `height` 属性返回一个 `number`，表示 Visual Viewport 的高度

`VisualViewport` 接口的 `offsetLeft` 属性返回一个 `number`，表示 Visual Viewport 相对 Layout Viewport 左边缘的偏移量

`VisualViewport` 接口的 `offsetTop` 属性返回一个 `number`，表示 Visual Viewport 相对 Layout Viewport 上边缘的偏移量

`VisualViewport` 接口的 `pageLeft` 属性返回一个 `number`，表示 Visual Viewport 相对初始包含块的 x 坐标

`VisualViewport` 接口的 `pageTop` 属性返回一个 `number`，表示 Visual Viewport 相对初始包含块的 y 坐标

`VisualViewport` 接口的 `resize` 属性返回一个 `number`，表示 Visual Viewport 的缩放参数

## 监听 VisualViewport 变化

主要通过 `VisualViewport` 接口的事件监听 Visual Viewport 变化

`VisualViewport` 接口的 `resize` 事件在 Visual Viewport 尺寸发生改变时触发

`VisualViewport` 接口的 `scroll` 事件在 Visual Viewport 发生滚动时触发

## 示例

<div id="visual-viewport" role="article">
  <table>
    <thead>
      <tr>
        <th>Width</th>
        <th>Height</th>
        <th>OffsetLeft</th>
        <th>OffsetTop</th>
        <th>PageLeft</th>
        <th>PageTop</th>
        <th>Scale</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>

  <style>
    #visual-viewport {
      :is(table) {
        table-layout: fixed;
      }
    }
  </style>

  <script type="module">
    const content = document.querySelector('#visual-viewport tbody tr');
    function update() {
      content.innerHTML = `
        <td>${window.visualViewport.width}</td>
        <td>${window.visualViewport.height}</td>
        <td>${window.visualViewport.offsetLeft}</td>
        <td>${window.visualViewport.offsetTop}</td>
        <td>${window.visualViewport.pageLeft}</td>
        <td>${window.visualViewport.pageTop}</td>
        <td>${window.visualViewport.scale}</td>
      `.trim();
    }
    update();
    window.visualViewport.addEventListener('resize', update);
    window.visualViewport.addEventListener('scroll', update);
  </script>
</div>

## 类型

```ts
interface Window {
  readonly visualViewport: VisualViewport
}

interface VisualViewport extends EventTarget {
  readonly offsetLeft: number
  readonly offsetTop: number

  readonly pageLeft: number
  readonly pageTop: number

  readonly width: number
  readonly height: number

  readonly scale: number

  onresize: ((this: VisualViewport, ev: Event) => any) | null
  onscroll: ((this: VisualViewport, ev: Event) => any) | null
  onscrollend: ((this: VisualViewport, ev: Event) => any) | null
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API>
* <https://drafts.csswg.org/cssom-view/#visualViewport>
