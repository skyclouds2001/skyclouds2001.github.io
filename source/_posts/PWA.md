---
title: PWA
date: 2023-09-30 23:53:34
tags:
- Frontend
- Other
categories:
- Frontend
- Other
thumbnail: 
cover: 
toc: true
recommend: 1
keywords: 
uniqueId: '2023-09-30 15:53:34/PWA.html'
mathJax: false
---

PWA 即 Progressive Web App ———— 渐进式网络应用

PWA 技术允许用户像 Native 应用一样使用 Web 应用

PWA 技术的核心是 ServiceWorker 技术，并基于 ServiceWorker 技术支持离线访问

## PWA 特点

* 可通过 URL 访问并被搜索引擎抓取
* 可以安装到本地（A2HS）
* 可以使用 URL 分享
* 可以在离线状态访问
* 适配老版浏览器访问，并支持在新浏览器中使用更多新特性
* 支持在有新内容时更新
* 能适配各种尺寸屏幕
* 仅通过 HTTPS 提供服务

## PWA 创建

1. 通过 `link` 标签引入 `manifest` 文件

    文件后缀名可以是 json 或者 webapp、webmanifest

    ```html
    <link rel="manifest" href="manifest.json" />
    ```

    该文件是一个 JSON 的语法，必须指定的项为 `name`、`icons`（对于 Chromium 系浏览器 `start_url`、`display` 或 `display_override` 也是需要指定的）

    ```json
    {
      "name": "My PWA",
      "icons": [
        {
          "src": "icons/512.png",
          "type": "image/png",
          "sizes": "512x512"
        }
      ]
    }
    ```

    `name` 指定应用的名称，接受一个字符串
    `icons` 指定应用的图标，接受一个数组，数组各项可以指定 `src`、`sizes`、`type` 项，分别代表图标的 URL、尺寸及 MIME 类型

    `manifest.json` 文件的详细配置可以参考相关的文档

2. 页面中注册 ServiceWorker，且 ServiceWorker 中监听了 `fetch` 事件

3. 必须启用 `Secure Context` 环境

    即处于 HTTPS 协议或者为本地资源

## PWA 原理

PWA 实质是仅将应用行为上类似于原生应用，如在桌面显示图标，在应用列表显示，支持卸载等；并不会将应用程序的资源文件主动下载至本地，具体策略由开发者通过 IndexDB、ServiceWorker、Cache Storage 等实施
