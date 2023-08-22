---
title: svg
date: 2022-12-14 22:11:59
tags:
- Frontend
- HTML
categories:
- [Frontend, Other]
thumbnail: 
---

```html
      <svg width="500" height="500" style="background-color: #eee;">
    
        <!-- 矩形 rect -->
        <rect width="100" height="100" x="100" y="100" rx="10" ry="10"></rect>
        <!-- 圆形 circle -->
        <circle cx="250" cy="250" r="100"></circle>
        <!-- 椭圆  ellipse-->
        <ellipse cx="475" cy="450" rx="25" ry="50"></ellipse>
        <!-- 直线 line -->
        <line x1="0" y1="0" x2="500" y2="500" stroke="green"></line>
        <!-- 折线 polyline -->
        <polyline points="500 0, 100 100, 0 500" stroke="blue" fill="none"></polyline>
        <!-- 多边形 polygon -->
        <polygon points="500 0, 400 400, 0 500" stroke="none" fill="green"></polygon>
        <!-- 直线路径 path -->
        <path d="M 0 0 L 50 50 L 50 100 L 100 400 L 400 400 L 400 100 L 50 50 Z" stroke="orange" fill="none" ></path><path d="M 0 0 l 250 150 l 100 0 l 0 -100 l 50 50 l 50 0 l 0 350 l -350 0 l 0 -50 l -50 -50 l 100 0 l 0 -100 Z" stroke="red" fill="none" stroke-width="5" stroke-dasharray="25 5 10 5" stroke-dashoffset="5" stroke-linecap="round" stroke-linejoin="round"></path>
        <!--
          属性样式  直接设置在元素属性上
          内联样式  设置在元素 style 属性内
          内部样式  写在 style 标签内
          外部样式  写在独立的 css 文件中
         -->
        <!--
          svg 常见属性
            fill 填充颜色
            stroke 描边颜色
            fill-opacity 填充颜色的不透明度
            stroke-opacity 描边颜色的不透明度
            stroke-width 描边宽度
            stroke-dasharray 描边样式 - 可以用于设置虚线
            stroke-dashoffset 设置偏移量
            stroke-linecap 线帽样式
              butt 平头 | 默认
              round 圆头
              square 方头
            stroke-linejoin 拐角样式
              miter 尖角 | 默认
              round 圆角
              bevel 平角
            shape-rendering 消除锯齿
              crispEdges 关闭反锯齿功能
              geometricPrecision 开启反锯齿功能
         -->
        <!--
          svg 支持颜色
            颜色关键字
            十六进制
            RGB 和 RGBA
            HSL 和 HSLA
         -->
    
         <!-- 文本元素 text -->
        <text x="250" y="250" fill="pink" font-size="50" font-weight="bold" text-decoration="underline" text-anchor="middle" dominant-baseline="middle">SVG</text>
        <!-- 多行文本 tspan -->
        <text font-size="25">
          <tspan x="400" y="380">S</tspan>
          <tspan x="400" y="400">V</tspan>
          <tspan x="400" y="420">G</tspan>
        </text>
        <!--
          文本元素属性
            font-size 字号
            font-weight 粗体
            text-decoration 装饰线
            text-anchor 水平对齐方式
            dominant-baseline 垂直对齐方式
            writing-mode 文字方向
         -->
    
        <!-- 超链接 a -->
        <a xlink:href="https://developer.mozilla.org/zh-CN/docs/Web/SVG" xlink:title="svg" target="_blank">
          <text x="50" y="50" font-size="25">SVG</text>
        </a>
    
        <!-- 图片 image -->
        <image xlink:href="https://img.zcool.cn/community/0167b95fc9ea7a11013ee04dc55982.jpg@1280w_1l_2o_100sh.jpg" width="50" height="50" x="100" y="100"></image>
    
      </svg>
```
