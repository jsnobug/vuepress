# ES6及以上特性

ECMA(European Computer Manufacturers Association)中文名称为欧洲计算机制造商协会，这个组织的目标是评估、开发和认可电信和计算机标准。1994 年后该组织改名为 Ecma 国际;

ECMAScript 是由 Ecma 国际通过 ECMA-262 标准化的脚本程序设计语言;

| **版本** | **时间** | **概述**                                                     |
| ---------- | -------- | ------------------------------------------------------------ |
| 第1版      | 1997年   | 制定了语言的基本语法                                         |
| 第2版      | 1998年   | 较小改动                                                     |
| 第3版      | 1999年   | 引入正则、异常处理、格式化输出等。IE 开始支持                |
| 第4版      | 2007年   | 过于激进，未发布                                             |
| 第5版      | 2014年   | 引入严格模式、JSON，扩展对象、数组、原型、字符串、日期方法   |
| 第6版      | 2015年   | 模块化、面向对象语法、Promise、箭头函数、let、const、数组解构赋值等 |
| 第7版      | 2016年   | 幂运算符、数组扩展、Async/await 关键字                       |
| 第8版      | 2017年   | Async/await、字符串扩展                                      |
| 第9版      | 2018年   | 对象解构赋值、正则扩展                                       |
| 第10版     | 2019年   | 扩展对象、数组方法                                           |
| 第11版     | 2020年   | 链式操作、动态导入等                                         |
| ES.next    | 2020+    | 动态指向下一个版本                                           |

**注:从** **ES6** **开始，每年发布一个版本，版本号比年份最后一位大** **1**

查看网址:http://kangax.github.io/compat-table/es6



**Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构**

- 集合

集合，是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合

- 字典

字典（dictionary）是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同

区别

- 共同点：集合、字典都可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储


## 一、Set数据结构

### 基本介绍

- 类似数组，成员都是唯一值。
- 可以存储任意类型，包括NaN和undefined。
- 参数可以为数组。

```js
const set1 = new Set();
var object1 = new Object();

set1.add(42);
set1.add('f two');
set1.add('f two'); // 不存储相同的值，会被忽略
set1.add(object1);
console.log(set1); // Set(3) {42, "f two", {…}}
console.log(set1.size); // 3

// Set里面NaN和undefined等于自身，
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```

### 方法

#### add()

用来向一个 `Set` 对象的末尾添加一个指定的值。注意：不能添加重复的值。

```js
var mySet = new Set();

mySet.add(1);
mySet.add(5).add("some text"); // 可以链式调用

console.log(mySet);
// Set [1, 5, "some text"]

mySet.add(5).add(1); // 重复的值不会被添加进去
console.log(mySet); // {1, 5, "some text"}
```

#### clear()

用来清空一个 `Set` 对象中的所有元素。返回值：undefined。

```js
mySet.clear()
```

#### delete()

可以从一个 `Set` 对象中删除指定的元素。成功删除返回 `true`，否则返回 `false。`

```js
var mySet = new Set();
mySet.add("foo");

mySet.delete("bar"); // 返回 false，不包含 "bar" 这个元素
mySet.delete("foo"); // 返回 true，删除成功

mySet.has("foo");    // 返回 false，"foo" 已经成功删除
```

#### forEach(callback, thisArg)

会根据集合中元素的插入顺序，依次执行提供的回调函数。

**`callback:`**回调函数有三个参数:

- 元素的值
- 元素的索引
- 正在遍历的集合对象

**`thisArg:`**回调函数执行过程中的 `this` 值。可选

```js
function logSetElements(item, index, set) {
    console.log("s[" + item + "] = " + index, set);
    console.log(this)
}

var a = [1,2,3]
new Set(["foo", "bar", undefined]).forEach(logSetElements,a);

// logs:
// "s[foo] = foo" Set(3) {"foo", "bar", undefined}
// "s[bar] = bar" Set(3) {"foo", "bar", undefined}
// "s[undefined] = undefined" Set(3) {"foo", "bar", undefined}
// this为 a，没传为window

// item和index一样
```

但是由于集合对象中没有索引(keys)，所以前两个参数都是Set中元素的值(values)，之所以这样设计回调函数是为了和Map 以及Array的 forEach 函数用法保持一致。如果提供了一个 thisArg 参数给 forEach 函数，则参数将会作为回调函数中的 this值。

#### **has()**

返回一个布尔值来指示对应的值value是否存在Set对象中。

```js
var mySet = new Set();
mySet.add('foo');

mySet.has('foo');  // 返回 true
mySet.has('bar');  // 返回 false

var set1 = new Set();
var obj1 = {'key1': 1};
set1.add(obj1);

set1.has(obj1);        // 返回 true
set1.has({'key1': 1}); // 会返回 false，因为其是另一个对象的引用
set1.add({'key1': 1}); // 现在 set1 中有2条（不同引用的）对象了
```

#### **entries()**

返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。由于集合对象不像 Map 对象那样拥有 key，然而，为了与 Map 对象的 API 形式保持一致，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组。
返回值：一个新的包含 [value, value] 形式的数组迭代器对象，value 是给定集合中的每个元素，迭代器 对象元素的顺序即集合对象中元素插入的顺序。

```js
var mySet = new Set();
mySet.add("foobar");
mySet.add(1);
mySet.add("baz");

var setIter = mySet.entries(); // SetIterator {"foobar" => "foobar", 1 => 1, "baz" => "baz"}

console.log(setIter.next().value); // ["foobar", "foobar"]
console.log(setIter.next().value); // [1, 1]
console.log(setIter.next().value); // ["baz", "baz"]
```

#### values()

返回一个 `**Iterator**` 对象，该对象按照原Set 对象元素的插入顺序返回其所有元素。

```js
var mySet = new Set();
  mySet.add("foo");
  mySet.add("bar");
  mySet.add("baz");

var setIter = mySet.values();
console.log(setIter)
for (var i = 0;i < mySet.size; i++) {
  console.log(setIter.next().value) // foo , bar ,baz
}
```

#### keys()

这个方法的别名 (与 Map 对象相似); 它的行为与 value 方法完全一致，返回 Set 对象的元素。
返回值：将返回一个新生成的可迭代对象，以插入 Set 对象的顺序返回其包含的每个元素的值。

```js
var mySet = new Set();
mySet.add("foo");
mySet.add("bar");
mySet.add("baz");

var setIter = mySet.keys();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```

### 应用实例

#### 数组去重

```js
[...new Set([1, 3, 3, 34, 555, 2, 2])] // [1, 3, 34, 555, 2]

function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]

function arrRemove (arr) {
    let tempArr = arr
    arr = []
    let set = new Set(tempArr)
    for (let i of set) {
        arr.push(i)
    }
    return arr
}
arrRemove([1, 3, 3, 34, 555, 2, 2]) // [1, 3, 34, 555, 2]
```

#### 去除字符串里面的重复字符

```js
[...new Set('ababbc')].join('') // "abc"
```

#### set对象与数组之间的转换

```js
var arr = [1,2,3,4,4];
var set = new Set(arr) //数组转换set对象
set //{1,2,3,4}
// 方法一
Array.from(set) //[1,2,3,4]
// 方法二
[...set] //[1,2,3,4]
```

