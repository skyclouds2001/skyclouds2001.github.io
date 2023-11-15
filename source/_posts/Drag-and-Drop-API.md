---
title: Drag and Drop API
date: 2023-11-14 14:10:27
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
uniqueId: '2023-11-14 06:10:27/Drag and Drop API.html'
mathJax: false
---

Drag and Drop API 允许网页应用使用拖放功能

## 拖放事件

`dragstart` 事件在用户开始拖动项目时*在拖动项目上*触发

`drag` 事件在用户拖动的项目正被拖动时*在拖动项目上*触发

`dragend` 事件在用户结束拖动项目时*在拖动项目上*触发

`dragenter` 事件在用户拖动的项目进入放置目标时在当前放置目标上触发

`dragover` 事件在用户拖动的项目在放置目标上移动时在当前放置目标上触发

`dragleave` 事件在用户拖动的项目离开放置目标时在之前放置目标上触发

`drop` 事件在用户拖动的项目放置于放置目标上时在当前放置目标上触发

以上事件均返回一个 `DragEvent` 事件，并暴露在 `Window` 接口、`Document` 接口及 `HTMLElement` 接口、`MathMLElement` 接口、`SVGElement` 接口之上

> `DragEvent` 事件继承自 `MouseEvent` 事件
> `DragEvent` 事件的 `dataTransfer` 只读属性返回一个 `DataTransfer` 实例，代表整个拖放过程的数据

特别注意的是，从设备中向浏览器中拖放文件吧不会触发 `dragstart` 事件与 `dragend` 事件

## 拖放元素

将元素的 `draggable` 属性设为 `true` 并指定 `dragstart` 事件的事件监听器以允许元素被拖动

`draggable` 属性的默认值为 `auto`

默认行为是除了 `<img>` 元素和 `<a>` 元素及被选中的文字允许拖放外，其余元素不允许拖放

```html
<p id="el" draggable="true">this p element is draggable</p>
```

## 拖放数据

一般在 `dragstart` 事件中设置拖放过程中传递的数据（仅该事件允许设置数据）

`DataTransfer` 接口的 `clearData()` 方法用于清空拖放过程中的指定类型或所有数据

方法接收一个 `string` 可选参数，代表数据的类型

`DataTransfer` 接口的 `setData()` 方法用于设置拖放过程中传递的数据

方法接收两个 `string` 参数，分别代表数据的类型和数据的内容

```js
el.addEventListener('dragstart', (e) => {
  e.dataTransfer.clearData()

  e.dataTransfer.setData('text/plain', e.target.innerText)
  e.dataTransfer.setData('text/html', e.target.innerHTML)
  e.dataTransfer.setData('text/uri-list', e.target.ownerDocument.location.href)
})
```

## 拖放效果

`DataTransfer` 接口的 `effectAllowed` 属性用于指定允许的拖放效果

该属性仅允许在 `dragstart` 事件中设置

可能的值包括 `uninitialized` `none` `copy` `link` `move` `copyLink` `linkMove` `copyMove` 及 `all`

`DataTransfer` 接口的 `dropEffect` 属性用于指定拖放过程的效果

它主要影响拖动过程中鼠标图标的展示

默认值 `none` 指示没有明显效果

值 `copy` 指示值将从当前位置复制至目标位置

值 `move` 指示值将从当前位置移动至目标位置

值 `link` 指示值将从当前位置链接至目标位置

```js
el.addEventListener('dragstart', (e) => {
  e.dataTransfer.dropEffect = 'move'
})
```

`DataTransfer` 接口的 `setDragImage()` 方法用于设置拖放过程中展示的图片

方法接收一个 `Element` 参数，代表自定义的拖动时展示的图片，可以是 `<img>` `<canvas>` 或其他类型元素

方法接收两个 `number` 参数，代表自定义的图片在 x 坐标和 y 坐标上的相对位置

需要注意的是，传递的元素若在文档中，则需可见；因此可创建一个 offscreen 的元素专供该方法使用

```js
el.addEventListener('dragstart', (e) => {
  e.dataTransfer.setDragImage(new Image(), 0, 0)
})
```

## 拖放目标

向元素指定 `dragenter` 事件及 `dragover` 事件或 `drop` 事件的事件监听器以允许元素作为拖放目标放置

并根据需要取消事件的默认行为

## 拖放完成

一般在 `drop` 事件中获取拖放过程中传递的数据（除此之外仅 `dragstart` 事件允许读取数据）

`DataTransfer` 接口的 `getData()` 方法用于根据指定的数据类型获取拖放过程中传递的数据

方法接收一个 `string` 参数，代表数据的类型

方法返回一个 `string` 参数，代表找到的数据；未找到返回空字符串

