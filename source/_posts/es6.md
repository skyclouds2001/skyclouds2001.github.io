---
title: es6
date: 2022-12-14 22:21:39
tags:
- Frontend
- JavaScript
categories:
- [Frontend, JavaScript]
thumbnail: https://paulmiller3000.com/wp-content/uploads/JavaScript-ES6-Logo.jpeg
---

# ES6 标准入门

2022.03.22
No.1

## let 与 const

- 具有**块状作用域**，仅在声明的代码块内可使用
- 不存在**变量提升**现象
- 仅可在变量声明后使用，声明之前不可使用，即**暂时性死区**（TDZ）现象
- 不允许**重复声明**
- const 声明常量，且需立即初始化

- 原理可以认为是在声明仍会提到块顶部创建变量区域，但会阻止在声明位置后的使用
- for 循环的条件部分可视为父作用域，循环体部分可视为子作用域

## 块作用域

- 内层作用域可以覆盖外层作用域的变量
- 外层作用域无法使用内层作用域的变量
- 函数声明在块作用域的行为类似于 var（浏览器）

## 顶层对象

globalThis

- 浏览器：window
- Node：global

- var 命令与 function 命令声明全局变量是顶层对象属性
- let 命令、const 命令与 class 命令声明的不是顶层对象属性

## 解构赋值

- 数组

`let [a, [b], c = true, ...d] = [1, [2], 3, 4, 5, 6]`4
a = 1 b = 2 c = 3 d = [4, 5, 6]

根据数组的位置提取值，匹配不到返回 undefined
允许默认值，仅 undefined 会起效
相当于模式匹配

应为可遍历结构（包含数组、Set 实例）

- 对象

变量应与对象属性同名
取值没有次序

`let { log: loge, sin, cos } = Math;`

允许重命名变量

2022.03.23
No.2

## Promise

### Promise 含义

**promise** 语法上来说是一个对象，它保存了一个未来才会结束的事件的结果，可以用于获取异步操作的结果，是用于异步编程的一种常用的强大的工具，可以解决“回调地狱”问题

promise 对象具有三种状态：**pending**进行中、**fulfilled**已成功、**rejected**已失败，它的状态仅由异步执行的结果决定

promise 对象状态改变只能为 **pending->fulfilled** 和 **pending->rejected**，且状态改变一旦发生，就无法改变，会一直保持这个结果

promise 对象创建后即无法取消，pending 状态时无法得知事件进展，无法在未设置回调函数时捕获错误

### new Promise()

```js
    const promise = new Promise(function(resolve, reject) {
        if(/*success*/) {
            resolve(result);
        } else {
            reject(error);
        }
    });
```

promise 对象一旦新建就会立即执行
promise 对象接受一个函数作为参数，该函数参数分别为 resolve 和 reject，它们都可以根据需要接收参数，并包装成 Promise 对象返回（若已是 Promise 对象则直接返回）
resolve 函数将 promise 对象状态从 pending 改变为 fulfilled
reject 函数将 promise 对象状态从 pending 改变为 rejected

### Promise.prototype.then()

```js
promise.then(
  function (result) {
    // do something when success
  },
  function (error) {
    // do something when fail
  }
);
```

then 方法指定 promise 对象的处理回调函数，接收两个方法作为参数，第一个方法处理 fulfilled 状态的回调函数，第二个方法处理 rejected 状态的回调函数，两个方法都是可选的
then 方法返回一个新的 Promise 实例，因此 Promise 可以具有链式写法，链式的 then 方法会依次调用

### Promise.prototype.catch()

相当于 `.then(null | undefined, rejection)` 指定 Promise 返回错误时的回调函数，包括异步操作抛出错误引起状态改变为 rejected 和回调函数运行时抛出的错误

```js
promise.catch((error) => {
  // do something to deal with the error
  console.log(error);
});
```

一般建议不在 then 方法内定义错误的处理方法，而是统一在最后的 catch 方法统一处理
（也比较符合 try-catch 语句的写法）

处理完成后返回的 Promise 实例的状态会重置为 fulfilled

### Promise.prototype.finally()

finally 方法绑定无论 fulfilled 状态还是 rejected 状态都会执行的方法

> ES2018 引入

```js
promise.finally(() => {
  // do something to deal with the error
});
```

该方法无法接收参数
实质为 then 方法的特例

2022.03.26
No.3

### Promise.resolve()

返回一个 Promise 实例

- 参数是 Promise 实例 ：直接返回，不做修改
- 参数具有 then() 方法 ：转为 Promise 实例并立即调用 then() 方法
- 参数不具有 then() 方法 ：返回一个 fulfilled 状态的 Promise 实例
- 无参 ：返回一个 fulfilled 状态的 Promise 实例

### Promise.reject()

返回一个 rejected 状态下的 Promise 实例

### Promise.all()

`const promiseAll = Promise.all([promise1, promise2]);`

该方法将多个 Promise 实例合并为一个新的 Promise 实例
以数组形式接收需包装的 Promise 实例，若接收到非 Promise 实例参数会自动转为 Promise 实例

- 若所有 Promise 实例状态均变成 fulfilled，包装后的新 Promise 实例状态才会变成 fulfilled
- 反之有任一一个 Promise 实例状态变成 rejected，包装后的新 Promise 实例状态即会变成 rejected

> 需要注意的是，Promise 实例的 catch 方法会阻碍装后的新 Promise 实例 catch 方法的错误捕获

```js
Promise.all([p1, p2])
  .then(([pp1, pp2]) => {
    // do something with pp1 & pp2
  })
  .catch(console.error);
```

### Promise.race()

语法及参数返回值格式同 all

- 若有一个 Promise 实例状态均变成 fulfilled，包装后的新 Promise 实例状态就会变成 fulfilled
- 反之若所有的 Promise 实例状态变成 rejected，包装后的新 Promise 实例状态才会变成 rejected

### Promise.allSettled()

语法及参数返回值格式同 all

- 类似 all 方法
- 仅在所有 Promise 实例状态变更后才发生状态变更

> ES2020 引入

```js
Promise.allSettled([p1, p2]).then((res) => {
  // res:
  // [
  //    { status: 'fulfilled', value: 42 },
  //    { status: 'rejected', reason: -1 }
  // ]
});
```

res 是对象数组，均具有 status 属性代表 Promise 实例的状态；fulfilled 状态具有 value 属性，rejected 状态具有 reason 属性，分别代表 Promise 实例操作的返回值

### Promise.any()

语法及参数返回值格式同 all

- 类似 race 与 allSettled 方法
- 仅在所有 Promise 实例状态变更后才发生状态变更

> ES2021 引入

error 是 AggregateError 实例数组，代表各 Promise 实例的错误信息

2022.03.27
No.4

## Generator 函数

### Generator

- Generator 函数是一个状态机，封装了多个内部状态
- 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数还是一个遍历器对象生成函数
- 返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态（通过 yield 定义）

```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}
let hw = helloWorldGenerator();

hw.next();
// { value: 'hello', done: false }
hw.next();
// { value: 'world', done: false }
hw.next();
// { value: 'ending', done: true }
hw.next();
// { value: undefined, done: true }
```

- 调用 Generator 函数时会返回一个遍历器 Iterator 对象实例
- 每次调用返回的 Iterator 对象实例的 next() 方法时从函数头部或上次停止位置开始执行，直至遇到下一个 yield 表达式或 return 语句为止
- 每次调用 next() 方法返回的是一个对象，具有 done 属性，表示 Iterator 是否执行完毕；具有 value 属性，代表 yield 后的表达式或 return 后的表达式值（惰性求值）

### yield

- 若 Generator 函数不使用 yield，相当于单纯的暂缓执行函数
- 关键字 yield 只能使用在 Generator 函数内
- 若 yield 在表达式内使用需加小括号
  `console.log('y' + (yield 'eah'))`

### next()

