# Browser对象

## 1.wondow对象

### 1.1 setTimeout

```js
const text = setTimeout(function, milliseconds, param1, param2, ...)
setTimeout(function, milliseconds, ...args)
// 参数一：必选，调用的code或函数；参数二：可选，毫秒 等待时间；参数三：可选，传递给执行函数的其他参数；
// 返回一个Id,通过clearTimeout取消
clearTimeout(text)
text = null
```

```js
// 举例
const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args)
delay((...text) => {
	console.log(text)
}, 1000, '测试'， '测试2')
// ['测试', '测试2']
```

