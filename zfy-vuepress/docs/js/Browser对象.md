# Browser对象(window)

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

### 1.2 location对象

location为全局对象window的一个属性，且window.location===document.location，其中的属性都是可读写的，但是只有修改href和hash才有意义，href会重新定位到一个URL，hash会跳到当前页面中的anchor名字的标记(如果有)，而且页面不会被重新加载。

```js
// 这行代码将会使当前页面重定向到http://www.baidu.com
window.location.href = 'http://www.baidu.com'
----------------------------------------------
// 如果使用hash并且配合input输入框，那么当页面刷新之后，鼠标将会自动聚焦到对应id的input输入框，
<input type="text" id="target">
<script>
  window.location.hash = '#target'
</script>
```

#### 属性

| 属性         | 描述                                                         | 值                                                    |
| ------------ | ------------------------------------------------------------ | ----------------------------------------------------- |
| href         | 设置或返回完整得URL                                          | https://juejin.cn/post/6844904136161361933#heading-55 |
| protocol     | 设置或返回当前URL协议,最后有个':'                            | https:                                                |
| host         | 设置或返回当前URL的主机名，可能在该串最后带有一个":"并跟上URL的端口号。 | juejin.cn:88                                          |
| hostname     | 设置或返回当前URL的主机名                                    | juejin.cn                                             |
| port         | 设置或返回当前URL的端口号                                    | 88                                                    |
| pathname     | 设置或返回当前URL的路径部分，开头有个'/'                     | /post/6844904136161361933                             |
| search       | 设置或返回从(?)开始的URL(查询部分)                           | ？name=kang&when=2011                                 |
| hash         | 设置或返回从（#）开始的URL(锚)                               | #heading-55                                           |
| origin(只读) | 返回url中完整的协议和主机地址部分,包括端口                   | https://juejin.cn/post/6844904136161361933:88         |

- 可以通过上述属性来获取URL中的指定部分，或者修改href和hash达到重新定位与跳转

- 添加hash改变监听器，来控制hash改变时执行的代码

  ```js
  window.addEventListener("hashchange", funcRef);
  // 或者
  window.onhashchange = funcRef;
  ```

#### 方法

| location.assign()   | 跳转链接，立即打开新的URL且在浏览器历史记录生成一条记录，回退可返回 |
| ------------------- | ------------------------------------------------------------ |
| location.replace()  | 跳转链接，立即打开新的URL，不会在浏览器历史记录生成一条记录，回退不可返回 |
| location.reload()   | 重新加载当前显示页面；参数：true,强制从服务器重新加载，参数：无，使用最有效的方式加载 |
| location.toString() | 返回包含整个URL字符串                                        |

### 1.3navigator对象

- `window.navigator`对象包含**有关浏览器的信息**，可以用它来查询一些关于运行当前脚本的应用程序的相关信息

```js
document.write("浏览器的代码名:" + navigator.appCodeName + "<br>");
document.write("浏览器的名称:" + navigator.appName + "<br>");
document.write("当前浏览器的语言:" + navigator.browserLanguage + "<br>");
document.write("浏览器的平台和版本信息:" + navigator.appVersion + "<br>");
document.write("浏览器中是否启用 cookie :" + navigator.cookieEnabled + "<br>");
document.write("运行浏览器的操作系统平台 :" + navigator.platform + "<br>");
```

`navigator.appCodeName` 只读,任何浏览器中，总是返回 'Gecko'。该属性仅仅是为了保持兼容性。

`navigator.appName` 只读,返回浏览器的官方名称。不要指望该属性返回正确的值。

`navigator.appVersion` 只读,返回一个字符串，表示浏览器的版本。不要指望该属性返回正确的值。

`navigator.platform` 只读,返回一个字符串，表示浏览器的所在系统平台。

`navigator.product` 只读,返回当前浏览器的产品名称（如，"Gecko"）。

`navigator.userAgent` 只读,返回当前浏览器的用户代理字符串（user agent string）

https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator

### 1.4 requestAnimationFrame

```js
window.requestAnimationFrame(callback)
// 返回值：一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。
// 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
```

```js
const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  //这里使用`Math.min()`确保元素刚好停在200px的位置。
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

  if (elapsed < 2000) { // 在两秒后停止动画
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

