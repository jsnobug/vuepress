# 原生JS

转：掘金神三元博文

https://juejin.cn/post/6844903974378668039

https://juejin.cn/post/6844903986479251464

https://juejin.cn/post/6844904004007247880

https://chenshaotang.com/     陈少棠博客

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

### 7.JS对象属性中get/set与getter/setter

#### 属性

属性是存储在特定命名位置的值，是对象的内容，属性并不直接存储在对象容器内部。属性有两种类型:数据属性和访问器属性。属性具备了属性描述符，用来描述属性拥有的特性。

#### 属性描述符

属性描述符用来描述属性特性的(只有在内部才能用的特性),配置属性是否可读，是否可写，是否可枚举，值是多少，读写。

Object.definePrOperty(obj,'a',{value:2,writable:true,configurable:true})第三个参数就是属性描述符对象 ，首先它是个对象，它有自己的属性，其次它是属性a的属性描述符，用来配置属性。

定义这些特性为了实现JavaScript引擎用的，因此再JavaScript中不能直接访问它们。为了表示特征是内部值，ES规范把它们放在了两对方括号中，例如[[Enumerable]]。

**访问器属性不能直接定义，必须使用Object.defineProperty()来定义。**

#### 数据属性

数据属性包含一个数据值的位置。在这个位置可以读取和写入值。共有四个描述其行为的特征:

- [[Configurable]]：配置，表示能否删除修改属性的特性，或者把属性修改为访问器属性。默认true
- [[Enumerable]]：枚举，表示能否通过for-in循环返回属性。默认true
- [[Writable]]：可写，表示能否修改属性值。默认true
- [[Value]]：属性的数据值。读写属性值从该位置。默认undefined

#### 访问器属性

访问器属性不包含数据值；它们包含一对getter和setter函数。共有四个描述其行为的特征:

- [[Configurable]]：配置，表示能否删除修改属性的特性，或者把属性修改为访问器属性。默认true
- [[Enumerable]]：枚举，表示能否通过for-in循环返回属性。默认true
- [[Get]]：在读取属性值时调用的函数。默认undefined
- [[Set]]：在写入属性值时调用的函数。默认undefined

**当个一个属性定义getter、setter或者两者都有时，这个属性就成了访问器属性**

#### [[Get]]/[[Put]]是什么

首先要明确一点，[[Get]]和[[Put]]是对象默认的内置操作，可以理解为算法函数。它是在访问属性时的操作，例如通过obj.a访问a属性时就是实现了[[Get]]操作，它会先找到相同的属性名，找到才要返回属性值。

没有找到就会按照[[Get]]算法的设计，沿着原型链找，找不到会返回undefined。

[[Put]]被触发时，取决于许多因素，最重要的有对象中是否已经存在这个属性。如果已经存在，算法大致会检查下面这些内容：

1. 属性是否是访问描述符？如果是并且存在setter就调用setter
2. 属性的数据描述符中writable是否是false？如果是，在非严格模式下静默失败，在严格模式下抛出TypeError异常。
3. 如果都不是，将该值设置为属性的值。

#### get/set和getter/setter

[[Get]]和[[Set]]：当属性拥有这两个特性时，属性就是访问器属性。代表着在访问属性或者写入属性值时，对返回值做附加的操作。而这个操作就是**getter/setter函数**。

它们只能应用到单个属性上，无法应用在整个对象上。getter/setter是隐藏函数，是访问器属性默认拥有的隐藏函数。在读取访问器属性时调用getter，返回有效的值；在写入访问器属性时调用setter函数并传入新值。

不管是对象文字语法中的get a(){...}，还是的defineProperty(..)中的显式定义，二者都会在对象中创造一个不包含值得属性，对于这个属性的访问会自动调用一个隐藏函数，它的返回值会被当做属性访问的返回值：

**设置getter会覆盖默认的[[Get]]操作，setter会覆盖默认得[[Put]],也被称为赋值操作**

#### 总结

属性是拥有自己的特性的，**主要用来描述属性是否可以进行修改枚举配置的**。我们访问对象的属性时就是**[[Get]]操作**，写入就是**[[Put]]操作**，根据算法找到对应的属性。如果要对属性值进行附加操作时，就需要**设置get/set特性**，此时属性也就会**变成访问器属性**，然后调用默认的**隐藏的getter/setter函数**对属性进行操作。然后返回属性值。这就是整个流程，vue框架中双向绑定就是用到了这些概念来完成数据监听的，对象属性可以说是js中一个很核心的概念了。

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

