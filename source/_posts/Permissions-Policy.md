---
title: Permissions Policy
date: 2023-12-02 12:35:25
tags:
  - Frontend
  - HTTP
categories:
  - Frontend
  - HTTP
thumbnail:
cover:
toc: true
recommend: 1
uniqueId: '2023-12-02 04:35:25/Permissions Policy.html'
keywords:
mathJax: false
---

Permissions Policy 允许开发者定义在网页中控制功能的可用性，从而增加应用的安全性和隐私性

Permissions Policy 与 Content Security Policy 类似，但其专注于控制功能特性而非内容

需要注意的是 Permissions Policy 曾经被称为 Feature Policy，但其现在已重命名

## 指定 Permissions Policy

可以利用 `Permissions-Policy` 请求头来指定 Permissions Policy，或使用与之等价的 `<meta>` 标签

可以利用 `<iframe>` 标签的 `allow` 属性给内嵌网页指定 Permissions Policy

指定单个 Permissions Policy 时通常包含与之对应的一条指令与允许列表

## 检测 Permissions Policy

可以通过 `Document` 接口的 `featurePolicy` 属性或 `HTMLIFrameElement` 接口的 `featurePolicy` 属性暴露的 `FeaturePolicy` 实例检测 Permissions Policy 的状态

> 注意：标准已将 `FeaturePolicy` 接口重命名为 `PermissionsPolicy` 接口, `featurePolicy` 属性重命名为 `permissionsPolicy` 属性

`FeaturePolicy` 接口的 `allowedFeatures()` 方法获取当前用户代理在当前浏览上下文允许使用的所有特性

`FeaturePolicy` 接口的 `allowsFeature()` 方法检测指定特性在指定的域下是否可用

`FeaturePolicy` 接口的 `features()` 方法获取当前用户代理支持的所有特性

`FeaturePolicy` 接口的 `allowedFeatures()` 方法列举当前用户代理设置的特性策略中指定特性允许使用的域

## Permissions Policy 与 Permissions API 的联系

Permissions Policy 允许开发者设置权限的策略，而 Permissions API 允许用户授予权限

## Permissions Policy 指令

|          Directive name           |                                     Directive description                                      |
|:---------------------------------:|:----------------------------------------------------------------------------------------------:|
|          `accelerometer`          |                                        `Accelerometer`                                         |
|      `ambient-light-sensor`       |                                      `AmbientLightSensor`                                      |
|            `autoplay`             |                   `HTMLMediaElement.play()` `<audio>` & `<video>` `autoplay`                   |
|             `battery`             |                         Battery Status API - `Navigator.getBattery()`                          |
|             `camera`              |                       video input devices `MediaDevices.getUserMedia()`                        |
|         `display-capture`         |                                `MediaDevices.getDisplayMedia()`                                |
|         `document-domain`         |                                     set `document.domain`                                      |
|         `encrypted-media`         |           Encrypted Media Extensions API - `Navigator.requestMediaKeySystemAccess()`           |
|  `execution-while-not-rendered`   |                              script execution of renderer status                               |
| `execution-while-out-of-viewport` |                              script execution of viewport status                               |
|           `fullscreen`            |                                 `Element.requestFullscreen()`                                  |
|             `gamepad`             | Gamepad API - `Navigator.getGamepads()` `Window:gamepadconnected` `Window:gamepaddisconnected` |
|           `geolocation`           |       Geolocation API - `Geolocation.getCurrentPosition()` `Geolocation.watchPosition()`       |
|            `gyroscope`            |                                          `Gyroscope`                                           |
|               `hid`               |                                           WebHID API                                           |
|    `identity-credentials-get`     |                                           FedCM API                                            |
|         `idle-detection`          |                                       Idle Detection API                                       |
|           `local-fonts`           |                       Local Font Access API - `Window.queryLocalFonts()`                       |
|          `magnetometer`           |                                         `Magnetometer`                                         |
|           `microphone`            |                       audio input devices `MediaDevices.getUserMedia()`                        |
|              `midi`               |                         Web MIDI API - `Navigator.requestMIDIAccess()`                         |
|         `otp-credentials`         |                                           WebOTP API                                           |
|             `payment`             |                             Payment Request API - `PaymentRequest`                             |
|       `picture-in-picture`        |                                     Picture In Picture API                                     |
|  `publickey-credentials-create`   |                                     Web Authentication API                                     |
|    `publickey-credentials-get`    |                                     Web Authentication API                                     |
|        `screen-wake-lock`         |                                      Screen Wake Lock API                                      |
|             `serial`              |                                         Web Serial API                                         |
|        `speaker-selection`        |                                    Audio Output Devices API                                    |
|         `storage-access`          |                                       Storage Access API                                       |
|               `usb`               |                                           WebUSB API                                           |
|            `web-share`            |                              Web Share API - `Navigator.share()`                               |
|        `window-management`        |                                     Window Management API                                      |
|       `xr-spatial-tracking`       |                                        WebXR Device API                                        |

## Permissions Policy 允许列表

* `*` 允许在顶层浏览上下文及其嵌入浏览上下文中使用
* `()` 禁止在顶层浏览上下文及其嵌入浏览上下文中使用，在 `<iframe>` 标签的 `allow` 属性的值为 `none`
* `self` 允许在顶层浏览上下文及其同源的嵌入浏览上下文中使用，禁止在嵌入的跨域的嵌入浏览上下文中使用
* `src` 仅限在 `<iframe>` 标签的 `allow` 属性中使用，允许在当前嵌入浏览上下文中使用
* `<origin>` 允许在指定源的浏览上下文中使用

```HTTP
*
()
(self)
(src)
("https://a.example.com")
("https://a.example.com" "https://b.example.com")
(self "https://a.example.com" "https://b.example.com")
(src "https://a.example.com" "https://b.example.com")
("https://*.example.com")
```

## `Permissions-Policy` 响应头语法

基本语法

```HTTP
Permissions-Policy: <directive>=<allowlist>
```

示例

```HTTP
Permissions-Policy: geolocation=()
Permissions-Policy: geolocation=(self "https://a.example.com" "https://b.example.com")
Permissions-Policy: picture-in-picture=(), geolocation=(self https://example.com), camera=*;
```

另外值得注意的是，该响应头无法被编程式修改

## `<iframe>` 标签 `allow` 属性语法

一般建议在 `Permissions-Policy` 响应头中指定相对宽泛的 Permissions Policy，并在对应内嵌浏览上下文中通过 `<iframe>` 标签 `allow` 属性指定更加严格的 Permissions Policy

基本语法

```html
<iframe src="<origin>" allow="<directive> <allowlist>"></iframe>
```

示例

```html
<iframe src="https://example.com" allow="geolocation 'none'"></iframe>
<iframe src="https://example.com" allow="geolocation 'self' https://a.example.com https://b.example.com"></iframe>
<iframe src="https://example.com" allow="geolocation 'self' https://a.example.com https://b.example.com; fullscreen 'none'"></iframe>
```

## 链接

* <https://w3c.github.io/webappsec-permissions-policy/>
* <https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy>
