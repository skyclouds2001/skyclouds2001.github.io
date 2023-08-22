---
title: typescript
date: 2022-12-14 21:36:44
tags:
- Frontend
categories:
- [Frontend]
thumbnail: https://tse2-mm.cn.bing.net/th/id/OIP-C.X6S_XCoE1pfm6fKK2zpQNwHaD4
---

```typescript

    /** TS变量类型 */
    let an: any;
    let str: string = '12';
    let num: number = 20;
    let flag: boolean = true;
    
    let arr: number[] = [1];
    let ar: Array<number> = [2];
    let tuple: [string, number] = ['test', 10];
    
    enum Color {
      Red,
      Green,
      Blue,
    };
    let co: Color = Color.Red;
    
    function hello(): void {
      console.log('hello');
    }
    
    let nu: null;
    let un: undefined;
    let ne: never;
    
    /** 类型断言 */
    var num0: number = <number> <any> str;
    
    /** 类型推断 */
    
    /**
     * 变量作用域
     * - 全局作用域
     * - 类作用域
     * - 局部作用域
     */
    
    /** 运算符 */
    
    /** 条件 */
    
    /** 循环 */
    
    /** 函数 */
    // 可选参数 默认参数 剩余参数
    function add(x: number = 0, y: number = 0, z?: number/* 可选参数: 必须在参数列表最后 */, ...other: number[]): number {
      return x + y + (z ?? 0) + add(...other);
    }
    const sub = (x: number, y: number): number => x - y
    const add_plus: (x: number, y:number) => number = (x, y) => x + y;
    
    // 匿名函数 自动执行函数 递归函数 箭头函数
    var res = function(a: number, b: number) {
      return a * b;
    };
    (() => console.log('Hello!'))();
    
    // 函数重载
    
    /** 字面量类型 */
    // 使用具体值作为类型
    let fu: '0' | '1' | '2' | '3' = '1';
    const fv = 1;
    
    /** Number String Boolean 包装类型 */
    
    /** Array 数组 元组 Map */
    // 数组
    let arr1: number[] = [1, 2];
    let arr2: Array<number> = [3, 4];
    // 元组 Tuple
    let position: [number, string, boolean] = [1, '2', true];
    // Map
    const m: Map<number, number> = new Map();
    
    /** 联合类型 */
    var union: number | number[];
    union = 12;
    union = [12, 34];
    
    /** 枚举类型 */
    enum Direction {
      Up,
      Down,
      Left,
      Right,
    };
    // 枚举成员值默认是自第一个值（默认为0）开始的数值，即默认为数字枚举
    var dir: Direction = Direction.Up;
    enum Direction1 {
      Left = 10,
      Right,
    };
    // 字符串枚举必须有初始值
    enum Direction2 {
      Up = 'Up',
      Down = 'Down',
      Left = 'Left',
      Right = 'Right',
    };
    
    /** typeof */
    var cc: typeof position;
    
    /** 接口 interface */
    // 描述一个对象类型
    // 当然也可以使用 type 关键字声明
    interface Person {
      name: string,
      age: number,
      birth?: Date,
      sayHi: string | string[] | (() => string),
    }
    var csy: Person = {
      name: 'CSY',
      age: 20,
      birth: new Date(),
      sayHi: (): string => 'Hi',
    }
    const ccc: {
      name: string,
      sex?: boolean,
    } = {
      name: 'ccc',
    };
    // 接口的继承
    interface Human extends Person {
      father: Person,
      mother: Person
    }
    
    /** 类型推论 */
    // 自动推断变量类型
    //  1. 声明变量并初始化
    //  2. 决定函数返回值
    let c = 20;
    function f(a: number, b:number) {
      return a + b;
    }
    /** 类型断言 */
    // （可类型推论变量类型）自行指定变量的类型
    const alink1 = document.getElementById('link') as HTMLAnchorElement;
    const alink2 = <HTMLAnchorElement>document.getElementById('link');
    
    /**
     * 类 对象
     * - 构造函数
     * - 实例属性及实例方法
     * - 访问控制修饰符 public protected private
     * - 继承 extends 类 | implements 接口
     * - 只读 readonly (仅适用方法)
     */
    abstract class Animal {}
    class Human extends Animal implements Person {
      public a: string;
      protected b: number;
      private c: boolean;
    
      name = 'CSY';
      age = 40;
      birth = new Date();
      sayHi = () => 'Hi';
    
      readonly d: String;
    
      constructor (v: boolean) {
        super();
        this.c = v;
      };
    
      static isHuman = (o: any) => typeof o === 'object' && o instanceof Human;
    
      get e () {
        return this.a + this.a
      }
      set e (s) {
        this.a = s.toLowerCase();
      }
    }
    const son: Human = new Human(true);
    
    /**
     * 类型兼容  不同名称相同结构的类型是等价的
     *
     * - 类 | 若A类型内容包含B类型内容（非严格包含），则A类型变量可赋值给B类型变量
     * - 接口 | 若A类型内容包含B类型内容（非严格包含），则A类型变量可赋值给B类型变量
     *   类与接口亦可相互兼容
     * - 函数 | 若B函数参数表包含A函数参数表（非严格包含），则A类型函数可赋值给B类型函数；相同位置参数需相同或兼容（对象多数服从少数）；返回值需相同或兼容（对象少数服从多数）
     */
    
    /**
     * 交叉类型（类似接口继承）
     * 将多个类型组合为同一个类型
     * 重复的属性会合并为联合类型，相当于重载
     */
    interface Co1 {
      a: number,
    }
    interface Co2 {
      b: string,
    }
    type Co = Co1 & Co2;
    const co0: Co = {
      a: 12,
      b: '',
    };
    
    /** 泛型 */
    // 泛型方法
    function print <T> (v: T): void {
      console.log(v);
    }
    // T 相当于类型变量
    // 具体类型需用户使用时指定
    print<number>(10)
    print<string | boolean>('')
    // 某些情况下可自动类型推定
    print(1)
    // 类型约束 结合interface使用 extends
    function print0 <T extends Array<string> | string[]> (v: T): void {
      console.log(v);
    }
    function print1 <T, K extends keyof T> (v: T, k: K): void {
      console.log(v[k]);
    }
    // keyof 关键字接受对象类型并生成键名称（字符串和数字）的联合类型
    
    // 泛型接口
    interface PrintInterface <T> {
      do: (v: T) => void
    }
    
    // 泛型类
    class PrintClass <T> {
      value: T;
    }
    
    // 泛型工具类
    // Partial<T> 创建一个类型且T中所有属性均可选
    type partial = Partial<Person>
    // Readonly<T> 创建一个类型且T中所有属性均只读
    type readonly = Readonly<Person>
    // Pick<T, K extends keyof T> 创建一个类型并从给定类型中选出一组属性
    type pick = Pick<Person, 'name' | 'age'>
    // Record<K extends keyof any, T> 构造一个对象类型，属性键为keys，属性类型为Type
    type record = Record<'a' | 'b', string>
    
    // 索引签名类型
    interface Obj {
      [K: string]: number,
    }
    // [K: string] 表示任意string类型属性名称均可作为对象出现，且属性值为number类型变量
    
    // 映射类型 in 关键字和 keyof 关键字
    type p = {
      [K in 'x' | 'y' | 'z']: number
    }
    type q = {
      [K in keyof Person]: string
    }
    
    // 索引查询类型
    type props = { a: number };
    type typeA = props['a'];
    
    /** 命名空间（可嵌套） */
    namespace n {
      export interface Person {};
    
      namespace nn {}
    }
    var d: n.Person = {};
    
    // 单独引用ts文件
    /// <reference path="SomeFileName.ts" />
    
    /** 模块 */
    
    /** 声明 */
    declare var jQuery: (selector: string) => any;

```
