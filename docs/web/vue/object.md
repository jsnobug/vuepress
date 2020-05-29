# vue技巧

## this.$set(obj,key,value)

```js
// data
{
    person: { // 个人信息
        name: '',
        age: '',
        gender: ''
    }
}

// 作为接口参数传递
ajax(this.person)

// 接口获取数据，批量处理
ajax().then(res => {
 const {name, age, gender} = res.data
    this.$set(this, 'person', {name, age, gender})
})
```

## 策略模式

策略模式的使用，避免过多的if else判断，也可以替代简单逻辑的switch

```js
const formatDemandItemType = (value) => {
    switch (value) {
        case 1:
            return '基础'
        case 2:
            return '高级'
        case 3:
            return 'VIP'
    }
}

// 策略模式
const formatDemandItemType2 = (value) => {
    const obj = {
        1: '基础',
        2: '高级',
        3: 'VIP',
    }
    
    return obj[value]
}
```

## 职责单一

任何时候尽量是的一个函数就做一件事情，而不是将各种逻辑全部耦合在一起，提高单个函数的复用性和可读性
每个页面都会在加载完成时进行数据的请求并展示到页面

```js
created() {
  this.init();
},
methods: {
  // 将全部的请求行为聚合在init函数中
  // 将每个请求单独拆分
  init() {
    this.getList1()
    this.getList2()
  },
  getList1() {
    // to do ...
  },
  getList2() {
    // to do ...
  }
}
```

## 冻结渲染无关的数据

vue中data的数据默认便会进行双向数据绑定，若是将大量的和渲染无关的数据直接放置在data中，将会浪费双向数据绑定时所消耗的性能，将这些和渲染无关的数据进行抽离并配合Object.freeze进行处理
table中columns数据可以单独提取一个外部js文件作为配置文件，也可以在当前.vue文件中定义一个常量定义columns数据，因为无论如何都是固定且不会修改的数据，应该使用Object.freeze进行包裹，既可以提高性能还可以将固定的数据抽离，一些下拉框前端固定的数据也建议此操作

```js
const columnList = Object.freeze([
  { title: '姓名', key: 'name', align: 'center' },
  { title: '性别', key: 'gender', align: 'center' }
])
```

::: tip

需要注意的是 Object.freeze() 冻结的是值，这时仍然可以将变量的引用替换掉，还有确保数据不会变才可以使用这个语法，如果要对数据进行修改和交互，就不适合使用冻结了。

:::

## 样式穿透

在开发中修改第三方组件样式是很常见，但由于 scoped 属性的样式隔离，可能需要去除 scoped 或是另起一个 style 。这些做法都会带来副作用（组件样式污染、不够优雅），样式穿透在css预处理器中使用才生效。

- less使用  **/deep/**

  ```css
  <style scoped lang="less">
  .content /deep/ .el-button {
  	 height: 60px;
  }
  </style>
  ```

- scss使用 **::v-deep**

  ```css
  <style scoped lang="scss">
  .content ::v-deep .el-button {
    height: 60px;
  }
  </style>
  ```

- stylus使用 **>>>**

  ```css
  <style scoped ang="stylus">
  外层 >>> .custon-components{
    height: 60px;
  }
  </style>
  ```

  
