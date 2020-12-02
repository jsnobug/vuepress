# Set和map数据结构

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

