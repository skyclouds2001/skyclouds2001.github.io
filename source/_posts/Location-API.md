---
title: Location API
date: 2023-11-23 11:22:33
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
uniqueId: '2023-11-23 03:22:33/Location API.html'
mathJax: false
---

Location API 提供获取和管理当前网页的 URL 的方法

通过 `document.location` 或 `window.location` 暴露的 `Location` 接口实例使用

## `Location` 属性

`Location` 接口的 `ancestorOrigins` 只读属性返回一个 `DOMStringList`，倒序返回所有祖先浏览上下文的源

`Location` 接口的 `hash` 属性返回一个 string，代表当前文档 URL 的片段标识符，包含 `#` 符号

`Location` 接口的 `host` 属性返回一个 string，代表当前文档 URL 的主机（包含主机名及端口）

`Location` 接口的 `hostname` 属性返回一个 string，代表当前文档 URL 的主机名

`Location` 接口的 `href` 属性返回一个 string，代表当前文档 URL 本身

`Location` 接口的 `origin` 只读属性返回一个 string，代表当前文档 URL 的源

`Location` 接口的 `pathname` 属性返回一个 string，代表当前文档 URL 的路径

`Location` 接口的 `port` 属性返回一个 string，代表当前文档 URL 的端口

`Location` 接口的 `protocol` 属性返回一个 string，代表当前文档 URL 的协议，包含 `:` 符号

`Location` 接口的 `search` 属性返回一个 string，代表当前文档 URL 的搜索参数，包含 `?` 符号

```js
/**
 * assume current document's URL is https://example.org:8080/foo/bar?q=baz#bang
 */
location.hash // #bang
location.host // example.org:8080
location.hostname // example.org
location.href // https://example.org:8080/foo/bar?q=baz#bang
location.origin // https://example.org:8080
location.pathname // /foo/bar
location.port // ?q=baz
location.protocol // 8080
location.search // https:
```

## `Location` 方法

`Location` 接口的 `assign()` 方法使用给定 URL 加载新文档（不会替换当前文档对应的历史记录）

方法可能抛出 `SecurityError` 异常，若调用该方法的域与原域不同源时发生

方法可能抛出 `SyntaxError` 异常，若尝试解析 URL 参数失败

`Location` 接口的 `reload()` 方法用于重新加载当前文档

方法可能抛出 `SecurityError` 异常，若调用该方法的域与原域不同源时发生

`Location` 接口的 `replace()` 方法用于使用给定 URL 重新加载当前文档（会替换当前文档对应的历史记录）

方法可能抛出 `SyntaxError` 异常，若尝试解析 URL 参数失败

`Location` 接口的 `toString()` 方法用于获取当前文档 URL 本身，效果同 `href` 属性

## 示例

<div id="location" role="article">
  <table>
    <thead>
      <tr>
        <th>Hash</th>
        <th>Host</th>
        <th>Hostname</th>
        <th>Href</th>
        <th>Origin</th>
        <th>Pathname</th>
        <th>Port</th>
        <th>Protocol</th>
        <th>Search</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <style>
    #location {
      :is(table) {
        table-layout: fixed;
      }
    }
  </style>

  <script type="module">
    const table = document.querySelector('#location table')
    table.querySelector('td:nth-child(1)').innerText = location.hash
    table.querySelector('td:nth-child(2)').innerText = location.host
    table.querySelector('td:nth-child(3)').innerText = location.hostname
    table.querySelector('td:nth-child(4)').innerText = location.href
    table.querySelector('td:nth-child(5)').innerText = location.origin
    table.querySelector('td:nth-child(6)').innerText = location.pathname
    table.querySelector('td:nth-child(7)').innerText = location.port
    table.querySelector('td:nth-child(8)').innerText = location.protocol
    table.querySelector('td:nth-child(9)').innerText = location.search
  </script>
</div>

## 类型

```ts
interface Location {
    readonly ancestorOrigins: DOMStringList
    hash: string
    host: string
    hostname: string
    href: string;
    toString(): string
    readonly origin: string
    pathname: string
    port: string
    protocol: string
    search: string
    assign(url: string | URL): void
    reload(): void
    replace(url: string | URL): void
}

declare var Location: {
  prototype: Location
}

interface Document {
  get location(): Location
  set location(href: string | Location)
}

interface Window {
  get location(): Location
  set location(href: string | Location)
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Location>
* <https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-location-interface>
