---
title: URL API
date: 2023-12-08 22:51:04
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
uniqueId: '2023-12-08 14:51:04/URL API.html'
mathJax: false
---

URL API 用于表示一个互联网资源的定位标识（URL 即 Uniform Resource Locator）

## 创建 URL

调用 `URL()` 构造函数以创建一个新的 URL 实例

方法需要传递一个 string 参数，代表 URL 字符串

方法可以传递一个可选的 string 参数，代表 URL 的基础路径；若前一个参数为绝对路径，则当前参数会被忽略；若前一个参数为相对路径，则当前参数会作为基础的 URL

若传递的参数无法用于创建 URL，会抛出 `TypeError` 异常

可以调用 `URL` 接口的 `canParse()` 静态方法检测参数是否支持创建 URL，该方法与 `URL()` 构造函数接收相同的参数

## URL 参数

`URL` 接口的各属性表现 URL 的各项参数，部分参数与 `Location`　接口的对应参数类型相同

`URL` 接口的 `hash` 属性返回一个 string，代表 URL 的片段标识符，包含 `#` 符号

`URL` 接口的 `host` 属性返回一个 string，代表 URL 的主机（包含主机名及端口）

`URL` 接口的 `hostname` 属性返回一个 string，代表 URL 的主机名

`URL` 接口的 `href` 属性返回一个 string，代表 URL 本身

`URL` 接口的 `origin` 只读属性返回一个 string，代表 URL 的源

`URL` 接口的 `password` 属性返回一个 string，代表 URL 的密码

`URL` 接口的 `pathname` 属性返回一个 string，代表 URL 的路径

`URL` 接口的 `port` 属性返回一个 string，代表 URL 的端口

`URL` 接口的 `protocol` 属性返回一个 string，代表 URL 的协议，包含 `:` 符号

`URL` 接口的 `search` 属性返回一个 string，代表 URL 的搜索参数，包含 `?` 符号

`URL` 接口的 `username` 属性返回一个 string，代表 URL 的用户

```js
const url = new URL('https://username:password@website.example.com:8888/path1/path2?key1=value1&key2=value2#hash')
console.log(url.hash) // #hash
console.log(url.host) // website.example.com:8888
console.log(url.hostname) // website.example.com
console.log(url.href) // https://username:password@website.example.com:8888/path1/path2?key1=value1&key2=value2#hash
console.log(url.origin) // https://website.example.com:8888
console.log(url.password) // password
console.log(url.pathname) // /path1/path2
console.log(url.port) // 8888
console.log(url.protocol) // https:
console.log(url.search) // ?key1=value1&key2=value2
console.log(url.username) // username
```

`URL` 接口的 `searchParams` 只读属性返回一个 `URLSearchParams`，代表 URL 的搜索参数

## URL 转换

`URL` 接口的 `toJSON()` 方法返回 URL 的 JSON 版本，等价于获取 `URL` 接口的 `href` 属性

`URL` 接口的 `toString()` 方法返回 URL 的字符串版本，等价于获取 `URL` 接口的 `href` 属性

## URL 参数

`URLSearchParams` 接口专门用于处理 URL 参数

`URLSearchParams()` 构造函数用于创建一个 URL 参数对象，可以可选地传递一个字符串或键值对对象或字符串二维数组

`URLSearchParams` 接口与 Map 对象类似，其 `size` 属性、`delete()` 方法、`entries()` 方法、`forEach()` 方法、`get()` 方法、`has()` 方法、`keys()` 方法、`set()` 方法、`values()` 方法 均与 Map 对象的对应方法类似

`URLSearchParams` 接口的 `append()` 方法用于追加 URL 参数键值对（与 set() 方法区别是 set() 方法若已存在对应的值会直接覆盖）

`URLSearchParams` 接口的 `getAll()` 方法用于获取给定 URL 参数键对应的所有 URL 值，返回一个字符串数组（与 get() 方法区别是 get() 方法仅获取首个匹配的值）

`URLSearchParams` 接口的 `toString()` 方法用于返回给定的 URL 参数字符串，特别注意的是其不返回 `?` 符号，与 `URL` 接口的 `search` 属性、`HTMLAnchorElement` 接口的 `search` 属性、`Location` 接口的 `search` 属性不同

`URLSearchParams` 接口的 `sort()` 方法用于对 URL 参数进行排序，排序规则是按照 Unicode 编码执行

`URLSearchParams` 接口的 `delete()` 方法与 `has()` 方法允许传递可选的第二个参数，代表键值对的值，以更加精细地检测

## 类型

```ts
interface URL {
  hash: string
  host: string
  hostname: string
  href: string
  toString(): string
  readonly origin: string
  password: string
  pathname: string
  port: string
  protocol: string
  search: string
  readonly searchParams: URLSearchParams
  username: string
  toJSON(): string
}

declare var URL: {
  prototype: URL
  new(url: string | URL, base?: string | URL): URL
}

type webkitURL = URL
declare var webkitURL: typeof URL

interface URLSearchParams {
  append(name: string, value: string): void
  delete(name: string): void
  get(name: string): string | null
  getAll(name: string): string[]
  has(name: string): boolean
  set(name: string, value: string): void
  sort(): void
  toString(): string
  forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void
}

declare var URLSearchParams: {
  prototype: URLSearchParams
  new(init?: string[][] | Record<string, string> | string | URLSearchParams): URLSearchParams
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/URL_API>
* <https://url.spec.whatwg.org/>
