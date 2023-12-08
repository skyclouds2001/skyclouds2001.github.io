---
title: View Transitions API
date: 2023-12-06 18:32:09
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
uniqueId: '2023-12-06 10:32:09/View Transitions API.html'
mathJax: false
---

View Transitions API 提供了创建视图过渡的功能

目前该 API 仅支持在单 Document 中的视图过渡，尚未支持跨 Document 的视图过渡

## 视图过渡进程

1. 调用 `Document` 接口上的 `startViewTransition()` 方法
2. 截取当前 DOM 的截图以作为视图过渡前的 old 状态
3. 暂停 DOM 的渲染
4. `updateCallback` 回调函数参数，若提供的话会被调用
5. `ViewTransition` 接口的 `updateCallbackDone` 属性对应的 Promise 兑现
6. 截取当前 DOM 的截图以作为视图过渡后的 new 状态
7. 创建各视图过渡伪元素
8. 重启 DOM 的渲染以渲染各视图过渡伪元素
9. `ViewTransition` 接口的 `ready` 属性对应的 Promise 兑现
10. 各视图过渡伪元素开始执行动画直至结束
11. 移除各视图过渡伪元素
12. `ViewTransition` 接口的 `finished` 属性对应的 Promise 兑现

## 视图过渡结构

通常情况下，视图过渡有关的伪元素的结构如下所示

```Plain Text
::view-transition
└─ ::view-transition-group(root)
   └─ ::view-transition-image-pair(root)
      ├─ ::view-transition-old(root)
      └─ ::view-transition-new(root)
```

可以通过指定 `view-transition-name` 属性来应用给定的动画

```CSS
figcaption {
  view-transition-name: figure-caption;
}
```

此时视图过渡有关的伪元素的结构如下所示

```Plain Text
::view-transition
├─ ::view-transition-group(root)
│ └─ ::view-transition-image-pair(root)
│     ├─ ::view-transition-old(root)
│     └─ ::view-transition-new(root)
└─ ::view-transition-group(figure-caption)
  └─ ::view-transition-image-pair(figure-caption)
      ├─ ::view-transition-old(figure-caption)
      └─ ::view-transition-new(figure-caption)
```

## API 相关

`Document` 接口的 `startViewTransition()` 方法用于创建视图过渡

方法接收一个可选的 `updateCallback` 回调函数参数，该回调函数允许返回一个 Promise

方法返回一个 `ViewTransition` 实例

`ViewTransition` 接口反映了一个视图过渡

`ViewTransition` 接口的 `finished` 属性返回一个 Promise，在视图过渡完成并且视图过渡伪元素完全移除时兑现，若 `updateCallback` 回调函数返回的 Promise 拒绝时拒绝

`ViewTransition` 接口的 `ready` 属性返回一个 Promise，在视图过渡伪元素完成创建并且视图过渡将要开始时兑现，若 `updateCallback` 回调函数返回的 Promise 拒绝时或出现重复 `view-transition-name` 名称时拒绝

`ViewTransition` 接口的 `updateCallbackDone` 属性返回一个 Promise，在 `updateCallback` 回调函数返回的 Promise 兑现时兑现，拒绝时拒绝

`ViewTransition` 接口的 `skipTransition()` 方法可用于忽略执行视图过渡，但不会忽略执行传入的 `updateCallback` 回调函数参数

## CSS 相关

`view-transition-name` 属性指定为 `none` 以使当前元素不应用视图过渡

该属性的值在整个文档中必须唯一，不同元素不能拥有相同的值，否则视图过渡会被忽略

`::view-transition` 伪元素选择器作为视图过渡遮蔽层的根元素，包含其他视图过渡组（包含多个 `::view-transition-group` 伪元素）

`::view-transition-group` 伪元素选择器表示单个视图过渡组，可以接收 `*` `root` 或一个视图过渡组名称（包含单个 `::view-transition-image-pair` 伪元素）

`::view-transition-image-pair` 伪元素选择器代表单个视图过渡的视图截图容器，允许值同上

`::view-transition-new` 伪元素选择器代表单个视图过渡新的视图截图，允许值同上

`::view-transition-old` 伪元素选择器代表单个视图过渡旧的视图截图，允许值同上

## 示例

<div id="view-transition" role="article">
  <div>0 0 0 0 0 0 0 0 0</div>

  <button>View Transition</button>

  <style>
    #view-transition div {
      view-transition-name: example;
    }

    ::view-transition-new(*), ::view-transition-old(*) {
        animation-duration: 1s;
    }
  </style>

  <script type="module">
    const box = document.querySelector('#view-transition div');
    const button = document.querySelector('#view-transition button');
    let index = 0;
    button.addEventListener('click', () => {
      document.startViewTransition(() => {
        ++index;
        box.innerText = Array(9).fill(index).join(' ');
      });
    });
  </script>
</div>

## 类型

```ts
interface Document {
  startViewTransition(updateCallback?: UpdateCallback): ViewTransition
}

type UpdateCallback = () => Promise<any>

interface ViewTransition {
  readonly updateCallbackDone: Promise<undefined>
  readonly ready: Promise<undefined>
  readonly finished: Promise<undefined>
  skipTransition(): void
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API>
* <https://drafts.csswg.org/css-view-transitions/>
