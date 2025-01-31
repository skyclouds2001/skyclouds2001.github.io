---
title: NPM Dependencies
date: 2025-01-31 16:56:26
tags:
  - Frontend
  - Tool
categories:
  - Frontend
  - Tool
thumbnail:
cover:
toc: true
recommend: 1
keywords:
uniqueId: '2025-01-31 16:56:26/NPM Dependencies.html'
mathJax: false
---

## dependencies

当前项目在自身开发阶段使用，且作为其他项目的依赖也应使用的依赖

## devDependencies

仅在开发阶段使用的依赖，即仅当前项目在自身开发阶段使用，在作为其他项目的依赖时不应使用的依赖

## peerDependencies

当前项目在自身开发阶段使用，且作为其他项目的依赖也应使用的依赖；但期望其由用户主动提供而非当前项目直接指定

可以通过 peerDependenciesMeta 字段更进一步指定其元信息，如对应依赖是否可选

## bundleDependencies

当前项目在自身开发阶段使用，且作为其他项目的依赖也应使用的依赖；但期望该依赖在打包当前项目时一并合入

## optionalDependencies

当前项目在自身开发阶段可选使用，且作为其他项目的依赖也可选使用的依赖
