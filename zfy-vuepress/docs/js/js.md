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

6.将VirrualDom转化为真实DOM结构

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