#### 数组去重&(并集交集差集)

##### 并集

```js
let arr1 = [1,2,3,4,5];
let arr2 = [4,5,6,7,8];
let a = new Set(arr1);
let b= new Set(arr2)

new Set([...arr1,...arr2]) //{1,2,3,4,5,6,7,8}
let arr3 = [...new Set([...arr1,...arr2])] //[1,2,3,4,5,6,7,8]
```

##### 交集

```js
let arr3 = new Set(arr1.filter(x=>b.has(x))) //{4,5}
```

##### 差集

```js
let arr3 = new Set(arr1.filter(x=>!b.has(x))) //{1,2,3}
let arr4 = new Set(arr2.filter(x=>!a.has(x))) //{6,7,8}
[...arr3,...arr4] //[1,2,3,6,7,8]
```

##### 数组对象去重

```js
// 取交集
let a=[{id:1,a:123,b:1234},{id:2,a:123,b:1234}];
let b=[{id:1,a:123,b:1234},{id:2,a:123,b:1234},{id:3,a:123,b:1234},{id:4,a:123,b:1234}];
let arr = [...b].filter(x => [...a].some(y => y.id === x.id));
console.log('arr',arr)

// 取差集
let a=[{id:1,a:123,b:1234},{id:2,a:123,b:1234}];
let b=[{id:1,a:123,b:1234},{id:2,a:123,b:1234},{id:3,a:123,b:1234},{id:4,a:123,b:1234}];
let arr = [...b].filter(x => [...a].every(y => y.id !== x.id));
console.log('arr',arr)
```

## 二、Map数据结构

### 基本介绍

```js
let map = new Map()
map.set('name', 'vuejs.cn');
console.log(map.get('name'))
// {{key => value}}
```

### 方法及属性

类似set

```js
Map.prototype.clear()
移除Map对象的所有键/值对 。
Map.prototype.delete(key)
如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false。随后调用 Map.prototype.has(key) 将返回 false 。
Map.prototype.entries()
返回一个新的 Iterator 对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
Map.prototype.forEach(callbackFn[, thisArg])
按插入顺序，为 Map对象里的每一键值对调用一次callbackFn函数。如果为forEach提供了thisArg，它将在每次回调中作为this值。
Map.prototype.get(key)
返回键对应的值，如果不存在，则返回undefined。
Map.prototype.has(key)
返回一个布尔值，表示Map实例是否包含键对应的值。
Map.prototype.keys()
返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。
Map.prototype.set(key, value)
设置Map对象中键的值。返回该Map对象。
Map.prototype.values()
返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值 。
Map.prototype[@@iterator]()
返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
```



### 应用实例

#### 二维数组转化

```js
let kvArray = [["key1", "value1"], ["key2", "value2"]];

// 使用常规的Map构造函数可以将一个二维键值对数组转换成一个Map对象
let myMap = new Map(kvArray);

myMap.get("key1"); // 返回值为 "value1"

// 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
console.log(Array.from(myMap)); // 输出和kvArray相同的数组

// 更简洁的方法来做如上同样的事情，使用展开运算符
console.log([...myMap]);

// 或者在键或者值的迭代器上使用Array.from，进而得到只含有键或者值的数组
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]
```

#### 复制

```
let original = new Map([
  [1, 'one']
]);

let clone = new Map(original);

console.log(clone.get(1)); // one
console.log(original === clone); // false. 浅比较 不为同一个对象的引用
```

#### 合并

```js
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let second = new Map([
  [1, 'uno'],
  [2, 'dos']
]);

// 合并两个Map对象时，如果有重复的键值，则后面的会覆盖前面的。
// 展开运算符本质上是将Map对象转换成数组。
let merged = new Map([...first, ...second]);
```

```js
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let second = new Map([
  [1, 'uno'],
  [2, 'dos']
]);

// Map对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。
let merged = new Map([...first, ...second, [1, 'eins']]);

console.log(merged.get(1)); // eins
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```
## 三、var、let和const

### 1 var关键词

#### 1.1 基本用法

```js
// 定义
var text  // undefined
// 赋值
var text = 1
text = 'text'
// 重复声明不报错
var text = 2
var text = 3
```

#### 1.2 作用域

```js
// 全局
var text = 1
// 局部（函数作用域）
function text22 () {
	var text2 = 'text2'
}
// 全局（未声明） 不推荐
function text33 () {
	text3 = 'text2'
}
```

#### 1.3 提升

```js
function text () {
	console.log(text1) // undefined
	var text1 = 22
}
```

### 2 let关键词

声明一个块级作用域的本地变量，并且可选的将其初始化一个值;变量不提升；

#### 2.1声明

``` js
// 使用let在全局作用域中声明的变量不会成为window对象的属性（var声明的变量则会）
let num = 111
console.log(window.num) // undefined

// 不能进行条件声明
if (typeof name = 'undefined') {
    let name = 'ces'
}
console.log(name) // 不生效
// 不能重复声明
let name = '11'
let name = '22'
```

#### 2.2暂时性死区

与通过  `var` 声明的有初始化值 `undefined` 的变量不同，通过 `let` 声明的变量直到它们的定义被执行时才初始化

```js
function do_something() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2;
}

// 暂时性死区与typeof
// prints out 'undefined'
console.log(typeof undeclaredVariable);

// results in a 'ReferenceError'
console.log(typeof i);
let i = 10;
```

#### 3 const 关键词

常量是块级范围的，非常类似用 [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 语句定义的变量。但常量的值是无法（通过重新赋值）改变的，也不能被重新声明。

```js
const number = 42;

try {
  number = 99;
} catch (err) {
  console.log(err);
  // expected output: TypeError: invalid assignment to const `number'
  // Note - error messages will vary depending on browser
}

console.log(number);
// expected output: 42
```

```js
// 定义常量MY_FAV并赋值7
const MY_FAV = 7;

// 报错 - Uncaught TypeError: Assignment to constant variable.
MY_FAV = 20;

// MY_FAV is 7
console.log('my favorite number is: ' + MY_FAV);

// 尝试重新声明会报错
// Uncaught SyntaxError: Identifier 'MY_FAV' has already been declared
const MY_FAV = 20;

// MY_FAV 保留给上面的常量，这个操作会失败,报错
var MY_FAV = 20;

// 也会报错
let MY_FAV = 20;
```

### 3.1 块级作用域

```js
if (MY_FAV === 7) {
  // 没问题，并且创建了一个块作用域变量 MY_FAV
  // (works equally well with let to declare a block scoped non const variable)
  let MY_FAV = 20;

  // MY_FAV 现在为 20
  console.log('my favorite number is ' + MY_FAV);

  // 这被提升到全局上下文并引发错误
  var MY_FAV = 20;
}

// MY_FAV 依旧为7
console.log('my favorite number is ' + MY_FAV);
```

## 四、解构赋值

**解构赋值**语法是一种 Javascript 表达式。通过**解构赋值,** 可以将属性/值从对象/数组中取出,赋值给其他变量。

```js
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: Array [30,40,50]
```

### 解构数组

```js
// 变量声明并赋值时的解构
var foo = ["one", "two", "three"];

var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"

