---
title: KeyboardEvent Sequence
date: 2023-08-22 20:39:55
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
uniqueId: '2023-08-22 20:39:55/KeyboardEvent Sequence.html'
mathJax: false
---

## KeyboardEvent 事件链路

Keyboard 的相关操作会触发相应 DOM 元素以及全局 window 对象上的一些事件处理回调方法，并产生相应的事件链路，包括 `keydown`、`keypress`、`keyup` 等键盘事件，`beforeinput`、`input` 等输入事件以及 `compositionstart`、`compositionupdate`、`compositionend` 等组合输入事件

### 事件触发链路

keydown 按下键盘按键【KeyboardEvent】

keypress 按下产生字符值按键（需为字母键、数字键和标点符号键而非修饰键）【KeyboardEvent】

compositionstart 开始组合输入（需为组合输入模式）【CompositionEvent】

beforeinput 即将产生编辑效果（仅在可输入元素时触发）【InputEvent】

compositionupdate 更新组合输入内容（需为组合输入模式）【CompositionEvent】

input 即将产生编辑效果（仅在可输入元素时触发）【InputEvent】

若持续按下键盘按键，则按自1至4的顺序循环触发事件直至松开键盘按键【同时事件的repeat属性标记为true】

compositionend 结束组合输入（需为组合输入模式）【CompositionEvent】

keyup 松开键盘按键【KeyboardEvent】

### 示例

* 正常按下按键 `1`

> * keydown
> * keypress
> * beforeinput
> * input
> * keyup

* 连续按下按键 `1`

> * keydown
> * keypress
> * beforeinput
> * input
> * keydown
> * keypress
> * beforeinput
> * input
> * ……
> * keyup

* 中文模式下，按下 `w` 键，利用鼠标选中 `我`

> * keydown
> * compositionstart
> * beforeinput
> * compositionupdate
> * input
> * keyup
> * keyup
> * beforeinput
> * compositionupdate
> * input
> * compositionend

```html
<!DOCTYPE html>

<html>
  <head></head>
  <body>
    <textarea id="el"></textarea>
    <script>
      const el = document.getElementById('el')

      el.addEventListener('keydown', () => {
        console.log('keydown')
      })

      el.addEventListener('keypress', () => {
        console.log('keypress')
      })

      el.addEventListener('beforeinput', () => {
        console.log('beforeinput')
      })

      el.addEventListener('input', () => {
        console.log('input')
      })

      el.addEventListener('keyup', () => {
        console.log('keyup')
      })

      el.addEventListener('compositionstart', () => {
        console.log('compositionstart')
      })

      el.addEventListener('compositionupdate', () => {
        console.log('compositionupdate')
      })

      el.addEventListener('compositionend', () => {
        console.log('compositionend')
      })
    </script>
  </body>
</html>
```
