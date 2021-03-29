# js技巧

https://zhuanlan.zhihu.com/p/258068663?utm_source=wechat_session&utm_medium=social&utm_oi=615168229740646400

## 1.函数防抖(debounce)

```js
	/**
     * @desc 函数防抖
     * @param func 目标函数
     * @param wait 延迟执行毫秒数
     * @param immediate true - 立即执行， false - 延迟执行
     */
    function debounce(func, wait, immediate = false) {
      let timer = null
      return function() {
        if (timer) clearTimeout(timer)
        if (immediate) {
          timer = setTimeout(() => {
            timer = null
          }, wait)
          if (!timer) func.apply(this, arguments) // this 调用者，arguments 形参
        } else {
          timer  = setTimeout(() => {
            func.apply(this, arguments)
          }, wait)
        }
      }
    }
```

防抖常应用于用户进行搜索输入节约请求资源，主要应用场景有：input验证、搜索联想、resize。

## 2.函数节流(**throttle**)

```js
    /**
     * @desc 函数节流
     * @param func 函数
     * @param wait 延迟执行毫秒数
     */
    const throttle = (func, wait) => {
      let flag = true;
      return function() {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
          fn.apply(this, arguments);
          flag = true;
        }, wait);
      }
    }
```

多数在监听页面元素滚动事件的时候会用到。

## 3.图片懒加载

可以给img标签统一自定义属性`data-src='default.png'`，当检测到图片出现在窗口之后再补充**src**属性，此时才会进行图片资源加载。

```js
function lazyload() {
  const imgs = document.getElementsByTagName('img');
  const len = imgs.length;
  // 视口的高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop;
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}

// 可以使用节流优化一下
window.addEventListener('scroll', lazyload);
```

## 4.滚动加载

原理就是监听页面滚动事件，**分析clientHeight**、**scrollTop**、**scrollHeight**三者的属性关系。

```js
window.addEventListener('scroll', function() {
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  if (clientHeight + scrollTop >= scrollHeight) {
    // 检测到滚动至页面底部，进行后续操作
    // ...
  }
}, false);
```

## 5.渲染几万条数据

渲染大数据时，合理使用**createDocumentFragment**和**requestAnimationFrame**，将操作切分为一小段一小段执行。

```js
setTimeout(() => {
  // 插入十万条数据
  const total = 100000;
  // 一次插入的数据
  const once = 20;
  // 插入数据需要的次数
  const loopCount = Math.ceil(total / once);
  let countOfRender = 0;
  const ul = document.querySelector('ul');
  // 添加数据的方法
  function add() {
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < once; i++) {
      const li = document.createElement('li');
      li.innerText = Math.floor(Math.random() * total);
      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    countOfRender += 1;
    loop();
  }
  function loop() {
    if(countOfRender < loopCount) {
      window.requestAnimationFrame(add);
    }
  }
  loop();
}, 0)
```

## 6.将VirrualDom转化为真实DOM结构

spa应用的核心概念之一

```js
// vnode结构：
// {
//   tag,
//   attrs,
//   children,
// }

//Virtual DOM => DOM
function render(vnode, container) {
  container.appendChild(_render(vnode));
}
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    })
  }
  // 子数组进行递归操作
  vnode.children.forEach(child => render(child, dom));
  return dom;
}
```

## 7.详解FormData 、Blob、File、FileReader、ArrayBuffer、URL、URLSearchParams对象

### FormData

::: tip

