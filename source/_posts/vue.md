---
title: vue
date: 2022-12-14 21:47:47
tags:
- Frontend
- JavaScript
- FrameWork
categories:
- [Frontend, FrameWork]
thumbnail: https://blog.amio.io/content/images/2019/06/vue-3.png
---

# vue

一套构建用户界面的前端框架

- 数据驱动视图
- 双向数据绑定

MVVM：Model-View-ViewModel

Model 数据源

View DOM 结构

ViewModal Vue 实例

## 创建 Vue 实例

```js
    const app = new Vue({
      // Vue实例挂载对象，接收一个选择器
      // 若匹配多个DOM对象，取匹配到的第一个DOM对象
      el: "#app",
      // 普通属性
      data: {
        msg: "",
      },
      // 计算属性：带返回值的方法
      computed: {},
      // 监听器
      watch: {},
      // 普通方法
      methods: {},
      // 过滤器
      filters: {},
    });
```

## 指令结构

指令:参数:修饰符

`v-on:submit.prevent=""`

## 文本

“Mustache”语法 `{{ }}` v-text

`<span>{{msg}}</span>` 只能用于内容节点

`<span v-text="msg"></span>` 会覆盖内部文本

v-once 单次渲染

## 原始 HTML

- **v-html**

`<span v-html="msg"></span>` 会覆盖内部内容

避免使用，可能会发生 XSS 攻击存在安全风险

## 绑定 attr

- **v-bind**

`<a v-bind:href='url'></a>`

简写 `<a :href='url'></a>`

## 计算属性

computed 对象

属性需为一个函数，并返回相应的值

使用时同正常的 data 属性即可

```js
    computed: {
        val1: function () {
            return `the number is ${this.val0} in the input box`;
        }
    }
```

其是依赖于响应式依赖进行缓存的，仅在其相应式依赖改变时才重新计算，因而可以提高性能

可以添加 setter 属性，默认只针对 getter 属性，这样可以同时更新 data 中数据

```js
    computed: {
        val1: {
            get: function () {
                return `the number is ${this.val0} in the input box`;
            },
            set: function (val_1) {
                this.val0 = val_1;
            }
        }
    }
```

## 侦听属性

watch 对象

```js
    watch: {
        // 方法形式
        val0: function (newData, oldData) {
        },
        // 对象形式
        val1: {
            handler (newVal, oldVal) {},
            immediate: true,
        },
            deep: true,
    },
```

实质是一个函数，函数名是监听的变量名

- immediate 选项

立即以表达式当前值触发回调

- deep 选项

用于监听对象内部值的变化

若侦听特殊格式变量，可包裹单引号 如'info.id' () {}

计算属性与侦听属性区别，计算属性根据其响应式属性的改变而改变，侦听属性根据其监视的属性的改变而修改相应的属性

## 绑定事件

- **v-on**

`<a v-on:click='handle_click'></a>`

简写 `<a @click='handle_click'></a>`

- **动态事件**

`<a @[event]='handle_click'></a>`

- **传参**

`<a @click='handle_click(1)'></a>`

- **传原生 DOM 事件**
  $event

`<a @click='handle_click($event)'></a>`

实际方法无参时可以不用该方法，但有参数时必须使用该方法

- **事件修饰符**

- prevent 阻止事件默认行为
- stop 阻止事件传播
- once 使事件仅触发一次
- self 仅在触发事件的元素为绑定的元素本身时起效
- capture 捕获事件模式：比内部元素绑定事件处理方法优先处理
- passive 预先完成事件的默认行为而不是等待事件处理方法完成

修饰符可以串联使用

鼠标修饰符

- left
- right
- middle

分别仅在点击鼠标相应侧按键时起效

按键修饰符

- 可以指定为相应的键码才起效

.enter .tab .delete .esc .space .up .down .left .right

系统修饰符

- exact 控制仅为给定的系统修饰符触发的事件
- ctrl alt shift meta 控制需按下对应的按键才可触发事件

## 绑定表单

**_v-model_**

表单 `<input>`、`<textarea>` 及 `<select>` 元素有效

会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值，故需在 data 中声明数据的初始值

- text 和 textarea 元素使用 `value` property 和 `input` 事件
- checkbox 和 radio 使用 `checked` property 和 `change` 事件
- select 字段将 `value` 作为 prop 并将 `change` 作为事件

修饰符

- number 自动转为数值类型
- trim 自动过滤字符串两端空格符
- lazy 改为在 change 事件后同步而不是默认的 input 事件后同步，即输入时失去或获得焦点才会触发事件

## 条件绑定