闭包访问的变量是存在堆内存中。

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

在这段代码中，f1的作用域指向有全局作用域(window)和它本身，而f2的作用域指向全局作用域(window)、f1和它本身。而且作用域是从最底层向上找，直到找到全局作用域window为止，如果全局还没有的话就会报错。就这么简单一件事情！

闭包产生的本质就是，当前环境中存在指向父级作用域的引用。还是举上面的例子:

```js
function f1() {
  var a = 2
  function f2() {
    console.log(a);//2
  }
  return f2;
}
var x = f1();
x();
```

这里x会拿到父级作用域中的变量，输出2。因为在当前环境中，含有对f2的引用，f2恰恰引用了window、f1和f2的作用域。因此f2可以访问到f1的作用域的变量。

那是不是只有返回函数才算是产生了闭包呢？、

回到闭包的本质，我们只需要让父级作用域的引用存在即可，因此我们还可以这么做：

```js
var a = 3
var f3;
function f1() {
  var a = 2
  f3 = function() {
    console.log(a);
  }
}
f1();
f3();
```

让f1执行，给f3赋值后，等于说现在`f3拥有了window、f1和f3本身这几个作用域的访问权限`，还是自底向上查找，`最近是在f1`中找到了a,因此输出2。

在这里是外面的变量`f3存在着父级作用域的引用`，因此产生了闭包，形式变了，本质没有改变。

### 闭包有哪些表现形式?

明白了本质之后，我们就来看看，在真实的场景中，究竟在哪些地方能体现闭包的存在？

1. 返回一个函数。刚刚已经举例。

2. 作为函数参数传递

   ```js
   var a = 1;
   function foo(){
     var a = 2;
     function baz(){
       console.log(a);
     }
     bar(baz);
   }
   function bar(fn){
     // 这就是闭包
     fn();
   }
   // 输出2，而不是1
   foo();
   ```

3. 在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。

   以下的闭包保存的仅仅是window和当前作用域。

   ```js
   // 定时器
   setTimeout(function timeHandler(){
     console.log('111');
   }，100)
   
   // 事件监听
   $('#app').click(function(){
     console.log('DOM Listener');
   })
   ```

4. IIFE(立即执行函数表达式)创建闭包, 保存了`全局作用域window`和`当前函数的作用域`，因此可以全局的变量。

```js
var a = 2;
(function IIFE(){
  // 输出2
  console.log(a);
})();
```

### 如何解决下面的循环输出问题？

```js
for(var i = 1; i <= 5; i ++){
  setTimeout(function timer(){
    console.log(i)
  }, 0)
}
```

为什么会全部输出6？如何改进，让它输出1，2，3，4，5？(方法越多越好)

因为setTimeout为宏任务，由于JS中单线程eventLoop机制，在主线程同步任务执行完后才去执行宏任务，因此循环结束后setTimeout中的回调才依次执行，但输出i的时候当前作用域没有，往上一级再找，发现了i,此时循环已经结束，i变成了6。因此会全部输出6。

解决方法：

1、利用IIFE(立即执行函数表达式)当每次for循环时，把此时的i变量传递到定时器中

```js
for(var i = 1;i <= 5;i++){
    (function(j){
        setTimeout(function timer(){
            console.log(j)
        }, 0)
    })(i)
}
```

2、给定时器传入第三个参数, 作为timer函数的第一个函数参数

```js
for(var i=1;i<=5;i++){
  setTimeout(function timer(j){
    console.log(j)
  }, 0, i)
}
```

3、使用ES6中的let

```js
for(let i = 1; i <= 5; i++){
  setTimeout(function timer(){
    console.log(i)
  },0)
}
```

let使JS发生革命性的变化，让JS有函数作用域变为了块级作用域，用let后作用域链不复存在。代码的作用域以块级为单位，以上面代码为例:

```js
// i = 1
{
  setTimeout(function timer(){
    console.log(1)
  },0)
}
// i = 2
{
  setTimeout(function timer(){
    console.log(2)
  },0)
}
// i = 3
...
```

### 上下文环境、作用域、作用域链