- next() 方法可以带一个参数，会给出上一个 yield 表达式的返回值（因此第一次 next() 方法参数无效，可以理解是因为第一次调用 next() 方法会启动遍历器）

### for-of

- 可以使用 for-of 循环遍历 Generator 函数运行时生成的 Iterator 对象，且无需调用 next() 方法
- 特别的， for-of 循环不会返回 return 语句的表达式值
- 可以应用于遍历任意对象

```js
for (let v of hw()) {
  console.log(v);
}
// 'hello' 'world' 'ending'
```

### throw

Generator 函数运行时生成的 Iterator 对象可以调用 throw 方法，在函数体外抛出错误并可被函数体内的 try-catch 块捕获
`hw().throw();`

### return

Generator 函数运行时生成的 Iterator 对象可以调用 return 方法结束 Generator 函数执行，返回值是 return 的参数
`hw().return();`

### next & throw & return

- next 方法将 yield 表达式替换成一个值
- throw 方法将 yield 表达式替换成一个 throw 语句
- return 方法将 yield 表达式替换成一个 return 语句

  2022.03.28
  No.5

### yield\*

用于在 Generator 函数内执行另一个 Generator 函数

```js
function* bar() {
  yield "x";
  yield* foo();
  /**
   * for (let v of foo()) {
   *     yield v;
   * }
   */
  yield "y";
}
```

语法上认为 yield\* 表达式用于声明返回的是一个遍历器对象且是希望被遍历的，实际效果相当于一个 for-of 循环

可以利用 yield\* 取出嵌套数组的所有成员

```js
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}
```

### Generator 函数的 函数对象属性

可简写为

```js
let obj = {
  *myGeneratorMethod() {
    // do something
  },
};
```

### Generator 函数的 this

Generator 函数 g 返回的遍历器 obj，是 g 的实例，而且继承了 g.prototype

- Generator 函数无法被用作构造函数，即在 Generator 函数内部利用 this 添加属性无法起效
- Generator 函数无法被 new 使用

### 状态机&协程&上下文

可以使用 Generator 函数实现状态机

```js
var clock = function* () {
  while (true) {
    console.log("Tick!");
    yield;
    console.log("Tock!");
    yield;
  }
};
```

Generator 函数是一个半协程的函数，即只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数

Generator 函数的上下文在暂停时会暂时退出堆栈但会冻结在当前状态，启动执行时会再次加入调用栈回复执行

### Generator 与异步

```js
// 封装异步常规方法
var fetch = require("node-fetch");
function* gen() {
  var url = "https://api.github.com/users/github";
  var result = yield fetch(url);
  console.log(result.bio);
}
var g = gen();
var result = g.next();
// 介于 fetch 模块返回 promise 对象实例
result.value
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    g.next(data);
  });
```

2022.03.29
No.6

## async await

`async let a function return a promise, await let a expression wait for a promise`

async 函数是 Generator 函数的语法糖

- 内置执行器，无需像 Generator 函数一样调用 next 方法
- 语义清晰化，async 表明函数内含异步操作，await 表明其后的表达式需等待结果
- 适用性更广，允许 Promise 对象和原始状态的值
- async 函数返回 Promise 对象

async 函数内部遇到 await 会先返回一个 Promise 对象，当 await 后的异步操作完成时，才会继续执行函数体后面的语句

await 命令遇到非 promise 对象会直接返回对应的值
await 命令后的 promise 对象变为 rejected 状态，所在的整个 async 函数都会终止执行

建议将 await 命令放在 try-catch 代码块中

```js
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
```

可以让多个并发的异步任务使用 Promise.all 进行包装

```js
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
```

await 命令只能在 async 函数内使用

async 函数可以保留运行堆栈，错误信息不会被遗漏

## Iterator

### 简介

Iterator 为各种不同的数据结构（部署了 Iterator 接口）提供了统一的访问接口

Iterator 遍历时，首先创建一个指向当前数据结构起始位置的指针对象，随后调用指针对象的 next 方法，依次访问数据结构的各个成员，直至指向数据结构的结束位置

每次遍历返回一个对象，包含 value 属性和 done 属性（同 Generator 函数）

Iterator 接口部署在 Symbol.iterator 属性上，其亦是判断是否可遍历的标准

原生 Iterator 接口数据结构有 Array、Map、Set、String、函数的 arguments 对象、NodeList 对象

```js
// 使用数组的 iterator
let iter = [1, 2][Symbol.iterator]();
iter.next(); // { value: 1, done: false }
iter.next(); // { value: 2, done: false }
iter.next(); // { value: undefined, done: true }
```

### 调用

- 解构赋值（数组、Set）
- 扩展运算符 ...
- yield\*
- 数组遍历 for...of、Array.from()、Map()、Set()、WeakMap()、WeakSet()、Promise.all()、Promise.race()

### 实现

```js
// 使用 Generator 函数
let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  },
};
[...myIterable]; // [1, 2, 3]
```

### return 与 throw 方法

- return 遍历提前结束时调用，如 break 或 Error 发生
- throw 配合 Generator 函数使用

### for - of

可以遍历任意具有 Symbol.iterator 的对象或对象实例

```js
for (let v of ["red", "green", "blue"]) {
  console.log(v); // red green blue
}
```

- for-in 循环获取对象的键名
- for-of 循环获取对象的键值

### 遍历的对象方法

- Object.entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组
- Object.keys() 返回一个遍历器对象，用来遍历所有的键名
- Object.values() 返回一个遍历器对象，用来遍历所有的键值

  2022.03.30
  No.7

## 字符串扩展

### 字符串 Unicode 表示更新

```js
"\u{20BB7}";
// "𠮷"
"\u{41}\u{42}\u{43}";
// "ABC"
```

### 字符串遍历器接口

可以识别大于 0xFFFF 的码点而不是分开识别

```js
for (let c of "foo") {
  console.log(c);
}
```

### 模板字符串

使用反引号标识字符串

- 可以定义多行字符串
- 可以在字符串内嵌入变量乃至表达式及函数
- 会保留多行字符串内部的空格和缩进
- 内部使用反引号需转义

```js
`${x} + ${y} = ${x + y}`;
```

### 标签模板

相当于向函数传入一个特殊的模板字符串数组，其具有 raw 属性，代表转义后的原字符串

```js
// 两者等价
alert`hello`;
alert(["hello"]);

let a = 5,
  b = 10;
tag`Hello ${a + b} world ${a * b}`;
// 等同于
tag(["Hello ", " world ", ""], 15, 50);
```

可以用于过滤 HTML 字符串，防止用户输入恶意内容（过滤 < > & 等特殊字符）
可用于多语言转换

## 字符串新增方法

- includes(SearchString, [StartIndex]) 表示是否找到参数字符串
- startsWith(SearchString, [StartIndex]) 表示参数字符串是否在原字符串头部
- endsWith(SearchString, [StartIndex]) 表示参数字符串是否在原字符串尾部

方法均返回布尔值
方法均支持第二个参数，代表开始搜索的位置

- repeat(RepeatCount) 将给定字符串重复指定的次数

参数应为有限的正整数
小数会取整
0 会返回空串
负数及 Infinity 会报错
NaN 等价于 0

- padStart() 用于头部补全
- padEnd() 用于尾部补全

> ES2017 引入

第一个参数指定补全后字符串的长度
第二个参数指定用于补全的字符串，默认为一个空格

原字符串长度超出指定的长度，不起效
补全用字符串与原字符串长度之和超出最大长度会截取补全用的字符串

常用于为数值补全指定位数，或用于提示字符串格式

- trimStart() 消除字符串头部空格，浏览器中同 trimLeft()
- trimEnd() 消除字符串尾部空格，浏览器中同 trimRight()

- matchAll() 返回正则表达式在当前字符串的所有匹配
- replaceAll(searchValue, replacement) 替换字符串中所有的匹配到的字符串

