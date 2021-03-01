# Dom对象

| 属性                     | 描述                                                         | 类似                                    |
| ------------------------ | ------------------------------------------------------------ | --------------------------------------- |
| HTMLElement.offsetTop    | 返回当前元素相对其offsetParent元素顶部内边距的距离           | top+margin-top                          |
| HTMLElement.offsetLeft   | 返回当前元素相对其offsetParent元素左边偏移量                 |                                         |
| HTMLElement.offsetWidth  | 返回当前元素宽度（padding+border+width）                     |                                         |
| HTMLElement.offsetHeight | 返回当前元素高度（padding+border+height）                    |                                         |
| HTMLElement.offsetParent | 返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素 | position:fixed或display：none会返回null |
| HTMLElement.clientTop    | clientTop: 容器内部相对于容器本身的top偏移，实际就是**border-width** |                                         |
| HTMLElement.clientLeft   | clientTop: 容器内部相对于容器本身的top偏移，实际就是**border-width** |                                         |
| HTMLElement.clientWidth  | 返回当前元素宽度（padding+width）                            |                                         |
| HTMLElement.clientHeight | 返回当前元素宽度（padding+height）                           |                                         |
| HTMLElement.scrollTop    | 获取或设置当前元素**内容顶部**（卷起来的）到它的视口可见内容（的顶部）的距离 |                                         |
| HTMLElement.scrollLeft   | 获取或设置当前元素**内容左侧**（卷起来的）到它的视口可见内容（的顶部）的距离 |                                         |
| HTMLElement.scrollHeight | 返回当前元素实际高度（不含border）                           |                                         |
| HTMLElement.scrollWidth  | 返回当前元素实际宽度（不含border）                           |                                         |

应用：

```js
// 滚动高度（document.documentElement.scrollTop）
// 可视区域/屏幕高度（document.documentElement.clientHeight）
// 页面高度（document.documentElement.scrollHeight）
// 触底加载更多
2.原理 ：If(滚动高度 + 可视区域  >= 页面高度){ do something函数}
window.addEventListener(‘scroll’, 你要执行的事件)
 window.removeEventListener(‘scroll’, 你要执行的事件, false)
```

## Document.createDocumentFragment()

`DocumentFragments` 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。

因为文档片段存在于**内存中**，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面[回流](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

```js
<ul id="ul">
</ul>


var element  = document.getElementById('ul'); // assuming ul exists
var fragment = document.createDocumentFragment();
var browsers = ['Firefox', 'Chrome', 'Opera',
    'Safari', 'Internet Explorer'];

browsers.forEach(function(browser) {
    var li = document.createElement('li');
    li.textContent = browser;
    fragment.appendChild(li);
});

element.appendChild(fragment);
```

