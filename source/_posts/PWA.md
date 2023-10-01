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

PWA 技术允许用户像 Native 应用一样使用 Web 应用，支持多平台和多设备访问，并且支持在线或离线访问

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

1. 页面通过 `link` 标签引入 `manifest` 文件

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

3. 页面须启用 `Secure Context`，即使用 HTTPS 协议或者为本地资源

## PWA 下载

PWA 下载可以通过浏览器访问对应的网页实现

通常浏览器检测到网页支持下载为 PWA 时，会显示一个默认的“下载为 PWA”的按钮，也可以自定义“下载为 PWA”的按钮

通过监听全局的 `beforeinstallprompt` 事件获取到 `BeforeInstallPromptEvent` 事件实例并存储，通常该事件在页面加载时即触发；在必要时刻调用 `BeforeInstallPromptEvent.prompt()` 方法以使用户确认下载 PWA 应用；下载完成后会在全局触发 `appinstalled` 事件

PWA 下载亦可以通过应用商店等场景下载

## PWA 原理

PWA 实质是仅将应用行为上类似于原生应用，如在桌面显示图标，在应用列表显示，支持卸载等；并不会将应用程序的资源文件主动下载至本地，具体策略由开发者通过 IndexDB、ServiceWorker、Cache Storage 等开发实施
