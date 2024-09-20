---
title: 面试-CSS
date: 2023-09-27 00:18:33
tags:
  - Interview
categories:
  - Interview
thumbnail: 
cover: 
toc: true
recommend: 1
keywords: 
uniqueId: '2023-09-26 16:18:33/面试-CSS.html'
mathJax: false
---

## 盒模型概念

页面中的一个元素在页面中占有的空间

包括：盒子中的元素内容（content）、内边距（padding）、边框（border）和外边距（margin）所占据的空间

* 块状盒子
  * 盒子会占据单行
  * 宽度和高度指定有效
  * 内边距、边框和外边距会导致其他元素推离盒子
  * 若宽度未指定，默认盒子宽度会尽可能占据可用空间，通常为父元素宽度的100%
* 行内盒子
  * 盒子不会占据单行
  * 宽度和高度指定无效
  * 上下内边距、边框和外边距会起效，但不会导致其他行内元素推离盒子
  * 左右内边距、边框和外边距会起效，且会导致其他行内元素推离盒子
