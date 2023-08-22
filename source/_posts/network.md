---
title: network
date: 2022-12-14 21:06:37
tags:
- Frontend
- Network
categories:
- [Frontend, Other]
thumbnail: https://pic2.zhimg.com/v2-e4eaab2af21f10ec3efb1e3f7de22b8a_r.jpg
---

# 计算机网络



通信：互联网

* 主体：服务器、客户端浏览器
* 内容：内容
* 方式：响应方式



通信协议：通信遵循的规则约定|通信格式

超文本：网页内容

超文本传输协议：网页内容传输协议 HTTP协议客户端与服务器间进行网页内容传输时需遵守的传输格式 提交&响应



## HTTP 请求


HTTP协议模型：请求/响应 交互模型



### HTTP 请求消息

HTTP 请求报文

* 请求行：以空格分隔

    * 请求方式：GET、POST等
    * URL：域名之后的url部分
    * 协议版本

* 请求头部：以回车符&换行符分隔，以键值对组成，键值对以冒号分隔

    * Host：服务器域名
    * User-Agent：说明客户端的浏览器类型
    * Connection：客户端与服务器的连接方式
    * Content-Type：发送到服务器的数据格式

    * Content-Length：请求体大小

    * Accept：客户端可接受的返回数据类型
    * Accept-Language：客户端可接收的语言文本类型
    * Accept-Encoding：客户端可接受的内容压缩编码形式

* 空行：回车符or换行符

* 请求体：POST有、GET无

```http
GET / HTTP/1.1
Host: www.baidu.com
Connection: keep-alive
Cache-Control: max-age=0
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.81 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: BIDUPSID=028E86627DA4BB24A78F13047AE65439; PSTM=1628179856; BD_UPN=12314753; __yjs_duid=1_0275df3f717d1e5149c8d0bc2305f82d1628213742697; BAIDUID=D5D732CC5CBECD9277FA4AF82CF82B37:FG=1; BDUSS=JzeWVqZmpKdC1kRmFDN2VKRDl4R3d5YUR5WnJzVjV6dWRsdE5tSlotUXdNZGxoRVFBQUFBJCQAAAAAAQAAAAEAAACSPpQhzOy~1bXE1MYxMDAwMDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADCksWEwpLFhQ3; BDUSS_BFESS=JzeWVqZmpKdC1kRmFDN2VKRDl4R3d5YUR5WnJzVjV6dWRsdE5tSlotUXdNZGxoRVFBQUFBJCQAAAAAAQAAAAEAAACSPpQhzOy~1bXE1MYxMDAwMDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADCksWEwpLFhQ3; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BAIDUID_BFESS=D5D732CC5CBECD9277FA4AF82CF82B37:FG=1; BD_HOME=1; H_PS_PSSID=35834_35106_31253_35765_35489_34584_35491_35871_35246_35905_35796_35316_26350_35884_35724_35879_35746; sug=3; sugstore=0; ORIGIN=0; bdime=0; BA_HECTOR=8004al2520258h0lb41h0s1c90q
```



HTTP 响应消息：HTTP 响应报文

* 状态行
    * 协议版本
    * 状态码：200等
    * 状态码描述
* 响应头部
* 空行
* 响应体

```http
HTTP/1.1 200 OK
Bdpagetype: 2
Bdqid: 0xbde875de000166a1
Cache-Control: private
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html;charset=utf-8
Date: Thu, 17 Feb 2022 08:52:39 GMT
Expires: Thu, 17 Feb 2022 08:52:39 GMT
Server: BWS/1.1
Set-Cookie: BDSVRTM=302; path=/
Set-Cookie: BD_HOME=1; path=/
Set-Cookie: H_PS_PSSID=35834_35106_31253_35765_35489_34584_35491_35871_35246_35905_35796_35316_26350_35884_35724_35879_35746; path=/; domain=.baidu.com
Strict-Transport-Security: max-age=172800
Traceid: 1645087959064662324213684317064108533409
X-Frame-Options: sameorigin
X-Ua-Compatible: IE=Edge,chrome=1
Transfer-Encoding: chunked
```



### 请求方法

* GET     查询 - 获取服务器资源

请求数据放在数据头内

* POST     新增 - 提交资源

请求数据放在请求体内

* PUT     修改 - 提交新资源并替换
* DELETE     删除 - 移除资源

请求删除指定的资源



### 响应状态码

