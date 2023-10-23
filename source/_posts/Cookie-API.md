---
title: Cookie API
date: 2023-10-20 12:30:37
tags:
- Frontend
- Web API
categories:
- Frontend
- Web API
thumbnail: 
cover: 
toc: true
recommend: 1
keywords: 
uniqueId: '2023-10-20 04:30:37/Cookie API.html'
mathJax: false
---

Cookie 是一小段保存在用户端的信息，用于改善用户的网络浏览体验，通常包括用户的选项或识别信息，用户可以选择网站使用 Cookie 的方式

可用使用 `navigator.cookieEnabled` 判断页面是否允许使用 Cookie

## Cookie 的设置

可以通过 `Set-Cookie` 响应头设置 Cookie 或使用 JS 脚本 `document.cookie` 设置 Cookie

```http
HTTP/2.0 200 OK
Set-Cookie: cookie_a=a
```

```js
document.cookie = 'cookie_b=b';
```

## Cookie 的读取

执行请求时可以通过 `Cookie` 请求头自动带上 Cookie

JS 脚本中可以通过 `document.cookie` 读取 Cookie

```js
const cookies = document.cookie;
```

## Cookie 的选项

* `Expires` 属性

  指定 Cookie 在给定时间后失效

* `Max-Age` 属性

  指定 Cookie 在超出给定时长后失效

* `Secure` 属性

  指定 Cookie 仅在 Secure Context 下才发送；并且非 Secure Context 下无法设置该属性

* `HttpOnly` 属性

  指定 Cookie 无法通过 `document.cookie` 读取和修改

  常用于防御 XSS 攻击

* `Domain` 属性

  指定 Cookie 可用的域名（及子域名），默认会包含当前的域名

* `Path` 属性

  指定 Cookie 可用的路径（及子路径）

* `SameSite` 属性

  指定 Cookie 是否在跨域请求中发送

  常用于防御 CSRF 攻击

  `Strict` 值指定仅在同域请求中发送

  `Lax` 值允许在用户导航至 Cookie 的域名时发送，该值是默认的行为

  `None` 值指定允许在跨域请求中发送，但需同时指定 `Secure` 属性

```http
Set-Cookie: cookie_b=b; Expires=Thu, 31 Oct 2021 07:28:00 GMT; Secure; HttpOnly; Domain=example.com; Path=/; SameSite=Strict
```

* `__Host-` 前缀

  指定对应的 Cookie 需指定 `Secure` 属性（即需要在 Secure Context 发送），不得指定 `Domain` 属性，`Path` 属性需指定为 `/`

* `__Secure-` 前缀

  指定对应的 Cookie 需指定 `Secure` 属性（即需要在 Secure Context 发送）
