---
title: CSS-2
date: 2022-08-05 21:50:38
tags:
- Frontend
- CSS
categories:
- [Frontend, CSS]
thumbnail: https://1000logos.net/wp-content/uploads/2020/09/CSS-Logo.png
---

# 选择器

选择器用于选取需要设置样式的 HTML 元素

## （1）简单选择器

#### （i）元素选择器

- 作用：根据元素名选中指定元素
- 语法：**_elementname_ {} **

#### （ii）id 选择器

- 作用：根据元素 id 属性值选中一个元素
- 语法：**#_idname_ {}**

#### （iii）类选择器

- 作用：根据元素的 class 属性值选中一组元素
- 语法：**._classname_ {}**

#### （iv）通配选择器

- 作用：选中页面中所有元素
- 语法：*** {}**

## （2）复合选择器

#### （i）交集选择器

- 作用：选中同时符合多个条件的元素
- 语法：**_selector1selector2selector3 _{}**

_注意：交集选择器中如果有元素选择器，必须以元素选择器开头_

#### （ii）并集选择器

- 作用：同时选中多个选择器对应的元素
- 语法：**_selector1，selector2，selector3 _{}**

```html
/*
 * 选择器1 * {}
 * 选择器2 span {}
 * 选择器3 .outer {}
 * 选择器4 #inner {}
 * 选择器5 span.inner {}
 * 选择器6 .outer, .inner {}
 */
<div class="outer">  /* 选中的选择器：1|3|6 */
  <span class="inner"></span>  /* 选中的选择器：1|2|5|6 */
  <div class="inner" id="inner"></div>  /* 选中的选择器：1|4|6 */
</div>
```

## （3）关系选择器

关系选择器根据元素之间的关系选取元素，一般直系后代选择器与后代选择器使用的较多一些

#### （i）直系后代选择器

- 作用：选中指定父元素的指定子元素
- 语法：**father > son**

#### （ii）后代选择器

- 作用：选中指定元素的指定后代元素
- 语法：**ancestor progeny**

#### （iii）相邻兄弟选择器

- 作用：选择下一个相邻兄弟元素
- 语法：**prior + next**

_注意：一定是选中_**_下一个_**_、_**_相邻_**_的兄弟弟元素_

#### （iv）通用兄弟选择器

- 作用：选择之后所有兄弟元素，不包括自己本身
- 语法：**elderbrother ~ youngerbrother**

```html
<main>
  <p>我是p元素</p>
  <div>
    <span>span0</span>
  </div>
  <span>span1</span>
  <span>span2</span>
  <span>span3</span>
</main>

<style>
  /* 样式1 没有元素字体变红色 */
  p + span {
    color: red;
  }
  /* 样式2 span1 字体变红色 */
  div + span {
    color: red;
  }
  /* 样式3 span1、span2、span3 字体变红色 */
  p ~ span {
    color: red;
  }
  /* 样式4 span1、span2、span3 字体变红色 */
  main > span {
    color: red;
  }
  /* 样式5 span0、span1、span2、span3 字体变红色 */
  main span {
    color: red;
  }
</style>
```

## （4）属性选择器

属性选择器根据 HTML 元素具有的 HTML 属性选取相应的元素

一般属性选择器使用相对较少，通常用于根据表单元素的type属性选取相应的元素以设置样式

以下 attribute 代表 HTML 属性，value 代表 HTML 属性值

#### （i）[attribute] 选择器

选取带有指定属性的元素

#### （ii）[attribute="value"] 选择器

选取带有指定属性和值的元素（值必须是完整或单独的单词）

#### （iii）[attribute~="value"] 选择器

选取属性值包含指定词的元素

#### （iv）[attribute|="value"] 选择器

选取指定属性以指定值开头的元素（值必须是完整或单独的单词）

#### （v）[attribute^="value"] 选择器

选取指定属性以指定值开头的元素（值不必是完整单词）

#### （vi）[attribute$="value"] 选择器

选取指定属性以指定值结尾的元素（值不必是完整单词）

#### （vii）[attribute*="value"] 选择器

选取属性值包含指定词的元素（值不必是完整单词）

```css
a {
  color: blue;
}

/* 包含href属性的超链接元素 */
a[href] {
  background-color: white;
}

/* href属性以 "#" 开头的超链接元素 */
a[href^="#"] {
  background-color: gold;
}

/* href属性包含 "example" 的超链接元素 */
a[href*="example"] {
  background-color: silver;
}

/* href属性包含 "insensitive" 的超链接元素,，不区分大小写 */
a[href*="insensitive" i] {
  color: cyan;
}

/* href属性包含 "cAsE" 的超链接元素，区分大小写 */
a[href*="cAsE" s] {
  color: pink;
}

/* href属性以 ".org" 结尾的超链接元素 */
a[href$=".org"] {
  color: red;
}
```

## （5）伪类选择器

伪类选择器是用于选择处于特定状态的元素的选择器

#### （i）子元素的伪类（序号）

- **:first-child**    选中父元素的第一个子元素
- **:last-child**    选中父元素的最后一个子元素
- **:nth-child()**    选中父元素的第 n 个子元素

特殊值：

   - **n**    选中父元素的所有子元素
   - **2n** 或 **even**    选中父元素的所有偶数个子元素
   - **2n+1** 或 **odd**    选中父元素的所有奇数个子元素
