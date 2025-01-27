---
title: HTTP Security Header
date: 2024-01-26 00:56:25
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
keywords:
uniqueId: '2024-01-26 00:56:25/HTTP-Security-Header.html'
mathJax: false
---

## Content-Security-Policy

指定内容安全策略

参见 {% post_link Content-Security-Policy %}

## Permissions-Policy

指定权限策略

参见 {% post_link Permissions-Policy %}

## Strict-Transport-Security

限制当前页面需通过 HTTPS 访问，且其未来任何使用 HTTP 的请求都应自动升级为 HTTPS

```http
Strict-Transport-Security: max-age=<expire-time>
Strict-Transport-Security: max-age=<expire-time>; includeSubDomains
Strict-Transport-Security: max-age=<expire-time>; includeSubDomains; preload
```

`max-age` 指令指定用户代理应记忆该策略的时间

`includeSubDomains` 指令指定该策略对其子域亦起效

`preload` 指令指示该策略启用 HSTS 功能

## X-Frame-Options

限制当前页面能否通过 iframe 等元素作为内置网页展示

```http
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
```

`DENY` 指令指定不能通过 iframe 等元素作为内置网页展示

`SAMEORIGIN` 指令指定仅可作为同源网页通过 iframe 等元素作为内置网页展示

注意：推荐使用 `Content-Security-Policy` 标头的 `frame-ancestors` 指令替代该标头的功能

## X-Content-Type-Options

限制当前页面进行自动 MIME 类型推断，浏览器需遵从资源的 `Content-Type` 标头指定的 MIME 类型而非在解析出错时进行自动类型推断

```http
X-Content-Type-Options: nosniff
```

`nosniff` 指令限制自动 MIME 类型推断

## X-XSS-Protection

启用浏览器内置 XSS 防护功能

```http
X-XSS-Protection: 0
X-XSS-Protection: 1
X-XSS-Protection: 1; mode=block
X-XSS-Protection: 1; report=<reporting-uri>
```

`0` 指令禁用该功能

`1` 指令启用该功能，指示浏览器将尝试移除不安全的部分

`mode=block` 指令，额外指示浏览器应当阻止后续的页面渲染

`report=<reporting-uri>` 指令，额外指示浏览器应向对应的 URL 发送报告

注意：推荐使用 `Content-Security-Policy` 标头的 `unsafe-inline` 指令替代该标头的功能

## Cache-Control 与 Expires

控制缓存策略

对于包含敏感信息的网页，应启用 `Cache-Control: no-cache` 或 `Expires: 0` 以阻止保存敏感信息

## Access-Control-*

指示跨域策略

## Set-Cookie

设置 cookie

`domain` 属性限制 cookie 允许被接收的域

`secure` 属性阻止 cookie 在 HTTP 请求中发送

`httponly` 属性阻止 cookie 被 JS 脚本读取

## Referrer-Policy

控制发送请求时 Referer 标头的内容

`no-referrer` 指令指示不发送 Referer 标头

`no-referrer-when-downgrade` 指令指示在协议降级时不发送 Referer 标头

`origin` 指令指示发送 Referer 标头，且仅发送源信息

`origin-when-cross-origin` 指令指示发送 Referer 标头，且仅在同源时发送源、路径和参数信息，其他情况仅发送源信息

`same-origin` 指令指示仅在同源时发送 Referer 标头，且包含源、路径和参数信息

`strict-origin` 指令指示仅在协议不变时发送 Referer 标头，且仅包含源信息

`strict-origin-when-cross-origin` 指令指示仅在同源时发送 Referer 标头，且包含源、路径和参数信息；在协议不变时发送 Referer 标头，且仅包含源信息；其余情况均不发送 Referer 标头，该值是默认值

`unsafe-url` 指令指示发送 Referer 标头，且任意请求均发送包含源、路径和参数信息

## Expect-CT

指示浏览器或客户端验证签名证书的时间戳

`max-age` 指示签名证书的有效时间

`enforce` 指示拒绝违反策略的连接

`report-uri="<uri>"` 指示应报告违反策略的 URI

## X-Permitted-Cross-Domain-Policies

指定客户端能够访问的跨域策略文件的类型，主要被 Adobe 软件使用

`none` 禁用策略文件

`master-only` 仅允许使用主策略文件

`by-content-type` 仅允许使用类型为 `Content-Type: text/x-cross-domain-policy` 的策略文件

`by-ftp-filename` 仅允许使用名称为 `crossdomain.xml` 的策略文件

`all` 允许使用任意策略文件

`none-this-response` 指示当前文档不应使用策略文件

## Public-Key-Pins

主流浏览器已不支持该特性，应改用 Expect-CT 标头