searchValue 可以为字符串或带**g**修饰符的正则表达式

```js
// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
"abbc".replaceAll("b", "$&");
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
"abbc".replaceAll("b", "$`");
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
"abbc".replaceAll("b", `$'`);
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
"abbc".replaceAll(/(ab)(bc)/g, "$2$1");
// 'bcab'

// $$ 指代 $
"abc".replaceAll("b", "$$");

// replacement可以是一个函数
"aabbcc".replaceAll("b", () => "_");
// 'aa__cc'
```

- at() 选取字符串指定位置的字符，允许负索引

  2022.03.31
  No.8

## 数值表示方法

- 二进制 `0b11`
- 八进制 `0o11`

转为十进制可使用 Number() 方法

## 数值分隔符

特点

- 允许数值使用 `_` 作为分隔符
- 分隔符之间没有指定间隔的位数 `12_34_56` `12_345_567`
- 允许应用于小数与指数 `0.123_21` `1e1_234`
- 允许应用于其他进制的数值

注意点

- 数值分隔符无法放在数值最前面或最后面
- 数值分隔符不能连在一起使用
- 小数的小数点前后不能有分隔符
- 指数的 e 符号前后不能有分隔符
- 进制前缀后不能加分隔符
- 字符串转数值函数不支持数值分隔符 `Number('123_456') // NaN` `parseInt('123_456') // 123`

## Number 对象新增方法

- Number.isFinite()
  检测数值是否为有限的
    - 数值为 ±Infinity 或 NaN 返回 false，其他返回 true
    - 非数值一律返回 false
- Number.isNaN()
  检测数值是否为 NaN

    - 仅 NaN 返回 true，其他均为 false

  与传统的全局方法 isFinite()和 isNaN()的区别，对于非数值类型，全局方法会调用 Number()方法转换再比较，而 Number 对象方法一律直接返回 false

- Number.parseInt()
- Number.parseFloat()
  将数值转换为整数与浮点数
  使用与相应的全局方法相同

- Number.isInteger()
  判断数值是否为整数
  若数值的小数部分过小，可能会发生误判
  非数值一律返回 false

- Number.EPSILON
  代表 js 所能够表示的最小精度数，实质是可接受的最小误差范围
  两个浮点数的差小于该数时，可以认为两浮点数相等

- Number.MAX_SAFE_INTEGER 2^53-1
- Number.MIN_SAFE_INTEGER -(2^53-1)
  表示 js 能够精确表示的整数的范围
- Number.isSafeInteger()
  检测数值是否为能够精确表示的
  非数值或非整数一律返回 false

  2022.04.01
  No.9

## Math 对象新增方法

大多数非数值参数会先调用 Number() 方法尝试转换

- Math.trunc()
  对浮点数执行取整操作，去除小数部分
  空值或无法转为整数的值返回 NaN
- Math.sign()
  判断数值的符号
    - 正数返回 +1
    - 负数返回 -1
    - 0 返回 0
    - -0 返回-0
    - 其他返回 NaN
- Math.cbrt()
  计算数值的立方根
- Math.clz32()
  "count leading zero bits in 32-bit binary representation of a number"
  将参数转为 32 位无符号整数形式，并返回 32 位数的前导 0 的个数
  小数只会考虑整数部分
  `Math.clz32(0) // 32`
  `Math.clz32(1) // 31`
  `Math.clz32(1000) // 22`
  `Math.clz32(0b01000000000000000000000000000000) // 1`
  `Math.clz32`
  `Math.clz32(3.2) // 30`
- Math.imul()
  返回两数以 32 位有符号整数相乘的结果
  正常情况 Math.imul(a, b)与 a _ b 效果相同
  `(0x7fffffff _ 0x7fffffff)|0 // 0` `Math.imul(0x7fffffff, 0x7fffffff) // 1`
  主要应用于获取大数相乘时的正确的低位数值
- Math.fround()
  返回数的 32 位单精度浮点数形式
  绝对值超出 2^24 的数字会丢失精度
  `Math.fround(0) // 0`
  `Math.fround(2 ** 24 - 1) // 16777215`
  `Math.fround(2 ** 24) // 16777216`
  `Math.fround(2 ** 24 + 1) // 16777216`
  主要应用于将 64 位双精度浮点数转为 32 位单精度浮点数
- Math.hypot()
  返回所有参数的平方和的平方根
  对于非数值类型参数，会先转为数值，若任一参数无法转换，即会返回 NaN
  `Math.hypot(3, 4); // 5`
  `Math.hypot(); // 0`
  `Math.hypot(NaN); // NaN`
  `Math.hypot(3, 4, 'foo'); // NaN`
  `Math.hypot(-3); // 3`
- Math.log2()
  返回以 2 为底的 x 的对数
- Math.log10()
  返回以 10 为底的 x 的对数
- Math.log1p()
  返回 ln(1 + x)
- Math.expm1()
  返回 e^x - 1
- Math.sinh(x)
  返回 x 的双曲正弦
- Math.cosh(x)
  返回 x 的双曲余弦
- Math.tanh(x)
  返回 x 的双曲正切
- Math.asinh(x)
  返回 x 的反双曲正弦
- Math.acosh(x)
  返回 x 的反双曲余弦
- Math.atanh(x)
  返回 x 的反双曲正切

## BigInt 类型

> ES2020 引入

- 只能用于表示整数
- 可以表示任意位数的整数
  `2172141653n * 15346349309n // 33334444555566667777n`
  `2172141653 * 15346349309 // 33334444555566670000`
- 允许使用各种进制表示整数
  `0b1101n // 二进制`
  `0o777n // 八进制`
  `0xFFn // 十六进制`
- 通过后缀 n 声明整数
  `1234 // 普通整数`
  `1234n // BigInt`
  `1n + 2n // 3n`
- typeof 运算符返回 'bigint'
  `typeof 123n // 'bigint'`
- 可以使用-，不可以使用+
  `-42n // CORRECT`
  `+42n // ERROR`
- 可以使用 BigInt()将其他类型的值转换为 BigInt 类型的变量

- BigInt.asUintN(width, BigInt)
  给定的 BigInt 转为 0 到 2^width - 1 之间对应的值。
- BigInt.asIntN(width, BigInt)
  给定的 BigInt 转为 -2^(width-1) 到 2^(width-1) - 1 之间对应的值。
- BigInt.parseInt(string[, radix])
  近似于 Number.parseInt()，将一个字符串转换成指定进制的 BigInt

- 大多数运算符，除>>>与+外，均可应用于 BigInt 对象

  2022.04.02
  No.10

## 数组扩展

### Array 对象新增方法

- Array.from()
  将类数组对象(具有 length
  属性)及可遍历对象(具有 Iterator 接口)转为数组
  允许接受第二个参数即回调函数，作用类似 map 方法，对元素进行处理并放入返回的数组

    - 转换各种值为数组
    - 将字符串转为数组以判断字符串正确的长度

  ```js
  let arr2 = Array.from({
    0: "a",
    1: "b",
    2: "c",
    length: 3,
  }); // ['a', 'b', 'c']
  Array.from([1, 2, 3], (x) => x * x);
  // [1, 4, 9]
  ```

- Array.of()
  将一组值转换为数组
  `Array.of(3, 11, 8) // [3,11,8]`

- Array.prototype.copyWithin()
  将当前数组内部指定位置成员复制至其他位置并返回当前数组
  `Array.prototype.copyWithin(target, start = 0, end = this.length)`

    - target 开始替换数据位置
    - start 开始读取数据位置
    - end 结束读取数据位置
      `[1, 2, 3, 4, 5].copyWithin(0, 3, 4)`

- Array.prototype.find()
  传入一个回调函数，返回第一个符合条件的值
- Array.prototype.findIndex()
  传入一个回调函数，返回第一个符合条件的值的下标
- Array.prototype.includes()
  查找数组内是否包含指定的值

