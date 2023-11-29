---
title: Popover API
date: 2023-11-29 12:14:52
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
uniqueId: '2023-11-29 04:14:52/Popover API.html'
mathJax: false
---

Popover API 提供了标准化的显示弹出窗口的形式

Popover API 可以通过 HTML 控制或通过 JavaScript 控制

## 设置弹出元素

向 HTML 元素指定 `popover` 属性，以将元素指定为可弹出的，值需要为 `auto` 或 `manual` 或空字符串之一

值 `auto` 代表仅允许显示单个弹出窗口，允许自动关闭弹出窗口

值 `manual` 代表允许显示多个弹出窗口，允许手动关闭弹出窗口

```html
<div id="popover" popover="auto"></div>
```

同样可以通过 `HTMLElement` 接口的 `popover` 属性指定

```js
popoverElement.popover = 'auto';
```

## 设置弹出元素的控制元素

控制元素必须为 `<button>` 元素或 `<input type="button" />` 元素

向 HTML 元素指定 `popovertarget` 属性以设置控制元素控制的弹出元素，值是弹出元素的 `id`

向 HTML 元素指定 `popovertargetaction` 属性以设置控制元素的控制行为，值为 `hide` `show` `toggle` 之一

```html
<button popovertarget="popover" popovertargetaction="toggle">popover</button>
```

同样可以通过 `HTMLElement` 接口的 `popoverTargetElement` 属性指定控制元素控制的弹出元素，值需要接受一个 `HTMLElement`

同样可以通过 `HTMLElement` 接口的 `popoverTargetAction` 属性指定控制元素的控制行为

```js
targetElement.popoverTargetElement = popoverElement;
targetElement.popoverTargetAction = 'toggle';
```

## 控制弹出元素

调用 `HTMLElement` 接口的 `showPopover()` 方法显示弹出窗口

调用 `HTMLElement` 接口的 `hidePopover()` 方法隐藏弹出窗口

`showPopover()` 方法与 `hidePopover()` 方法在已处于相应状态时会抛出 `InvalidStateError` 异常

调用 `HTMLElement` 接口的 `togglePopover()` 方法切换弹出窗口

`togglePopover()` 方法允许接受一个 `force` 参数，以指定期望的行为，但不会抛出异常；并且会返回执行的结果

```js
popoverElement.showPopover();
popoverElement.hidePopover();
popoverElement.togglePopover();
```

## 弹出元素事件

`beforetoggle` 事件在元素的弹出状态改变前触发

`toggle` 事件在元素的弹出状态改变后触发

两事件均返回一个 `ToggleEvent` 事件，事件的 `newState` 属性和 `oldState` 属性返回 `closed` 或 `open` 之一

## 弹出元素 CSS 相关

可以利用 `:popover-open` 伪类选择器选中处于 popover 显示状态的元素

可以利用 `::backdrop` 伪元素选择器选中 top-layer 背后的内容并进行特殊的定制

## 示例

<div id="popover" role="article">
  <div id="po" popover>popover window</div>
  <button popovertarget="po" popovertargetaction="show">show popover</button>
  <button popovertarget="po" popovertargetaction="hide">hide popover</button>
  <button popovertarget="po" popovertargetaction="toggle">toggle popover</button>

  <style>
    #popover {
      ::backdrop {
        backdrop-filter: blur(5px);
      }
    }
  </style>

  <script type="module"></script>
</div>

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Popover_API>
* <https://html.spec.whatwg.org/multipage/popover.html>