1. **作用域是在代码写下来就产生了，执行环境在代码执行时才被创建，作用域链是在执行环境里才被创建**。
2. 执行环境在代码执行完了之后被清除。
3. 函数执行环境主要经历了几个阶段：
   1. 在创建函数时，会创建相应的执行环境
   2. 创建变量对象/活动对象
   3. 创建作用域链、赋值this
   4. 函数被调用，执行环境会把压入栈中
   5. 代码在执行环境在被执行
   6. 执行环境从执行环境栈出栈，被回收

## 五、原型链

### 1.原型对象和构造函数有何关系？

在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个prototype属性，这个属性指向函数的原型对象。

当函数经过new调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个__proto__属性，指向构造函数的原型对象。

![img](https://user-gold-cdn.xitu.io/2019/10/20/16de955a81892535?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 2.能不能描述一下原型链？

JavaScript对象通过__proto__ 指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条, 即原型链。

![img](https://user-gold-cdn.xitu.io/2019/10/20/16de955ca89f6091?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 对象的 hasOwnProperty() 来检查对象自身中是否含有该属性
- 使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true

```js
  console.log(object1.hasOwnProperty('toString')); // false
  console.log('toString' in object1); // true
```

- Object.setPrototypeOf(obj, null或{}) 设置实列对象的对象原型
- Object.getPrototypeOf(obj)  获取实列对象的对象原型

```js
let obj = {}
Object.getPrototypeOf(obj)  === obj.__proto__ // true
```

### 3.总结

![prototype](/imgs/prototype.png)

__proto__是每个对象都有的一个属性，而prototype是函数才会有的属性!!! 
使用Object.getPrototypeOf()代替__proto__!!!

一切对象都最终继承自Object对象，Object对象直接继承自根源对象null（Function.prototype是 Object的实例对象 ）
一切函数对象（包括Object对象)都直接继承自Function对象：（首先 Object和 Function都是构造函数，而所有的构造函数的都是 Function的实例对象. 因此 Object是 Function的实例对象 ）

## 六、JS的this指向

其实JS中的this是一个非常简单的东西，只需要理解它的执行规则就OK。

在这里不想像其他博客一样展示太多的代码例子弄得天花乱坠， 反而不易理解。

call/apply/bind可以显式绑定, 这里就不说了。

主要这些场隐式绑定的场景讨论:

1. 全局上下文
2. 直接调用函数
3. 对象.方法的形式调用
4. DOM事件绑定(特殊)
5. new构造函数绑定
6. 箭头函数

### 1. 全局上下文

全局上下文默认this指向window, 严格模式下指向undefined。

### 2. 直接调用函数

```js
let obj = {
  a: function() {
    console.log(this);
  }
}
let func = obj.a;
func();
```

这种情况是直接调用。this相当于全局上下文的情况。

### 3. 对象.方法的形式调用

```js
obj.a();
```

这就是`对象.方法`的情况，this指向这个对象

### 4. DOM事件绑定

onclick和addEventerListener中 this 默认指向绑定事件的元素。

IE比较奇异，使用attachEvent，里面的this默认指向window。

### 5. new+构造函数

此时构造函数中的this指向实例对象。

### 6. 箭头函数？

箭头函数没有this, 因此也不能绑定。里面的this会指向当前最近的非箭头函数的this，找不到就是window(严格模式是undefined)。比如:

```js
let obj = {
  a: function() {
    let do = () => {
      console.log(this);
    }
    do();
  }
}
obj.a(); // 找到最近的非箭头函数a，a现在绑定着obj, 因此箭头函数中的this是obj
```

**优先级: new > call、apply、bind > 对象.方法 > 直接调用。**

## 七、JS如何实现继承

### 第一种: 借助call

```js
  function Parent1(){
    this.name = 'parent1';
  }
  function Child1(){
    Parent1.call(this);
    this.type = 'child1'
  }
  console.log(new Child1);
```

这样写的时候子类虽然能够拿到父类的属性值，但是问题是父类原型对象中一旦存在方法那么子类无法继承。那么引出下面的方法。

### 第二种: 借助原型链

```js
function Parent2() {
    this.name = 'parent2';
    this.play = [1, 2, 3]
}
function Child2() {
    this.type = 'child2';
}
Child2.prototype = new Parent2();

console.log(new Child2());
```

看似没有问题，父类的方法和属性都能够访问，但实际上有一个潜在的不足。举个例子：

```js
var s1 = new Child2();
var s2 = new Child2();
s1.play.push(4);
console.log(s1.play, s2.play);
```

明明我只改变了s1的play属性，为什么s2也跟着变了呢？很简单，因为两个实例使用的是同一个原型对象。

### 第三种：将前两种组合

```js
  function Parent3 () {
    this.name = 'parent3';
    this.play = [1, 2, 3];
  }
  function Child3() {
    Parent3.call(this);
    this.type = 'child3';
  }
  Child3.prototype = new Parent3();
  var s3 = new Child3();
  var s4 = new Child3();
  s3.play.push(4);
  console.log(s3.play, s4.play);
```

之前的问题都得以解决。但是这里又徒增了一个新问题，那就是Parent3的构造函数会多执行了一次（Child3.prototype = new Parent3();）。这是我们不愿看到的。那么如何解决这个问题？

### 第四种: 组合继承的优化1

```js
  function Parent4 () {
    this.name = 'parent4';
    this.play = [1, 2, 3];
  }
  function Child4() {
    Parent4.call(this);
    this.type = 'child4';
  }
  Child4.prototype = Parent4.prototype;
```

子类实例的构造函数是Parent4，显然这是不对的，应该是Child4。

### 第五种(最推荐使用): 组合继承的优化1

```js
  function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
  }
  function Child5() {
    Parent5.call(this);
    this.type = 'child5';
  }
  Child5.prototype = Object.create(Parent5.prototype); // 提供新对象的__proto__
  Child5.prototype.constructor = Child5;
```

这是最推荐的一种方式，接近完美的继承，它的名字也叫做寄生组合继承。

### ES6的extends被编译后的JavaScript代码

ES6的代码最后都是要在浏览器上能够跑起来的，这中间就利用了babel这个编译工具，将ES6的代码编译成ES5让一些不支持新语法的浏览器也能运行。

```js
function _possibleConstructorReturn(self, call) {
    // ...
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
    // ...
    //看到没有
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}


var Parent = function Parent() {
    // 验证是否是 Parent 构造出来的 this
    _classCallCheck(this, Parent);
};

var Child = (function (_Parent) {
    _inherits(Child, _Parent);

    function Child() {
        _classCallCheck(this, Child);

        return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
    }

    return Child;
}(Parent));
```

核心是_inherits函数，可以看到它采用的依然也是第五种方式————寄生组合继承方式，同时证明了这种方式的成功。不过这里加了一个Object.setPrototypeOf(subClass, superClass)，这是用来干啥的呢？

答案是用来继承父类的静态方法。这也是原来的继承方式疏忽掉的地方。

```js
追问: 面向对象的设计一定是好的设计吗？
```

不一定。从继承的角度说，这一设计是存在巨大隐患的。

### 从设计思想上谈谈继承本身的问题

假如现在有不同品牌的车，每辆车都有drive、music、addOil这三个方法。

```js
class Car{
  constructor(id) {
    this.id = id;
  }
  drive(){
    console.log("wuwuwu!");
  }
  music(){
    console.log("lalala!")
  }
  addOil(){
    console.log("哦哟！")
  }
}
class otherCar extends Car{}
```

现在可以实现车的功能，并且以此去扩展不同的车。

但是问题来了，新能源汽车也是车，但是它并不需要addOil(加油)。

如果让新能源汽车的类继承Car的话，也是有问题的，俗称"大猩猩和香蕉"的问题。大猩猩手里有香蕉，但是我现在明明只需要香蕉，却拿到了一只大猩猩。也就是说加油这个方法，我现在是不需要的，但是由于继承的原因，也给到子类了。

```js
继承的最大问题在于：无法决定继承哪些属性，所有属性都得继承。
```

当然你可能会说，可以再创建一个父类啊，把加油的方法给去掉，但是这也是有问题的，一方面父类是无法描述所有子类的细节情况的，为了不同的子类特性去增加不同的父类，`代码势必会大量重复`，另一方面一旦子类有所变动，父类也要进行相应的更新，`代码的耦合性太高`，维护性不好。

那如何来解决继承的诸多问题呢？

用组合，这也是当今编程语法发展的趋势，比如golang完全采用的是面向组合的设计方式。

顾名思义，面向组合就是先设计一系列零件，然后将这些零件进行拼装，来形成不同的实例或者类。

```js
function drive(){
  console.log("wuwuwu!");
}
function music(){
  console.log("lalala!")
}
function addOil(){
  console.log("哦哟！")
}

let car = compose(drive, music, addOil);
let newEnergyCar = compose(drive, music);
```

代码干净，复用性也很好。这就是面向组合的设计方式。

## 八、函数的arguments为什么不是数组？如何转化成数组？

因为arguments本身并不能调用数组方法，它是一个另外一种对象类型，只不过属性从0开始排，依次为0，1，2...最后还有callee和length属性。我们也把这样的对象称为类数组。

常见的类数组还有：

- 1. 用getElementsByTagName/ClassName()获得的HTMLCollection
- 1. 用querySelector获得的nodeList

那这导致很多数组的方法就不能用了，必要时需要我们将它们转换成数组，有哪些方法呢？

### 1. Array.prototype.slice.call()

```js
function sum(a, b) {
  let args = Array.prototype.slice.call(arguments);
  console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
}
sum(1, 2);//3
```

### 2. Array.from()

```js
function sum(a, b) {
  let args = Array.from(arguments);
  console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
}
sum(1, 2);//3
```

这种方法也可以用来转换Set和Map哦！

### 3. ES6展开运算符

```js
function sum(a, b) {
  let args = [...arguments];
  console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
}
sum(1, 2);//3
```

### 4. 利用concat+apply

```js
function sum(a, b) {
  let args = Array.prototype.concat.apply([], arguments);//apply方法会把第二个参数展开
  console.log(args.reduce((sum, cur) => sum + cur));//args可以调用数组原生的方法啦
}
sum(1, 2);//3
```

当然，最原始的方法就是再创建一个数组，用for循环把类数组的每个属性值放在里面，过于简单，就不浪费篇幅了。

## 九、forEach中return有效果吗？如何中断forEach循环？

在forEach中用return不会返回，函数会继续执行。

```js
let nums = [1, 2, 3];
nums.forEach((item, index) => {
  return;//无效
})
```

中断方法：

1. 使用try监视代码块，在需要中断的地方抛出异常。
2. 官方推荐方法（替换方法）：用every和some替代forEach函数。every在碰到return false的时候，中止循环。some在碰到return true的时候，中止循环

## 十、JS判断数组中是否包含某个值

### 方法一：array.indexOf

```js
// 此方法判断数组中是否存在某个值，如果存在，则返回数组元素的下标，否则返回-1。
var arr=[1,2,3,4];
var index=arr.indexOf(3);
console.log(index);
```

### 方法二：array.includes(searcElement[,fromIndex])

```js
// 此方法判断数组中是否存在某个值，如果存在返回true，否则返回false
var arr=[1,2,3,4];
if(arr.includes(3)) {
    console.log("存在");
}  else {
    console.log("不存在");
} 
```

### 方法三：array.find(callback[,thisArg])

```js
// 返回数组中满足条件的第一个元素的值，如果没有，返回undefined
var arr=[1,2,3,4];
var result = arr.find(item =>{
    return item > 3
});
console.log(result);
```

### 方法四：array.findeIndex(callback[,thisArg])

```js
// 返回数组中满足条件的第一个元素的下标，如果没有找到，返回-1]
var arr=[1,2,3,4];
var result = arr.findIndex(item =>{
    return item > 3
});
console.log(result);
```

当然，for循环当然是没有问题的，这里讨论的是数组方法，就不再展开了。

## 十一、JS中flat--数组扁平化

对于前端项目开发过程中，偶尔会出现层叠数据结构的数组，我们需要将多层级数组转化为一级数组（即提取嵌套数组元素最终合并为一个数组），使其内容合并且展开。那么该如何去实现呢？

需求:多维数组=>一维数组

```js
let ary = [1, [2, [3, [4, 5]]], 6];// -> [1, 2, 3, 4, 5, 6]
let str = JSON.stringify(ary);
```

### 1. 调用ES6中的flat方法

```js
// var newArray = arr.flat([depth])
ary = ary.flat(Infinity);
```

### 2. replace + split

```js
ary = str.replace(/(\[|\])/g, '').split(',')
```

### 3. replace + JSON.parse

```js
str = str.replace(/(\[|\])/g, '');
str = '[' + str + ']';
ary = JSON.parse(str);
```

### 4. 普通递归

```js
let result = [];
let fn = function(ary) {
  for(let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (Array.isArray(ary[i])){
      fn(item);
    } else {
      result.push(item);
    }
  }
}
```

### 5. 利用reduce函数迭代

```js
function flatten(ary) {
    return ary.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}
let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(ary))
```

### 6：扩展运算符

```js
//只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}
```

## 十二、JS数组的高阶函数--基础

### 1.什么是高阶函数

`一个函数`就可以接收另一个函数作为参数或者返回值为一个函数，`这种函数`就称之为高阶函数。

### 2.数组中的高阶函数

#### 1. map

- 参数:接受两个参数，一个是回调函数，一个是回调函数的this值(可选)。

其中，回调函数被默认传入三个值，依次为当前元素、当前索引、整个数组。

- 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
- 对原来的数组没有影响

```js
let nums = [1, 2, 3];
let obj = {val: 5};
let newNums = nums.map(function(item,index,array) {
  return item + index + array[index] + this.val; 
  //对第一个元素，1 + 0 + 1 + 5 = 7
  //对第二个元素，2 + 1 + 2 + 5 = 10
  //对第三个元素，3 + 2 + 3 + 5 = 13
}, obj);
console.log(newNums);//[7, 10, 13]
```

#### 2. reduce

- 参数: 接收两个参数，一个为回调函数，另一个为初始值。回调函数中四个默认参数，依次为积累值、当前值、当前索引和整个数组。

```js
let nums = [1, 2, 3];
// 多个数的加和
let newNums = nums.reduce(function(preSum,curVal,currentIndex,array) {
  return preSum + curVal; 
}, 0);
console.log(newNums);//6
```

不传默认值会自动以第一个元素为初始值，然后从第二个元素开始依次累计。

#### 3. filter

参数: 一个函数参数。这个函数接受一个默认参数，就是当前元素。这个作为参数的函数返回值为一个布尔类型，决定元素是否保留。

filter方法返回值为一个新的数组，这个数组里面包含参数里面所有被保留的项。

```js
let nums = [1, 2, 3];
// 保留奇数项
let oddNums = nums.filter(item => item % 2);
console.log(oddNums);
```

#### 4. sort

参数: 一个用于比较的函数，它有两个默认参数，分别是代表比较的两个元素。

举个例子:

```js
let nums = [2, 3, 1];
//两个比较的元素分别为a, b
nums.sort(function(a, b) {
  if(a > b) return 1;
  else if(a < b) return -1;
  else if(a == b) return 0;
})
```

当比较函数返回值大于0，则 a 在 b 的后面，即a的下标应该比b大。

反之，则 a 在 b 的后面，即 a 的下标比 b 小。

整个过程就完成了一次升序的排列。

当然还有一个需要注意的情况，就是比较函数不传的时候，是如何进行排序的？

答案是将数字转换为字符串，然后根据字母unicode值进行升序排序，也就是根据字符串的比较规则进行升序排序。









一、寄生式组合继承

```js
    // 寄生式组合继承
    function Father (name) {
      this.name = name
      this.text = [1, 2, 3]
    }
    Father.prototype.sayHi = function () {
      console.log(this.name)
    }
    function Son (name, age) {
      Father.call(this, name)
      this.age = age
    }
    // Son.prototype = new Father()
    Son.prototype = Object.create(Father.prototype)
    Son.prototype.constructor = Son
    Son.prototype.sayAge = function () {
      console.log(this.age)
    }
    let son = new Son('text', 1)
```

二、new关键字的作用

(1) 在内存中创建一个新对象。

(2) 这个新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性。

(3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。

(4) 执行构造函数内部的代码（给新对象添加属性）。

(5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

```js
class Person { 
 constructor(override) { 
 this.foo = 'foo'; 
 if (override) { 
 return { 
 bar: 'bar' 
 }; 
 } 
 } 
} 
let p1 = new Person(), 
 p2 = new Person(true); 
console.log(p1); // Person{ foo: 'foo' } 否则返回刚创建的新对象
console.log(p1 instanceof Person); // true 
console.log(p2); // { bar: 'bar' }  如果构造函数返回非空对象，就返回该对象
console.log(p2 instanceof Person); // false 
```

