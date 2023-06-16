---
title: ajax
date: 2022-12-14 20:46:23
tags:
- Frontend
- JavaScript
- Network
categories:
- [Frontend, Other]
thumbnail: https://th.bing.com/th/id/OIP.v3b022s2UAyhVAFLUtzhJgHaDj
---

# AJAX

![AJAX](https://www.w3school.com.cn/i/ajax.gif)

## Ajax 简介

AJAX = Asynchronous JavaScript And XML

1. 网页中发生一个事件（页面加载、按钮点击）
2. 由 JavaScript 创建 XMLHttpRequest 对象
3. XMLHttpRequest 对象向 web 服务器发送请求
4. 服务器处理该请求
5. 服务器将响应发送回网页
6. 由 JavaScript 读取响应
7. 由 JavaScript 执行正确的动作（比如更新页面）

## Ajax 使用

XMLHttpRequest 对象用于同后台服务器交换数据

```js
    let request = new XMLHttpRequest();

    request.open('POST', 'https://www.baidu.com', true);

    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            console.log(this.responseText)
        }
    }

    request.send({});
```

* readyState  请求状态
    * 0：已创建对象未调用open方法
    * 1：已调用open方法
    * 2：已调用send方法已接收响应头
    * 3：数据接收中
    * 4：请求完成，数据接收完成或失败
* status  服务器响应状态
* responseText  请求返回的数据

## 请求数据类型 Content-Type

* application/x-www-form-urlencoded

url 末尾加， ? 接 = 连接的键值对， 以 & 分隔多个参数

`https://www.baidu.com?id=1&name=Lily`

中文字符等会进行 URL 编码

使用 decodeURL() 编码，encodeURL() 解码

> Ajax 默认请求数据类型

* application/json

json 数据类型

* multipart/form-data

常用于上传文件

## Ajax 新特性

* 设置请求时限

```js
    // 请求时限
    request.timeout = 3000;
    // 超时回调函数
    request.ontimeout = (e) => {
        console.log(e);
    }
```

* 使用 FormData 对象管理表单

```js
    let data = new FormData();
    data.append('key', value);
```

* 上传文件

```js
    // 获取文件
    let files = document.querySelector('input[type=file]').files;
    // 检测文件是否已选中
    if(files.length <= 0)
        return alert('ERROR');
    // 创建 FormData 实例
    let data = new FormData();
    data.append('file', files[0]);
```

* 获取数据传输进度信息

```js
    request.upload.onprogress = function (e) {
        // lengthComputable 表示上传的资源是否具有可计算的长度
        if(e.lengthComputable) {
            // loaded 已传输的子节
            // total 需传输的总子节
            let percentComplete = Math.ceil((e.loaded / e.total) * 100);
        }
    }
```

## jQuery 的 Ajax

* $.ajax() 方法

```js
    $('#button').on('click', function () {

        const files = $('#file')[0].files;
        if(files.length <= 0) {
            return;
        }

        const data = new formData();
        data.append('file', files[0]);

        $.ajax({
            method: 'POST',
            url: 'https://www.baidu.com',
            data: data,
            // 内容编码类型
            // 默认值: "application/x-www-form-urlencoded"
            contentType: false,
            // 是否进行url编码
            // 默认值: true
            processData: false,
            success: function (res) {
                console.log(res);
            },
        });

    });
```

* $(document).ajaxStart() 方法

在 Ajax 请求发送前执行函数

```js
    $(document).ajaxStart(function () {
        $('#loading').show();
    });
```

* $(document).ajaxStop() 方法

在 Ajax 请求结束执行函数

## axios

专注于网络数据请求的库

目前最主流的

[官方网站](https://axios-http.com/)

* axios.get & axios.post

```js
    axios.get(url, params)
        .then(function (res) {
            // 处理成功情况
            console.log(res);
        })
        .catch(function (err) {
            // 处理错误情况
            console.log(err);
        })
        .then(function () {
            // 总是会执行
        });
```

`axios.get(url[, config])`

`axios.post(url[, data[, config]])`

* axios({})

```js
    // promise 语法
    axios({
        url: '',
        method: '',
        params: {},    // GET 数据：url参数
        data: {},    // POST 数据：默认json参数对象
    }).then(res => {
        // do something with res.data
    });

    // async-await 语法
    const {data} = await axios({
        url: '',
        method: '',
        params: {},
        data: {},
    });
    // do something with data
```

