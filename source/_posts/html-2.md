---
title: HTML-2
date: 2022-07-29 20:51:59
tags:
  - Frontend
  - HTML
categories:
  - [Frontend, HTML]
thumbnail: https://ru.w3docs.com/uploads/media/book_gallery/0001/02/849d4286475e04155fd5f21861f16f53db95ac72.png
---

## 1. 超链接标签及媒体元素标签

#### （1）超链接标签`<a>`

**简介**

超链接可以用于跳转到新的文档或网页或者当前文档中的某个部分，超链接可以是一个字，一个词，或者一组词，也可以是一幅图像，一块区域等等
超链接标签内可以包裹其他任意标签（超链接标签本身除外）

**属性**

- href 定义指向一个文件或是一个网址的 url 或是一个 url 片段
- target 定义超链接的跳转方式
  - _self：在当前页面中打开超链接【默认值】
  - _blank：在新页面中打开超链接
- download 定义下载 url 指向的文件而不是打开链接，会提示用户保存该文件

**用法**

```html
<!-- 跳转到网页 -->
<a href="https://baidu.com">百度</a>

<!-- 新窗口打开网页 -->
<a href="https://baidu.com" target="_blank">百度</a>

<!-- 链接到同目录下另一个 html 文件 -->
<a href="another.html">HTML</a>

<!-- 页面书签 -->
<a name="label">看这里</a>
<a href="#label">书签</a>

<!-- 页面书签：利用元素id属性实现 -->
<p id="label">看这里</p>
<a href="#label">书签</a>
<!-- 特别的：假如浏览器找不到已定义的命名锚，那么就会定位到文档的顶端，不会产生任何错误 -->
<a href="#">去顶部</a>

<!-- # 可作为超链接路径占位符 -->
<a href="#">我是假的超链接</a>
<!-- 也可用 javascript 方式占位 -->
<a href="javascript:;">我是假的超链接</a>

<!-- 发送电子邮件：将用户的电子邮件程序打开来发送新邮件 -->
<a href="mailto:nowhere@mozilla.org">Send email to us.</a>
```

#### （2）图像标签`<img>`

**简介**

图像标签可以用于向网页中嵌入一幅图像

**属性**

- src 规定图片的 url 路径
- alt 规定图片的描述
  - 当图片无法加载时会显示 alt 属性内的描述
  - 同时屏幕阅读器会将 alt 属性内的描述读给需要使用阅读器的使用者听，便于理解图像的含义
  - 搜索引擎会根据 alt 中内容识别图片，不给出 alt 属性不会收录图片
  - 空alt属性表明该图像不是内容的关键部分
  - _建议：alt 属性的值应能够清晰、简洁地描述图像的内容而不仅仅是图片文件名或是用于体现图片的存在_
- width 及 height 指定图片的宽与高
  - 图片实行的是等比例缩放
  - 建议仅指定 width 和 height 属性中其一，不同时使用，否则可能会扭曲图片的比例
  - 建议仅使用像素px作为图片标签的单位，不推荐使用百分比作为图片标签的单位
  - 可以用CSS的width属性和height属性替代
- decoding 规定图片的解码方式
  - sync 同步解码图片，会阻碍其他内容的显示，可能会导致页面渲染时间增长
  - async 异步解码图片，不会阻碍其他内容显示
  - auto 浏览器自动决定 【默认值】
- importance 规定图片加载时的优先级
  - high 规定图片加载优先级较高
  - low 规定图片加载优先级较低，图片可能会延后显示
  - auto 图片加载优先级由浏览器自动决定 【默认值】
- loading 规定图片的加载方式
  - eager 立即加载图片 【默认值】
  - lazy 延迟加载图片，直至其与浏览器视窗接近一定距离再开始显示，可以加快网页页面的显示

**图片格式**

- jpeg（jpg）
  - 支持颜色比较丰富，不支持透明效果，不支持动图
  - 一般用来显示照片
- gif
  - 支持的颜色比较少，支持简单透明，支持动图
  - 颜色单一的图片，动图
- png
  - 支持颜色丰富，支持复杂透明，不支持动图
  - 颜色丰富、复杂透明图片（转为网页而生）
- webp
  - 新推出的专用于表示网页中表示图片的格式，具备其他图片格式的所有优点，而且图片特别小
  - 缺点：兼容性较弱（IE 等）

#### （3）音频标签`<audio>`

**简介**

用于向当前页面嵌入一个外部音频文件

**属性**

- src 音频的 url 路径
- controls 规定向用户提供显示控制元件，比如播放按钮
  - 唯一合法取值 controls