- Array.prototype.fill()
  使用给定值填充一个数组
  `new Array(3).fill(7) // [7, 7, 7]`
  `['a', 'b', 'c'].fill(7, 1, 2) // ['a', 7, 'c']`

- Array.prototype.entries()
- Array.prototype.keys()
- Array.prototype.values()
  keys()是对键名的遍历
  values()是对键值的遍历
  entries()是对键值对的遍历
  可以使用 for-of 循环

```js
for (let index of ["a", "b"].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ["a", "b"].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ["a", "b"].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

- Array.prototype.flat()
  展平多维数组形成低维的数组
  默认展平一层
  可以传入一个数值或 Infinity，代表期望展平的层数
  `[1, [2, [3]]].flat(Infinity) // [1, 2, 3]`
- Array.prototype.flatMap()
  先对原数组各元素进行遍历后执行展平操作
  接受一个回调函数参数，只能展平一层

- Array.prototype.at()
  根据数组下标获取元素
  允许负值

### 数组空位

不同方法对数组空位的处理方法不同

- forEach(), filter(), reduce(), every() 和 some()都会跳过空位
- map()会跳过空位，但会保留这个值
- join()和 toString()会将空位视为 undefined，最终被处理成空字符串
- Array.from()方法与扩展运算符会将数组的空位，转为 undefined
- copyWithin()会连空位一起拷贝
- fill()会将空位视为正常的数组位置
- for...of 循环也会遍历空位
- entries()、keys()、values()、find()和 findIndex()会将空位处理成 undefined

建议数组中不要出现空位

---

2022.04.05
No.11

## 运算符扩展

### 指数运算符 `**`

> ES2016

右结合
`2 ** 3 ** 2 // 相当于 2 ** (3 ** 2)`

### 指数赋值运算符 `**=`

### 链判断运算符 `?.`

> ES2020

从 `const firstName = (message && message.body && message.body.user && message.body.user.firstName) || 'default';`
到 `const firstName = message?.body?.user?.firstName || 'default';`

在链式调用的时候判断左侧的对象是否为 null 或 undefined。如果是的，就不再往下运算，而是返回 undefined

- obj?.prop // 对象属性是否存在
- obj?.[expr] // 同上
- func?.(...args) // 函数或对象方法是否存在

### 空值合并运算符 `??`

> ES2020

只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值

### 逻辑赋值运算符 `&&=` `||=` `??=`

可以用于为变量或属性设置默认值

从 `opts.foo = opts.foo ?? 'bar';`
到 `opts.foo ??= 'bar';`

## 对象 Object 新增方法

### Object.is()

用来比较两个值是否严格相等
基本类似 === 运算符

区别：+0 不等于-0 ； NaN 等于本身

### Object.assign()

用于对象合并，将源对象所有可枚举自身属性复制到目标对象

第一个参数是目标对象，剩余的参数是源对象

若只有第一个参数，会直接返回该对象
若该参数不是对象，会转为对象再处理
若该参数是 null 或 undefined 会报错
若非对象参数是剩余参数，会尝试转为对象，若失败则忽略跳过（实际只有字符串能以字符数组合入）
该方法只能拷贝源对象自身的可枚举属性，不能拷贝源对象继承属性，也不能拷贝不可枚举的属性

- 浅拷贝
  源对象的对象属性拷贝的是引用
- 替换同名属性
  对于同名属性，该方法会直接替换该属性而不是添加
- 取值函数
  对于 get 函数，该方法会先求值再复制，不会复制 get 函数

- 为对象添加属性

```js
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  },
}
```

- 为对象添加方法

```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  },
});
```

- 克隆对象

```js
function clone(origin) {
  return Object.assign({}, origin);
}
```

- 合并多个对象

```js
const merge = (target, ...sources) => Object.assign(target, ...sources);
const merge = (...sources) => Object.assign({}, ...sources);
```

- 指定属性默认值

```js
const DEFAULTS = {
  logLevel: 0,
  outputFormat: "html",
};
function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  // ...
}
```

2022.04.06
No.12

### Object.getOwnPropertyDescriptors(Object)

> ES2017 引入

返回指定对象的所有非继承的自身属性的描述对象

```js
Object.getOwnPropertyDescriptors({
  foo: 123,
  get bar() {
    return "abc";
  },
});
/**
 * {
 *    foo: {
 *      value: 123,
 *      writable: true,
 *      enumerable: true,
 *      configurable: true,
 *    },
 *    bar: {
 *      get: [Function: get bar],
 *      set: undefined,
 *      enumerable: true,
 *      configurable: true,
 *    },
 * }
 */
```

- 可以用于配合 Object.defineProperties()方法方法正确拷贝对象（特别是对象的 get 和 set 属性）
- 配合 Object.create()方法，将对象属性克隆到一个新对象（浅拷贝）
- 实现对象之间的继承

### `__proto__` Object.setPrototypeOf() Object.getPrototypeOf()

`__proto__` 用于读取并设置对象的原型对象
特别注意的是它仅规定在浏览器需要实现

`Object.setPrototypeOf()` `Object.getPrototypeOf()`
分别用于设置和获取对象的原型对象
不是对象的参数会自动转为对象

### Object.keys() Object.values() Object.entries()

`Object.keys()` 返回包含对象自身所有的非继承的可遍历的属性键名的数组
`Object.values()` 返回包含对象自身所有的非继承的可遍历的属性键值的数组
`Object.entries()` 返回包含对象自身所有的非继承的可遍历的属性键值对数组的数组

```js
var obj = { foo: "bar", baz: 42 };
Object.keys(obj); // ["foo", "baz"]
Object.values(obj); // ["bar", 42]
Object.entries(obj); // [ ["foo", "bar"], ["baz", 42] ]
```

### Object.fromEntries()

相当于 Object.entries() 的逆操作
将一个键值对数组转为对象

```js
Object.fromEntries([
  ["foo", "bar"],
  ["baz", 42],
]); // { foo: "bar", baz: 42 }
```

可以利用该方法与其逆方法实现*map 数据结构*与*对象*之间的相互转换

## 对象扩展

### 属性的简洁表示方法

可以在大括号里面，直接写入变量和函数，作为对象的属性和方法，此时属性名就是变量名，属性值就是变量值

```js
const foo = "bar";
const baz = {
  foo,
};
```

### 方法的简洁表示方法

```js
const o = {
  method() {
    return "Hello!";
  },
};
```

get 与 set 的显示方法

```js
const cart = {
  _wheels: 4,
  get wheels() {
    return this._wheels;
  },
  set wheels(value) {
    if (value < this._wheels) {
      throw new Error("数值太小了！");
    }
    this._wheels = value;
  },
};
```

### 属性名表达式

允许将变量值作为对象的属性名
*注意：默认会将非对象变量值转为字符串*

```js
let propKey = "foo";
let obj = {
  [propKey]: true,
  ["a" + "bc"]: 123,
};
```

2022.04.07
No.13

### 方法的 name 属性

- 普通方法 方法名
- 普通对象方法 方法名
- get set 对象方法 get|set+方法名
- Function 构造函数方法 anonymous
- bind 方法 bound+方法名
- Symbol 方法 Symbol 的描述

### 属性可枚举性与遍历

#### 对象属性描述对象

对象的各属性均有一个相应的描述对象
可以使用 `Object.getOwnPropertyDescriptor()` 方法获取属性的描述对象

#### `enumerable`属性

属性 `enumerable` 用于描述对象属性是否可枚举

#### 遍历方法

- for...in 遍历对象**自身**的和**继承**的**可枚举**的**非 Symbol 属性**的属性
- Object.keys(obj) 遍历对象**自身**的**可枚举**的**非 Symbol 属性**的属性
- Object.getOwnPropertyNames(obj) 遍历对象**自身**的**非 Symbol 属性**的属性
- Object.getOwnPropertySymbols(obj) 遍历对象**自身**的**Symbol 属性**的属性
- Reflect.ownKeys(obj) 遍历对象**自身**的所有属性