利用`FormData对象`,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的[`send()`](https://developer.mozilla.org/zh-CN/DOM/XMLHttpRequest#send())方法来异步的提交这个"表单".比起普通的ajax,使用`FormData`的最大优点就是我们可以异步上传一个二进制文件。

:::

```js
var formData = new FormData();
formData.append("k1", "v1"); //append()方法的第二个参数可以是File,Blob对象
formData.append("k1", "v2");
formData.get("k1"); // // "v1" 获取key为name的第一个值
formData.getAll("k1"); // ["v1","v2"] 返回一个数组，获取key为name的所有值
formData.set("k1", "1"); //设置修改数据
formData.has("k1"); // true 来判断是否有对应的key值
formData.has("k2"); // false
formData.delete("k1"); //删除数据
```

根据已有form表单初始化一个formData对象：

```js
// 获取页面已有的一个form表单
var form = document.getElementById("myForm");
// 用表单来初始化
var formData = new FormData(form);
// 我们可以根据name来访问表单中的字段
var name = formData.get("name"); // 获取名字
var psw = formData.get("pw"); // 获取密码
// 当然也可以在此基础上，添加其他数据
formData.append("token","kshdfiwi3rh");
```

发送一个二进制数据流：

```js
var content = '<a id="a"><b id="b">hey!</b></a>'; 
var blob = new Blob([content], { type: "text/xml"});
formData.append("file", blob);
axios.post('http://demo.api.com/doSomething', formData,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
       }
   }
)
```

### Blob

::: tip

一个Blob对象就是一个包含有只读原始数据的类文件对象。Blob对象中的数据并不一定得是JavaScript中的原生形式。File接口基于Blob，继承了Blob的功能,并且扩展支持了用户计算机上的本地文件。

:::

Blob对象可以看做是存放二进制数据的容器，但要读取里面的二进制数据，需要用`FileReader`；此外还可以通过Blob设置二进制数据的MIME类型。

```css
/**
* Blob构造函数：
* dataArray：数组，包含了要添加到Blob对象中的数据，数据可以是Int32Array、Uint8Array、Float32Array等，或者连续内存缓冲区ArrayBuffer，ArrayBufferView， Blob，或者 DOMString对象。
* opt：对象，用于设置Blob对象的属性（如：MIME类型）
**/
var blob = new Blob(dataArr:Array<any>, opt:{type:string});
```

1. 创建一个装填DOMString对象的Blob对象

   ```js
   var s = '<div>hello</div>'
   var blobObj = new Blob([s], {type: 'text/xml'})
   ```

2. 创建一个装填ArrayBuffer对象的Blob对象

   ```js
   var abf = new ArrayBuffer(8)
   var blobOjb = new Blob([abf], {type: 'text/plain'})
   ```

3. Blob.slice()

   ```
   /**
   * start：开始索引，默认为0
   * end：截取结束索引（不包括end）
   * contentType：新Blob的MIME类型，默认为空字符串
   **/
   Blob.slice(start:number, end:number, contentType:string)
   ```

4. Canvas.toBlob()

   canvas转为blob对象

5. 实现url下载文件

   window.URL对象可以为Blob对象生成一个网络地址，结合a标签的download属性，可以实现点击url下载文件

   ```js
   function createDownload(fileName, content){
       var blob = new Blob([content]);
       var link = document.createElement("a");
       link.download = fileName;
       link.href = URL.createObjectURL(blob); //可以直接当作image的src属性来显示图片
       link.click()
   }
   ```

### File

::: tip

File是Blob的子类，比blob主要多出一个name的属性。

:::

我们常用的文件选择标签<inout type="file" />元素就拥有一个files属性，这个files就是File类型

```js
var input = document.querySelector('input[type=file]');
console.log(input.files) // FileList {0: File(3044232), length: 1}
```

### URL

::: tip

除了可以使用base64字符串作为内容的DataURI将一个文件嵌入到另外一个文档里，还可以使用URL对象。URL对象用于生成指向File对象或Blob对象的URL

:::

**实例属性：**

```js
var url = new URL(location.href)
url.href //包含完整 URL 的DOMString
url.protocol //包含 URL 协议名的DOMString,末尾带 ':'。
url.host //包含 URL 域名，':'，和端口号的DOMString
url.hostname //包含 URL 域名的DOMString
url.port //包含 URL 端口号的DOMString
url.pathname //以 '/' 起头紧跟着 URL 文件路径的DOMString
url.search //以 '?' 起头紧跟着 URL 请求参数的DOMString
url.hash //以 '#' 起头紧跟着 URL 锚点标记的DOMString
url.username //包含在域名前面指定的用户名的DOMString
url.password //包含在域名前面指定的密码的DOMString
url.origin //返回一个包含协议名、域名和端口号的DOMString
url.searchParams //返回一个用来访问当前 URL GET 请求参数的URLSearchParams对象
```

**静态方法：**

- URL.createObjectURL()
   该方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。

```js
var objectURL = URL.createObjectURL(blob);
```

`blob`是用来创建 URL 的 File 对象或者 Blob 对象

- URL.revokeObjectURL()
   该方法用来释放一个之前通过调用 URL.createObjectURL() 创建的已经存在的 URL 对象。当你结束使用某个 URL 对象时，应该通过调用这个方法来让浏览器知道不再需要保持这个文件的引用了。

```js
window.URL.revokeObjectURL(objectURL);
```

`objectURL`是一个 DOMString，表示通过调用 URL.createObjectURL() 方法产生的 URL 对象

### URLSearchParams

URLSearchParams.append() 插入一个指定的键/值对作为新的搜索参数。

URLSearchParams.delete() 从搜索参数列表里删除指定的搜索参数及其对应的值。

URLSearchParams.entries() 返回一个iterator可以遍历所有键/值对的对象。

URLSearchParams.get() 获取指定搜索参数的第一个值。

URLSearchParams.getAll() 获取指定搜索参数的所有值，返回是一个数组。

URLSearchParams.has() 返回Boolean判断是否存在此搜索参数。

URLSearchParams.keys() 返回iterator此对象包含了键/值对的所有键名。

URLSearchParams.set() 设置一个搜索参数的新值，假如原来有多个值将删除其他所有的值。

URLSearchParams.sort()  按键名排序。

URLSearchParams.toString() 返回搜索参数组成的字符串，可直接使用在URL上。

URLSearchParams.values() 返回iterator此对象包含了键/值对的所有值。

```js
var paramsString = "https://www.baidu.com?topic=api&target=bank"
var searchParams = new URLSearchParams(paramsString);

searchParams.has('topic') // true
searchParams.get('topic') // "api"
searchParams.get('target') // "bank"
searchParams.getAll('topic') // ["api"]

searchParams.get('foo') // null，注意Firefox返回空字符串
searchParams.set('foo', 2);
searchParams.get('foo') // 2

searchParams.append('topic', 'webdev');
searchParams.toString() // "q=URLUtils.searchParams&topic=api&foo=2&topic=webdev"

searchParams.append('foo', 3);
searchParams.getAll('foo') // [2, 3]

searchParams.delete('topic');
searchParams.toString() // "q=URLUtils.searchParams&foo=2&foo=3"
```

在一些场景里使用axios发送数据时若需要以application/x-www-form-urlencoded格式发送数据，在浏览器端可以用URLSearchParams的实例当作POST数据发送，所有数据都会URL编码。（*请注意，由于URLSearchParams支持性不好，可以使用polyfill来转换，可以在入口文件引入*）

```js
import 'url-search-params-polyfill';
```

在node环境里可以使用querystring模块进行编码

```js
var querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' });
```

DOM 的 a 元素节点的 `searchParams` 属性，就是一个 URLSearchParams 实例。

```js
var a = document.createElement('a');
a.href = 'https://example.com?filter=api';
a.searchParams.get('filter') // "api"
```

URLSearchParams 还可以与 `URL` 接口结合使用:

```js
var url = new URL(location);
var foo = url.searchParams.get('foo') || 'somedefault';
```

### FileReader

::: tip

我们知道Blob对象只是二进制数据的容器，本身并不能操作二进制，FileReader对象就是专门操作二进制数据的，FileReader主要用于将文件内容读入内存，通过一系列`异步`接口，可以在主线程中访问本地文件。

:::

**创建实例：**

```js
var reader = new FileReader();
```

**方法(入参都是`File`或`Blob`对象)**

reader.abort()  终止文件读取操作

reader.readAsArrayBuffer(file)  异步按字节读取文件内容，结果用ArrayBuffer对象表示

reader.readAsBinaryString(file)  异步按字节读取文件内容，结果为文件的二进制串
 reader.readAsDataURL(file)  异步读取文件内容，结果用data:url(即Base64格式)的字符串形式表示

reader.readAsText(file, encoding)  异步按字符读取文件内容，结果用字符串形式表示

**事件名称**

onabort  当读取操作被中止时调用

onerror  当读取操作发生错误时调用

onload  当读取操作成功完成时调用

onloadend  当读取操作完成时调用,不管是成功还是失败

onloadstart  当读取操作将要开始之前调用

onprogress  在读取数据过程中周期性调用

### 应用场景

1. 上传图片后直接显示出来，而不用先经过后台

   ```js
   var input  = document.getElementById("file"); //input file
   input.onchange = function(){
       var file = this.files[0];
       if(!!file){
           var reader = new FileReader();
           reader.readAsDataURL(file);
           reader.onload = function(){
               //读取完毕后输出结果
              document.getElementById("file_img").src = reader.result //显示上传的图片
              console.log(reader.result);
           }
       }
   }
   ```

2. 图片转二进制Blob

在实际文件上传中，将用户选择的图片读取为ArrayBuffer并保存到新的Blob对象中，二进制的方式传参比直接传图片效率更高)

