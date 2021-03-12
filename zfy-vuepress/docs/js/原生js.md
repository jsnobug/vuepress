# 原生JS

转：掘金神三元博文

https://juejin.cn/post/6844903974378668039

https://juejin.cn/post/6844903986479251464

https://juejin.cn/post/6844904004007247880

## 一、JS数据类型-概念

### 1. 7种原始类型

- Boolean
- String
- Number
- null
- undefined
- Symbol
- Bigint

引用类型：对象Object(普通对象-Object, 数组对象-Array, 函数对象-Function, 正则对象-RegExp, 日期对象-Data, 数学对象-Math)

### 2. 说出下面运行的结果，解释原因。

```js
function test(person) {
  person.age = 26
  person = {
    name: 'hzj',
    age: 18
  }
  return person
}
const p1 = {
  name: 'fyq',
  age: 19
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```

```js
p1: {name: 'fyq', age: 26}
p2: {name: 'hzj', age: 18}
```

::: tip

原因: 在函数传参的时候传递的是对象在堆中的内存地址值，test函数中的实参person是p1对象的内存地址，通过调用person.age = 26确实改变了p1的值，但随后person变成了另一块内存空间的地址，并且在最后将这另外一份内存空间的地址返回，赋给了p2。

:::

### 3.null是对象吗？为什么？

结论: null不是对象。

解释: 虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。

### 4.'1'.toString()为什么可以调用？

其实语句运行过程种做了几件事

```js
// 第一步: 创建Object类实例。注意为什么不是String ？ 由于Symbol和BigInt的出现，对它们调用new都会报错，目前ES6规范也不建议用new来创建基本类型的包装类。
var obj = new Object('1')
// 第二步: 调用实例方法。
obj.toString()
// 第三步: 执行完方法立即销毁这个实例。
obj = null
```

整个过程体现了`基本包装类型`的性质，而基本包装类型恰恰属于基本数据类型，包括Boolean, Number和String。

### 5.0.1+0.2为什么不等于0.3？

0.1和0.2在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成0.30000000000000004。

### 6.如何理解BigInt?

BigInt是一种新的数据类型，用于当整数值大于Number数据类型支持的范围时。这种数据类型允许我们安全地对`大整数`执行算术操作，表示高分辨率的时间戳，使用大整数id，等等，而不需要使用库。

#### 为什么需要BigInt?

在JS中，所有的数字都以双精度64位浮点格式表示，那这会带来什么问题呢？

这导致JS中的Number无法精确表示非常大的整数，它会将非常大的整数四舍五入，确切地说，JS中的Number类型只能安全地表示-9007199254740991(-(2^53-1))和9007199254740991（(2^53-1)），任何超出此范围的整数值都可能失去精度。

```js
console.log(999999999999999);  //=>10000000000000000
```

同时也会有一定的安全性问题:

```js
9007199254740992 === 9007199254740993;    // → true 居然是true!
```

#### 如何创建并使用BigInt？

```js
console.log( 9007199254740995n );    // → 9007199254740995n	
BigInt("9007199254740995");    // → 9007199254740995n
```

#### 使用

```js
10n + 20n;    // → 30n	
10n - 20n;    // → -10n	
+10n;         // → TypeError: Cannot convert a BigInt value to a number	
-10n;         // → -10n	
10n * 20n;    // → 200n	
20n / 10n;    // → 2n	
23n % 10n;    // → 3n	
10n ** 3n;    // → 1000n	

let x = 10n;	
++x;          // → 11n	
let y = 10n;	
--y;          // → 9n
console.log(typeof x);   //"bigint"
console.log(typeof y);   //"bigint"
document.getElementById('div').insertAdjacentText('beforeend', a+'')  // 显示11
```

#### 注意

1. BigInt不支持一元加号运算符, 这可能是某些程序可能依赖于 + 始终生成 Number 的不变量，或者抛出异常。另外，更改 + 的行为也会破坏 asm.js代码。
2. 因为隐式类型转换可能丢失信息，所以不允许在bigint和 Number 之间进行混合操作。当混合使用大整数和浮点数时，结果值可能无法由BigInt或Number精确表示。

```js
10 + 10n;    // → TypeError
```

 3. 不能将BigInt传递给Web api和内置的 JS 函数，这些函数需要一个 Number 类型的数字。尝试这样做会报TypeError错误。

 4. 当 Boolean 类型与 BigInt 类型相遇时，BigInt的处理方式与Number类似，换句话说，只要不是0n，BigInt就被视为truthy的值。

    ```js
    if(0n){//条件判断为false}
    if(3n){//条件为true}
    ```

 5. 元素都为BigInt的数组可以进行sort。

 6. BigInt可以正常地进行位运算，如|、&、<<、>>和^

## 二、JS数据类型-检测

### 1. typeof 是否能正确判断类型？

