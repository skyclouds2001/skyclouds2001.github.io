---
title: URL Pattern API
date: 2023-12-09 23:31:54
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
uniqueId: '2023-12-09 15:31:54/URL Pattern API.html'
mathJax: false
---

URL Pattern API 允许创建 URL 规则匹配器，用于匹配 URL 或 URL 相关组件

## 创建匹配器

直接调用 `URLPattern()` 构造函数来创建一个匹配器

构造函数允许接收一个字符串参数，需要是一个代表绝对路径或相对路径 URL 的字符串

构造函数允许接收两个字符串参数，需要是一个代表基础 URL 的字符串（对第一个参数是相对路径 URL 的情况是必需的）

构造函数亦可替代地接收一个对象参数，各可选参数分别代表 URL 的各个部分，包括 `protocol` `username` `password` `hostname` `port` `pathname` `search` `hash` `baseURL`，若不指定等价于指定为通配符 `*`

构造函数还可以接收一个可选的配置项参数，其唯一参数 `ignoreCase` 接收一个布尔值，指定匹配时是否忽略字母大小写

```js
new URLPattern("https://example.com/books/:id")

new URLPattern("/books/:id", "https://example.com")

new URLPattern({
  protocol: "https",
  hostname: "example.com",
  pathname: "/books/:id",
})

new URLPattern({
  pathname: "/books/:id",
  baseURL: "https://example.com",
})

new URLPattern({
  protocol: "http{s}?",
  username: ":username",
  password: ":password",
  hostname: ":subdomain.example.com",
  port: ":port(80|443)",
  pathname: "/:path",
  search: "*",
  hash: "*",
}, {
  ignoreCase: true,
})
```

## 匹配器参数

`URLPattern` 接口的 `hash` 只读属性返回一个 string，代表 URL 的片段标识符匹配参数

`URLPattern` 接口的 `hostname` 只读属性返回一个 string，代表 URL 的主机名匹配参数

`URLPattern` 接口的 `password` 只读属性返回一个 string，代表 URL 的密码匹配参数

`URLPattern` 接口的 `pathname` 只读属性返回一个 string，代表 URL 的路径匹配参数

`URLPattern` 接口的 `port` 只读属性返回一个 string，代表 URL 的端口匹配参数

`URLPattern` 接口的 `protocol` 只读属性返回一个 string，代表 URL 的协议匹配参数

`URLPattern` 接口的 `search` 只读属性返回一个 string，代表 URL 的搜索参数匹配参数

`URLPattern` 接口的 `username` 只读属性返回一个 string，代表 URL 的用户匹配参数

## 使用匹配器

`URLPattern` 接口的 `test()` 方法用于测试给定 URL 是否符合匹配器的规则，返回一个布尔值

`URLPattern` 接口的 `exec()` 方法用于返回给定 URL 经匹配器的规则执行的匹配组，返回一个代表匹配结果的对象或 `null`，其 `inputs` 键返回传入的参数，其余分别为 `URLPattern` 接口的属性构成的匹配组

两方法均可接收一个字符串或对象参数，代表待匹配 URL；第二个参数接收一个字符串，但首个参数为相对路径的 URL 时是必需的

## 匹配语法

匹配语法很大一部分来自 [path-to-regexp](https://github.com/pillarjs/path-to-regexp) 库

### 直接匹配

```js
const pattern = new URLPattern({ pathname: "/books" });
console.log(pattern.test("https://example.com/books")); // true
console.log(pattern.exec("https://example.com/books").pathname.groups); // {}
```

### 通配符匹配

```js
const pattern = new URLPattern({ pathname: "/books/*" });
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.exec("https://example.com/books/123").pathname.groups); // { 0: '123' }
```

### 命名组匹配

```js
const pattern = new URLPattern({ pathname: "/books/:id" });
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.exec("https://example.com/books/123").pathname.groups); // { id: '123' }
```

### 正则表达式匹配

```js
const pattern = new URLPattern("/books/:id(\\d+)", "https://example.com");
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.test("https://example.com/books/abc")); // false
console.log(pattern.test("https://example.com/books/")); // false
```

## 类型

```ts
type URLPatternInput = USVString | URLPatternInit

interface URLPattern {
  test(input?: URLPatternInput, baseURL?: USVString): boolean

  exec(input?: URLPatternInput, baseURL?: USVString): URLPatternResult | null

  readonly protocol: string
  readonly username: string
  readonly password: string
  readonly hostname: string
  readonly port: string
  readonly pathname: string
  readonly search: string
  readonly hash: string

  readonly hasRegExpGroups: boolean
}

declare var URLPattern: {
  prototype: URLPattern
  new (input: URLPatternInput, baseURL: string, options?: URLPatternOptions): URLPattern
  new (input: URLPatternInput, options?: URLPatternOptions): URLPattern
}

interface URLPatternInit {
  protocol: string
  username: string
  password: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  baseURL: string
}

interface URLPatternOptions {
  ignoreCase?: boolean
}

interface URLPatternResult {
  inputs: Array<URLPatternInput>

  protocol: URLPatternComponentResult
  username: URLPatternComponentResult
  password: URLPatternComponentResult
  hostname: URLPatternComponentResult
  port: URLPatternComponentResult
  pathname: URLPatternComponentResult
  search: URLPatternComponentResult
  hash: URLPatternComponentResult
}

interface URLPatternComponentResult {
  input: string
  groups: Record<string, string | undefined> 
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API>
* <https://urlpattern.spec.whatwg.org/>