```js
input.addEventListener('change', function() {
  var file = this.files[0],
      fr = new FileReader(),
      blob;
  fr.onload = function() {
      blob = new Blob([this.result]);
      var formdata = new FormData()
      formdata.append('file', blob)
  };
  fr.readAsArrayBuffer(file)
});图片Image转Base64
```

3. 图片Image转Base64

```js
function getImgToBase64(url,callback){
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var img = new Image
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL('image/png'); //base64格式
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}
```

4. Base64转为`Blob`、`File`

```js
function base64ToBlob(base64){
    var arr = base64.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bytes = atob(arr[1])      //对用base64编码过的二进制进行解码  
    var n = bytes.length
    var u8arr = new Uint8Array(n)
    while(n--){
        u8arr[n]=bytes.charCodeAt(n);   //将编码转换成Unicode编码
    }
    return new Blob([u8arr], {type: mime})
    //or: return new File(u8arr], {type:mime})  //base64转换为文件

   //以二进制的方式传参：
    var formdata = new FormData()
    formdata.append('file', new Blob([u8arr], {type: mime}))
    xhr.send(formdata)
}
```

## 8.  JS如何判断一个元素是否在可视区域中

### 用途

在日常开发中，我们经常需要判断目标元素是否在视窗之内或者和视窗的距离小于一个值（例如 100 px），从而实现一些常用的功能，例如：