- loop 规定音频应循环播放
  - 唯一合法取值 loop
- autoplay 规定音频应自动播放，无需等待整个音频文件加载完成
  - 唯一合法取值 autoplay
- muted 规定音频是否静音
  - 默认取值为 false，即不静音；true 代表静音
- preload 建议音频的加载方式
  - none  提示浏览器无需缓存音频
  - metadata  提示浏览器获取音频元信息但不加载
  - auto  提示浏览器需缓存音频
  - 空字符串 等效于auto属性

**其他**

可以在开始标签和结束标签之间放置文本内容，这样老的浏览器就可以显示出不支持该标签的信息

```html
<!-- 常规用法 -->
<audio src="someaudio.wav" controls="controls" autoplay="autoplay" loop="loop">
  您的浏览器不支持 audio 标签
</audio>

<!-- 考虑音频文件兼容性的写法 -->
<!-- 仅做了解即可 -->
<audio controls="controls" height="100" width="100">
  <source src="song.mp3" type="audio/mp3" />
  <source src="song.ogg" type="audio/ogg" />
  <embed height="100" width="100" src="song.mp3" />
</audio>
```

#### （4）视频标签`<video>`

**简介**

用于向当前页面引入一个外部视频文件，也可以用来引入一个外部音频文件（但建议使用 audio 标签）

**属性**

- src 规定视频 url 路径
- controls 规定向用户显示控制元件，比如播放按钮
  - 唯一合法取值 controls
- loop 规定视频循环播放
  - 唯一合法取值 loop
- autoplay 规定视频应自动播放，无需等待缓存完成
  - 唯一合法取值 autoplay
- width height 规定视频播放器宽度及高度
  - 单位是像素
  - 推荐在使用`<video>`标签时都规定视频播放器的高度和宽度
- muted 规定视频是否默认静音
  - 默认取值为 false，即不静音；true 代表静音
- poster 规定视频的海报帧，默认未指定时使用视频的第一帧替代
- preload 建议视频的加载方式
  - none  提示浏览器无需缓存视频
  - metadata  提示浏览器获取视频元信息但不加载
  - auto  提示浏览器需缓存视频
  - 空字符串 等效于auto属性

**其他**

可以在开始标签和结束标签之间放置文本内容，这样老的浏览器就可以显示出不支持该标签的信息

```html
<!-- 建议用法 -->
<video src="movie.ogg" controls="controls">您的浏览器不支持 video 标签。</video>

<!-- 考虑兼容 IE 8 -->
<!-- 仅做了解即可 -->
<video width="320" height="240" controls="controls">
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  <source src="movie.webm" type="video/webm" />
  <object data="movie.mp4" width="320" height="240">
    <embed src="movie.swf" width="320" height="240" />
  </object>
</video>
```

## 2. 表格

#### （1）表格简介

表格由 `<table>` 标签来定义。每个表格均有若干行（由 `<tr>` 标签定义），每行被分割为若干单元格（由 `<td>` 标签定义）。数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等

```html
<!-- 一个简单的表格示例 -->
<table>
  <tr>
    <td>row 1, cell 1</td>
    <td>row 1, cell 2</td>
  </tr>
  <tr>
    <td>row 2, cell 1</td>
    <td>row 2, cell 2</td>
  </tr>
</table>
```

效果如图
{% asset_img table1.png %}

#### （2）`<th>` 标签

表格的表头单元格使用 <th> 标签进行定义

一般表头会显示为粗体居中的文本

#### （3）合并单元格

colspan 属性规定单元格可横跨的**列**数

rowspan 属性规定单元格可横跨的**行**数

以上两个属性具有最大值 65534，超出的值会自动当作 65534 处理

#### （4）`<caption>` 标签

`<caption>` 标签用于定义表格标题

`<caption>` 标签**必须**紧随 table 标签之后。只能对每个表格定义一个标题，通常标题会居中于表格主体内容之上

#### （5）空单元格问题

如果某个单元格是空的（没有内容），部分浏览器可能无法显示出这个单元格的边框，为此可以在空单元格中添加一个空格占位符从而避免这种状况出现

```html
<table border="1">
  <tr>
    <th>th1</th>
    <th>th2</th>
    <th>th3</th>
  </tr>
  <tr>
    <td>row 1, cell 1</td>
    <td>row 1, cell 2</td>
    <td>row 1, cell 3</td>
  </tr>
  <tr>
    <td colspan="2">row 2, cell 1&2</td>
    <td rowspan="2">row 2&3, cell 3</td>
  </tr>
  <tr>
    <td>row 3, cell 1</td>
    <td>row 3, cell 2</td>
  </tr>
</table>
```