对于原始类型来说，除了 null 都可以调用typeof显示正确的类型。

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof Bigint() // 'bigint'
typeof null // 'object'
```

引用类型，除了函数，都显示object

```js
typeof [] // object
typeof {} // object
typeof console.log // 'function'
```

因此采用typeof判断对象数据类型是不合适的，采用instanceof会更好，instanceof的原理是基于原型链的查询，只要处于原型链中，判断永远为true

```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str1 = 'hello world'
str1 instanceof String // false

var str2 = new String('hello world')
str2 instanceof String // true
```

### 2. instanceof能否判断基本数据类型？

能

```js
class PrimitiveNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === 'number'
  }
}
console.log(111 instanceof PrimitiveNumber) // true
```

其实就是自定义instanceof行为的一种方式，这里将原有的instanceof方法重定义，换成了typeof，因此能够判断基本数据类型。

### 3. 能不能手动实现一下instanceof的功能？

核心：原型链上向上查找

```js
function myInstanceof(left, right) {
    //基本数据类型直接返回false
    if(typeof left !== 'object' || left === null) return false;
    //getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {
        //查找到尽头，还没找到
        if(proto == null) return false;
        //找到相同的原型对象
        if(proto == right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
```

```js
console.log(myInstanceof("111", String)); //false
console.log(myInstanceof(new String("111"), String));//true
```

### 4.toSting如何检测

原理：在Object.prototype上有一个toString方法,这个方法执行的时候,会返回方法中this关键字对应数据值的数据类型。返回： "[object 当前数据类型所属的内置类]"

```js
Object.prototype.toString.call(12) ->检测12的数据类型 ->"[object Number]"
Object.prototype.toString.call("zhufeng") ->"[object String]"
Object.prototype.toString.call(null) ->"[object Null]"
Object.prototype.toString.call(undefined) ->"[object Undefined]"
Object.prototype.toString.call([]) ->"[object Array]"
Object.prototype.toString.call(/^$/) ->"[object RegExp]"
Object.prototype.toString.call(function(){}) ->"[object Function]"
```

### 5. Object.is和===的区别？

Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0，NaN和NaN。 源码如下：

```js
function is(x, y) {
    if (x === y) {
        //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
        //两个都是NaN的时候返回true
        return x !== x && y !== y;
    }
```

## 三、JS数据类型-转换

### 1. [] == ![]结果是什么？为什么？

解析:

== 中，左右两边都需要转换为数字然后进行比较。

[]转换为数字为0。

![] 首先是转换为布尔值，由于[]作为一个引用类型转换为布尔值为true,

因此![]为false，进而在转换成数字，变为0。

0 == 0 ， 结果为true

### 2. JS中类型转换有哪几种？

JS中，类型转换只有三种：

- 转换成数字
- 转换成布尔值
- 转换成字符串

![img](https://user-gold-cdn.xitu.io/2019/10/20/16de9512eaf1158a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 3. == 和 ===有什么区别？

===叫做严格相等，是指：左右两边不仅值要相等，类型也要相等，例如'1'===1的结果是false，因为一边是string，另一边是number。

==不像===那样严格，对于一般情况，只要值相等，就返回true，但==还涉及一些类型转换，它的转换规则如下：

- 两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false
- 判断的是否是null和undefined，是的话就返回true
- 判断的类型是否是String和Number，是的话，把String类型转换成Number，再进行比较
- 判断其中一方是否是Boolean，是的话就把Boolean转换成Number，再进行比较
- 如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较

### 4. 对象转原始类型是根据什么流程运行的？

对象转原始类型，会调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：

1. 如果Symbol.toPrimitive()方法，优先调用再返回
2. 调用valueOf()，如果转换为原始类型，则返回
3. 调用toString()，如果转换为原始类型，则返回
4. 如果都没有返回原始类型，会报错

```js
var obj = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5'
  },
  [Symbol.toPrimitive]() {
    return 6
  }
}
console.log(obj + 1); // 输出7
```

### 5. 如何让if(a == 1 && a == 2)条件成立？

```js
var a = {
  value: 0,
  valueOf: function() {
    this.value++;
    return this.value;
  }
};
console.log(a == 1 && a == 2);//true
```

## 四、闭包

### 什么是闭包？

```js
// 红宝书(p178)上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数。

// MDN 对闭包的定义为：闭包是指那些能够访问自由变量的函数。
// （其中自由变量，指在函数中使用的，但既不是函数参数arguments也不是函数的局部变量的变量，其实就是另外一个函数作用域中的变量。）
```

### 闭包产生的原因?

首先要明白作用域链的概念，其实很简单，在ES5中只存在两种作用域————全局作用域和函数作用域，`当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链`，值得注意的是，每一个子函数都会拷贝上级的作用域，形成一个作用域的链条。 比如:

```js
var a = 1;
function f1() {
  var a = 2
  function f2() {
    var a = 3;
    console.log(a);//3
  }
}
```