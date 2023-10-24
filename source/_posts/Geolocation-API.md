---
title: Geolocation API
date: 2023-10-15 14:56:35
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
uniqueId: '2023-10-15 06:56:35/Geolocation API.html'
mathJax: false
---

Geolocation API 提供了访问用户地理位置的方法

通过 `navigator.geolocation` 暴露的 `Geolocation` 接口实例访问

使用 API 需要向用户请求授权并获得允许，并且仅在 Secure Context 环境下启用

## 获取地理位置

使用 `Geolocation` 接口的 `getCurrentPosition()` 方法获取地理位置

方法需要传入一个在获取地理位置成功时调用的回调函数，该回调函数会被传递一个 `GeolocationPosition` 参数

方法可以传入一个在获取地理位置失败时调用的回调函数，该回调函数会被传递一个 `GeolocationPositionError` 参数

方法同样可以传入一个可选的配置项：

`maximumAge` 可选选项接收一个正数值，指定使用缓存的地理位置的允许的最长的期限，默认为 `0`

`timeout` 可选选项接收一个正数值，指定获取地理位置等待的超时时间，默认为 `Infinity`

`enableHighAccuracy` 可选选项接收一个布尔值，指定是否尝试获取最精确的可能值，默认值 `false`

```js
navigator.geolocation.getCurrentPosition(
  (position) => {
    // todo something with the position data
  },
  (error) => {
    // todo something when getting position failed
  },
  {
    maximumAge: 0,
    timeout: Infinity,
    enableHighAccuracy: false,
  }
)
```

## 监听地理位置

使用 `Geolocation` 接口的 `watchPosition()` 方法注册监听地理位置的更新

方法的参数类似于 `getCurrentPosition()` 方法

方法返回一个数字，代表注册回调的 ID，可用于 `clearWatch()` 方法取消监听

使用 `Geolocation` 接口的 `clearWatch()` 方法取消注册监听地理位置的更新

## 地理位置信息

`GeolocationPosition` 接口用于表示一组地址位置信息记录

其 `coords` 只读属性代表一个 `GeolocationCoordinates` 实例，表示地址位置信息的具体内容

而 `timestamp` 只读属性返回一个时间戳，代表获取地址位置信息的时间点

`GeolocationCoordinates` 实例用于表示一个地址位置信息详情

`latitude` 只读属性代表纬度

`longitude` 只读属性代表经度

`accuracy` 只读属性代表经纬度精度

`altitude` 只读属性代表海平面高度，设备不支持时返回 `null`

`altitudeAccuracy` 只读属性代表海平面高度精度，设备不支持时返回 `null`

`heading` 只读属性代表设备方向，设备不支持时返回 `null`

`speed` 只读属性代表设备移动速度，设备不支持时返回 `null`

### 异常处理

`GeolocationPositionError` 接口表示获取地理位置失败的异常

`code` 只读属性代表错误状态码，可能为常量枚举 `PERMISSION_DENIED`、`POSITION_UNAVAILABLE` 或 `TIMEOUT` 之一，常量枚举可以通过 `GeolocationPositionError` 本身或其实例访问

`message` 只读属性代表错误信息，通常是用于调试目的而非直接向用户展示

## 相关接口

```ts
interface Navigator {
  readonly geolocation: Geolocation
}

interface Geolocation {
  clearWatch(watchId: number): void
  getCurrentPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback | null, options?: PositionOptions): void
  watchPosition(successCallback: PositionCallback, errorCallback?: PositionErrorCallback | null, options?: PositionOptions): number
}

interface PositionCallback {
  (position: GeolocationPosition): void
}

interface PositionErrorCallback {
  (positionError: GeolocationPositionError): void
}

interface PositionOptions {
  enableHighAccuracy?: boolean
  maximumAge?: number
  timeout?: number
}

interface GeolocationPosition {
  readonly coords: GeolocationCoordinates
  readonly timestamp: EpochTimeStamp
}

interface GeolocationPositionError {
  readonly code: number
  readonly message: string
  readonly PERMISSION_DENIED: 1
  readonly POSITION_UNAVAILABLE: 2
  readonly TIMEOUT: 3
}

interface GeolocationCoordinates {
  readonly accuracy: number
  readonly altitude: number | null
  readonly altitudeAccuracy: number | null
  readonly heading: number | null
  readonly latitude: number
  readonly longitude: number
  readonly speed: number | null
}
```