// 变量先声明后赋值时的解构
var a, b;

[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

// 默认值
var a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7

// 交换变量

var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

// 解析一个从函数返回的数组
function f() {
  return [1, 2];
}

var a, b;
[a, b] = f();
console.log(a); // 1
console.log(b); // 2

// 忽略某些返回值

function f() {
  return [1, 2, 3];
}

var [a, , b] = f();
console.log(a); // 1
console.log(b); // 3
[,,] = f(); // 也可以忽略全部

// 将剩余数组赋值给一个变量
var [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
```

### 解构对象

```js
// 1 基本赋值
var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true

// 2 无声明赋值
({a, b} = {a: 1, b: 2});

// 3 给新的变量名赋值
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true 

// 4 默认值
var {a = 10, b = 5} = {a: 3};
console.log(a); // 3
console.log(b); // 5

// 5 给新的变量命名并提供默认值
var {a:aa = 10, b:bb = 5} = {a: 3};

console.log(aa); // 3
console.log(bb); // 5

// 6 解构嵌套对象和数组
const metadata = {
  title: 'Scratchpad',
  translations: [
    {
      locale: 'de',
      localization_tags: [],
      last_edit: '2014-04-14T08:43:37',
      url: '/de/docs/Tools/Scratchpad',
      title: 'JavaScript-Umgebung'
    }
  ],
  url: '/en-US/docs/Tools/Scratchpad'
};

let {
  title: englishTitle, // rename
  translations: [
    {
       title: localeTitle, // rename
    },
  ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"

// 7 For of 迭代和解构

var people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith',
      sister: 'Samantha Smith'
    },
    age: 35
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones',
      father: 'Richard Jones',
      brother: 'Howard Jones'
    },
    age: 25
  }
];

for (var {name: n, family: {father: f}} of people) {
  console.log('Name: ' + n + ', Father: ' + f);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"

// 8 对象属性计算名和解构

let key = "z";
let { [key]: foo } = { z: "bar" };

console.log(foo); // "bar"

// 9 对象解构中的 Rest
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
a; // 10
b; // 20
rest; // { c: 30, d: 40 }

// 10 解构对象时会查找原型链（如果属性不在对象自身，将从原型链中查找）

// 声明对象 和 自身 self 属性
var obj = {self: '123'};
// 在原型链中定义一个属性 prot
obj.__proto__.prot = '456';
// test
const {self, prot} = obj;
// self "123"
// prot "456"（访问到了原型链）
```

### 函数参数

```js
// 函数参数默认值
function drawES2015Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {})
{
  console.log(size, cords, radius);
  // do some chart drawing
}
drawES2015Chart({
  cords: { x: 18, y: 30 },
  radius: 30
});

// 从作为函数实参的对象中提取数据
function userId({id}) {
  return id;
}

function whois({displayName: displayName, fullName: {firstName: name}}){
  console.log(displayName + " is " + name);
}

var user = {
  id: 42,
  displayName: "jdoe",
  fullName: {
      firstName: "John",
      lastName: "Doe"
  }
};

console.log("userId: " + userId(user)); // "userId: 42"
whois(user); // "jdoe is John"
```

## 五、模板字符串

模板字面量 是允许嵌入表达式的字符串字面量。你可以使用多行字符串和字符串插值功能。

在模版字符串内使用反引号（`）时，需要在它前面加转义符（\）。

```js
var a = `\`` === "`"
console.log(a) // true
```

### 多行字符串

```js
console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"
```

### 插入表达式

```js
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."
```

### 嵌套模板

```js
const classes = `header ${ isLargeScreen() ? '' :
 `icon-${item.isCollapsed ? 'expander' : 'collapser'}` }`;
```

### 带标签的模板字符串

```js
  var person = 'Mike';
  var age = 28;

  function myTag(strings, personExp, ageExp) {

    var str0 = strings[0]; // "that "
    var str1 = strings[1]; // " is a "

    // There is technically a string after
    // the final expression (in our example),
    // but it is empty (""), so disregard.
    // var str2 = strings[2];

    var ageStr;
    if (ageExp > 99){
      ageStr = 'centenarian';
    } else {
      ageStr = 'youngster';
    }

    return str0 + personExp + str1 + ageStr;

  }

  var output = myTag`that ${ person } is a ${ age }`;

  console.log(output);
  // that Mike is a youngster
```

### 原始字符串

在标签函数的第一个参数中，存在一个特殊的属性`raw` ，我们可以通过它来访问模板字符串的原始字符串，而不经过特殊字符的替换。

```js
function tag(strings) {
  console.log(strings.raw[0]);
}

tag`string text line 1 \n string text line 2`;
// logs "string text line 1 \n string text line 2" ,
// including the two characters '\' and 'n'



// 另外，使用String.raw() 方法创建原始字符串和使用默认模板函数和字符串连接创建是一样的。
var str = String.raw`Hi\n${2+3}!`;
// "Hi\n5!"
str.length;
// 6
str.split('').join(',');
// "H,i,\,n,5,!"
```

## 六、箭头函数

**箭头函数表达式**的语法比函数表达式更简洁，并且没有自己的`this`，`arguments`，`super`或`new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

### 基础语法

```js
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
//相当于：(param1, param2, …, paramN) =>{ return expression; }

// 当只有一个参数时，圆括号是可选的：
(singleParam) => { statements }
singleParam => { statements }

// 没有参数的函数应该写成一对圆括号。
() => { statements }
```

### 高级语法

```js
//加括号的函数体返回对象字面量表达式：
params => ({foo: bar})

//支持剩余参数和默认参数
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => {
statements }

//同样支持参数列表解构
let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
```

### 与严格模式的关系

```js
var f = () => { 'use strict'; return this; };
f() === window; // 或者 global
// 与this相关规则忽略，其他规则不变
```

### 通过 call 或 apply 调用

由于 箭头函数没有自己的this指针，通过 `call()` *或* `apply()` 方法调用一个函数时，只能传递参数（不能绑定this---译者注），他们的第一个参数会被忽略。（这种现象对于bind方法同样成立---译者注）

```js
var adder = {
  base : 1,

  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2 忽略了call的第一个参数
```

### 不绑定arguments

```js
var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
  var f = () => arguments[0] + n; // 隐式绑定 foo 函数的 arguments 对象. arguments[0] 是 n,即传给foo函数的第一个参数
  return f();
}

foo(1); // 2
foo(2); // 4
foo(3); // 6
foo(3,2);//6
```

### 使用箭头函数作为方法

```js
'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b();
// undefined, Window{...}
obj.c();
// 10, Object {...}
```

```js
'use strict';
var obj = {
  a: 10
};

Object.defineProperty(obj, "b", {
  get: () => {
    console.log(this.a, typeof this.a, this);
    return this.a+10; // NaN
   // 代表全局对象 'Window', 因此 'this.a' 返回 'undefined'
  }
});

obj.b; // undefined   "undefined"   Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
```

**不能使用new操作符，没有prototype属性，不能使用yield关键字**

## 七、函数默认参数值

```js
function multiply(a, b = 1) {
  return a * b;
}

multiply(5, 2); // 10
multiply(5);    // 5
```

### 传入undefined vs 其他假值

