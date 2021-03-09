# ES6及以上特性

**Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构**

- 集合

集合，是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合

- 字典

字典（dictionary）是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同

区别

- 共同点：集合、字典都可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

## Set数据结构

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

## Map数据结构

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

## 一、var、let和const

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

## 二、解构赋值

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

## 三、模板字符串

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

## 四、箭头函数

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

## 五、函数默认参数值

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

## 六、剩余参数

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

## 七、扩展运算符（展开算法）

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

## 八、Class

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

## 九、对象简化写法

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

## 十、Symbol 基本数据类型

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

## 十一、迭代器

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

## 十二、生成器

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

## 十三、Promise

详细见Promise文章