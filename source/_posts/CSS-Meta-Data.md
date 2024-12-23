---
title: CSS Meta Data
date: 2024-12-23 19:19:13
tags:
  - Frontend
  - CSS
categories:
  - Frontend
  - CSS
thumbnail:
cover:
toc: true
recommend: 1
keywords:
uniqueId: '2024-12-23 19:19:13/CSS Meta Data.html'
mathJax: false
---

CSS 元属性（在规范定义中使用）

* **Name**
  * 特性的名称
* **Value**
  * 特性的合法的值的格式
* **Initial**
  * 特性的初始值
* **Applies to**
  * 特性作用的元素范围
* **Inherited**
  * 特性是否可继承
* **Percentages**
  * 特性是否可接受百分比值
* **Computed value**
  * 特性指定值解析为计算值方式
* **Canonical order**
  * 特性指定值序列化的规则
* **Animation type**
  * 特性在动画中变换的类型
  * not animatable 不支持动画
  * discrete 无法有意义地组合变换
  * by computed value 使用该值类型指定的方式进行组合（插值，添加或累积）
  * repeatable list 同上，但优先重复至最小公倍数再按计算值组合；若不可组合则使用离散值