- **v-if** truthy 值显示，falsy 值不显示

实质惰性渲染

- **v-show** truthy 值显示，falsy 值不显示

实质仍渲染，通过 display 属性控制

若经常切换显示与否用 v-show，否则用 v-if；可以大幅提高性能

```html
    <div v-if="val === 0">0</div>
    <div v-else-if="val === 1">1</div>
    <div v-else>other</div>
```

- **:key** 可以用于强制区别元素对象

## 循环绑定

- **v-for**

- **:key** 建议绑定 key 属性，并使用独一无二的值作为 key 的值 一般需为字符串或数字类型

```html
    <div v-for="(item, index) in array">{{index + ' : ' + item}}</div>
```

## 过滤器

filters

常用于实现文本格式化

可以用于插值表达式或 v-bind 属性

- **语法**

`{{ message | capitalize }}`

`v-bind:id="rawId | formatId"`

前一个是定义的变量，后一个是定义的过滤器方法，接收唯一一个参数为变量

- **定义过滤器方式**

```js
    // 局部过滤器
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
    
    // 全局过滤器
    Vue.filter('capitalize', function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    })
```

- **其他玩法**

**_过滤器串联_** `{{ message | filterA | filterB }}`

**_过滤器接收参数_** `{{ message | filterA('arg1', arg2) }}`

默认 message 是第一个参数，'arg1'是第二个参数，arg2 是第三个参数 da

## SPA 单页面应用程序 & vue-cli

vue-cli 用于简化使用 webpack 创建 vue 项目的过程

- 创建 vue 项目
  `vue create PROJECT_NAME`

- vue 项目目录

1. src：
    1. main.js：项目入口脚本文件
    2. App.vue：项目根组件
    3. assets：项目静态资源 如 css 样式表、图片资源
    4. components：组件
2. public：
    1. favicon.ico：项目网页图标
    2. index.html：项目页面文件

- vue 项目运行流程

通过 main.js 把 App.vue 渲染到 index.html 的指定位置

导入 vue
`import Vue from 'vue';`

导入 app 模板
`import App from './App.vue';`

```js
    // 添加 Vue 实例
    new Vue({
      // 渲染 render 函数指定的组件
      render: (h) => h(App),
    });
```

> 使用 $mount() 代替 el 属性绑定 DOM 对象

## 组件

使用 vue 后缀名文件定义独立组件

1. 注册组件

   全局：建议注册于入口文件 main.js

```js
   Vue.component("my-component-name", {
     // ... options ...
   });
```

   局部：注册于预期使用的区域

```js
   new Vue({
     components: {
       "com-1": {
         /* options */
       },
     },
   });
```

2. 独立组件文件

    - template 组件模板结构
    - script 组件 js 行为
    - style 组件样式

```html
   <template>
     <div></div>
   </template>
   <script>
      export default = {
          name: 'my-component-name',
          data: function () {
              return {};
          },
          watch: {},
          computed: {},
          filters: {},
          // props: ['my-prop-name'],
          props: {
              'my-prop-name' : {
                  default: 'default-value',
              },
          },
     };
   </script>
   <style></style>
```

3. 注意点

    - 组件应拥有一个根元素
    - 组件内部 data 必须是返回包含数据的对象的函数
    - 指定 style 的类型 `<style lang="less">`
    - 组件封装后是相互独立的，使用时具有父子关系

4. 导入 vue 文件方法

```js
   import Test from "./components/test.vue";
   export default {
     name: "App",
     // 声明使用Test组件
     components: {
       Test,
     },
   };
```

5. 组件属性 props

   大多数属性同 Vue 实例对象

    - name: String 组件名称
    - props: Array | Object 组件自定义属性
      可以直接在方法中使用，只读，可以绑定 v-bind 以动态修改自定义属性的值
        - default 规定属性的默认值
        - type 规定属性的类型
          String Number Boolean Array Object Date Function Symbol 一个自定义的构造函数
        - required 规定属性是否为必须的

6. 样式冲突问题

   组件内的样式全局生效，可能会影响到整个 index 页面
   利用 scoped 设定 `<style scoped>`
   原理是通过自定义 HTML 属性结合 CSS 属性选择器实现
   `/deep/ div` 仅修改子组件的样式

## 组件生命周期

- 生命周期：组件的运行阶段
- 生命周期函数：Vue 的内置函数，按组件生命周期自动按次序执行

