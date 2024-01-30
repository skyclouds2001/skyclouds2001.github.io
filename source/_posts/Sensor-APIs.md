---
title: Sensor APIs
date: 2024-01-28 02:11:33
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
uniqueId: '2024-01-27 18:11:33/Sensor APIs.html'
mathJax: false
---

Sensor APIs 提供了一系列的传感器 API， 用以提供网页访问应用传感器的权限

## 通用传感器

`Sensor` 抽象接口表示通用传感器，该接口被其他具体传感器接口继承，通常不会直接使用该接口

### 激活

调用 `start()` 方法激活传感器

在完全激活后，其 `activated` 属性值会改变，并触发 `activate` 事件（返回 `Event` 事件）

### 停用

调用 `stop()` 方法停用传感器

### 读取数据

在每次读取数据时，会触发 `reading` 事件（返回 `Event` 事件）

### 异常处理

在每次读取数据中触发异常时，会触发 `error` 事件，并返回一个 `SensorErrorEvent` 事件，可通过其 `error` 只读属性读取到对应的 `DOMException` 实例

### 相关参数

其 `activated` 只读属性指示传感器是否已激活

其 `hasReading` 只读属性指示传感器是否已读取数据

其 `timestamp` 只读属性指示传感器最近一次读取数据的高精度时间戳

## 加速度传感器

`Accelerometer` 接口表示加速度传感器，继承自 `Sensor` 接口

构造该接口时，除了 `Sensor` 接口构造函数的 `frequency` 参数外，还可以额外指定 `referenceFrame` 参数指示，值可以为 `device` 或 `screen` 之一，默认值是 `device`

该接口的 `x` `y` `z` 只读属性分别表示在 x 轴、y 轴和 z 轴上的分加速度

### 线性加速度传感器

`LinearAccelerationSensor` 接口表示线性加速度传感器，继承自 `Accelerometer` 接口

线性加速度指不考虑重力影响下的加速度

### 重力加速度传感器

`GravitySensor` 接口表示重力加速度传感器，继承自 `Accelerometer` 接口

## 物理方向传感器

`OrientationSensor` 抽象接口表示物理方向传感器，该接口被其他具体物理方向传感器接口继承，通常不会直接使用该接口

该接口的 `quaternion` 只读属性返回一个四元数只读元组，表示设备物理方向的四元组（x y z w）的值

该接口的 `populateMatrix()` 方法使用最新的旋转矩阵填充给定的目标矩阵

### 绝对物理方向传感器

`AbsoluteOrientationSensor` 接口表示绝对物理方向传感器，继承自 `OrientationSensor` 接口

绝对物理方向指相对地球坐标系的物理方向

构造该接口及其子接口时，除了 `Sensor` 接口构造函数的 `frequency` 参数外，还可以额外指定 `referenceFrame` 参数指示，值可以为 `device` 或 `screen` 之一，默认值是 `device`

### 相对物理方向传感器

`RelativeOrientationSensor` 接口表示相对物理方向传感器，继承自 `OrientationSensor` 接口

相对物理方向指根据设备决定的物理方向，不考虑地球坐标系

构造该接口及其子接口时，除了 `Sensor` 接口构造函数的 `frequency` 参数外，还可以额外指定 `referenceFrame` 参数指示，值可以为 `device` 或 `screen` 之一，默认值是 `device`

## 环境光传感器

`AmbientLightSensor` 接口表示环境光传感器，继承自 `Sensor` 接口

该接口的 `illuminance` 只读属性返回环境光的强度，单位流明

## 陀螺仪传感器

`Gyroscope` 接口表示陀螺仪传感器，继承自 `Sensor` 接口

构造该接口时，除了 `Sensor` 接口构造函数的 `frequency` 参数外，还可以额外指定 `referenceFrame` 参数指示，值可以为 `device` 或 `screen` 之一，默认值是 `device`

该接口的 `x` `y` `z` 只读属性分别表示在 x 轴、y 轴和 z 轴上的分角速度

## 磁场传感器

`Magnetometer` 接口表示磁场传感器，继承自 `Sensor` 接口

构造该接口时，除了 `Sensor` 接口构造函数的 `frequency` 参数外，还可以额外指定 `referenceFrame` 参数指示，值可以为 `device` 或 `screen` 之一，默认值是 `device`

该接口的 `x` `y` `z` 只读属性分别表示在 x 轴、y 轴和 z 轴上的分磁场强度

## 权限策略

该组 API 调用受到 `accelerometer` `gyroscope` `magnetometer` `ambient-light-sensor` 等权限策略的控制，可以通过 `Permissions-Policy` 响应头指定，或通过 `<iframe>` 标签的 `allow` 属性指定

默认值均是 `self`，即允许允许在顶层浏览上下文及其同源的嵌入浏览上下文中使用