- 图片的懒加载
- 列表的无限滚动
- 计算广告元素的曝光情况
- 可点击链接的预加载

### 实现方式

判断一个元素是否在可视区域，我们常用的有三种办法：

- offsetTop、scrollTop
- getBoundingClientRect
- Intersection Observer

![top](/imgs/top.webp)

#### 第一种 offsetTop/scrollTop

下面再来了解下`clientWidth`、`clientHeight`：

- `clientWidth`：元素内容区宽度加上左右内边距宽度，即`clientWidth = content + padding`
- `clientHeight`：元素内容区高度加上上下内边距高度，即`clientHeight = content + padding`

这里可以看到`client`元素都不包括外边距

最后，关于`scroll`系列的属性如下：

- `scrollWidth` 和 `scrollHeight` 主要用于确定元素内容的实际大小

- `scrollLeft` 和 `scrollTop` 属性既可以确定元素当前滚动的状态，也可以设置元素的滚动位置

- 

- - 垂直滚动 `scrollTop > 0`
  - 水平滚动 `scrollLeft > 0`

- 将元素的 `scrollLeft` 和 `scrollTop` 设置为 0，可以重置元素的滚动位置

##### 注意

- 上述属性都是只读的，每次访问都要重新开始

下面再看看如何实现判断：

