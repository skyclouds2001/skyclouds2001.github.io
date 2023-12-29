---
title: Web Components API
date: 2023-12-29 20:03:59
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
uniqueId: '2023-12-29 12:03:59/Web Components API.html'
mathJax: false
---

Web Components API 允许创建并使用自定义 HTML 元素

## 概述

* Custom Element，用于定义自定义元素及其行为
* Shadow DOM，将封装的 Shadow DOM 树附加到元素并避免与文档其他部分产生冲突
* HTML templates，通过 `<template>` 与 `<slot>` 元素编写可重用的模板

## Custom Element

自定义元素包含两类，一类是基于现有的内置标准元素扩展，主要用于自定义标准元素行为，称为**自定义内置元素**（Customized built-in element）；一类是直接基于 HTMLElement 基类拓展，需要完成实现行为，称为**独立自定义元素**（Autonomous custom element）

### 定义

首先需要定义一个类 class，该类需要继承自 HTMLElement 或者其他内置标准元素

```js
class CustomElement extends HTMLElement {
  constructor() {
    super()
  }
}

class CustomParagraphElement extends HTMLParagraphElement {
  constructor() {
    super()
  }
}
```

在构造函数中设置初始状态及默认值，注册事件监听器，或者创建一个影子根元素；此阶段不应当尝试读取或修改元素的属性或其子元素

### 生命周期回调方法

在注册组件后，在发生一些特定事件时，会触发对应的生命周期回调方法，包括如下几种：

* `connectedCallback()` 在每次元素被添加到文档中时调用；标准建议在该回调中实现自定义元素的初始化
* `disconnectedCallback()` 在每次元素从文档中移除时调用
* `adoptedCallback()` 在每次元素被移动到新文档时调用
* `attributeChangedCallback()` 在监视的属性增加、移除、修改、替换时调用

```js
class CustomElement extends HTMLElement {
  static observedAttributes = ["size"]

  constructor() {
    super()
  }

  connectedCallback() {
    console.log("Custom element added to page")
  }

  disconnectedCallback() {
    console.log("Custom element removed from page")
  }

  adoptedCallback() {
    console.log("Custom element moved to new page")
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed`)
  }
}
```

### 注册

定义自定义元素后，还需要将其注册到文档中，才可使用

是通过 `CustomElementRegistry` 接口的 `define()` 方法实现，该实例通过 `Window` 接口的 `customElements` 只读属性暴露

该方法可以接受 2 - 3 个参数：

第一个参数接收一个字符串，表示该自定义元素的名称，要求：必须以小写字母开头且包含连字符

第二个参数接收一个构造函数，表示该自定义元素本身的构造函数

第三个可选参数接收一个可选的对象，仅允许对扩展内置标准元素的自定义元素指定，包含 `extends` 参数，表示由其继承的内置标准元素的名称

```js
window.customElements.define("custom-paragraph-element", CustomParagraphElement, { extends: "p" })

window.customElements.define("custom-element", CustomElement)
```

### 使用

若为自定义内置元素，在扩展的内置标准元素上指定全局 `is` 属性

```html
<p is="custom-paragraph-element"></p>
```

若为独立自定义元素，直接以类似标准元素的方式使用即可

```html
<custom-element></custom-element>
```

### 监听属性变化

自定义元素类似原生内置标准元素一样，也使用属性传递信息

要监听属性变化（包括首次初始化），需要通过指定 `observedAttributes` 静态属性，其接收一个字符串数组

### 自定义伪类

可以在自定义元素中通过 `HTMLElement` 接口的 `attachInternals()` 方法获取到的 `ElementInternals` 接口实例，通过其 `states` 属性返回的 `CustomStateSet` 实例，添加或移除伪类状态

仅限于独立自定义元素使用

```js
class MyCustomElement extends HTMLElement {
  constructor() {
    super()
    this.internals = this.attachInternals()
  }

  get collapsed() {
    return this.internals.states.has("--hidden")
  }

  set collapsed(flag) {
    if (flag) {
      this.internals.states.add("--hidden")
    } else {
      this.internals.states.delete("--hidden")
    }
  }
}
```

## Shadow DOM

### 概念

* 影子宿主（Shadow host） 影子 DOM 附加到的常规 DOM 节点
* 影子树（Shadow tree） 影子 DOM 内部的 DOM 树
* 影子边界（Shadow boundary） 影子 DOM 终止，常规 DOM 开始的地方
* 影子根节点（Shadow root） 影子树的根节点

在影子树内与影子树外通常是相互隔离的

### 模式

在调用 `Element` 接口的 `attachShadow()` 方法获取影子根节点时，可以传递一个 `mode` 参数，控制影子树内部是否对外部开放

允许的值为 `open` 或 `close`

若指定为 open，外部的脚本可以通过影子宿主的 shadowRoot 属性访问影子树内部

### 样式

向影子树中添加样式有两种方式：

一种通过新建 CSSStyleSheet 并向其添加样式，再将其附加到影子根节点

另外一种是通过新建 `<style>` 标签，并修改其内容，再将其附加到影子树

```js
class CustomElement extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" })

    const sheet = new CSSStyleSheet()
    sheet.replaceSync("span { color: red; border: 2px dotted black;}")
    shadow.adoptedStyleSheets.push(sheet)

    const style = document.createElement('style')
    style.sheet.replaceSync("span { color: red; border: 2px dotted black;}")
    shadow.appendChild(style)
  }
}
```

### 与自定义元素使用

自定义元素的核心正是 ShadowRoot 技术，其保证了自定义元素的封装能力

```js
class CustomElement extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" })

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("cx", "50")
    circle.setAttribute("cy", "50")
    circle.setAttribute("r", "50")
    circle.setAttribute("fill", this.getAttribute("color"))
    svg.appendChild(circle)

    shadow.appendChild(svg)
  }
}
```

## HTML templates

### 使用 template

可以使用 `<template>` 声明一组 DOM 结构，该 DOM 结构不会在页面中显示，直至手动获取其内容并插入到其他 DOM 结构中

### 使用 slot

可以使用 `<slot>` 声明在模板中，代表一个占位符，并为其指定 `name` 属性，代表其名称

在使用模板时，可以通过向模板中的特定元素指定 `slot` 属性，并指定为期望替换的占位符的名称，此时指定的元素便会替代模板中对应占位符位置的元素

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Web_components>
* <https://html.spec.whatwg.org/multipage/custom-elements.html>
