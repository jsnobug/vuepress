# Promise

js编程中编写异步代码的方式。

## 基本用法

```js
let p = new Promise((resolve,reject) => {
	// do some
	// 什么情况下reject或resolve
	if (// 条件) {
		resolve()
	} else {
		reject()
	}
})

p.then( () => {
	// 如果p的状态被resolve
}, () => {
	// 如果p的状态被reject
})
```

第一段调用了Promise构造函数，第二段是调用了promise实例的.then方法

1. #### 构造实例

- 构造函数接受一个函数作为参数
- 调用构造函数得到实例p的同时，作为参数的函数会立即执行
- 参数函数接受两个回调函数参数resolve和reject
- 在参数函数被执行的过程中，如果在其内部调用resolve，会将p的状态变成fulfilled，或者调用reject，会将p的状态变成rejected

2. #### 调用.then

- 调用.then可以为实例p注册两种状态回调函数
- 当实例p的状态为fulfilled，会触发第一个函数执行
- 当实例p的状态为rejected，则触发第二个函数执行

## 异步任务并行

有了多个异步任务后，下面假设想要多个异步任务并行执行，获取执行成功后，才处理结果。用回调方式来写，可采用下面的办法：

```js
let tasks = [getData1, getData2, getData3, getData4, getData5]
let datas = []

tasks.forEach(task => {
  task(data => {
    datas.push(data)

    if (datas.length == tasks.length) {
      // datas里已经包含全部的数据了
    }
  })
})
```

如果用Promise的all方法

```js
// 先要把getData们转成promise对象
new Promise()

// 然后
Promise.all([
  getData1,
  getData2,
  getData3,
  getData4,
  getData5
]).then(datas => {
  // 已拿到全部的data，可以处理了
})
```

## 3种状态

首先，promise实例有三种状态：

- pending（待定）
- fulfilled（已执行）
- rejected（已拒绝）

fulfilled和rejected有可以说是已成功和已失败，这两种状态又归为已完成状态。

**resolve和reject**

调用resolve和reject能将分别将promise实例的状态变成fulfilled和rejected，只有状态变成已完成（即fulfilled和rejected之一），才能触发状态的回调

## Promise API

#### new Promise

一个异步过程转化成promise对象。先有了promise对象，然后才有promise编程方式。

#### .then 和 .catch

1. .then用于为promise对象的状态注册回调函数。它会返回一个promise对象，所以可以进行链式调用，也就是.then后面可以继续.then。在注册的状态回调函数中，可以通过return语句改变.then返回的promise对象的状态，以及向后面.then注册的状态回调传递数据；也可以不使用return语句，那样默认就是将返回的promise对象resolve。

2. .catch用于注册rejected状态的回调函数，同时该回调也是程序出错的回调，即如果前面的程序运行过程中出错，也会进入执行该回调函数。同.then一样，也会返回新的promise对象。

   ```js
   promiseClick()
   .then(function(data){
       console.log(data);
       return runAsync2();
   })
   .then(function(data){
       console.log(data);
       return runAsync3();
   })
   .then(function(data){
       console.log(data)
   }).catch( err => {
   	console.log(err)
   })
   ```

#### Promise.all和Promise.race

all上文已提到结果会放在一个数组里面，race是只要有1个成功获取就触发

```js
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'race P1');
    console.log('p1')
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'race P2');
    console.log('p2')
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'p1' 'race p1'  'p2'
});
// 但是会继续执行p2，只是不进入race的结果里面
```

#### Promise.resolve和Promise.reject

```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))


const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))
```

## async和await

语法糖

1. await后面必须跟着promise对象
2. await只能放在async函数里面
3. async将函数变出异步函数

```js
function 摇色子(猜测){
    return new Promise((resolve, reject)=>{
        let sino = parseInt(Math.random() * 6 +1)
        if(sino > 3){
            if(猜测 === '大'){
                resolve(sino)
            }else{
                reject(sino)
            }
        }else{
            if(猜测 === '大'){
                reject(sino)
            }else{
                resolve(sino)
            }
        }
        setTimeout(()=>{
            resolve(sino)
        },300)
    })
}
async function test(){
    //await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
    try{
        //把await及获取它的值的操作放在try里
        let n =await 摇色子('大')  //类似 摇色子('大').then()
        console.log('赢了' + n)
    }catch(error){
      //失败的操作放在catch里
        console.log('输了' + error)
    }
    
    // 或者
    let n =await 摇色子('大').catch(err=> {console.log('输了' + error)})
     console.log('赢了' + n)
    
}
test()
```