#### 遍历次序

- 首先遍历所有*数值*键，按照*数值*升序排列
- 其次遍历所有*字符串*键，按照*加入时间*升序排列
- 最后遍历所有*Symbol*键，按照*加入时间*升序排列

### super 关键字

指向当前对象的原型对象
（只能用于对象的方法内，只能在对象方法的简写法可使用）

```js
// correct
const obj = {
  foo: "world",
  find() {
    return super.foo;
  },
};

// error
const obj = {
  foo: super.foo,
};
const obj = {
  foo: () => super.foo,
};
const obj = {
  foo: function () {
    return super.foo;
  },
};
```

super.foo 原理上等同于 Object.getPrototypeOf(this).foo （属性）或 Object.getPrototypeOf(this).foo.call(this) （方法）

### 对象扩展运算符

> ES2018 引入

#### 对象的解构赋值

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
/* ...必须为最后一个参数 */
```

#### 扩展运算符

取出对象的所有可遍历属性并拷贝到当前对象内，也可以应用于合并对象

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n; // { a: 3, b: 4 }

let ab = { ...a, ...b };
// 同名属性会依照出现的顺序被覆盖
// 可以设置对象属性的默认值以及修改现有对象的属性
```

实际效果等同于使用 Object.assign()方法

### AggregateError 错误对象

> ES2021 引入

AggregateError 在一个错误对象里面，封装了多个错误

`AggregateError(errors[, message])`
errors 以数组形式接收产生的错误对象（必须）
message 以字符串形式接收抛出时的提示信息（可选）
以上亦是对象实例的属性

```js
const error = new AggregateError(
  [
    new Error("ERROR_11112"),
    new TypeError("First name must be a string"),
    new RangeError("Transaction value must be at least 1"),
    new URIError("User profile link must be https"),
  ],
  "Transaction cannot be processed"
);
```

2022.04.09
No.14

## 函数的扩展

### 函数默认值

```js
// 形参
function f(a, b = 12) {
  /* ... */
}
// 解构赋值
function g({ a, b = 1 }) {
  /* ... */
}
```

- 形参默认声明，因而无法再次声明
- 不允许出现重名参数
- 参数默认值是惰性求值，即每次重新计算值
- 建议函数默认值放在末尾（不然为取到默认值，需要显式传参 undefined）
- 指定默认值的函数，length 属性表示未指定默认值的参数个数（非末尾参数的默认值后的参数不再计入）【length 属性指的是函数预期传入的参数个数】

```js
// 双重默认值
function fetch(url, { body = "", method = "GET", headers = {} } = {}) {
  /* ... */
}
```

另外函数的形参部分运行时会生成一个独立的作用域

```js
var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2); // 2
```

可以利用默认值强制实现函数参数不可省略的特性

```js
function foo(mustBeProvided = () => throw new Error("Missing parameter")) {
  /* ... */
}
```

### rest 参数

用于搭配一个数组变量，获取函数多余的参数
格式 `...变量名`

函数的 length 属性，不包括 rest 参数

```js
const sortNumbers = (...numbers) => numbers.sort();
```

另外，rest 参数必须为函数的最后一个参数

### 函数的严格模式

可以在函数内部设定严格模式

但是若函数参数使用了**默认值**、**解构赋值**、或者**扩展运算符**，那么函数内部就不能显式设定为严格模式

1. 可以设定全局的严格模式规避
2. 可以将函数包裹在无参数的立即执行函数内部

### 函数的 name 属性

返回函数的函数名称

- 匿名函数会返回实际的函数名
- Function 构造函数创建的函数返回 'anonymous'
- bind 返回的函数返回的有 `bind` 前缀

### 箭头函数

`() => {}`

### 尾调用优化

`函数式编程`
函数的返回调用另一个函数得到的结果（且应是函数的最后一步操作）

```js
function f(x) {
  return g(x);
}
```

它可以提高性能节省内存，尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了

若尾调用自身，即**尾递归**
优点在于不易发生栈溢出错误

```js
// 阶乘
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
// Fibonacci 数列
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2;
  }
  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}
```

> 尾递归优化起效必须开启**严格模式**

### 函数参数尾逗号

> ES2017 生效

允许函数最后一个参数出现逗号

### Function.prototype.toString() 优化

> ES2019 生效

会完全返回一模一样的原始代码（包括注释、空格等等）

### catch 的参数忽略

允许 catch 语句忽略参数

```js
try {
  // ...
} catch {
  // ...
}
```

2022.04.10
No.15

## Map 与 Set

### Set

Set 类似于数组，但是 Set 成员的值都是唯一的，没有重复的值

#### Set 构造方法

- `new Set()`
- `new Set([1, 2, 3])`
  构造方法可以接受一个数组或其他具有 Iterator 接口的数据结构参数

> 去除数组重复成员
>
> > `[...new Set(array)]` > > `Array.from(new Set(array))`
> > 去除字符串重复成员
> > `[...new Set(string)].join('')`

Set 对象添加值时，不会发生类型转换，且使用 `Same-value-zero equality` 判断值是否重复（类似===），特别的是任意对象均不相同

可以使用 `Array.from()` 方法将 Set 结构转为数组
可以利用扩展运算符对 Set 实例转为数组执行一些操作

#### Set 原型属性

- Set.prototype.constructor Set
  构造函数，即 Set 函数
- Set.prototype.size
  返回 Set 实例的成员数量

#### Set 原型{操作}方法

- Set.prototype.add(value)
  向 Set 实例添加一个值
  返回 Set 结构本身
  因此该方法可以*链式调用*
- Set.prototype.delete(value)
  删除某个值
  返回一个布尔值，表示删除是否成功
- Set.prototype.has(value)
  检测该值是否为 Set 实例的成员
  返回一个布尔值
- Set.prototype.clear()
  清除所有成员
  没有返回值

```js
s.add(1).add(2).add(2);
s.size; // 2
s.has(1); // true
s.has(2); // true
s.has(3); // false
s.delete(2);
s.has(2); // false
```

#### Set 原型{遍历}方法

- Set.prototype.keys()
  返回键名的遍历器
- Set.prototype.values()
  返回键值的遍历器
- Set.prototype.entries()
  返回键值对的遍历器
- Set.prototype.forEach()
  使用回调函数遍历每个成员，分别执行某种操作
  没有返回值
  接受第一个参数作为将执行的回调函数，第二个参数作为绑定的 this 对象

  特别的，Set 结构键名和键值是同一个值，因此 keys 方法和 values 方法的行为完全一致

```js
let set = new Set(["red", "green", "blue"]);
for (let item of set.keys()) {
  console.log(item);
  // red green blue
}
for (let item of set.values()) {
  console.log(item);
  // red green blue
}
for (let item of set.entries()) {
  console.log(item);
  // ["red", "red"] ["green", "green"] ["blue", "blue"]
}
new Set([1, 4, 9]).forEach((value, key) => console.log(key + " : " + value));
// 1 : 1  4 : 4  9 : 9
```

### Map

Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现（因为 Object 对象的键名只允许为字符串）

#### Map 构造方法

构造方法类似 Set 的构造方法，可以接受任意具有 Iterator 接口且每个成员都是一个双元素的数组的数据结构作为参数
Map 亦不允许出现键值相同的元素
特别的，Map 判断键值相同是基于内存地址的，因此对于对象而言，相同内容的对象可能被 Map 认为是不同的键值

#### Map 原型属性及方法

- size
  返回 Map 结构的成员总数
- Map.prototype.set(key, value)
  设置键对应的值
  若键已存在会覆盖已有的值
  返回当前的 Map 结构
  *因此可以采取链式写法*
- Map.prototype.get(key)
  读取键对应的值
  查找成功返回键对应的值，否则返回 undefined