```js
function test(num = 1) {
  console.log(typeof num);
}

test();          // 'number' (num is set to 1)
test(undefined); // 'number' (num is set to 1 too)

// test with other falsy values:
test('');        // 'string' (num is set to '')
test(null);      // 'object' (num is set to null)
```

### 调用时解析

```js
function append(value, array = []) {
  array.push(value);
  return array;
}

append(1); //[1]
append(2); //[2], not [1, 2]


// 传入方法
function callSomething(thing = something()) {
 return thing;
}

let numberOfTimesCalled = 0;
function something() {
  numberOfTimesCalled += 1;
  return numberOfTimesCalled;
}

callSomething(); // 1
callSomething(); // 2
```

### 默认参数可用到后面参数

```js
function greet(name, greeting, message = greeting + ' ' + name) {
    return [name, greeting, message];
}

greet('David', 'Hi');  // ["David", "Hi", "Hi David"]
greet('David', 'Hi', 'Happy Birthday!');  // ["David", "Hi", "Happy Birthday!"]
```

### 有默认值的解构参数

```js
function f([x, y] = [1, 2], {z: z} = {z: 3}) {
  return x + y + z;
}

f(); // 6
```

## 八、剩余参数

**剩余参数**语法允许我们将一个不定数量的参数表示为一个数组。

```js
// 语法
function(a, b, ...theArgs) {
  // ...
}

function sum(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}

console.log(sum(1, 2, 3));
// expected output: 6

console.log(sum(1, 2, 3, 4));
// expected output: 10
```

### 剩余参数和arguments对象的区别

- 剩余参数只包含那些没有对应形参的实参，而 `arguments` 对象包含了传给函数的所有实参。
- `arguments`对象不是一个真正的数组，而剩余参数是真正的 `Array`实例，也就是说你能够在它上面直接使用所有的数组方法，比如 `sort`，`map`，`forEach`或`pop`。
- `arguments`对象还有一些附加的属性 （如`callee`属性）。

### 从arguments到数组

```js
// Before rest parameters, "arguments" could be converted to a normal array using:

function f(a, b) {

  var normalArray = Array.prototype.slice.call(arguments);
  // -- or --
  var normalArray = [].slice.call(arguments);
  // -- or --
  var normalArray = Array.from(arguments);

  var first = normalArray.shift(); // OK, gives the first argument
  var first = arguments.shift(); // ERROR (arguments is not a normal array)

}

// Now we can easily gain access to a normal array using a rest parameter

function f(...args) {
  var normalArray = args;
  var first = normalArray.shift(); // OK, gives the first argument
}
```

### 解构剩余参数

```js
function f(...[a, b, c]) {
  return a + b + c;
}

f(1)          // NaN (b and c are undefined)
f(1, 2, 3)    // 6
f(1, 2, 3, 4) // 6 (the fourth parameter is not destructured)
```

## 九、扩展运算符（展开算法）

**展开语法(Spread syntax),** 可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；还可以在构造字面量对象时, 将对象表达式按key-value的方式展开。(**译者注**: 字面量一般指 `[1, 2, 3]` 或者 `{name: "mdn"}` 这种简洁的构造方式)

```js
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// expected output: 6
// 等价于
console.log(sum.apply(null, numbers));
// expected output: 6
```

### 语法

```js
// 函数调用
myFunction(...iterableObj);
// 字面量数组构造或字符串
[...iterableObj, '4', ...'hello', 6];
// 构造字面量对象时,进行克隆或者属性拷贝
let objClone = { ...obj };
```

### 在new表达式使用

使用 `new` 关键字来调用构造函数时，不能**直接**使用数组+ `apply` 的方式（`apply` 执行的是调用 `[[Call]]` , 而不是构造 `[[Construct]]`）。当然, 有了展开语法, 将数组展开为构造函数的参数就很简单了：

### 技巧

```js
// 构造字面量数组
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes']; // ["head", "shoulders", "knees", "and", "toes"]

// 数组拷贝(copy)-浅拷贝
var arr = [1, 2, 3]; // 不影响
var arr2 = [...arr]; // like arr.slice() [1, 2, 3, 4]
arr2.push(4);

// 连接多个数组
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2];

// 链接对象，Object.assign（）类似
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };
var clonedObj = { ...obj1 };// 克隆后的对象: { foo: "bar", x: 42 }
var mergedObj = { ...obj1, ...obj2 };// 合并后的对象: { foo: "baz", x: 42, y: 13 }
```

## 十、Class

默认严格模式

### 基本语法

```ts
// 定义
class 类名 {
    属性名: 类型;
    
    constructor(参数: 类型){
        this.属性名 = 参数;
    }
    方法名(){
        ....
    }
}
// 使用
new 类名
// 静态 - static关键字
static age: number = 18;
static sayHello(){
    console.log('Hello 大家好！');
}
// 只读 - readonly关键字
readonly age: number = 18;
static readonly sayHello(){
    console.log('Hello 大家好！');
}
```

### 构造函数-constructor

构造函数在对象创建时调用，只能创建一个构造函数

```ts
class Dog {
    name: string;
    age: number;

    // constructor 被称为构造函数
    // 构造函数会在对象创建时调用
    // TS中仅能创建一个构造函数！
    constructor(name: string, age: number) {
        // 在实例方法中，this就表示当前当前的实例
        // 在构造函数中的当前对象就是新建的那个对象
        // 可以通过this向新建的对象中添加属性
        this.name = name;
        this.age = age;
    }

    bark() {
        // alert('汪汪汪！');
        // 在方法中可以通过this来表示当前调用方法的对象
        console.log(this.name);
    }
}

const dog = new Dog('小黑', 4);
const dog2 = new Dog('小白', 2);

console.log(dog);
console.log(dog2);

dog2.bark();
```

### 继承-extends

```ts
(function () {
    // 定义一个Animal类
    class Animal {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        sayHello() {
            console.log('动物在叫~');
        }
    }

    /*
    * Dog extends Animal
    *   - 此时，Animal被称为父类，Dog被称为子类
    *   - 使用继承后，子类将会拥有父类所有的方法和属性
    *   - 通过继承可以将多个类中共有的代码写在一个父类中，
    *       这样只需要写一次即可让所有的子类都同时拥有父类中的属性和方法
    *       如果希望在子类中添加一些父类中没有的属性或方法直接加就行
    *   - 如果在子类中添加了和父类相同的方法，则子类方法会覆盖掉父类的方法
    *       这种子类覆盖掉父类方法的形式，我们称为方法重写
    *
    */
    // 定义一个表示狗的类
    // 使Dog类继承Animal类
    class Dog extends Animal {
        run() {
            console.log(`${this.name}在跑~~~`);
        }

        sayHello() {
            console.log('汪汪汪汪！');
        }
    }

    // 定义一个表示猫的类
    // 使Cat类继承Animal类
    class Cat extends Animal {
        sayHello() {
            console.log('喵喵喵喵！');
        }
    }

    const dog = new Dog('旺财', 5);
    const cat = new Cat('咪咪', 3);
    console.log(dog);
    dog.sayHello();
    dog.run();
    console.log(cat);
    cat.sayHello();
})();
```

### super关键字

#### super当作函数使用