```
el.offsetTop - document.documentElement.scrollTop <= viewPortHeight
```

```js
function isInViewPortOfOne (el) {
    // viewPortHeight 兼容所有浏览器写法
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 父级可视高度
    const offsetTop = el.offsetTop // 该元素距离父级的高度，固定
    const scrollTop = document.documentElement.scrollTop // 父元素滚动的距离
    const top = offsetTop - scrollTop // 该元素距离父级可视区域顶部的高度
    return top <= viewPortHeight
}
```

#### 第二种、getBoundingClientRect

返回元素的大小及其相对于视口的位置，拥有`left`, `top`, `right`, `bottom`, `x`, `y`, `width`, 和 `height`属性。如果是标准盒子模型，元素的尺寸等于`width/height` + `padding` + `border-width`的总和。如果`box-sizing: border-box`，元素的的尺寸等于 `width/height`。

```css
const target = document.querySelector('.target');
const clientRect = target.getBoundingClientRect();
console.log(clientRect);
```

![rect](/imgs/rect.png)

当页面发生滚动的时候，`top`与`left`属性值都会随之改变

如果一个元素在视窗之内的话，那么它一定满足下面四个条件：

- top 大于等于 0
- left 大于等于 0
- bottom 小于等于视窗高度
- right 小于等于视窗宽度

#### 第三种、Intersection Observer

`Intersection Observer` 即重叠观察者，从这个命名就可以看出它用于判断两个元素是否重叠，因为不用进行事件的监听，性能方面相比`getBoundingClientRect`会好很多。

##### API

```js
// 创建观察者
var io = new IntersectionObserver(callback, option);
// 构造函数的返回值是一个观察器实例。实例的observe方法可以指定观察哪个 DOM 节点。
    // 开始观察
	// 如果要观察多个节点，就要多次调用这个方法。
    io.observe(document.getElementById('example'));
    // 停止观察
    io.unobserve(element);
    // 关闭观察器
    io.disconnect();
```

上面代码中，`IntersectionObserver`是浏览器原生提供的构造函数，接受两个参数：`callback`是可见性变化时的回调函数，`option`是配置对象（该参数可选）。

##### callback 参数

目标元素的可见性变化时，就会调用观察器的回调函数`callback`。

`callback`一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。

```js
var io = new IntersectionObserver(
  entries => {
    console.log(entries);
  }
);
```