- Map.prototype.has(key)
  检测某个键是否存在于当前 Map 对象内
  返回一个布尔值
- Map.prototype.delete(key)
  删除某个键
  返回一个布尔值，表示是否删除成功
- Map.prototype.clear()
  清除所有成员
  方法没有返回值

```js
const map = new Map();
map.set("foo", "val");
map.size; // 1
map.get("foo"); // 'val'
map.has("foo"); // true
map.delete("foo"); // true
map.delete("foo"); // false
map.clear();
```

- Map.prototype.keys()
  返回键名的遍历器
- Map.prototype.values()
  返回键值的遍历器
- Map.prototype.entries()
  返回所有成员的遍历器
- Map.prototype.forEach()
  遍历 Map 的所有成员

同样，Map 的遍历顺序即插入顺序

### WeakSet 及 WeakMap

WeakSet 只接受对象作为成员
WeakMap 只接受对象作为键名（null 除外），键值则没有限制
WeakSet 中的对象与 WeakMap 的键名所指向的对象，不计入垃圾回收机制

因此 WeakSet 和 WeakMap 是不可遍历的，且不具有 size 属性，且无法执行清空操作
WeakSet 和 WeakMap 的其他方法基本相同

它们主要应用于解决使用 Set 和 Map 时可能出现的内存泄漏问题

2022.04.11
No.16

### WeakRef

> ES2021 引入

对象的弱引用

直接使用 `new WeakRef(target)` 创建基于对象 target 的新对象，该对象是对对象 target 的弱引用，垃圾回收机制不会计入这个引用
新对象的引用不会妨碍原始对象 target 被垃圾回收机制清除

实例 deref() 方法可以判断原始对象是否已被清除

```js
// 作为缓存
function makeWeakCached(f) {
  const cache = new Map();
  return (key) => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }
    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}
const getImageCached = makeWeakCached(getImage);
```

### FinalizationRegistry

指定目标对象被垃圾回收机制清除以后，所要执行的回调函数

```js
// 新建注册表实例，接受一个回调函数参数作为当该对象被回收时的回调函数
const registry = new FinalizationRegistry((heldValue) => {
  // ....
});
// 注册表实例的register()方法注册所要观察的目标对象并确定将传入回调函数的参数
registry.register(theObject, "some value", theObject);
// unregister()方法可以取消注册当前的对象
registry.unregister(theObject);
```

## Symbol

### 概述

原始数据类型 Symbol，表示独一无二的值，是一种类似于字符串的数据类型
Symbol 值通过 Symbol() 函数生成
可以添加一个字符串参数表示对 Symbol 实例的描述（若为对象则会调用 toString() 方法转为字符串）

```js
let s = Symbol(); // typeof s === "symbol"
let s1 = Symbol("foo"); // Symbol(foo)
```

任意两个 Symbol 变量使用 === 运算符比较都是不等的

Symbol 无法与其他类型的值进行运算，否则会报错；但可以显式转为字符串与布尔值（恒为 true）

### Symbol.prototype.description

> ES2019 引入

表示 Symbol 的描述（实际上就是传入 Symbol 的参数）

```js
const sym = Symbol("foo");
sym.description; // "foo"
```

### Symbol 作属性名

Symbol 值可以作为标识符，用于对象的属性名，从而保证不会出现同名的属性

```js
let a = {
  [mySymbol]: "bar",
};
```

注意：Symbol 值作为对象属性名时，不能用点运算符，只能使用中括号运算符

Symbol 类型可以用于定义一组常量，可以替代魔术字符串的使用

### Symbol 的遍历

Symbol 成员属性不会被大多数循环所遍历
但可以使用 `Object.getOwnPropertySymbols()` 方法与 `Reflect.ownKeys()` 获取用作属性名的 Symbol 值
因此可以用于为对象定义一些非私有的、但又希望只用于内部的方法

2022.04.12
No.17

### Symbol 的方法

#### `Symbol.for()`

接受一个字符串作为参数，然后搜索有没有以该参数作为名称的全局环境的 Symbol 值，若存在，就返回这个 Symbol 值；否则就新建一个以该字符串为名称的 Symbol 值，并将其全局注册

```js
Symbol.for("foo") === Symbol.for("foo");
// true
Symbol("bar") === Symbol("bar");
// false
```

#### `Symbol.keyFor()`

返回一个已登记的 Symbol 类型值的 key，否则返回 undefined

### Symbol 的内置值

#### `Symbol.hasInstance`

对象的 Symbol.hasInstance 属性，指向一个内部方法，该内部方法会在其他对象使用 instanceof 运算符，判断是否为该对象的实例时调用

```js
class M {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  },
};
[1, 2] instanceof new MyClass()    // true
class N {
  static [Symbol.hasInstance](obj) {
    return Number(obj) > 0;
  },
};
1 instanceof N // true
-1 instanceof N // true
```

#### `Symbol.isConcatSpreadable`

Symbol.isConcatSpreadable 属性是一个布尔值
表示该对象用于`Array.prototype.concat()`时，是否可以展开

- 默认数组可以展开，值为 undefined（true 亦可）
- 类数组对象默认不可展开，值为 false，（设为 true 可展开）

```js
class A1 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  },
};
class A2 extends Array {
  constructor(args) {
    super(args);
  },
  get [Symbol.isConcatSpreadable] () {
    return false;
  },
};
/* 注意：实例内与类内的区别 */
```

#### `Symbol.species`

Symbol.species 属性，指向一个构造函数，在创建衍生对象时调用

```js
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
```

可以指定衍生对象的类型（相当于指定原型对象）

#### `Symbol.match`

Symbol.match 属性，指向一个函数，在执行`str.match(myObject)`时，如果该属性存在，会调用该属性，返回该方法的返回值

#### `Symbol.replace`

Symbol.replace 属性，指向一个方法，当该对象被`String.prototype.replace`方法调用时，会返回该方法的返回值
Symbol.replace 方法会收到两个参数，第一个参数是 replace 方法正在作用的对象；第二个参数是替换后的值

#### `Symbol.search`

对象的 Symbol.search 属性，指向一个方法，当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值

#### `Symbol.split`

对象的 Symbol.search 属性，指向一个方法，当该对象被`String.prototype.split`方法调用时，会返回该方法的返回值

#### `Symbol.iterator`

对象的 Symbol.iterator 属性，指向该对象的默认遍历器方法
对象进行 for...of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器

```js
myIterable[Symbol.iterator] = function* () {};
class Collection {
  *[Symbol.iterator]() {},
};
```

特别的，这个方法应当是一个 Generator 函数

#### `Symbol.toPrimitive`

对象的 Symbol.toPrimitive 属性，指向一个方法，该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值

```js
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case "number":
        return 123;
      case "string":
        return "str";
      case "default":
        return "default";
      default:
        throw new Error();
    }
  },
};
2 * obj; // 246
3 + obj; // '3default'
obj == "default"; // true
String(obj); // 'str'
```

该方法可以接受一个字符串参数

- Number：该场合需要转成数值
- String：该场合需要转成字符串
- Default：该场合可以转成数值，也可以转成字符串

#### `Symbol.toStringTag`

对象的 Symbol.toStringTag 属性，指向一个属性的 get 方法，在该对象上面调用`Object.prototype.toString`方法时，如果这个属性存在，它的返回值会出现在 toString 方法返回的字符串之中，表示对象的类型
可以用来定制`[object Object]`或`[object Array]`中 object 后面的那个字符串

部分特殊的对象已具有自带的 Symbol.toStringTag 属性

#### `Symbol.unscopables`

对象的 Symbol.unscopables 属性，指向一个对象，该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除

```js
class MyClass {
  foo() {
    return 1;
  }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}
var foo = function () {
  return 2;
};

with (MyClass.prototype) {
  foo(); // 2 （没有时为1）
}
```

2022.04.13
No.18

## class 语法

### class 简介