- super 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 super() 函数。注意：作为函数时，super() 只能用在子类的构造函数之中，用在其他地方就会报错。
- super 作为函数调用时，内部的 this 指的是子类实例

```js
  class A {
    constructor () {
      this.text()
    }
    text () {
      console.log('AAA')
    }
  }
  class B extends A {
    constructor () {
      super() // 必须先调用super()
    }
    text () {
      console.log('BBB')
    }
  }
  let b = new B() // 打印 BBB，this指向子构造函数
```

#### super作为对象使用

super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

##### super在普通方法中指向及this的指向

```js
// 指向父类原型对象上
class A {
  p() {
    return 2;
  }
}
class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2  此时的super指向父类原型对象，即 A.prototype
  }
}
let b = new B();　　//2
```

```js
// 由于在普通方法中的 super 指向父类的原型对象，所以如果父类上的方法或属性是定义在实例上的，就无法通过 super 调用的。
class A {
  constructor() {  //在构造函数上定义的属性和方法相当于定义在父类实例上的，而不是原型对象上
    this.p = 2;
  }
}
class B extends A {
  get m() {
    return super.p;
  }
}
let b = new B();
console.log(b.m) // undefined

// class A prototype 有constructor
// class B prototype 有constructor get函数 m:undefined
// A 有 p = 2
```

```js
// 在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向的是当前的子类实例。
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
　　 super.y = 123;　　//如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
  }
  m() {
    super.print();
  }
}
let b = new B();
b.m() // 2
console.log(b.y);  //123
```

##### super在静态方法中指向及this的指向

```js
// super作为对象，用在静态方法之中，这时 super 将直接指向父类，而不是父类的原型对象。
  class Parent {
    static myMethod(msg) {
      console.dir(this) // Class Child
      console.log('static', msg)
    }
    myMethod(msg) {
      console.dir(this) // Child
      console.log('instance', msg)
    }
  }
  class Child extends Parent {
    static myMethod(msg) {
      super.myMethod(msg)
    }
    myMethod(msg) {
      super.myMethod(msg)
    }
  }
  Child.myMethod(1)
  var child = new Child();
  child.myMethod(2)
```

```js
// 在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}
B.x = 3;
B.m() // 3
```

## 十一、对象简化写法

- 同名的属性可以省略不写
- 对象中的方法中的 : function 可以省略不写

```js
const name = 'Jack';
const age = 25;
const sex = '女';
const studentES6 = {
    name,// 同名的属性可以省略不写
    age,
    sex,
    getName () { // 可以省略方法中的 : function   es5写法： getName: function () {}
        return this.name;
    }
};
console.log('ES6', studentES6);
console.log('ES6', studentES6.getName());
```

## 十二、Symbol 基本数据类型

是一种新的数据类型，表示独一无二的值，类似字符串。

### 特点

1. Symbol的值是唯一的，用来解决命名冲突问题。
2. Symbol的值不能和其他数据进行运算。
3. Symbol定义的对象属性不能使用For...in循环遍历，但是可以使用Reflect.ownKeys获取对象所有键名

```js
// 创建Symbol
let a = Symbol('text')
let b = Symbol.for('text')
a === b // false 唯一值

// For in不能遍历
var obj = {[Symbol('s')]: 11}
for (let key in obj) {
    console.log(obj[key]) // 没有内容
}
console.log(Reflect.ownKeys(obj)) // [Symbol(s)]
```

### 对象添加symbol类型的属性

```js
  // 向对象中添加方法 up down
  let game = {
    up () {},
    down () {}
  }
  let methods = {
    up: Symbol(),
    down: Symbol()
  }
  game[methods.up] = function () {}
  game[methods.down] = function () {}
  console.log(game)
  console.log(game[methods.up])
```

### Symbol内置属性方法

## 十三、迭代器

**Symbol.iterator** 为每一个对象定义了默认的迭代器。该迭代器可以被 `for...of` 循环使用。

### 具有iterator接口的数据（可用for of遍历）

Array,Arguments,Set,Map,String,TypeArray,NodeList

### 原理

- 创建一个指针对象，指向当前数据结构的起始位置
- 第一次调用对象的next方法，指针自动指向数据结构第一个成员
- 接下来不断调用next方法，指针一直往后移动，直到指向最后一个成员
- 每调用next返回一个含有value和done属性对象

```js
  let name = ['1', '2', '3', '4']
  console.log(name)
// 返回指针对象
  let iterator = name[Symbol.iterator]()
  console.log(iterator)
// next移动指针
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next()) // done: true,value: undefined
```

### 应用：自定义遍历数据

```js
const banji = {
    stus: [
        'xiaozheng',
        'xiaotian',
        'knight',
        'xiaoning'
    ],
    [Symbol.iterator] () {
        // 索引变量
        let index = 0
        let _this = this
        return {
            next () {
                if (index < _this.stus.length) {
                    const result = {
                        value: _this.stus[index],
                        done: false
                    }
                    index++
                    return result
                } else {
                    return {
                        value: undefined,
                        done: true
                    }
                }
            }
        }
    }
}
for (let value of banji) {
    console.log(value)
}
// banji.stus.forEach()
```

## 十四、生成器

- 生成器其实是一个特殊函数
- 解决异步编程
- yield是函数代码分割符
- next方法传参数，为上一个yeild语句的整体返回值

```js
  function * get (arg) {
    console.log(arg)
    console.log(111)
    let one = yield '一'
    console.log(one)
    console.log(222)
    yield '二'
    console.log(333)
    yield '三'
    console.log(444)
  }
  let iterator = get('AAA')
  console.log(iterator.next()) // value: '一',done: false   AAA 111
  console.log(iterator.next('one'))  // one
  console.log(iterator.next())
  console.log(iterator.next()) // value: undefined, done: true
```

### 应用

```js
// 解决异步轮回地狱问题
function one () {
    setTimeout(() => {
        console.log('1')
        iterator.next()
    }, 1000)
}
function two () {
    setTimeout(() => {
        console.log('2')
        iterator.next()
    }, 2000)
}
function three () {
    setTimeout(() => {
        console.log('3')
        iterator.next()
    }, 3000)
}
function * gen () {
    yield one()
    yield two()
    yield three()
}
let iterator = gen()
iterator.next()
```

```js
function getUsers () {
    setTimeout(() => {
        let data = '用户数据'
        iterator.next(data)
    }, 1000)
}
function getOrders () {
    setTimeout(() => {
        let data = '订单数据'
        iterator.next(data)
    }, 1000)
}
function getGoods () {
    setTimeout(() => {
        let data = '商品数据'
        iterator.next(data)
    }, 1000)
}
function * gen () {
    let userData = yield getUsers()
    let orderDataData = yield getOrders(userData)
    yield getGoods(orderDataData)
}
let iterator = gen()
iterator.next()
```

## 十五、Promise

Promise 是 ES6 引入的**异步编程的新解决方案**。语法上 Promise 是一个**构造函数**，用来封装异步操作 并可以获取其成功或失败的结果;

1. Promise 构造函数: Promise (excutor) {}; 
2. Promise.prototype.then 方法;
3. Promise.prototype.catch 方法;

## 十六、class类

### 概述