上面代码中，回调函数采用的是[箭头函数](http://es6.ruanyifeng.com/#docs/function#箭头函数)的写法。`callback`函数的参数（`entries`）是一个数组，每个成员都是一个[`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，`entries`数组就会有两个成员。

##### IntersectionObserverEntry 对象

`IntersectionObserverEntry`对象提供目标元素的信息，一共有六个属性。

```js

{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,
  target: element
}
time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
target：被观察的目标元素，是一个 DOM 节点对象
rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
boundingClientRect：目标元素的矩形区域的信息
intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
```

##### Option 对象

`threshold`属性决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为`[0]`，即交叉比例（`intersectionRatio`）达到`0`时触发回调函数。

```
new IntersectionObserver(
  entries => {/* ... */}, 
  {
    threshold: [0, 0.25, 0.5, 0.75, 1]
  }
);
```

用户可以自定义这个数组。比如，`[0, 0.25, 0.5, 0.75, 1]`就表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。

root属性和rootMargin属性：IntersectionObserver API 支持容器内滚动。`root`属性指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。

```js
var opts = { 
  root: document.querySelector('.container'),
  rootMargin: "500px 0px" 
};

var observer = new IntersectionObserver(
  callback,
  opts
);
```

##### 注意点

IntersectionObserver API 是异步的，不随着目标元素的滚动同步触发。

规格写明，`IntersectionObserver`的实现，应该采用`requestIdleCallback()`，即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。

### 案例分析

实现：创建了一个十万个节点的长列表，当节点滚入到视窗中时，背景就会从红色变为黄色

```html
// html
<div class="container"></div>
```

```css
// css样.container {
    display: flex;
    flex-wrap: wrap;
}
.target {
    margin: 5px;
    width: 20px;
    height: 20px;
    background: red;
}式
.container {
    display: flex;
    flex-wrap: wrap;
}
.target {
    margin: 5px;
    width: 20px;
    height: 20px;
    background: red;
}
```

```js
// 往container插入1000个元素
const $container = $(".container");

// 插入 100000 个 <div class="target"></div>
function createTargets() {
  const htmlString = new Array(100000)
    .fill('<div class="target"></div>')
    .join("");
  $container.html(htmlString);
}
createTargets()
// 获取所有目标子元素
const $targets = $(".target");
```

首先使用`getBoundingClientRect`方法进行判断元素是否在可视区域

```js
    function isInViewPort(element) {
      const viewWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewHeight =
              window.innerHeight || document.documentElement.clientHeight;
      const { top, right, bottom, left } = element.getBoundingClientRect();

      return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
    }
    $(window).on("scroll", () => {
      console.log("scroll !");
      $targets.each((index, element) => {
        if (isInViewPort(element)) {
          $(element).css("background-color", "yellow");
        }
      });
    });

// 开始监听scroll事件，判断页面上哪些元素在可视区域中，如果在可视区域中则将背景颜色设置为yellow
$(window).on("scroll", () => {
    console.log("scroll !");
    $targets.each((index, element) => {
        if (isInViewPort(element)) {
            $(element).css("background-color", "yellow");
        }
    });
});
```

通过上述方式，可以看到可视区域颜色会变成黄色了，但是可以明显看到有卡顿的现象，原因在于我们绑定了`scroll`事件，`scroll`事件伴随了大量的计算，会造成资源方面的浪费

下面通过`Intersection Observer`的形式同样实现相同的功能

```js
    function getYellow(entries) {
      entries.forEach(entry => {
        $(entry.target).css("background-color", "yellow");
      });
    }
    const observer = new IntersectionObserver(getYellow, { threshold: 0.8 });
    $targets.each((index, element) => {
      observer.observe(element);
    });
```

#### 惰性加载（lazy load）

我们希望某些静态资源（比如图片），只有用户向下滚动，它们进入视口时才加载，这样可以节省带宽，提高网页性能。这就叫做"惰性加载"。

```js
function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

var observer = new IntersectionObserver(
  function(changes) {
    changes.forEach(function(change) {
      var container = change.target;
      var content = container.querySelector('template').content;
      container.appendChild(content);
      observer.unobserve(container);
    });
  }
);

query('.lazy-loaded').forEach(function (item) {
  observer.observe(item);
});
```

#### 无限滚动

```js
var intersectionObserver = new IntersectionObserver(
  function (entries) {
    // 如果不可见，就返回
    if (entries[0].intersectionRatio <= 0) return;
    loadItems(10);
    console.log('Loaded new items');
  });

// 开始观察
intersectionObserver.observe(
  document.querySelector('.scrollerFooter')
);
```

无限滚动时，最好在页面底部有一个页尾栏（又称[sentinels](https://www.ruanyifeng.com/blog/2016/11/sentinels)）。一旦页尾栏可见，就表示用户到达了页面底部，从而加载新的条目放在页尾栏前面。这样做的好处是，不需要再一次调用`observe()`方法，现有的`IntersectionObserver`可以保持使用。