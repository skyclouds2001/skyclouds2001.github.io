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

[Local Font Access API](/2023/09/20/Local%20Font%20Access%20API/)

### File System API

[File System API](/2023/10/05/File%20System%20API/)

### Web Worker API

[Worker](/2023/09/21/Worker/)

[SharedWorker](/2023/09/22/SharedWorker/)

### Service Worker API

[ServiceWorker I](/2023/08/26/ServiceWorker%20I/)

[ServiceWorker II](/2023/09/20/ServiceWorker%20II/)

[ServiceWorker III](/2023/09/16/ServiceWorker%20III/)

[ServiceWorker IV](/2023/08/31/ServiceWorker%20IV/)

[ServiceWorker V](/2023/08/31/ServiceWorker%20V/)

[ServiceWorker VI](/2023/09/28/ServiceWorker-VI/)

### Push API

[Push API](/2023/09/10/Push%20API/)

### Notifications API

[Notifications API](/2023/09/10/Notifications%20API/)

### Background Fetch API

[Background Fetch API](/2023/09/13/Background%20Fetch%20API/)

### Web Background Synchronization API

[Web Background Synchronization API](/2023/09/12/Background%20Synchronization%20API/)

### Web Periodic Background Synchronization API

[Web Periodic Background Synchronization API](/2023/09/14/Web%20Periodic%20Background%20Synchronization%20API/)

### Content Index API

[Content Index API](/2023/10/01/Content%20Index%20API/)

### Badging API

[Badging API](/2023/10/02/Badging%20API/)

### Window Controls Overlay API

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
