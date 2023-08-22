---
title: regex
date: 2022-12-14 20:28:35
tags:
- Frontend
categories:
- [Frontend, Other]
thumbnail: https://picx.zhimg.com/v2-3b8c20cb2c106a15b6f83a148bc52bba_1440w.jpg
---

#### 正则表达式

正则表达式是使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串的搜索模式

###### 语法

`/正则表达式主体/修饰符(可选)`

###### 字符串方法

*   `search()`    搜索字符串，返回匹配的字符串下标或-1

```js
'123456'.search(/234/)   // 1
```

*   `replace()`    替换匹配的字符串，返回修改后的字符串

```js
'123456'.replace(/345/, 'abc')   // 12abc6
```

*   `split()`    从指定位置分割字符串，返回一个数组
*   `match()`  搜索字符串，返回由所有子串组成的数组或null

###### 正则表达式修饰符

*   `i`    忽略区别大小写
*   `g`    执行全局匹配
*   `m`    执行多行匹配

###### 正则表达式元字符

*   `.`    查找单个非换行符字符

*   `\d`    查找数字
*   `\s`     查找空白字符
*   `\b`    匹配单词边界
*   `\w`    查找数字、大小写字母及下划线

###### 正则表达式量词

*   `n+`   匹配一个或多个字符串n
*   `n*`    匹配零个或多个字符串n
*   `n?`    匹配零个或一个字符串n
*   `^`     匹配字符串开始(第一个字符)
*   `$`     匹配字符串结束(最后一个字符)

###### 正则表达式括号

*   `[0-9]`     匹配任何0-9数字
*   `[a-zA-Z]`  `[A-z] `   匹配任意大小写字母
*   `[abc]`    查找[]内的任意字符
*   `[^abc] `   查找[]外的任意字符
*   `(x|y)`    查找()内任意选项

###### RegExp 对象及其方法

*   `test()`    匹配字符串是否符合给定模式

返回一个布尔值

*   `exec()`    匹配字符串中正则表达式的匹配

返回一个包含搜索结果数组，未查找到返回null

###### 参考链接

[MDN 正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

[菜鸟教程 正则表达式](https://www.runoob.com/js/js-regexp.html)

[W3school 正则表达式](https://www.w3school.com.cn/js/js_regexp.asp)
