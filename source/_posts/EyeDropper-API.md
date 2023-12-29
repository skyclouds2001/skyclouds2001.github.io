---
title: EyeDropper API
date: 2023-10-27 22:49:36
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
uniqueId: '2023-10-27 14:49:36/EyeDropper API.html'
mathJax: false
---

EyeDropper API 提供了吸管工具，允许用户选择屏幕上的某个特定位置的颜色

该 API 仅在严格上下文环境下允许使用

## 使用

`EyeDropper()` 构造函数用于创建一个 eyedropper 工具

调用 `EyeDropper` 接口的 `open()` 方法以选择颜色

方法接受一个可选的配置项，其唯一可选属性 `signal` 是一个 `AbortSignal`，可用于编程式退出选择过程

方法返回一个 Promise 的对象，其唯一属性 `sRGBHex` 代表一个相应的十六进制的颜色字符串

方法可能抛出 `NotAllowedError`，若方法不是因为用户交互触发的

方法可能抛出 `InvalidStateError`，若当前已存在其他打开的 `EyeDropper`

方法可能抛出 `AbortError`，若用户退出选择颜色或因调用 `AbortSignal.abort()` 方法退出

方法可能抛出 `OperationError`，若因为除用户主动退出之外的原因导致获取颜色信息失败

```js
try {
  const eyeDropper = new EyeDropper()

  const controller = new AbortController()

  const { sRGBHex } = await eyeDropper.open({
    signal: controller.signal,
  })

  console.log(sRGBHex)
} catch (err) {
  console.error(err)
}
```

## 示例

<div id="eyedropper" style="padding: 20px; background-color: white; display: flex; justify-content: flex-start; align-items: center; gap: 25px" role="article">
  <span>选择的颜色为：</span>
  <div style="width: 50px; height: 50px; display: inline-block; background-color: yellow"></div>
  <button style="border: none; outline: none">选择颜色</button>
  <script type="module">
    const span = document.querySelector('#eyedropper span');
    const div = document.querySelector('#eyedropper div');
    const button = document.querySelector('#eyedropper button');
    const eyedropper = new window.EyeDropper();
    button.addEventListener('click', async () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 2500);
      const { sRGBHex } = await eyedropper.open({
        signal: controller.signal,
      });
      div.style.backgroundColor = sRGBHex;
      span.innerText = '选择的颜色为：' + sRGBHex;
    });
  </script>
</div>

## 类型

```ts
interface ColorSelectionResult {
  sRGBHex: string
}

interface ColorSelectionOptions {
  signal: AbortSignal
}

interface EyeDropper {
  constructor()
  open(options: ColorSelectionOptions): Promise<ColorSelectionResult>
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API>
* <https://wicg.github.io/eyedropper-api/>