## javascript执行机制

js是一门单线程语言。

### 事件循环

js任务分为

- 同步任务
- 异步任务（定时器，ajax请求，回调函数，事件）

而执行过程如下

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table（事件列表）并注册函数。
- 当指定的事情完成时，Event Table会将这个函数移入Event Queue（事件队列）。
- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

### 事件队列

js中有两类任务队列：宏任务队列和微任务队列。宏任务队列可以有多个，微任务队列只有一个

- 宏任务：script(全局任务)，setTimeout,setInterval
- 微任务：process.nextTick, Promise, Object.observer等

::: tip

进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

:::

#### 看个简单的案列

```js
setTimeout(function(){
  console.log('定时器开始啦')
})

new Promise(function(resolve){
  console.log('马上执行for循环啦');
  for(var i = 0; i < 10000; i++){
      i == 99 && resolve();
  }
}).then(function(){
  console.log('执行then函数啦')
})

console.log('代码执行结束')
```

- 这段代码作为宏任务，进入主线程。 (全局script)
- 先遇到`setTimeout`，那么将其回调函数注册后分发到宏任务Event Queue。(注册过程与上同，下文不再描述)。
- 接下来遇到了`Promise`，`new Promise`立即执行，`then`函数分发到微任务Event Queue。
- 遇到`console.log()`，立即执行。
- 好啦，整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了`then`在微任务Event Queue里面，执行。
- ok，第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中`setTimeout`对应的回调函数，立即执行。
- 结束。

#### 再看个复杂的案例

```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

**记住原理，先执行一个宏任务，再清空所有微任务，不断循环 。**

第一轮事件循环流程分析如下：

- 整体script作为第一个宏任务进入主线程，遇到`console.log`，输出1。
- 遇到`setTimeout`，其回调函数被分发到宏任务Event Queue中。我们暂且记为`setTimeout1`。
- 遇到`process.nextTick()`，其回调函数被分发到微任务Event Queue中。我们记为`process1`。
- 遇到`Promise`，`new Promise`直接执行，输出7。`then`被分发到微任务Event Queue中。我们记为`then1`。
- 又遇到了`setTimeout`，其回调函数被分发到宏任务Event Queue中，我们记为`setTimeout2`。

| 宏任务Event Queue | 微任务Event Queue |
| :---------------: | :---------------: |
|    setTimeout1    |     process1      |
|    setTimeout2    |       then1       |

- 上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。
- 我们发现了`process1`和`then1`两个微任务。
- 执行`process1`,输出6。
- 执行`then1`，输出8。

好了，第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。那么第二轮时间循环从`setTimeout1`宏任务开始：

- 首先输出2。接下来遇到了`process.nextTick()`，同样将其分发到微任务Event Queue中，记为`process2`。`new Promise`立即执行输出4，`then`也分发到微任务Event Queue中，记为`then2`。

| 宏任务Event Queue | 微任务Event Queue |
| :---------------: | :---------------: |
|    setTimeout2    |     process2      |
|                   |       then2       |

- 第二轮事件循环宏任务结束，我们发现有`process2`和`then2`两个微任务可以执行。
- 输出3。
- 输出5。
- 第二轮事件循环结束，第二轮输出2，4，3，5。
- 第三轮事件循环开始，此时只剩setTimeout2了，执行。
- 直接输出9。
- 将`process.nextTick()`分发到微任务Event Queue中。记为`process3`。
- 直接执行`new Promise`，输出11。
- 将`then`分发到微任务Event Queue中，记为`then3`。

| 宏任务Event Queue | 微任务Event Queue |
| :---------------: | :---------------: |
|                   |     process3      |
|                   |       then3       |

- 第三轮事件循环宏任务执行结束，执行两个微任务`process3`和`then3`。
- 输出10。
- 输出12。
- 第三轮事件循环结束，第三轮输出9，11，10，12。

整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12



### setTimeout和setInterval

由于js执行机制原因，如果主线程处理过久，定时器都进入了事件队列，等主线程为空时，会一次全部执行完成，造成时间不准确情况。

根据html标准（最低4毫秒)，即使主线程为空，也需要等待4毫秒执行。

### Promise与process.nextTick(callback)

process.nextTick(callback)类似node.js版的"setTimeout"，在事件循环的下一次循环中调用 callback 回调函数。

Promise.then则是具有代表性的微任务。