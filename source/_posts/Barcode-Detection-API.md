---
title: Barcode Detection API
date: 2023-11-16 22:28:16
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
uniqueId: '2023-11-16 14:28:16/Barcode Detection API.html'
mathJax: false
---

Barcode Detection API 支持检测并扫描条形码和二维码

该 API 主要通过 `BarcodeDetector` 类使用

## 获取支持扫描类型

通过 `BarcodeDetector` 类的 `getSupportedFormats()` 静态方法用于获取支持扫描的条形码和二维码类型

方法返回一个 Promise 的字符串数组，结果各项在 BarcodeFormat 中

```js
const supportedFormats = await BarcodeDetector.getSupportedFormats()

supportedFormats.forEach((format) => {
    console.log(format)
})
```

## 扫描条形码或二维码

调用 `BarcodeDetector` 类构造函数创建 `BarcodeDetector` 实例

构造函数允许传入一个配置项，其参数 `formats` 代表限制识别的范围，需为支持识别的类型之一，同时需在 BarcodeFormat 中

构造函数可能抛出 `TypeError` 异常，如传入参数为空列表或列表某项不受支持

```js
const detector = new BarcodeDetector()
```

调用 `BarcodeDetector` 类的 `detect()` 方法识别条形码和二维码

方法传入一个 `image` 参数，可以为 `ImageData` `Blob` `VideoFrame` `OffscreenCanvas` `ImageBitmap` `HTMLCanvasElement` `HTMLVideoElement` `HTMLImageElement` `SVGImageElement` 类型

方法返回一个 Promise 的对象数组，代表识别结果

各项 `rawValue` 参数返回一个字符串，代表识别的结果

各项 `format` 参数返回一个字符串，代表识别的格式，为 BarcodeFormat 中

各项 `boundingBox` 参数返回一个 `DOMRectReadOnly`，代表识别的条形码或二维码相对于图像的相对定位

各项 `cornerPoints` 参数返回一个对象数组，各项均包含 `x` 属性和 `y` 属性，代表识别的条形码或二维码相对于图像的四个顶点的相对定位

方法可能抛出 `SecurityError` 异常，如传入图像具有源且与当前脚本执行源不相同，或传入图像为 `HTMLCanvasElement` 且其中图像 origin-clean 标识为 false

方法可能抛出 `InvalidStateError` 异常，如传入图像为 `HTMLImageElement` 且加载失败（`error` 状态）或未完全完成解码，或传入图像为 `HTMLVideoElement` 且视频未加载完成（`HAVE_NOTHING` 或 `HAVE_METADATA` 状态）

```js
const results = await detector.detect(image)

for (const result of results) {
  console.log(result.rawValue)
}
```

## 类型

```ts
interface BarcodeDetector {
  detect(image: ImageBitmapSource): Promise<DetectedBarcode[]>
}

declare var BarcodeDetector: {
  new (barcodeDetectorOptions?: BarcodeDetectorOptions): BarcodeDetector
  prototype: BarcodeDetector

  getSupportedFormats(): Promise<BarcodeFormat[]>
}

interface BarcodeDetectorOptions {
  formats: BarcodeFormat[]
}

interface DetectedBarcode {
  boundingBox: DOMRectReadOnly
  rawValue: string
  format: BarcodeFormat
  cornerPoints: ReadonlyArray<Point2D>
}

enum BarcodeFormat {
  "aztec",
  "code_128",
  "code_39",
  "code_93",
  "codabar",
  "data_matrix",
  "ean_13",
  "ean_8",
  "itf",
  "pdf417",
  "qr_code",
  "unknown",
  "upc_a",
  "upc_e"
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API>
* <https://wicg.github.io/shape-detection-api/#barcode-detection-api>