```js
el.addEventListener('dragover', (e) => {
  e.preventDefault()

  e.dataTransfer.dropEffect = 'move'
})

el.addEventListener('drop', (e) => {
  e.preventDefault()

  const id = e.dataTransfer.getData('text/plain')
  e.target.appendChild(document.getElementById(id))

  for (const item of e.dataTransfer.items) {
    //
  }

  for (const item of e.dataTransfer.files) {
    //
  }
})
```

`DataTransfer` 接口的 `types` 只读属性返回一个只读字符串数组，代表在 `dragstart` 事件中设置的所有可用的数据的类型

`DataTransfer` 接口的 `items` 只读属性返回一个 `DataTransferItemList`，代表在 `dragstart` 事件中设置的所有可用的数据

`DataTransfer` 接口的 `files` 只读属性返回一个 `FileList`，代表被拖放入的文件列表

## 其他

`DataTransferItemList` 接口是 `DataTransferItem` 的列表，包含 `length` 属性，`add()` 方法 `clear()` 方法 `remove()` 方法，同时支持以方括号运算符访问

`DataTransferItem` 接口代表一个拖放数据，包含 `kind` 属性 `type` 属性，`getAsFile()` 方法 `getAsString()` 方法

## 拖放数据类型

| 数据类型          | 最佳实践                                                                                     |
|---------------|------------------------------------------------------------------------------------------|
| 文字            | text/plain                                                                               |
| 链接            | text/uri-list & text/plain                                                               |
| HTML 或 XML 文本 | text/html & text/plain                                                                   |
| 图片            | image/jpeg 或 image/png 或 image/gif & application/x-moz-file & text/uri-list & text/plain |
| DOM 节点        | application/x-moz-node & text/plain                                                      |

## 示例

<div id="drag-and-drop" role="article">
  <p draggable="true">draggable text</p>

  <div>drag zone</div>

  <style>
    #drag-and-drop {
      gap: 25px;
      padding: 25px;

      border: 1px solid #aaa;

      :is(p), :is(div) {
        height: 2em;
        line-height: 2em;
        border: 1px solid #aaa;
      }
    }
  </style>

  <script type="module">
    const source = document.querySelector('#drag-and-drop p');
    const target = document.querySelector('#drag-and-drop div');

    source.addEventListener('dragstart', (e) => {
      e.dataTransfer.clearData();
      e.dataTransfer.setData('text/plain', e.target.innerText);

      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.dropEffect = 'copy';
    });
    target.addEventListener('dragenter', (e) => {
      e.preventDefault();

      e.dataTransfer.dropEffect = 'copy';
    });
    target.addEventListener('dragover', (e) => {
      e.preventDefault();

      e.dataTransfer.dropEffect = 'copy';
    });
    target.addEventListener('drop', (e) => {
      e.preventDefault();

      e.target.innerText = e.dataTransfer.getData('text/plain').trim();

      for (const file of e.dataTransfer.files) {
        e.target.innerText += file.name + ' ';
      }
    });
  </script>
</div>

## 类型

```ts
interface DataTransfer {
    dropEffect: "none" | "copy" | "link" | "move"
    effectAllowed: "none" | "copy" | "copyLink" | "copyMove" | "link" | "linkMove" | "move" | "all" | "uninitialized"
    readonly files: FileList
    readonly items: DataTransferItemList
    readonly types: ReadonlyArray<string>
    clearData(format?: string): void
    getData(format: string): string
    setData(format: string, data: string): void
    setDragImage(image: Element, x: number, y: number): void
}

declare var DataTransfer: {
    prototype: DataTransfer
    new(): DataTransfer
}

interface DataTransferItem {
    readonly kind: string
    readonly type: string
    getAsFile(): File | null
    getAsString(callback: FunctionStringCallback | null): void
    webkitGetAsEntry(): FileSystemEntry | null
}

declare var DataTransferItem: {
    prototype: DataTransferItem
}

interface DataTransferItemList {
    readonly length: number
    add(data: string, type: string): DataTransferItem | null
    add(data: File): DataTransferItem | null
    clear(): void
    remove(index: number): void
    [index: number]: DataTransferItem
}

declare var DataTransferItemList: {
    prototype: DataTransferItemList
}

interface DragEvent extends MouseEvent {
    readonly dataTransfer: DataTransfer | null
}

declare var DragEvent: {
    prototype: DragEvent
    new(type: string, eventInitDict?: DragEventInit): DragEvent
}

interface DragEventInit extends MouseEventInit {
    dataTransfer?: DataTransfer | null
}

interface GlobalEventHandlersEventMap {
    "drag": DragEvent;
    "dragend": DragEvent;
    "dragenter": DragEvent;
    "dragleave": DragEvent;
    "dragover": DragEvent;
    "dragstart": DragEvent;
    "drop": DragEvent;
}

interface GlobalEventHandlers {
    ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null
    ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null
    ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null
    ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null
    ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null
    ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null
    ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API>
* <https://html.spec.whatwg.org/multipage/dnd.html>