ES6 引入了 class 关键字用于定义类，作为对象的模板
可以认为是构造函数的另外一种写法，用法完全和构造函数一样

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
const point = new Point(1, 2);
```

- 实际上类模板内的所有方法实质是定义在构造方法的 prototype 对象上
- prototype 对象的 constructor()属性，直接指向'类'的本身
- *特别的*，类内部定义的所有方法，都是**不可枚举**的
- *特别的*，类必须使用**new**指令调用，否则会报错
- 类内部默认是严格模式
- 类不存在变量提升现象
- 类的 name 属性返回类名
- 类成员方法的 this 默认指向类的实例（因此不建议单独使用成员方法，除非绑定了 this 的指向）

### constructor 方法

类的默认方法（必须的），使用 new 命令时会被调用

默认返回实例对象，即 this

### class 实例

实例的属性除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即 class 上）

类的所有实例共享一个原型对象（浏览器可以使用**proto**属性访问，亦可使用 Object.getPrototypeOf（）获取实例的原型对象）

另外，如果需要修改原型对象，需要非常非常谨慎

### 取值函数与存值函数

存值函数和取值函数直接设置在属性的 Descriptor 对象上，会拦截赋值和读取行为

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return "getter";
  }
  set prop(value) {
    console.log("setter: " + value);
  }
}
```

### 属性表达式与 class 表达式

```js
/* 属性表达式 */
let methodName = "getArea";
class A {
  [methodName]() {}
}

/* class表达式 */
const B = class {};

/* 立即执行的class表达式 */
let c = new (class {
  constructor() {}
})();
```

2022.04.14
No.19

### 静态方法

在 class 内定义的方法加 static 关键字，使该方法不被实例继承而是直接通过类调用
静态方法的 this 关键字指向类本身
继承时父类的静态方法可以被子类继承，亦可通过 super 关键字调用

```js
class Foo {
  static classMethod() {
    return "hello";
  }
}
Foo.classMethod(); // 'hello'
```

### 实例属性

实例属性可以定义在类的顶层

```js
class Foo {
  count = 0;
  get value() {
    return this.count;
  }
}
```

### 静态属性

定义在 class 本身的属性，而不是定义在实例对象上的属性

```js
class Foo {}
Foo.prop = 1;
```

> static 修饰静态属性

### 私有方法及私有属性

1. 通过命名时前加下划线`_`加以提示
2. 将变量名命名为 Symbol 值，增大获取的难度
3. 将私有方法放在类外

新 method，使用#前缀

```js
class Foo {
  #count = 0;
  #cause() {}
}
```

同样可以使用 in 运算符判断私有属性的存在（但只能在类内部使用），常规的继承也可以使用

### 静态块

在类生成时运行一次，且仅运行一次
主要用于对静态属性进行初始化
（内部可以使用类名或 this 指代当前类）

```js
class C {
  static x = 1;
  static {
    this.x; // 等价于C.x
  }
}
```

### `new.target` 属性

在构造函数之中，返回 new 命令作用于的那个构造函数，若不是 new 调用的，会返回 undefined
可以用来确定构造函数的调用方式
子类继承父类时，new.target 会返回子类

```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error("必须使用 new 命令生成实例");
  }
}
```

2022.04.15
No.20

### class 继承

使用 extends 关键字声明继承

```js
class Point {
  constructor() {}；
}
class ColorPoint extends Point {
  constructor() {
    super();
  };
}
```

- constructor
  > 必须在显式声明的 constructor()方法内部显式调用 super()方法，否则会报错（未指定 constructor()方法会默认添加且内部会调用 super()方法）
  >
  > > 原因是需要先调用父类的构造方法才可以生成 this 对象，从而子类才可在 this 上添加方法及属性
  > > 可以认为，任意子类方法都有一个 constructor()方法
- 属性及方法
  > 子类会继承父类所有属性方法，包括静态属性与静态方法（不包括私有属性与私有方法）
  > 但如果子类定义了私有属性的读写非私有方法，即可通过方法读写私有属性

### `super` 关键字

- super 作为函数调用时，代表父类的构造函数
  > super 方法只能用于子类的构造函数内
- super 作为对象使用时，在普通方法中，指向父类的*原型对象*；在静态方法中，指向*父类*
  > 实例方法调用 super 内部 this 指向调用 super 的子类的实例
  > 静态方法调用 super 内部 this 指向 super 所在的子类
- 由于对象总是继承其他对象，因此实际上任意对象中均可使用 super 关键字

### `prototype` 属性和 `__proto__` 属性

class 同时具有以上两种属性

#### 子类

- 子类 `__proto__` 属性指向父类
- 子类 `prototype` 属性的 `__proto__` 属性，指向父类的 `prototype` 属性

```js
class A {}
class B extends A {}

B.__proto__ === A; // true
B.prototype.__proto__ === A.prototype; // true
```

- 作为一个对象，子类（B）的原型（**proto**属性）是父类（A）
- 作为一个构造函数，子类（B）的原型对象（prototype 属性）是父类的原型对象（prototype 属性）的实例

#### 子类实例

- 子类实例的**proto**属性的**proto**属性，指向父类实例的**proto**属性

```js
var a = new A(2, 3);
var b = new B(2, 3, "red");

b.__proto__.__proto__ === a.__proto__; // true
```

- 子类的原型的原型，是父类的原型

  2022.04.16
  No.21

## Module

模块

1. CommonJS 服务器端
2. AMD 浏览器端

ES6 模块通过 export 显式指定输出的代码，并使用 import 导入

这是**编译时加载**，可以实现**静态分析**，可以提高加载效率

> 模块自动采用严格模式

### `export`命令

规定模块的对外接口

- 可以直接输出变量、函数、对象等

```js
// 输出变量
export const a = 100;
const b = 200;
export { b };

// 输出函数及类class
export function c() {}
```

- 通常`export`输出变量名称即其原本名称，但可以使用`as`关键字重命名

```js
const d = 300;
export { d as D };
```

- `export`指令规定的对外接口，必须与模块内部变量建立一一对应的关系

- `export`输出的接口，与其对应的值是动态绑定关系，可以实时获取模块内部的值

### `import`命令

加载模块

- `import`命令接受一对大括号，内部指定从其他模块导入的变量名（该变量名必须与对外接口名称相同）

```js
import { a, b } from "module.js";
```

- 可以使用`as`关键字对输入变量重命名

```js
import { c as C } from "module.js";
```

- `import`输入的接口是只读的，无法对其重新赋值（若其为对象，可改变其的内容）

- import 后的 from 规定模块文件的位置，相对路径与绝对路径均可，单独的模块名需要相应的配置文件给出模块的位置

```js
import jQuery from "jquery";
```

- `import`命令具有提升效果，会把变量提升到模块头部首先执行（因为 import 命令是编译阶段执行的，在代码运行之前）

- `import`命令无法使用表达式与变量，也无法在 if、for 等块状作用域内执行

- import 语句会执行所加载的模块

```js
// 执行一次lodash模块，但不会导入任何值
import "lodash";
```

### 模块整体加载

使用`*`与`as`实现

```js
import * as Z from "module.js";
Z.c();
```

### `export default`指令

为模块指定默认输出，用户可以自行定义任意的名称

```js
// export.js
function foo() {}
export default foo;
// import.js
import FOO from "export.js";
```

该命令只能使用一次，因为一个模块只能有一个默认输出

> 本质上，`export default`就是输出一个叫做`default`的变量或方法，并且系统允许为它取任意名字

2022.04.17
No.22

### `export`与`import`的复用

```js
export { foo } from "module.js";
```

相当于导入了模块并作为对外接口发放出去（但实际上并没有导入当前模块，不能直接使用）

```js
// 其他一些用法
export { foo as FOO } from 'module';
export * from 'module';
export * as BAR from 'module';
export { default } from 'module';
export { foo as default } from 'module';
export { default as foo } from 'module';
```

