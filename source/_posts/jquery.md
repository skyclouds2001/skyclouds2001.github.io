---
title: jQuery
date: 2022-08-14 22:55:26
tags:
- Frontend
- JavaScript
- Library
categories:
- [Frontend, Library]
thumbnail: https://logos-download.com/wp-content/uploads/2016/09/jQuery_logo.png
---

# jQuery

### 简介

##### 官方文档

[https://jquery.com/](https://jquery.com/)

##### 内容

jQuery  JavaScript函数库

jQuery文件结构(function() {} ())，实质是一个自执行函数，给window对象添加一个jQuery属性和$属性

$是一个函数，传一个匿名函数即入口函数；传一个字符串即选择器；传一个dom对象即jQuery对象

可以用jQuery代替$的使用

引入jQuery即执行该js文件内代码

##### 入口函数

`$(function() {})`   等价于 `window.onload()`

可以写多个jQuery入口函数，其执行时机快于window.onload：window.onload等待所有资源加载完毕后执行；jQuery入口函数只等待dom树加载完成

`$(document).ready(function(){})`入口函数

##### 建议

* 把所有 jQuery 代码置于事件处理函数中

* 把所有事件处理函数置于文档就绪事件处理器中

* 把 jQuery 代码置于单独的 .js 文件中

* 如果存在名称冲突，则重命名 jQuery 库

### jQuery对象

##### 概念

* jQuery对象是伪数组，实际是dom对象的一个包装集合

* 通过jQuery($())包装DOM的对象后产生的对象，为jQuery独有

* 与DOM对象无法相互使用彼此方法

* 建议jQuery对象在变量名前加$

##### jQuery对象获取DOM对象

- [*index*]
- .get(*index*)

##### jQuery对象获取DOM对象

* $()包装

### jQuery事件

* 触发点击事件   .click()

* 设置点击事件   .click(function(){})

**特别的**，仅会返回符合条件的第一个属性值

* 鼠标移入事件     .mouseover()  .mouseenter()

特别的，over在移入其本身及其子元素都会触发，enter仅移入其本身才触发

* 鼠标移出事件     .mouseleave  .mouseout

特别的，out在移出其本身及其子元素都会触发，leave仅移出其本身才触发



##### 事件添加

简单事件->bind事件->delegate事件->on事件

简单事件：click(function(){})  不支持同时注册与动态注册

bind事件：.bind('click', function(){})   不支持动态注册

delegate事件：.delegate('*selector*', {click: function(){}})

on事件：

事件注册 $(*selector*).on('click', function(){})

事件委托 $(selector).on('click', 'selector', function() {})

##### 事件解绑

unbind()  不推荐

undelegate()  不推荐

off() 推荐    无参

##### 事件触发

trigger()    触发事件

##### 事件对象

jQuery事件对象是对原生js事件对象的封装，已处理了兼容性

###### 坐标

* screenX|screenY   原点屏幕左上角
* clientX|clientY    原点可见页面区域左上角
* pageX|pageY    原点页面区域左上角

###### 方法

* stopPropagation()    阻止事件冒泡
* preventDefault()    阻止浏览器默认行为

事件响应方法返回false，可阻止事件冒泡与浏览器默认行为

* keyCode   获取按下键盘的键码



### jQuery选择器

##### 简单选择器

* id选择器			$('#*id*')
* 类名选择器        $('.*class*')
* 元素选择器        $('*tag'*)
* 通配选择器        $('*')

选取当前元素      $(this)

##### 复合选择器

* 并集选择器           $('*selector1*', '*selector2*')
* 交集选择器           $('*selector1selector2*')

##### 关系选择器

* 子运算选择器           $('*father* > *son*')

* 后代元素选择器        $('*grandfather* *son*')

##### 过滤选择器

* $(':eq(*index*)')     特定序号子元素选择
* $(':odd')     奇数子元素选择
* $(':even')    偶数子元素选择

##### 筛选选择器/方法

* .next()    找下一个兄弟元素
* .prev()    找上一个兄弟元素
* .eq(index)        查找指定下标的兄弟元素
* .parent()        查找父元素
* .siblings(*selector*)     查找不包含自身的兄弟元素
* .find(*selector*)      后代选择器
* .children(*selector*)      子类选择器

### jQuery HTML元素操作

##### 获取及设置元素内容属性

* 设置元素内文本			        `.text(*String*)`  `.text(function(i, origText) {return *string*})`

  ​	会覆盖内部所有内容包括子元素内容

  ​	不会解析字符串中的HTML部分

  ​	存在隐式迭代现象

  ​	回调函数形式：回调函数由两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值，然后以函数新值返回您希望使用的字符串

```js
      $("#test1").text(function(i,origText){
        return "Old text: " + origText + " New text: Hello world!
        (index: " + i + ")";
      });
```

* 获取元素内**所有**文本			.text()

* 获取及设置元素内容                  .html()

  同text

  可以解析设置内容的元素节点

* 获取及设置表单字段的值              .val()

  同text

* 创建节点 $()

  需要主动添加到页面内

##### 获取及设置元素样式属性

* 设置元素CSS属性			.css('*property*', *value*)

  ​	.css('*property1*': *value1*)

  ​	.css({'*property1*': *value1*, '*property2*': *value2*})

  修改与添加

* 获取元素 CSS属性内容			.css('*property*')

```js
$('#box1').css('width', '300px')
$('#box1').css('width', 300)

$('#box1').css({
    width: 300,
    'height': '300px',
    'background-color': 'green'
})
```

* 获取和设置元素的属性值              .attr()

  同css，回调函数同text

* 移除属性值            .removeAttr('*tag*')
* 设置布尔类型的属性：即元素标签内添加起效，不添加不起效的     .attr('*tag*')

##### 获取元素尺寸

* 获取或设置元素宽高       .width()   .height()
* 获取元素含内边距宽高       .innerwidth()   .innerheight()
* 获取元素含内边距及边框宽高       .outerwidth()   .outerheight()
* 获取元素含内外边距及边框宽高       .outerwidth(true)   .outerheight(true)

##### 获取元素位置

* 获取元素距document位置    .offset()

  返回对象，包括top和left的值

* 获取元素距设置定位属性的父元素offsetParent的位置    .position()

  返回值情况同offset

##### 插入元素

* 在元素**开头结尾**插入内容		.prepend(*string1*, ...)  .append(*string1*, ...)

  `$("p").append("Some appended text.");`

​	.appendTo()  .prependTo()

  `$(content).appendTo(selector)`

* 在元素**之前之后**插入元素    .before()  .after()

  `$("img").after("Some text after");`

##### 删除元素

* 删除元素及其子元 素      .remove()  .remove(*selector*)

  `$("#div1").remove();`

  `$("p").remove(".italic");` 过滤

* 删除元素子元素      .empty()

  `$("#div1").empty();`

##### 获取及设置类class

* 添加类       .addClass()

  `$("#div1").addClass("important");`

  `$("div").addClass("important blue");`

* 移除类        .removeClass()

  `$("h1,h2,p").removeClass("blue");`

  `$("div").addClass("important blue");`

  `$("h1,h2,p").removeClass();`

* 添加&删除类        .toggleClass()

* 判断类的存在    .hasClass()

  返回布尔值

  `$("#div1").hasClass("important");`

##### 其他

* 查询并设置元素内容被卷曲出去的宽高度    scrollLeft()    scrollTop()

  即元素的子元素宽高度超出元素本身的宽高度

* 克隆元素    .clone()

  克隆的节点需要主动添加至页面上

  参数true表示克隆事件，否则不克隆事件，默认不克隆



### jQuery效果与方法

##### 元素隐藏及显示

* 隐藏元素			.hide()
* 显示元素            .show()
* 隐藏及显示元素      .toggle()

  无参数无动画效果，有参数有动画效果

  speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"normal"、"fast" 或毫秒

  callback 参数是 toggle() 方法完成后所执行的函数名称

  > 实质是修改display属性

##### 元素淡入淡出

* 淡入已隐藏元素             .fadeIn()

  `$(selector).fadeIn(speed,callback);`

* 淡出可见元素        fadeOut()

  `$(selector).fadeOut(speed,callback);`

* 淡入或淡出元素        fadeToggle()

  `$(selector).fadeToggle(speed,callback);`

* 渐变为指定不透明度        fadeTo()

  `$(selector).fadeTo(speed,opacity,callback);`

  > 实质是修改opacity属性

##### 元素滑动

* 向下滑动        .slideDown()

  `$(selector).slideDown(speed,callback);`

* 向上滑动        .slideUp()

  `$(selector).slideUp(speed,callback);`

* 向下或向上滑动         .slideToggle()

  `$(selector).slideToggle(speed,callback);`

  > 实质是修改padding和margin属性等

##### 元素动画(自定义动画)

* 自定义动画        .animate()

  `$(selector).animate({params},speed,easing,callback);`

  easing  可选  规定在不同的动画点中设置动画速度的 easing 函数（swing缓动 或 linear匀速）

  可以定义相对值（该值相对于元素的当前值），在值的前面加上 += 或 -=

* 停止动画         .stop()

  `$(selector).stop(stopAll,goToEnd);`

  可选的 stopAll 参数规定是否应该清除动画队列，默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行

  可选的 goToEnd 参数规定是否立即完成当前动画。默认是 false

##### 其他

* 释放 $ 标识符的控制，并返回对$的引用，可创建新的jQuery对象    $.noConflict()

### jQuery遍历

##### 祖先

* parent()      获取给定元素的直接父元素

* parents()      获取给定元素的所有祖先元素，直至文档根元素html

  允许参数，以过滤搜索祖先元素

* parentsUntil()      获取直至给定元素间的所有祖先元素

##### 后代

* children()     获取给定元素的所有直接子元素

  可添加参数过滤搜索

* find()     获取给定元素的后代元素

  必须添加参数决定搜索范围

##### 兄弟

* siblings()      获取给定元素的所有兄弟元素，不包括原给定元素
* next()      返回给定元素的下一个兄弟元素
* nextAll()      返回给定元素的之后所有兄弟元素
* nextUntil()      返回给定元素与给定参数间所有跟随的同胞元素
* prev()
* prevAll()
* prevUntil()

##### 过滤

* first()   选取首个元素
* last()    选取最后一个元素
* eq()      选取指定下标的元素，接受参数代表下标
* filter()       选取符合给定规则的所有元素
* not()      选取不符合给定规则的所有元素

### jQuery Ajax方法

##### load() 方法

从服务器加载数据，并把返回的数据放入被选元素中

`$(selector).load(URL,data,callback);`

必需的 URL 参数规定加载的 URL

可选的 data 参数规定与请求一同发送的查询字符串键/值对集合

可选的 callback 参数是 load() 方法完成后所执行的函数名称

```js
$("#div1").load("demo_test.txt");
$("#div1").load("demo_test.txt #p1");

$("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
        alert("外部内容加载成功！");
    if(statusTxt=="error")
        alert("Error: "+xhr.status+": "+xhr.statusText);
});
```

##### get() 方法

通过 HTTP GET 请求从服务器上请求数据

`$.get(URL,callback);`

必需的 *URL* 参数规定请求的 URL

可选的 *callback* 参数是请求成功后所执行的函数名

第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态

```js
$.get("demo_test.asp",function(data,status){});
```

##### post() 方法

通过 HTTP POST 请求从服务器上请求数据

`$.post(URL,data,callback);`

##### ajax() 方法

通过 HTTP 请求加载远程数据

可自选请求参数

### 其他

链式编程

如`$('div').width(100).height(100).css('backgroundColor', 'red');`

返回值需均为相应的jQuery对象才能持续调用

end()    返回调用函数链的原始jQuery对象

each()     遍历jQuery对象集合，为各元素执行一次回调函数，回调函数第一个参数为下标，第二个·参数为对应元素的引用
