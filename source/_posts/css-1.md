---
title: css-1
date: 2022-08-05 18:52:25
tags:
- Frontend
- CSS
categories:
- [Frontend, CSS]
thumbnail: https://1000logos.net/wp-content/uploads/2020/09/CSS-Logo.png
---

## 1. CSS简介

CSS 即**层叠样式表** (Cascading Style Sheets)，用于设置网页中元素的样式
最新的CSS版本为CSS3

## 2. CSS 基本语法

#### （1）CSS 结构：

- **选择器**    选择器用于选中页面中指定元素
- **声名块**    声名块内包含为元素设定的样式
  - **声名**    声名组成声名块，声明是键值对的形式

{% asset_img structure.png CSS structure %}

#### （2）CSS 注释

```css
/* 这是一条CSS注释 */

/*
 * 这也是一条CSS注释
 */
```

可以在代码中的任何位置添加注释，注释可以横跨多行

#### （3）HTML`class`属性与`id`属性

`**class**` 属性规定元素的一个或多个 class 名称
`**id**` 属性规定元素的唯一 id 值
两者都是 HTML 元素的全局属性
区别在于，同一个类名可以由多个 HTML 元素使用，而一个 id 名称只能由页面中的一个 HTML 元素使用

#### （4）CSS 样式表插入位置

有三种插入样式表的方法：

- **内联样式**，在标签内通过 style 属性设置元素样式
- **内部样式表**，将样式写在 head 标签的 style 标签里
- **外部样式表**，在外部 CSS 文件中写样式，再通过 link 标签导入

```html
<!DOCTYPE HTML>

<html>

  <head>
    <meta charset="utf-8">
    <title>css</title>

    <!-- 外部样式表 -->
    <link rel="stylesheet" type="text/css" href="example.css">

    <!-- 内部样式表 -->
    <style type="text/css">
      div {
        width: 100px;
      }
    </style>
  </head>

  <body>
    <!-- 内联样式 -->
    <div class="e" id="e0" style="height: 100%"></div>
  </body>

</html>
```

## 3. CSS 颜色

在HTML中，我们已经了解了一些颜色使用方式，如

- 颜色关键字，如 `white` 等
- 十六进制颜色，如 `#de34e3`
- rgb 函数及 rgba 函数，如 `rgb(12,34,250)`

与之对应的是RGB颜色模式，取值均从0至255

   - 红色（red）
   - 绿色（green）
   - 蓝色（blue）

以下是其他一些在CSS中的颜色使用方法

- hsl函数及hsla函数 `hsl(hue, saturation, lightness)` `hsla(hue, saturation, lightness, alpha)`

与之对应的是HSL颜色模式

   - 色相（hue）是色轮上从 0 到 360 的度数，0 是红色，120 是绿色，240 是蓝色
   - 饱和度（saturation）是一个百分比值，可以认为是颜色的强度，0％ 表示灰色阴影，而 100％ 是全色
   - 亮度（lightness）也是百分比，可以认为是应为颜色赋多少光，0％ 是黑色，50％ 是既不明也不暗，100％是白色

- transparent 关键字 | 指定透明色
- currentColor 关键字 | 指定从当前元素的文字颜色获取当前属性应指定的颜色

## 4. CSS 单位

许多 CSS 属性接受“长度”值，长度是一个后面跟着长度单位的数字，数字和单位之间不能出现空格；但若数字为 0，则可以省略单位

长度单位有两种，分别是**绝对单位**和**相对单位**

- 绝对长度单位是固定的，用任何一个绝对长度表示的长度都将恰好显示为这个尺寸
- 相对长度单位规定相对于另一个长度属性的长度

| 绝对单位 | 描述 |
| --- | --- |
| cm | 厘米 |
| mm | 毫米 |
| in | 英寸 (1in = 96px = 2.54cm) |
| Q | 四分之一毫米 |
| **px ** | **像素** (1px = 1/96th of 1in) |
| pt | 点 (1pt = 1/72 of 1in) |
| pc | 派卡 (1pc = 12 pt) |

其中最常用的是px

| 相对单位 | 描述 |
| --- | --- |
| **em** | 相对于**元素的字体大小**（font-size）（2em 表示当前元素的字体大小的 2 倍） |
| ex | 相对于当前字体的字符 "x" 的高度 |
| ch | 相对于当前字体的字符 "0" 的宽度 |
| **rem** | 相对于**根元素的字体大小**（font-size） |
| **vw** | 相对于**视窗宽度的 1%** |
| **vh** | 相对于**视窗高度的 1%** |
| vmin | 相对于视窗宽度与高度内的较小尺寸的 1％ |
| vmax | 相对于视窗宽度与高度内的较大尺寸的 1％ |
| **%** | 相对于父元素相应属性的百分比 |
