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