|             传感器             |                    权限策略                    |
|:---------------------------:|:------------------------------------------:|
|       `Accelerometer`       |              `accelerometer`               |
| `LinearAccelerationSensor`  |              `accelerometer`               |
|       `GravitySensor`       |              `accelerometer`               |
| `RelativeOrientationSensor` |        `accelerometer` `gyroscope`         |
| `AbsoluteOrientationSensor` | `accelerometer` `gyroscope` `magnetometer` |
|    `AmbientLightSensor`     |           `ambient-light-sensor`           |
|         `Gyroscope`         |                `gyroscope`                 |
|       `Magnetometer`        |               `magnetometer`               |

## 权限 API

该组 API 调用时需要用户授予 `accelerometer` `gyroscope` `magnetometer` `ambient-light-sensor` 等权限，可以调用 `Permission.query()` 方法检查用户是否已授予了该权限

|             传感器             |                     权限                     |
|:---------------------------:|:------------------------------------------:|
|       `Accelerometer`       |              `accelerometer`               |
| `LinearAccelerationSensor`  |              `accelerometer`               |
|       `GravitySensor`       |              `accelerometer`               |
| `RelativeOrientationSensor` |        `accelerometer` `gyroscope`         |
| `AbsoluteOrientationSensor` | `accelerometer` `gyroscope` `magnetometer` |
|    `AmbientLightSensor`     |           `ambient-light-sensor`           |
|         `Gyroscope`         |                `gyroscope`                 |
|       `Magnetometer`        |               `magnetometer`               |

## 类型

```ts
interface Sensor extends EventTarget {
  readonly activated: boolean
  readonly hasReading: boolean
  readonly timestamp?: DOMHighResTimeStamp

  start(): void
  stop(): void

  onreading: ((this: Sensor, ev: Event) => any) | null
  onactivate: ((this: Sensor, ev: Event) => any) | null
  onerror: ((this: Sensor, ev: SensorErrorEvent) => any) | null
}

interface SensorOptions {
  frequency: number
}

interface SensorErrorEvent extends Event {
  constructor(type: string, errorEventInitDict: SensorErrorEventInit)
  readonly error: DOMException
}

interface SensorErrorEventInit extends EventInit {
  error: DOMException
}

interface Accelerometer extends Sensor {
  constructor(options?: AccelerometerSensorOptions)
  readonly x?: number
  readonly y?: number
  readonly z?: number
}

enum AccelerometerLocalCoordinateSystem { "device", "screen" }

interface AccelerometerSensorOptions extends SensorOptions {
  referenceFrame?: AccelerometerLocalCoordinateSystem
}

interface LinearAccelerationSensor extends Accelerometer {
  constructor(options?: AccelerometerSensorOptions)
}

interface GravitySensor extends Accelerometer {
  constructor(options?: AccelerometerSensorOptions)
}

type RotationMatrixType = Float32Array | Float64Array | DOMMatrix

interface OrientationSensor extends Sensor {
  readonly quaternion?: ReadonlyArray<number>
  populateMatrix(targetMatrix: RotationMatrixType): void
}

enum OrientationSensorLocalCoordinateSystem { "device", "screen" }

interface OrientationSensorOptions extends SensorOptions {
  referenceFrame?: OrientationSensorLocalCoordinateSystem
}

interface AbsoluteOrientationSensor extends OrientationSensor {
  constructor(sensorOptions?: OrientationSensorOptions)
}

interface RelativeOrientationSensor extends OrientationSensor {
  constructor(sensorOptions?: OrientationSensorOptions)
}

interface AmbientLightSensor extends Sensor {
  constructor(options?: SensorOptions)
  readonly illuminance?: number
}

interface Gyroscope extends Sensor {
  constructor(sensorOptions?: GyroscopeSensorOptions)
  readonly x?: number
  readonly y?: number
  readonly z?: number
}

enum GyroscopeLocalCoordinateSystem { "device", "screen" }

interface GyroscopeSensorOptions extends SensorOptions {
  referenceFrame?: GyroscopeLocalCoordinateSystem
}

interface Magnetometer : Sensor {
  constructor(sensorOptions?: MagnetometerSensorOptions)
  readonly x?: number
  readonly y?: number
  readonly z?: number
}

enum MagnetometerLocalCoordinateSystem { "device", "screen" }

interface MagnetometerSensorOptions extends SensorOptions {
  referenceFrame?: MagnetometerLocalCoordinateSystem
}
```

## 链接

- <https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs>
- <https://w3c.github.io/sensors/>
- <https://w3c.github.io/accelerometer/>
- <https://w3c.github.io/orientation-sensor/>
- <https://w3c.github.io/ambient-light/>
- <https://w3c.github.io/gyroscope/>
- <https://w3c.github.io/magnetometer/>