{% asset_img table2.png %}

#### （6）`<thead>`标签及`<tbody>`标签及`<tfoot>`标签

这些标签常作为语义化标签

`<thead>`标签定义表格的列首行
`<tbody>`标签定义表格的内容主体行
`<tfoot>`标签定义表格的汇总行

## 3. 列表

#### （1）无序列表

无序列表是一个项目的列表，列表项使用粗体圆点进行标记
无序列表使用 `<ul>` 标签定义，各列表项使用 `<li>` 定义

- type 规定无序列表的序号类型

_注意：不推荐使用该 HTML 属性，而是建议使用 CSS 的 list-style-type 属性替代_

```html
<ul>
  <li>结构</li>
  <li>表现</li>
  <li>行为</li>
</ul>
```

#### （2）有序列表

有序列表也是一列项目，列表项目使用数字进行标记
有序列表使用 `<ol>` 标签定义，各列表项使用 `<li>` 标签定义
以下属性是 `<ol>` 标签的 HTML 属性

- reversed 规定有序列表的项是否反向排列，即序号自大而小排列
- start 规定有序列表的起始项的序号，默认值是 1
- type 规定有序列表的序号的种类，默认值是 1
  - a 表示小写英文字母编号
  - A 表示大写英文字母编号
  - i 表示小写罗马数字编号
  - I 表示大写罗马数字编号
  - 1 表示数字编号
  - _注意：不推荐使用该 HTML 属性，而是建议使用 CSS 的 list-style-type 属性替代_
以下属性是 `<li>` 标签在`<ol>` 标签内可选的 HTML 属性

- value 规定项的序号，只允许使用数字，其后的项会从设置的该项的序号开始计数

```html
<ol>
  <li>结构</li>
  <li>表现</li>
  <li>行为</li>
</ol>
```

#### （3）自定义列表

自定义列表不仅仅是一列项目，而是项目及其注释的组合
自定义列表使用 `<dl>` 标签定义，各自定义列表项使用 `<dt>`定义 ，各自定义列表项的定义使用`<dd>` 定义

```html
<dl>
  <dt>结构</dt>
  <dd>结构表示网页结构</dd>
  <dd>规定网页中哪里是标题，哪里是段落</dd>
</dl>
```

#### （4）列表的使用

实际用的时候直接用列表原生样式比较少（由于样式比较简陋）
使用时更主要是使用其代表的结构和语义
其中无序列表用的比较多，多用于网页导航栏（nav），或者侧边栏等地方；自定义列表可以实现下拉框
另外，列表允许互相嵌套

## 4. 表单

HTML 表单用于收集不同类型的用户输入并发送给服务器

#### （1）`<form>` 标签

`<form>` 标签用于为用户输入创建 HTML 表单

建议：所有的表单元素都应当包含于`<form>` 标签内

- `name` 属性 规定表单的名称

该属性的值必须是独有的值且不能是空字符串

另外，只有设置了 name 属性的表单元素才能在提交表单时传递它们的值，所以**一般收集信息的*表单元素*都应设置 name 属性**

- `action` 属性 规定当提交表单时，向何处发送表单数据，即发送信息的目标服务器的 URL
- `method` 属性 规定如何发送表单数据，即*HTTP 请求方法*
  - 取值：'post' 或 'get'等
- `target` 属性 规定在提交表单信息后如何显示响应信息
  - _self 在当前的浏览上下文加载
  - _blank 在新的浏览上下文加载
- `autocomplete`属性 建议浏览器是否应自动补全表单元素内容
  - on 开启
  - off 关闭
  - 该属性的效果取决于浏览器如何处理该属性
- `novalidate`属性 规定浏览器提交表单前是否应验证表单元素内容的合法性
  - 唯一取值为 novalidate

#### （2）表单输入元素

`<input>` 标签用于搜集用户信息

根据不同的 type 属性值，输入字段可以拥有非常非常多样的形式

- `type` 属性 规定 input 元素的类型
  - （以下标粗的是推荐掌握的）
  - button 定义按钮（通常用于通过 JavaScript 启动脚本）
  - **checkbox** 定义复选框
  - **file** 定义输入字段和 "浏览"按钮，用于文件上传
  - hidden 定义隐藏的输入字段
  - image 定义图像形式的提交按钮
  - **password** 定义密码字段，该字段中的字符会被掩码
  - **radio** 定义单选按钮
  - reset 定义重置按钮（会清除表单中的所有数据）
  - submit 定义提交按钮（会把表单数据发送到服务器）
  - **text** 定义单行的输入字段，用户可在其中输入文本，默认宽度为 20 个字符
  - number 定义输入数字的控件
  - range 定义输入数字的滚动条
  - tel 定义输入电话号码的控件
  - email 定义输入电子邮件地址的控件
  - url 定义输入 url 的控件
  - color 定义指定颜色的控件
  - month 定义输入日期-年月的控件
  - date 定义输入日期-年月日的控件
  - datetime-local 定义输入日期时间的控件
  - time 定义输入时间的控件
  - week 定义输入日期-年与周数的控件
  - search 定义用于搜索字符串的单行文字区域