- **:nth-last-child()**    选中父元素从末尾开始数的第n个元素
- **:only-child**    选取没有任何兄弟元素的元素

（_以上伪类根据父元素的**所有子元素**排序计数_）

#### （ii）子元素的伪类（类型）

- **:first-of-type**    选中父元素中第一个同类的子元素
- **:last-of-type**    选中父元素中最后一个同类的子元素
- **:nth-of-type()**    选中父元素中第 n 个同类的子元素
- **:nth-last-of-type()**    选中父元素中第 n 个同类的子元素
- **:only-of-type**    选取没有任何相同类型的兄弟元素的元素

（_以上伪类根据父元素的**同类子元素**排序计数_）

#### （iii）超链接的伪类

建议按LVHA 顺序  :link — :visited — :hover — :active  声明超链接样式，否则可能会覆盖预期的样式

- **:link**    选取表示没访问过的链接（正常链接）
- **:visited**    选取表示访问过的链接

_由于隐私原因，这个伪类只能修改链接的文字颜色、背景颜色、边框颜色、轮廓颜色，且无法修改链接的透明度_

- **:any-link**    选取任一具有href属性的链接

实际效果相当于同时匹配 :link 或 :visited

#### （iv）用户交互相关伪类

- **:hover**    选取处于鼠标移入状态的元素

注意这个伪类在触摸屏上使用会存在一些问题，不建议在触摸屏设备上使用

- **:active**    选取表示鼠标点击状态的元素，即鼠标点击至松开之间的阶段

#### （v）表单相关伪类

- **:checked**    选取被选中的input:radio元素或input:checkbox元素或option元素
- **:focus**    选取获得焦点的input元素

常见的情形如表单输入时显示提示性的样式

- **:focus-within**    选取自身或自身子元素获得焦点的元素

相当于其自身或其子元素匹配到:focus伪类的元素

- **:indeterminate**    选取处于不确定状态的input元素

不确定状态如存在未选中的相同name的input:radio元素或input:checkbox元素的indeterminate设定为true或不确定的progress元素

- **:default**     选取默认状态的input元素

允许在input:radio元素或input:checkbox元素或option元素或button元素上使用

- **:placeholder-shown**    选取placeholder文本起效时的input或textarea元素
- **:disabled**     选取被禁用的input元素
- **:enabled**     选取被启用的input元素

以上两个属性可能需要使用input元素或form元素的disabled属性

- **:in-range**    选取值在规定范围内的input元素
- **:out-of-range**    选取值超出规定范围内的input元素

一般需要规定input的type属性为number
以上两个属性需要规定input元素的min属性或max属性以确定数值范围，否则没有意义

- **:invalid**    选取具有非法值的input元素
- **:valid **   选取具有合法值的input元素或form元素
- **:optional**    选取非必须的input元素或select元素或textarea元素
- **:required**    选取必须的input元素或select元素或textarea元素

以上两个属性可能需要使用input元素或form元素的required属性

- **:read-only**     选取规定只读的元素
- **:read-write**     选取规定可写的元素

以上两个属性可能需要使用表单元素的readonly属性或其他元素的contenteditable属性

#### （vi）类函数伪类

- **:not()**    接收一个选择器参数，将符合条件的元素从原选择器选中元素中去除
- **:is()**    接收任意数量的选择器参数，匹配符合任一选择器的元素
- **:where()**    接收任意数量的选择器参数，匹配符合任一选择器的元素

:where() 和 :is() 的不同之处在于:where() 的优先级总是为 0 而 :is() 的优先级总是由它的选择器列表中优先级最高的选择器决定的

#### （vii）其他伪类

- **:root**    选取文档的根元素

通常网页中指html元素，且优先级较高
通常用于声明全局 CSS 变量

- **:scope**     匹配选择器应匹配的参考点的元素

在样式表使用时，等价于:root
在 DOM API 使用时，等价于调用 API 的元素

- **:target**    选取唯一的页面元素(目标元素)，其id 与当前URL片段匹配

如https://www.baidu.com.html#p2，:target可以匹配到id为p2的任意类型的元素

- **:empty**     匹配没有子元素或内部没有文本的每个元素
- **:lang()**    根据元素的语言属性选取元素

lang可能由元素的 lang 属性决定或文档head标签内的 meta 标签规定的 lang 属性决定

- **:fullscreen**    选取处于全屏状态的元素
- **:defined**     选取已定义的元素：包括原生元素以及自定义元素

可以用于控制复杂的自定义组件加载完成前的显示，使其仅在加载完成后显示

## （6）伪元素选择器
伪元素选择器用于选取页面中一些特殊的并不存在的元素或是特殊的位置

- **::first-letter**    选择文本第一个字母

只适用于块状元素

- **::first-line**    选择文本第一行
- **::placeholder**    选取表单元素的placeholder属性规定的文本
- **::selection**    表示选中的内容
- **::marker**    选取列表项目的符号或是数字

_注意：以上四个伪元素选择器仅允许使用特定的CSS属性_

- **::before**    选择元素的开始，可以在元素开始插入一些内容

必须结合 content 属性使用

- **::after**   选择元素的最后，可以在元素结束插入一些内容

必须结合 content 属性使用

- **::backdrop**    选取全屏模式下的元素的背景，会在当前元素之下但在其他元素之上

可以用于在一些元素的全屏模式下修改默认的背景表现
