# Set数据结构

## 基本介绍

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

## 方法

### add()

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

### clear()

 用来清空一个 `Set` 对象中的所有元素。返回值：undefined。

```js
mySet.clear()
```

### delete()

可以从一个 `Set` 对象中删除指定的元素。成功删除返回 `true`，否则返回 `false。`

```js
var mySet = new Set();
mySet.add("foo");

mySet.delete("bar"); // 返回 false，不包含 "bar" 这个元素
mySet.delete("foo"); // 返回 true，删除成功

mySet.has("foo");    // 返回 false，"foo" 已经成功删除
```

### forEach(callback, thisArg)

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

### **has()** 

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

### **entries()** 

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

### values()

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

### keys()

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

## 应用实例

### 数组去重

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

### 去除字符串里面的重复字符

```js
[...new Set('ababbc')].join('') // "abc"
```

### set对象与数组之间的转换

```js
var arr = [1,2,3,4,4];
var set = new Set(arr) //数组转换set对象
set //{1,2,3,4}
// 方法一
Array.from(set) //[1,2,3,4]
// 方法二
[...set] //[1,2,3,4]
```

### 数组去重&(并集交集差集)

#### 并集

```js
let arr1 = [1,2,3,4,5];
let arr2 = [4,5,6,7,8];
let a = new Set(arr1);
let b= new Set(arr2)

new Set([...arr1,...arr2]) //{1,2,3,4,5,6,7,8}
let arr3 = [...new Set([...arr1,...arr2])] //[1,2,3,4,5,6,7,8]
```

#### 交集

```js
let arr3 = new Set(arr1.filter(x=>b.has(x))) //{4,5}
```

#### 差集

```js
let arr3 = new Set(arr1.filter(x=>!b.has(x))) //{1,2,3}
let arr4 = new Set(arr2.filter(x=>!a.has(x))) //{6,7,8}
[...arr3,...arr4] //[1,2,3,6,7,8]
```

#### 数组对象去重

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

