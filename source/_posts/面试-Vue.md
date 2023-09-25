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