用于标识响应状态

三十进制：字，first类型，then细分

* 1**  信息：收到请并需继续操作（少见）
* 2** 成功：请求成功接收并处理
    * 200 OK  请求成功
    * 201 Created  已创建
* 3** 重定向：需进一步操作以完成请求
    * 301 Moved Permanently  永久移动       使用新URL
    * 302 Found  临时移动    仍使用原有URL
    * 304 Not Modified  未修改    会直接访问缓存内资源
* 4** 客户端错误：请求包含语法错误或无法完成请求
    * 400 Bad Request   语义有误or请求参数有误
    * 401 Unauthorized  需用户验证
    * 403 Forbidden  拒绝执行请求
    * 404 Not Found  无法找到资源
    * 408 Request Timeout  请求超时
* 5** 服务器错误：服务器处理请求出错
    * 500 Internal Server Error  服务器内部错误，无法完成请求
    * 501 Not Implemented 不支持请求方法
    * 503 Service Unavailable 服务器暂时无法处理：超载or系统维护



## 跨域与 JSONP

### 同源策略

同源：两页面协议、域名、端口相同

浏览器网页默认端口 80

同源策略：浏览器安全功能-限制来源同一个加载文档脚本与其他源资源的交互

- 阻止读取非同源网页的 cookie、localstorage 与 indexedDB
- 阻止接触非同源网页的 DOM
- 阻止向非同源地址发送 Ajax 请求

跨域：非同源

浏览器会拦截跨域请求回来的数据

### JSONP

JSON 的一种使用模式，实现跨域数据访问

由于 script 标签允许请求非同源的 js 脚本

利用 script 标签请求，并传递一个回调函数名作为参数；服务器端把数据作为回调函数参数包装后返回；浏览器自动执行回调函数代码，即实现数据渲染

JSONP：兼容性好、只支持 GET 请求

CORS：支持 GET 与 POST，不兼容低版本浏览器

```html
<div id="divCustomers"></div>
<script type="text/javascript">
  function callbackFunction(result, methodName) {
    var html = "<ul>";
    for (var i = 0; i < result.length; i++) {
      html += "<li>" + result[i] + "</li>";
    }
    html += "</ul>";
    document.getElementById("divCustomers").innerHTML = html;
  }
</script>
<script
  type="text/javascript"
  src="https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"
></script>
```

jQuery 实现用户端

采用动态创建与移除 script 标签：向 head 内添加 script 标签

```html
<div id="divCustomers"></div>
<script>
  $.getJSON(
    "https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?",
    function (data) {
      var html = "<ul>";
      for (var i = 0; i < data.length; i++) {
        html += "<li>" + data[i] + "</li>";
      }
      html += "</ul>";

      $("#divCustomers").html(html);
    }
  );
</script>

<script>
  $.ajax({
      url: 'https:www.sky.icu',
      dataType: 'jsonp', // 必需
      success: (res) => {
          console.log(e);
      },
      jsonp: 'callback'  // 发送至服务器参数名称：可选
      jsonpCallback: 'jQueryxxx',  // 自定义回调函数名称：可选
  })
</script>
<!-- 会自动带一个jQueryXXXX的回调函数名称 -->
```

服务器端

```php
<?php
    header('Content-type: application/json');
    //获取回调函数名
    $jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);
    //json数据
    $json_data = '["customername1","customername2"]';
    //输出jsonp格式的数据
    echo $jsoncallback . "(" . $json_data . ")";
?>
```

### 节流

节流，就是指连续触发事件但是在 n 秒中只执行一次函数

减少事件触发频率

- 使得鼠标事件仅在单位时间内触发一次
- 降低监测滚动条位置的频率

```js
// 时间戳
function throttle(func, delay) {
  let prev = 0; // 上次触发时间
  return function (...args) {
    const now = Date.now();
    if (now - prev > delay) {
      last = now;
      func.apply(this, args);
    }
  };
}

// 定时器
function throttle(func, delay) {
  let timeout = null;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      });
    }
  };
}
```

### 防抖

防抖，就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

常用于搜索

```js
// 非立即执行
// 触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
function debounce(func, delay) {
  let timer = null; // 上次调用指向的计时器
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 立即执行
// 触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果
function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeOut(timer);
    const cal = !timer;
    timer = setTimeOut(() => {
      timer = null;
    }, delay);
    if (cal) func.apply(this, args);
  };
}
```

