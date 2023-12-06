---
title: Content Security Policy
date: 2023-12-05 22:12:38
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
uniqueId: '2023-12-05 14:12:38/Content Security Policy.html'
mathJax: false
---

Content Security Policy 简称 CSP，可用于应对跨站脚本攻击（XSS 攻击）及数据包嗅探攻击

在不指定 Content Security Policy 的情况下，浏览器会使用默认的同源策略

## Content Security Policy 语法

通常是通过 `Content-Security-Policy` 响应头指定

```HTTP
Content-Security-Policy: <policy>
```

或者通过 `<meta>` 标签指定

```html
<meta http-equiv="Content-Security-Policy" content="<policy>" />
```

使用 `Content-Security-Policy-Report-Only` 响应头可以指定仅报告但不阻碍执行的规则，该响应头需要与 `report-to` 指定同时使用，并且该响应头会继承 `Content-Security-Policy` 响应头的规则（除 sandbox 之外）

## Content Security Policy 指令

|      Directive name       |                  Directive description                  |
|:-------------------------:|:-------------------------------------------------------:|
|        default-src        |                 作为其他 fetch 相关指令的来源的后备值                  |
|         child-src         |                限制 Worker 脚本资源和内嵌浏览上下文来源                 |
|        worker-src         |                    限制 Worker 脚本资源来源                     |
|         frame-src         |                       限制内嵌浏览上下文来源                       |
|        script-src         |            限制 JavaScript 脚本和 WebAssembly 来源             |
|      script-src-elem      |             限制 JavaScript 的 `<script>` 标签来源             |
|      script-src-attr      |               限制 JavaScript 脚本在行内事件回调方法来源               |
|         style-src         |                         限制样式表来源                         |
|      style-src-elem       |    限制样式表在 `<style>` 标签和 `<link rel="stylesheet">` 来源    |
|      style-src-attr       |                      限制样式表在内联样式中来源                      |
|       manifest-src        |                   限制应用 manifest 文件来源                    |
|          img-src          |                  限制 image 和 favicon 来源                  |
|         media-src         |        限制 `<audio>` `<video>` `<track>` 的媒体资源来源         |
|        object-src         |              限制 `<object>` `<embed>` 的资源来源              |
|         font-src          |                 限制 @font-face 加载的字体资源来源                 |
|        connect-src        |                       限制脚本加载的资源来源                       |
|         base-uri          |                    限制 `<base>` 标签的内容                    |
|          sandbox          |         设置沙箱策略（类似 `<iframe>` 标签的 `sandbox` 属性）          |
|        form-action        |                     限制表单提交后允许的提交目标                      |
|      frame-ancestors      | 限制允许内嵌 `<frame>` `<iframe>` `<object>` `<embed>` 的浏览上下文 |
|         report-to         |                 允许在违反 CSP 事件发生时向指定源发送报告                 |
| require-trusted-types-for |              强制使用 Trusted Types 应对 XSS 攻击               |
|       trusted-types       |                指定 Trusted Types 的允许指令列表                 |
| upgrade-insecure-requests |                    强制将不安全链接升级为安全链接对待                    |

## Content Security Policy 值

|           Value name            |      Value description      |
|:-------------------------------:|:---------------------------:|
|              none               |           不允许任何资源           |
|              self               |          允许当前源的资源           |
|         strict-dynamic          |    限制当前资源的规则应同时适用于其加载的资源    |
|          report-sample          |        要求在报告中包含样例代码         |
|    inline-speculation-rules     | 允许使用 speculation rules 脚本规则 |
|           unsafe-eval           |     允许使用 eval 等动态执行代码方法     |
|        wasm-unsafe-eval         |   允许使用加载执行 WebAssembly 模块   |
|          unsafe-hashes          |       允许使用特定的内联事件处理方法       |
|          unsafe-inline          |          允许使用内联资源           |
|      nonce-<base64-value>       |      允许 nonce 属性生成的资源       |
| <hash-algorithm>-<base64-value> |      允许指定哈希算法生成的标识符的资源      |
|          <host-source>          |          允许给定的域的资源          |
|         <scheme-source>         |          允许给定协议的资源          |

## Content Security Policy 示例

```HTTP
Content-Security-Policy: default-src 'self'
Content-Security-Policy: default-src 'self' example.com *.example.com
Content-Security-Policy: default-src 'self'; img-src *; media-src example.org example.net; script-src userscripts.example.com
Content-Security-Policy: default-src https://onlinebanking.example.com
Content-Security-Policy: default-src 'self' *.example.com; img-src *
```

## 链接

* <https://w3c.github.io/webappsec-csp/>
* <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP>