1. 组件创建状态

    - **new Vue()**
    - **init events & lifecycle：初始化事件与生命周期函数**
    - beforeCreate：尚未初始化数据方法
    - **init injections & reactivity：初始化 props、data、methods**
    - created：尚未形成实例模板结构【常用】
    - **基于数据和模板，在内存中编译生成 HTML 结构**
    - beforeMount：即将编译好的 HTML 结构渲染至浏览器中
    - **用内存中编译完成的 HTML 结构替换掉 el 属性指定的 DOM 元素**
    - mounted：已将编译好的 HTML 结构渲染至浏览器中，DOM 树已存在当前组件【常用】

2. 组件运行状态

    - beforeUpdate：即将根据变化后最新的数据重新渲染组件的模板结构
    - **根据变化后最新的数据重新渲染组件的模板结构**
    - updated：已将根据变化后最新的数据重新渲染组件的模板结构【常用】

3. 组件销毁阶段

    - beforeDestroy：即将销毁组件
    - destroyed：已将组件销毁

![生命周期](https://cn.vuejs.org/images/lifecycle.png)

## 组件数据共享

- 父->子 自定义属性 props

- 子->父 自定义事件 $emit()

- 兄弟<->兄弟 EventBus

利用 vue 实例中转，使用 bus.$emit() 触发自定义事件，使用bus.$on() 注册自定义事件

```js
    // son
    export default {
        data() {
            return {
                i = 0;
            };
        },
        methods: {
            a() {
                this.i++;
                this.$emit('e', this.i);
            },
        },
    };
    // fa
    // <Son @e='f'></Son>
    export default {
        data() {
            return {
                j = 0;
            };
        },
        methods: {
            f(v) {
                this.j = v;
            },
        },
    };
```

```js
    // send data
    import bus from './eventBus.js';
    export default {
        methods: {
            send_msg() {
                bus.$emit('share', /* data */);
            },
        },
    }
    // receive data
    import bus from './eventBus.js';
    export default {
        created() {
            bus.$on('share', (/* data */) => {
                /* do something with data */
            });
        },
    }
    // eventBus.js
    import Vue from 'vue';
    export default new Vue();
```

## 操作 DOM 元素

ref 引用
默认 vue 组件实例包含 $refs 属性，包含组件内所有的设置 ref 属性的 DOM 元素引用，其为一对象，键名是 ref 的值，键值即为相应的 DOM 对象

```js
    /* <component ref="name"></component> */
    fun() {
        // using this.$refs.name
    }
```

`this.$nextTick()` 将回调函数推迟至下一个 DOM 更新周期后执行

## 动态组件

利用`<component></component>`实现动态组件渲染

```html
    <component is="Left"></component> <component :is="comType"></component>
```

- is 属性指定预期渲染的组件的名称，可以绑定变量实现动态切换使用的组件
- 可以用`<keep-alive>`包裹组件，使之能在失活时缓存，从而可以高效重复使用组件
    - mount:
        - activated() 钩子 组件被激活
        - deactivated() 钩子 组件被缓存
    - props:
        - include 仅名称匹配的组件被缓存
        - exclude 任意名称匹配的组件不被缓存
        - _注意 include 与 exclude 不应同时使用_

## 插槽

### 普通插槽

将组件内部在使用组件时插入内容时提供占位符

```html
    <!-- 组件 -->
    <template>
      <div>
        <slot></slot>
      </div>
    </template>
    <!-- 文件 -->
    <Com> g </Com>
```

使用 `<slot></slot>` 声明一个插槽区域

内容使用 v-slot: 指令，且应用在 template 标签上，内部放置填充的内容
`v-slot:default` 可简写为 `#default`

编译时，插槽内使用的数据，父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的

### 后备内容

可以在组件内的插槽的 slot 标签内放入内容，指定若未给出应插入内容时的渲染内容

```html
    <!-- 组件 -->
    <template>
      <div>
        <slot>default value</slot>
      </div>
    </template>
    <!-- 文件 -->
    <Com> given value </Com>
```

### 具名插槽

具有多个插槽的组件，需要指定插槽的名称，才可以正确地插入部件

通过指定 name 属性实现对插槽进行区别， name 属性默认值为 `default`

```html
    <!-- 组件 -->
    <template>
      <div>
        <p>t</p>
        <slot name="s1"></slot>
        <slot name="s2"></slot>
      </div>
    </template>
    <!-- 文件 -->
    <Com>
      <template v-slot:s1>
        <p>s1</p>
      </template>
      <template v-slot:s2>
        <p>s2</p>
      </template>
    </Com>
```

可以在组件内指定插槽的默认内容

### 作用域插槽

通过插槽自子元素组件向父元素传参

```html
    <!-- 子组件 -->
    <span>
      <slot v-bind:user="user"> {{ user.lastName }} </slot>
    </span>
    <!-- 父组件 -->
    <current-user>
      <template v-slot:default="slotProps">
        {{ slotProps.user.firstName }}
      </template>
    </current-user>
```

## 自定义指令

- 私有自定义指令

```js
    // 使用
    <div v-color="color">color</div>;
    export default {
      // 私有自定义指令声明在该节点之下np
      directives: {
        color: {
          // 首次绑定时调用
          bind(el, binding) {
            el.style.color = binding.value;
          },
          // DOM 更新时调用
          update(el, binding) {
            el.style.color = binding.value;
          },
        },
        /**
         * 若binding与update相同时可简写为
         * color(el, binding) {},
         */
      },
    };
```

- 全局自定义指令

```js
    Vue.directive("colo", {
      bind() {},
      update() {},
    });
    Vue.directive("colo", function () {});
```

- 钩子函数

    - bind 指令绑定到元素时调用
    - inserted 被绑定元素被插入父节点时调用
    - update 组件的 VNode 更新时调用
    - componentUpdated 组件的 VNode 及其子 VNode 全部更新时调用
    - unbind 指令自元素解绑时调用

- 钩子函数参数
    - el 指令绑定的元素
    - binding 指令的一些属性

## 路由

hash 地址与组件之间的对应关系

### 初始化配置

```js
    // 创建实例对象
    // @/src/router/index.js
    import Vue from "vue";
    import VueRouter from "vue-router";
    Vue.use(VueRouter);
    const router = new VueRouter();
    export default router;
    // 导入 App.vue
    // @/App.vue
    import router from "@/router"; // 相当于 import router from '@/router/index.js';
    new Vue({
      router,
      /* ... */
    }).$mount("#app");
```

模块化导入，给定文件夹，默认导入文件夹下的 index.js 文件

### 基本路由

规定占位符与切换组件

- `<router-view></router-view>` 占位符，显示组件
- `<router-link to="/about">关于</router-link>`路由的切换

定义路由关系

```js
    // 导入组件
    import Home from "@/components/Home.vue";
    // 声明路由关系
    const router = new VueRouter({
      routes: [
        {
          path: "/home",
          component: Home,
        },
        // ...
      ],
    });
```

路由重定向

```js
    const router = new VueRouter({
      routes: [
        {
          path: "/",
          redirect: "/home",
        },
        // ...
      ],
    });
```

### 动态路由

使用动态参数实现相同组件不同路由

`<router-link to="/about/${id}">关于</router-link>`

```js
    const router = new VueRouter({
      routes: [
        {
          path: "/movie/:id",
          component: Movie,
          props: true, // 配置利用 props 获取参
        },
        // ...
      ],
    });
```

组件内部获取参数 {} = this.$route.params

props 方式：直接在 Vue 实例中的 props 中获取参数

- 路径参数 `this.$route.params`
- 查询参数 `this.$route.query`

path：仅路径部分 & fullPath：完全参数

### 嵌套路由

路由内部的路由

```js
    const router = new VueRouter({
      routes: [
        {
          path: "/about",
          component: Home,
          /**
           * ! 重定向
           * redirect: '/about/tab1',
           */
          children: [
            {
              path: "tab1",
              component: Tab1,
            },
            {
              /**
               * ! 默认子路由
               */
              path: "",
              component: Tab1,
            },
          ],
          // ...
        },
      ],
    });
```

### 声明式导航 & 编程式导航

- 声明式：点击链接
    - `<a>` `<route-link>`
- 编程式：调用 API 跳转
    - `location`
    - `this.$route.push(${url})` 跳转至指定的地址，并增加一条历史记录
    - `this.$route.replace(${url})` 跳转至指定的地址，并替换当前的历史记录
    - `this.$route.go(${number})` 在浏览器记录中进行前进 or 后退
    - `this.$route.push()`
    - `this.$route.back()`

### 导航守卫

控制路由的访问权限

#### 全局前置守卫

在所有路由触发时起效

```js
router.beforeEach((to, from, next) => {});
```

接收一个回调函数参数
回调函数第一个参数代表将访问的对象，第二个参数代表将离开的对象，第三个代表调用允许的路由导航

调用 next()方法

- next() 允许跳转
- next(_url_) 强制跳转至指定的页面
- next(false) 不允许跳转

## eslint

检查代码的风格的一款插件

`.eslintrc.js` eslint的配置文件

- quotes
- key-spacing
- comma-dangle
- no-multiple-empty-lines
- no-trailing-spaces
- eol-last
- spaced-comment
- indent
- space-before-function-paren

## Vue3