ES6 提供了更接近传统语言的写法，引入了 Class(类)这个概念，作为对象的模板。通过 class 关键 字，可以定义类。基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做 到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已;

### 知识点

1. class 声明类;

   ```js
   // 手机 ES5写法
   // function Phone(brand,price){
   // 	this.brand = brand;
   // 	this.price = price;
   // }
   // // 添加方法
   // Phone.prototype.call = function(){ // console.log("我可以打电话!");
   // }
   // // 实例化对象
   // let HuaWei = new Phone("华为",5999); // HuaWei.call();
   // console.log(HuaWei);
   
   // ES6写法 
   class Phone{
   // 构造方法，名字是固定的 
     constructor(brand,price) {
       this.brand = brand;
       this.price = price;
     }
   // 打电话，方法必须使用该方式写 
     call(){
   		console.log("我可以打电话!"); 
     }
   }
   let HuaWei = new Phone("华为",5999);
   ```

2.  constructor 定义构造函数初始化; 

3. extends 继承父类;

   ```js
   // ES6class类继承 
   class Phone{
     constructor(brand,price) {
       this.brand = brand;          
       this.price = price;
   	} 
     call(){
   		console.log("我可以打电话!"); 
     }    
   }
               
   class SmartPhone extends Phone{
   // 构造函数 
     constructor(brand,price,color,size) {
   		super(brand,price); 
       // 调用父类构造函数 
       this.color = color;
   		this.size = size;
   	}
   	photo(){ 
       console.log("我可以拍照!");
   	} 	
     game(){
   		console.log("我可以玩游戏!");
     }
   }
   const chuizi = new SmartPhone("小米",1999,"黑色","5.15inch"); console.log(chuizi);
   chuizi.call();
   chuizi.photo();
   chuizi.game();
   ```

4. super 调用父级构造方法;

5. static 定义静态方法和属性;

6. 父类方法可以重写;

   ```js
   // ES6class类继承 
   class Phone{            
     constructor(brand,price) {        
       this.brand = brand;           
       this.price = price;
     } 
     call(){
       console.log("我可以打电话!"); 
     }
   }   
   class SmartPhone extends Phone{
   	// 构造函数 
     constructor(brand,price,color,size) {
       super(brand,price); 
       // 调用父类构造函数 this.color = color;
       this.size = size;
     }
     // 子类对父类方法重写
     // 直接写，直接覆盖
     // 注意:子类无法调用父类同名方法 
     call(){
       console.log("我可以进行视频通话!"); 
     }
   	photo(){ 
       console.log("我可以拍照!");
     } 
     game(){
       console.log("我可以玩游戏!"); }
   }
   const chuizi = new SmartPhone("小米",1999,"黑色","5.15inch"); console.log(chuizi);
   chuizi.call();
   chuizi.photo();
   chuizi.game();
   ```

7. class中的getter和setter设置

   ```js
   // class中的getter和setter设置 
   class Phone{
   	get price(){ 
       console.log("价格属性被读取了!"); // 返回值
       return 123;
   	}
   	set price(value){ 
       console.log("价格属性被修改了!");
   	} 
   }
   // 实例化对象
   let s = new Phone(); 
   console.log(s.price); // 返回值 getter
   s.price = 2999; // setter
   ```

## 十七、数值扩展

### Number.EPSILON

Number.EPSILON 是 JavaScript 表示的最小精度;
 EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16;

### 二进制和八进制

ES6 提供了二进制和八进制数值的新的写法，分别用前缀 0b 和 0o 表示; 

### Number.isFinite()与 Number.isNaN()

Number.isFinite() 用来检查一个数值是否为有限的; Number.isNaN() 用来检查一个值是否为 NaN;

### Number.parseInt() **与** Number.parseFloat()

ES6 将全局方法 parseInt 和 parseFloat，移植到 Number 对象上面，使用不变

### Math.trunc

用于去除一个数的小数部分，返回整数部分;

### Number.isInteger

Number.isInteger() 用来判断一个数值是否为整数;

```js
// 数值扩展
// 0. Number.EPSILON 是 JavaScript 表示的最小精度
// EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16 
// function equal(a, b){
// 		return Math.abs(a-b) < Number.EPSILON;
// }
// 箭头函数简化写法
equal = (a, b) => Math.abs(a-b) < Number.EPSILON; console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // false 
console.log(equal(0.1 + 0.2, 0.3)); // true
// 1. 二进制和八进制 console.log("1、二进制和八进制"); let b = 0b1010;
let o = 0o777;
let d = 100;
let x = 0xff;
console.log(x);
// 2. Number.isFinite
检测一个数值是否为有限数
console.log("2、Number.isFinite 检测一个数值是否为有限数"); console.log(Number.isFinite(100)); 
console.log(Number.isFinite(100/0)); 
console.log(Number.isFinite(Infinity));
// 3. Number.isNaN 检测一个数值是否为 NaN 
console.log("3. Number.isNaN 检测一个数值是否为 NaN"); 
console.log(Number.isNaN(123));
// 4. Number.parseInt Number.parseFloat字符串转整数 
console.log("4. Number.parseInt Number.parseFloat字符串转整数"); console.log(Number.parseInt('5211314love')); 
console.log(Number.parseFloat('3.1415926神奇'));
// 5. Number.isInteger 判断一个数是否为整数 
console.log("5. Number.isInteger 判断一个数是否为整数"); 
console.log(Number.isInteger(5)); 
console.log(Number.isInteger(2.5));
// 6. Math.trunc 将数字的小数部分抹掉 
console.log("6. Math.trunc 将数字的小数部分抹掉 "); 
console.log(Math.trunc(3.5));
// 7. Math.sign 判断一个数到底为正数 负数 还是零 
console.log("7. Math.sign 判断一个数到底为正数 负数 还是零"); 
console.log(Math.sign(100));
console.log(Math.sign(0)); 
console.log(Math.sign(-20000));
```

## 十八、对象扩展

ES6 新增了一些 Object 对象的方法:

1. Object.is 比较两个值是否严格相等，与『===』行为基本一致(+0 与 NaN); 
2. Object.assign 对象的合并，将源对象的所有可枚举属性，复制到目标对象;
3. **proto**、setPrototypeOf、 setPrototypeOf 可以直接设置对象的原型;

```js
// 对象扩展
// 1. Object.is 比较两个值是否严格相等，与『===』行为基本一致(+0 与 NaN); console.log(Object.is(120,120)); // ===
// 注意下面的区别
console.log(Object.is(NaN,NaN));
console.log(NaN === NaN);
// NaN与任何数值做===比较都是false，跟他自己也如此!
// 2. Object.assign 对象的合并，将源对象的所有可枚举属性，复制到目标对象; 
const config1 = {
  host : "localhost", port : 3306,
  name : "root",
  pass : "root",
  test : "test" // 唯一存在
}
const config2 = {  
  host : "http://zibo.com",
  port : 300300600,
  name : "root4444",
  pass : "root4444",
  test2 : "test2"
}
// 如果前边有后边没有会添加，如果前后都有，后面的会覆盖前面的 
console.log(Object.assign(config1,config2));
// 3. __proto__、setPrototypeOf、 getPrototypeOf 可以直接设置对象的原型; 
const school = {
	name : "尚硅谷" }
	const cities = {
	xiaoqu : ['北京','上海','深圳']
}
// 并不建议这么做 
Object.setPrototypeOf(school,cities); 
console.log(Object.getPrototypeOf(school)); 
console.log(school);
```

