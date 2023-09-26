---
title: 面试-Vue
date: 2023-09-25 23:38:10
tags:
  - Interview
categories:
  - Interview
thumbnail: 
toc: true
recommend: 1
keywords: 
uniqueId: '2023-09-25 15:38:10/面试-Vue.html'
mathJax: false
---

## Vue diff 算法

1. 首先比较新老节点是否为同一节点，若不是的话则删除该节点并创建新节点以进行替换
2. 若为相同节点，则会对节点的子节点进行判断
3. 先判断是否属于一方无子节点而一方有子节点的情况
4. 若双方均有子节点，则判断如何对新老节点的子节点进行操作；若找到相同的子节点，则对子节点的子节点也递归进行比较

## Vue3 相较于 Vue2 的区别

* Vue3 的响应式基于 Proxy 实现；Vue2 的响应式基于 Object.defineProperty 实现

* Vue3 更推荐使用 Composition API；Vue2 更推荐使用 Options API

* Vue3 相较 Vue2 更利用 TypeScript 开发

* Vue3 相对于 Vue2 更支持 TreeShaking

## 组件通信方式

* props & emits 父=>子 & 子=>父

* provide & inject 祖=>孙

* ref|$refs 引用 & expose

* 事件总线 EventBus & $on|$emit

* $parent & $root

* $attrs

## `<keep-alive>` 理解

在组件切换的时候，保存一些组件的状态防止重复渲染 DOM

> LRU 缓存策略 - 找出最久未使用的数据并置换新的数据
> 通常基于链表实现，将新数据插至链表头部，若命中已有数据则将老数据移至链表头部，链表满后则丢弃链表尾部的数据

此时组件会增加 deactivated 与 activated 生命周期