- `value` 属性 规定 input 元素的值，对不同的 input 元素会有不同的效果
- `disabled` 属性 规定 input 元素是否可使用
- `placeholder` 属性 规定 input 元素输入为空且未获得焦点时控件显示的内容
- `spellcheck` 属性 规定是否应检测输入的拼写语法
- `required` 属性 规定 input 元素是必须的且应检查值的合法性

（仅对 password, search, tel, text, url 有效）

- `checked` 属性 规定 input 元素是否初始时应被选中

（仅对 radio、checked 有效）

- `autofocus` 属性 规定 input 元素在加载后自动聚焦
- `autocomplete` 属性 建议 input 元素应使用自动填充功能
- `multiple` 属性 规定可选择多个选项

（仅对 email file 有效）
更多 input 元素的 HTML 属性，可以参考 [链接](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#%E5%B1%9E%E6%80%A7)

#### （3）下拉列表

`<select>` 标签用于定义下拉列表

列表选项应使用 `<option>` 元素定义，通常会把首个选项显示为被选选项，但可以通过对特定的 `<option>` 元素添加 selected 属性来定义预定义选项
select 标签拥有 autocomplete、autofocus、disabled、multiple、required 等属性

option 标签拥有 disabled、value 等属性，其中若 value 属性未指定值则默认是元素的文本内容

```html
<select name="pets" id="pet-select">
  <option value="">--Please choose an option--</option>
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
</select>
```

#### （4）文本域

`<textarea>` 标签定义多行输入字段（即文本域）

- autocomplete、autofocus、disabled、value 等属性
- `cols` 属性 和 `rows` 属性规定文本可见宽度及高度，推荐使用 CSS 选择器替代

#### （5）按钮

`<button>` 标签定义可点击的按钮

- `type`属性 规定 button 的类型
  - 取值可为：button reset submit
- autocomplete、autofocus、disabled、maxlength、minlength、placeholder、required、value 等属性

效果同相同`type`属性取值的 `<input>` 标签，但可以在 button 标签内放置更多的元素因而可以有更加多样的样式表现

_注意：请始终应为按钮规定 type 属性，因为其默认值在不同浏览器中不同_

#### （6）`<label>` 标签

<label> 标签为 input 元素定义标注

当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上
**<label> 标签的 for 属性应当与相关元素的 id 属性相同**

```html
<!-- 参考代码 -->
<form method="post" action="#" name="post">
  <input type="text" name="text" maxlength="25" /> <br />
  <input type="password" name="password" /> <br />
  <input type="radio" name="radio" checked />r <br />
  <input type="checkbox" name="checkbox" />c1 <br />
  <input type="checkbox" name="checkbox" />c2 <br />
  <input type="button" value="按钮" /> <br />
  <input type="submit" /> <br />
  <input type="reset" /> <br />
  <input type="file" name="file" accept="image/jpg" /> <br />
  <input
    type="image"
    name="image"
    src="https://www.xidian.edu.cn/__local/C/BD/8E/B4E1319F602F3F83CF5538DDABD_CA336AC2_43244.jpg"
    alt=""
    width="100"
  />
  <br />
  <input type="hidden" /> <br />
  <hr />

  <select name="select">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3" selected>3</option>
  </select>
  <br />

  <textarea name="textarea" placeholder="..." cols="20" rows="20"></textarea>
  <br />
</form>
```

参考效果
{% asset_img form.png %}

#### 5. 内联框架

iframe 用于在网页内嵌入另外一个网页

```html
<iframe src="URL"></iframe>
```

- `src` 属性 设置内联网页的 url
- `width` 属性 和 `height` 属性 设置内联框架的宽度和高度

实际使用内联框架情况比较少见，常常是用来引用 bilibili 播放器等开放资源，如

```html
<iframe
  src="//player.bilibili.com/player.html?aid=422093073&bvid=BV1J3411475Q&cid=453689337&page=1"
  scrolling="no"
  border="0"
  frameborder="no"
  framespacing="0"
  allowfullscreen="true"
>
</iframe>
```