## 十九、模块化

### 概述

模块化是指将一个大的程序文件，拆分成许多小的文件，然后将小文件组合起来;

模块化的好处

### 模块化的优势有以下几点:

1. 防止命名冲突;
2. 代码复用;
3. 高维护性;

模块化规范产品

### ES6 之前的模块化规范有:

1. CommonJS => NodeJS、Browserify; 
2. AMD => requireJS;
3. CMD => seaJS;

### **ES6** 模块化语法

模块功能主要由两个命令构成:export 和 import;

- export 命令用于规定模块的对外接口(导出模块);
-  import 命令用于输入其他模块提供的功能(导入模块);

#### 暴露数据语法汇

```js
// 分别暴露(导出)
export let school = "321";
export function teach(){ 
	console.log("412412!");
}

// 统一暴露(导出)
let school = "4214";
function findJob(){ 
  console.log("14"
}
export {school,findJob}

// 默认暴露(导出) 
export default{
	school : "fadsfas", 
  change : function(){
  	console.log("fasdfdas!"); 
  }
}
```

#### 导入模块语法汇总

```js
// 1.通用方式
// 引入m.js模块内容
import * as m from "./js/m.js";
console.log(m);
console.log(m.school);
m.teach();
// 引入n.js模块内容
import * as n from "./js/n.js";
console.log(n);
console.log(n.school);
n.findJob();
// 引入o.js模块内容
import * as o from "./js/o.js";
console.log(o);
// 2.注意这里调用方法的时候需要加上default 
console.log(o.default.school);
o.default.change();
// 3.解构赋值形式
import {school,teach} from "./js/m.js";
// 重名的可以使用别名
import {school as xuexiao,findJob} from "./js/n.js"; 
// 4.导入默认导出的模块，必须使用别名
import {default as one} from "./js/o.js";
// 直接可以使用
console.log(school);
teach();
console.log(xuexiao);
console.log(one);
console.log(one.school);
one.change();
// 5.简便形式，只支持默认导出 
import oh from "./js/o.js"; 
console.log(oh); 
console.log(oh.school); 
oh.change();
```

## 二十、Babel对ES6模块化代码转换

### Babel概述:

Babel 是一个 JavaScript 编译器;

Babel 能够将新的ES规范语法转换成ES5的语法; 

因为不是所有的浏览器都支持最新的ES规范，所以，一般项目中都需要使用Babel进行转换; 

步骤:使用Babel转换JS代码——打包成一个文件——使用时引入即可;

### 步骤

第一步:安装工具babel-cli(命令行工具) babel-preset-env(ES转换工具) browserify(打包工具， 项目中使用的是webpack);

第二步:初始化项目

npm init -y

第三步:安装

```js
npm i babel-cli babel-preset-env browserify
```

第四步:使用babel转换

```js
npx babel js(js目录) -d dist/js(转化后的js目录) --presets=babel-preset-env
```

第五步:打包

```js
npx browserify dist/js/app.js -o dist/bundle.js
```

第六步:在使用时引入bundle.js

```js
<script src="./js/bundle.js" type="module"></script>
```

## 二十一、ES7新特性

### 1、Array.prototype.includes

Includes 方法用来检测数组中是否包含某个元素，返回布尔类型值; 判断数组中是否包含某元素，语法:arr.includes(元素值);

```js
 let arr = [1,2,3,4,5];
 console.log(arr.includes(1));
```

### 2、指数操作符

在 ES7 中引入指数运算符「**」，用来实现幂运算，功能与 Math.pow 结果相同; 幂运算的简化写法;

```js
// 指数操作符 
console.log(Math.pow(2,10))
console.log(2**10)
```

## 二十二、ES8新特性

### 1、async和await

async 和 await 两种语法结合可以让异步代码看起来像同步代码一样; 简化异步函数的写法;

#### async 函数:

1. async 函数的返回值为 promise 对象;
2. promise 对象的结果由 async 函数执行的返回值决定;

```js
// async函数:异步函数 
async function fn(){
  // return 123; // 返回普通数据
  // 若报错，则返回的Promise对象也是错误的
  // throw new Error("出错啦!");
  // 若返回的是Promise对象，那么返回的结果就是Promise对象的结果 
  return new Promise((resolve,reject)=>{
    // resolve("成功啦!");
    reject("失败啦!"); 
  })
}
const result = fn();
// console.log(result); // 返回的结果是一个Promise对象 // 调用then方法
result.then(value => {
  console.log(value);
},reason => {
  console.warn(reason);
});
```

#### await 表达式

1. await 必须写在 async 函数中;
2. await 右侧的表达式一般为 promise 对象;
3. await 返回的是 promise 成功的值;
4. await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理;

```js
// async函数 + await表达式:异步函数
// 创建Prmise对象
const p = new Promise((resolve,reject)=>{
  resolve("成功啦!"); 
})
async function fn(){
// await 返回的是 promise 成功的值 
  let result = await p;
  console.log(result); // 成功啦!
}   
fn();
```

### 2、对象方法扩展 Object.values、Object.entries和Object.getOwnPropertyDescriptors

1. Object.values()方法:返回一个给定对象的所有可枚举属性值的数组;
2. Object.entries()方法:返回一个给定对象自身可遍历属性 [key,value] 的数组;
3. Object.getOwnPropertyDescriptors()该方法:返回指定对象所有自身属性的描述对象;

```js
    // 对象方法扩展
    let school = {
      name : "訾博",
      age : 24,
      sex : "男"
    }
    // 获取对象所有的键
    console.log(Object.keys(school));
    // 获取对象所有的值
    console.log(Object.values(school));
    // 获取对象的entries
    console.log(Object.entries(school));
    // 创建map
    const map = new Map(Object.entries(school));
    console.log(map);
    console.log(map.get("name"));
    console.log(Object.getOwnPropertyDescriptors(school));
    // 参考内容:
    const obj = Object.create(null, {
      name: {
        // 设置值
        value: "訾博",
        // 属性特性
        writable: true,
        configuration: true,
        enumerable: true
      }
    })
```

## 二十三、ES9特性

### 1、Rest参数与spread 扩展运算符

Rest 参数与 spread 扩展运算符在 ES6 中已经引入，不过 ES6 中只针对于数组，在 ES9 中为对象提供了 像数组一样的 rest 参数和扩展运算符;

### 2、正则扩展:命名捕获分组

ES9 允许命名捕获组使用符号『?』,这样获取捕获结果可读性更强;

