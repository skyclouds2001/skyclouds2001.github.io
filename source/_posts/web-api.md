---
title: web api
date: 2022-12-14 22:55:58
tags:
- Frontend
- JavaScript
- Browser
categories:
- [Frontend, Other]
thumbnail:
---

# Web API

Web API 是 Web 的应用程序编程接口

内置的 Web API 来支持复杂的操作，并帮助访问数据



###  Web Storage

存储

> 注意：仅HTTPS协议下可用

##### 类型

* localStorage  存储数据长期有效
* sessionStorage  存储数据仅网页打开期间有效

##### 属性方法

* **setItem(*key*， *value*)**  设置存储
* **getItem(*key*)**  获取存储

* removeItem(*key*)  删除存储
* clear()  清空存储
* length  存储数据项数
* key(*index*)   获取第n项数据项的键名



### Geolocation

地理位置

需要用户批准

* getCurrentPosition(*success*，*fail*)   获取用户位置

接收两个回调函数参数，分别在获取成功与失败时调用

成功返回参数coords

coords.latitude  纬度

coords.longitude  经度

coords.accuracy  位置精度

* watchPosition()  持续返回用户的当前位置
* clearWatch()   停止 watchPosition () 方法

```js
    const x = document.getElementById("demo");

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position) {
      x.innerHTML = "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;
    }

    function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation."
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred."
          break;
      }
    }
```



### Cookies

cookie 长期存储信息

* 添加

`document.cookie="username=John Doe";`

`document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";`

* 读取

`var x = document.cookie;`

需要自己建立方法查找Cookie

expires：过期时间

path：cookie所属路径

* 修改：相当于新建Cookie
* 删除：只需设置expires 参数为以前时间

`document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";`

```js
	function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
      }
      return "";
    }

    function setCookie(cname,cvalue,exdays) {
      var d = new Date();
      d.setTime(d.getTime()+(exdays*24*60*60*1000));
      var expires = "expires="+d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function checkCookie() {
      var username=getCookie("username");
      if (username!="") {
        alert("Welcome again " + username);
      }
      else {
        username = prompt("Please enter your name:","");
        if (username!="" && username!=null) {
          setCookie("username",username,365);
        }
      }
	}
```



### fetch

发送 HTTP 请求

```js
    fetch(url).then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.error(e))
```

```js
var req = new Request(URL, {method: 'GET', cache: 'reload'});
fetch(req).then(function(response) {
  return response.json();
}).then(function(json) {
  insertPhotos(json);
});
```

> 当接收至HTTP错误码时不会报错，而是正常resolve



### Web Worker

后台运行的 JavaScript

> 注意：Web Worker 内无法访问 window 对象；document 对象；parent 对象

```js
    let w;

    function startWorker() {
      if (typeof(w) === "undefined") {
        w = new Worker("demo_workers.js");
      }
      w.onmessage = function(event) {
        document.getElementById("result").innerHTML = event.data;
      };
    }

    function stopWorker() {
      w.terminate();
      w = undefined;
    }
```

* 创建  `let w = new Worker("demo_workers.js");`
* 监听onmessage事件 `w.onmessage =  () => {};`  子页面使用`postMessage()`方法传递数据

* 终止 `w.terminate();`



### Battery

```js
	navigator.getBattery().then((res) => {
        console.log(res);   // res: BatteryManager对象
    });
```

* charging   当前电池是否在充电
* chargingTime  距充电完成所需时间
* dischargingTime   据电池电量耗尽时间
* level  代表电量的占最大容量的比值
