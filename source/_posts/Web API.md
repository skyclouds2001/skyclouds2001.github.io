---
title: Web API
date: 2022-12-14 22:55:58
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
uniqueId: '2022-12-14 22:55:58/web api.html'
mathJax: false
---

## Web API

在编写 Web 项目时，有许多 Web API 可供调用来实现各种各样的功能

### Local Font Access API

Local Font Access API 允许访问设备本地安装的字体数据

[Local Font Access API](/2023/09/20/Local%20Font%20Access%20API/)

### File System API

File System API 以及 File System Access API 允许访问设备文件系统上的文件-允许读取、写入和文件管理功能，或利用 OPFS 机制存储类文件的数据

[File System API](/2023/10/05/File%20System%20API/)

### Web Worker API

Web Worker API 允许在与 Web 应用程序的主执行线程分开的后台线程中运行脚本操作，避免阻碍主执行线程的进行

[Worker](/2023/09/21/Worker/)

[SharedWorker](/2023/09/22/SharedWorker/)

### Service Worker API

Service Worker API 用于充当用户代理与网络之间的代理服务器，可以拦截请求与实现离线体验，同时与其他 API 结合实现良好的使用体验

[ServiceWorker I](/2023/08/26/ServiceWorker%20I/)

[ServiceWorker II](/2023/09/20/ServiceWorker%20II/)

[ServiceWorker III](/2023/09/16/ServiceWorker%20III/)

[ServiceWorker IV](/2023/08/31/ServiceWorker%20IV/)

[ServiceWorker V](/2023/08/31/ServiceWorker%20V/)

[ServiceWorker VI](/2023/09/28/ServiceWorker-VI/)

### Notifications API

Notifications API 允许网页控制向用户显示系统通知

[Notifications API](/2023/09/10/Notifications%20API/)

### Push API

Push API 让网络应用从用户代理接收来自服务器发送的消息，无论网络应用是否运行或者在线

[Push API](/2023/09/10/Push%20API/)

### Background Fetch API

Background Fetch API 允许管理后台下载大文件的方法

[Background Fetch API](/2023/09/13/Background%20Fetch%20API/)

### Web Background Synchronization API

Web Background Synchronization API 允许推迟任务的执行直至网络连接

[Web Background Synchronization API](/2023/09/12/Background%20Synchronization%20API/)

### Web Periodic Background Synchronization API

Web Periodic Background Synchronization API 允许在网络连接下周期性执行任务

[Web Periodic Background Synchronization API](/2023/09/14/Web%20Periodic%20Background%20Synchronization%20API/)

### Content Index API

Content Index API 允许网站或 PWA 应用向浏览器注册其离线启用的内容

[Content Index API](/2023/10/01/Content%20Index%20API/)

### Badging API

Badging API 允许用户代理在网站或 PWA 应用上设置徽章

[Badging API](/2023/10/02/Badging%20API/)

### Window Controls Overlay API

Window Controls Overlay API 允许 PWA 应用能够隐藏默认窗口标题栏并在应用程序窗口区域显示自定义的内容

[Window Controls Overlay API](/2023/10/03/Window%20Controls%20Overlay%20API/)

### Web Storage

存储

> 注意：仅HTTPS协议下可用

#### 类型

* localStorage  存储数据长期有效
* sessionStorage  存储数据仅网页打开期间有效

#### 属性方法

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