```js
// 正则扩展:命名捕获分组
// 声明一个字符串
let str = '<a href="http://www.baidu.com">訾博</a>'; // 需求:提取url和标签内文本
// 之前的写法
const reg = /<a href="(.*)">(.*)<\/a>/;
// 执行
const result = reg.exec(str);
console.log(result);
// 结果是一个数组，第一个元素是所匹配的所有字符串
// 第二个元素是第一个(.*)匹配到的字符串
// 第三个元素是第二个(.*)匹配到的字符串
// 我们将此称之为捕获
console.log(result[1]);
console.log(result[2]);
// 命名捕获分组
const reg1 = /<a href="(?<url>.*)">(?<text>.*)<\/a>/; 
const result1 = reg1.exec(str);
console.log(result1);
// 这里的结果多了一个groups
// groups:
// text:"訾博"
// url:"http://www.baidu.com" 
console.log(result1.groups.url); 
console.log(result1.groups.text);
```

### 3、正则扩展:反向断言

ES9 支持反向断言，通过对匹配结果前面的内容进行判断，对匹配进行筛选

```js
// 正则扩展:反向断言
// 字符串
let str = "JS5201314你知道么555啦啦啦";
// 需求:我们只想匹配到555
// 正向断言
const reg = /\d+(?=啦)/; // 前面是数字后面是啦 
const result = reg.exec(str); 
console.log(result);
// 反向断言
const reg1 = /(?<=么)\d+/; // 后面是数字前面是么 
const result1 = reg.exec(str); 
console.log(result1);
```

### 4、正则扩展:dotAll模式

```js
// 正则扩展:dotAll 模式
// dot就是. 元字符，表示除换行符之外的任意单个字符 
let str = `
  <ul>
  <li>
  <a>肖生克的救赎</a> <p>上映日期: 1994-09-10</p>
  </li> <li>
  <a>阿甘正传</a>
  <p>上映日期: 1994-07-06</p> </li>
  </ul> 
`
// 需求:我们想要将其中的电影名称和对应上映时间提取出来，存到对象
// 之前的写法
// const reg = /<li>\s+<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/;
// dotAll 模式
const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs; 
// const result = reg.exec(str);
// console.log(result);
let result;
let data = [];
while(result = reg.exec(str)){
  console.log(result);
  data.push({title:result[1],time:result[2]});  
}  
console.log(data);
```

## 二十四、ES10新特性

### 1、Object.fromEntries

```js
// Object.fromEntries:将二维数组或者map转换成对象 
// 之前学的Object.entries是将对象转换成二维数组
// 此方法接收的是一个二维数组，或者是一个map集合
// 二维数组
const result = Object.fromEntries([ 
  ["name","訾博"],
  ["age",24]
]);
console.log(result);
const m = new Map(); 
m.set("name","訾博");
m.set("age",24);
const result1 = Object.fromEntries(m);
console.log(result1);
```

### 2、trimStart 和trimEnd

```js
// trimStart 和 trimEnd
let str = " zibo "; 
console.log(str.trimLeft());
console.log(str.trimRight()); 
console.log(str.trimStart()); 
console.log(str.trimEnd());
```

### 3、Array.prototype.flat与 flatMap

将多维数组转换成低维数组;

```js
// Array.prototype.flat 与 flatMap 
// flat
// 将多维数组转换成低维数组
// 将二维数组转换成一维数组
const arr = [1,2,3,[4,5],6,7]; 
console.log(arr.flat());
// 将三维数组转换成二维数组
const arr2 = [1,2,3,[4,5,[6,7]],8,9]; 
console.log(arr2.flat());
// 将三维数组转换成一维数组 
console.log(arr2.flat(2));
// flatMap
const arr3 = [1,2,3,4,5];
const result0 = arr3.map(item => item * 10);
console.log(result0);
const result = arr3.map(item => [item * 10]);
console.log(result);
const result1 = arr3.flatMap(item => [item * 10]);
console.log(result1);
```

### 4、Symbol.prototype.description

```js
// Symbol.prototype.description 
// 获取Symbol的描述字符串
// 创建Symbol
let s = Symbol("訾博"); 
console.log(s.description)
```

## 二十五、ES11 新特性

### 1、String.prototype.matchAll

用来得到正则批量匹配的结果;

```js
// String.prototype.matchAll 
// 用来得到正则批量匹配的结果 
let str = `
  <ul>
    <li>
      <a>肖生克的救赎</a> 
        <p>上映日期: 1994-09-10</p>
        </li> <li>
      <a>阿甘正传</a>
      <p>上映日期: 1994-07-06</p> 
		</li>
  </ul>
`;
// 正则
const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/sg; 
const result = str.matchAll(reg);
// 返回的是可迭代对象，可用扩展运算符展开 
// console.log(...result);
// 使用for...of...遍历
for(let v of result){
  console.log(v);
}
```

### 2、类的私有属性

私有属性外部不可访问直接;

```js
// 类的私有属性 
class Person{
  // 公有属性
  name;
  // 私有属性
  #age;
  #weight;
  // 构造方法
  constructor(name, age, weight){     
    this.name = name;
    this.#age = age;
    this.#weight = weight;
  } 
	intro(){    
    console.log(this.name);
    console.log(this.#age);
    console.log(this.#weight);       
  } 
}
// 实例化
const girl = new Person("小兰",18,"90kg"); 
console.log(girl);
// 公有属性的访问
console.log(girl.name);
// 私有属性的访问
console.log(girl.age); // undefined
// 报错Private field '#age' must be declared in an enclosing class 
// console.log(girl.#age);
girl.intro();
```

### 3、Promise.allSettled

获取多个promise执行的结果集;

```js
// Promise.allSettled
// 获取多个promise执行的结果集
// 声明两个promise对象
const p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{ 
    resolve("商品数据——1")
  },1000)
})
const p2 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject("失败啦")
  },1000)
})
// 调用Promise.allSettled方法
const result = Promise.allSettled([p1,p2]); 
console.log(result);
const result1 = Promise.all([p1,p2]); // 注意区别 
console.log(result1);
```

### 4、可选链操作符

如果存在则往下走，省略对对象是否传入的层层判断;

```js
  // 可选链操作符
  // ?.
  function main(config){
    // 传统写法
    // const dbHost = config && config.db && config.db.host; 
    // 可选链操作符写法
    const dbHost = config?.db?.host;
    console.log(dbHost);
  } 
	main({        
    db:{        
      host:"192.168.1.100",
      username:"root"
		}, 
    cache:{
      host:"192.168.1.200",
      username:"admin"
    }
	})
```

### 5、动态import导入

动态导入模块，什么时候使用时候导入;

Hello.js

```js
export function hello(){
    alert('Hello');
}
```

app.js:

```js
// 传统静态导入 
// import * as m1 from "./hello.js"; 

// 获取元素
const btn = document.getElementById('btn');
btn.onclick = function(){
  	// 动态
    import('./hello.js').then(module => {
        module.hello();
    });
}
```

### 6、BigInt

更大的整数;

```js
// BigInt
// 大整型
let n = 100n; 
console.log(n,typeof(n));
// 函数:普通整型转大整型 
let m = 123; 
console.log(BigInt(m));
// 用于更大数值的运算
let max = Number.MAX_SAFE_INTEGER; 
console.log(max); 
console.log(max+1); 
console.log(max+2); // 出错了
            
console.log(BigInt(max));
console.log(BigInt(max)+BigInt(1));
console.log(BigInt(max)+BigInt(2));
```

### 7、globalThis对象

始终指向全局对象window;

```js
// globalThis 对象 : 始终指向全局对象window
console.log(globalThis);
```