### 模块的继承

```js
export * from "circle";
export var e = 2.71828182846;
export default function (x) {
  return Math.exp(x);
}

import * as math from "circleplus";
import exp from "circleplus";
```

### 跨模块常量

将 const 常量作为对外接口导出

```js
export const A = 1;
import { A } from "./constants";
```

### 动态导入

使用`import(specifier)`动态导入模块，接受一个参数代表模块的位置，返回一个 Promise 实例（它是一个异步加载方法）

```js
import(`./section-modules/${someVariable}.js`)
  .then((module) => {
    module.doSomeThing();
  })
  .catch((err) => {
    console.error(err);
  });
```

- 按需加载
  在需要时再加载模块
- 条件加载
  在if代码块内根据需要加载不同的模块
- 动态模板路径加载
  动态生成希望加载的模块路径

可以结合 async - await 使用

```js
async function main() {
  const myModule = await import('./myModule.js');
  const { export1, export2 } = await import('./myModule.js');
  const [ module1, module2, module3 ] = await Promise.all([
    import('./module1.js'),
    import('./module2.js'),
    import('./module3.js'),
  ]);
}
```

2022.04.18
No.23

## Proxy 代理器

### Proxy

Proxy 用于修改某些操作的默认行为，相当于在目标对象前添加一层拦截，可以对外界的访问进行过滤与改写

使用如下的方法生成一个对象的拦截器
`const proxy = new Proxy(target, handler);`
其中`target`代表将拦截的目标对象
`handler`代表拦截行为，是一个对象

```js
/** define */
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});

/** test */
obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```

要使得Proxy起效，需要直接对Proxy实例进行操作而不是对目标对象进行操作
显而易见Proxy实例可以做其他对象的原型对象
同一个拦截器对象可以一次性拦截多个操作
可以把拦截器设置到proxy属性上`var object = { proxy: new Proxy(target, handler) };`因而可以在object对象上调用

### Proxy 实例方法

- get(target, propKey, receiver)
    1. 简介
       拦截对象属性的读取
       标对象某属性不可写且不可配置，则对该属性的get方法会报错
    2. 参数
        - target 目标对象
        - propKey 属性名
        - receiver 操作行为所针对的proxy实例（可选）
    3. 目标
        - `proxy.foo`
        - `proxy['foo']`
    4. 作用
        - 实现链式调用

- set(target, propKey, value, receiver)
    1. 简介
       拦截对象属性的设置
       应返回一个布尔值（严格模式下返回 false 或 undefined 均会报错）
       目标对象的不可写属性，则对该属性的set方法不起效
    2. 参数
        - target 目标对象
        - propKey 属性名
        - value 属性值
        - receiver 操作行为所针对的proxy实例（可选）
    3. 目标
        - `proxy.foo = v`
        - `proxy['foo'] = v`
    4. 作用
        - 阻止内部属性的点运算符与中括号运算符访问，实现私有属性的效果

- has(target, propKey)
    1. 简介
       拦截propKey in proxy的操作
       目标对象不可配置或不可扩展时使用has方法会报错
       返回一个布尔值
       *特别的其对 for - in 循环不起效*
    2. 参数
        - target 目标对象
        - key 查询的属性名
    3. 目标
        - `foo in proxy`
    4. 作用
        - 阻止对内部属性的in运算符访问，实现私有属性的效果

- deleteProperty(target, propKey)
    1. 简介
       拦截delete操作
       返回一个布尔值
       目标对象的不可扩展属性无法被删除，否则会报错
    2. 参数
        - target 目标对象
        - propKey 删除的属性名
    3. 目标
        - `delete proxy[propKey]`
    4. 作用
        - 阻止对内部属性的in运算符访问，实现私有属性的效果

- ownKeys(target)
    1. 简介
       拦截读取对象自身属性操作
       返回一个数组（数组成员只能是字符串或Symbol值，其他值出现会报错）
       *会自动过滤不存在的属性、不可遍历的属性，Symbol值属性*
       不可配置的属性必须被返回，否则报错
       不可扩展的目标对象必须包含所有属性，否则会报错
    2. 参数
        - target 目标对象
    3. 目标
        - `Object.getOwnPropertyNames(proxy)`
        - `Object.getOwnPropertySymbols(proxy)`
        - `Object.keys(proxy)`
        - `for...in循环`

- getOwnPropertyDescriptor(target, propKey)
    1. 简介
       拦截Object的获取属性描述对象方法
       返回属性的描述对象或undefined
    2. 参数
        - target 目标对象
        - propKey 希望获取属性描述对象的属性名
    3. 目标
        - `Object.getOwnPropertyDescriptor(proxy, propKey)`

- defineProperty(target, propKey, propDesc)
    1. 简介
       拦截Object的定义属性方法
       返回一个布尔值
       不可扩展的目标对象无法被删除，否则会报错
       目标对象的不可写属性或者不可配置属性无法被改变
    2. 参数
        - target 目标对象
        - propKey 删除的属性名
        - propDesc 删除的属性描述对象
    3. 目标
        - `Object.defineProperty(proxy, propKey, propDesc）`
        - `Object.defineProperties(proxy, propDescs)`

- preventExtensions(target)
    1. 简介
       拦截Object的标记对象不可扩展方法
       必须返回一个布尔值
       仅目标对象不可扩展时才能返回true，否则会报错（因此通常内部需要调用一次Object.preventExtensions(proxy)方法）
    2. 参数
        - target 目标对象
    3. 目标
        - `Object.preventExtensions(proxy)`

- getPrototypeOf(target)
    1. 简介
       拦截获取原型对象操作
       返回一个对象或null
       不可扩展的目标对象，必须返回目标对象的原型对象
    2. 参数
        - target 目标对象
    3. 目标
        - `Object.prototype.__proto__`
        - `Object.prototype.isPrototypeOf()`
        - `Object.getPrototypeOf()`
        - `Reflect.getPrototypeOf()`
        - `instanceof`

- isExtensible(target)
    1. 简介
       拦截判断对象可扩展性操作
       返回一个布尔值
       *其返回值必须与目标对象的isExtensible属性一致*
    2. 参数
        - target 目标对象
    3. 目标
        - `Object.isExtensible(proxy)`

- setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截
    1. 简介
       拦截设置原型对象方法
       必须返回一个布尔值
       不可扩展的目标对象不得改变其原型对象
    2. 参数
        - target 目标对象
        - proto 将设置的原型对象
    3. 目标
        - `Object.setPrototypeOf(proxy, proto)`

- apply(target, object, args)
    1. 简介
       拦截 Proxy 实例作为函数调用的操作
    2. 参数
        - target 目标对象
        - ctx 目标对象的上下文对象this
        - args 目标对象的参数数组
    3. 目标
        - `proxy(...args)`
        - `proxy.call(object, ...args)`
        - `proxy.apply(...)`

- construct(target, args)
    1. 简介
       拦截 Proxy 实例作为构造函数调用的操作
       返回必须为一个对象
    2. 参数
        - target 目标对象（必须是函数）
        - args 构造函数的参数数组
        - newTarget new命令作用的构造函数
    3. 目标
        - `new proxy(...args)`
    4. 作用
        - 阻止对内部属性的in运算符访问，实现私有属性的效果

### Proxy 静态方法

- Proxy.revocable()
  返回一个可取消的 Proxy 实例
  可以应用于：若目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问

  ```js
  let target = {};
  let handler = {};

  let {proxy, revoke} = Proxy.revocable(target, handler);

  proxy.foo = 123;
  proxy.foo // 123

  revoke();
  proxy.foo // TypeError: Revoked
  ```

### issue of `this` on Proxy

Proxy 代理情况下，目标对象内部的this会指向 Proxy 实例
此时需要使用bind、apply等方法绑定this的指向

2022.04.19
No.24

## Reflect

Reflect 对象是 Object 对象的更新

