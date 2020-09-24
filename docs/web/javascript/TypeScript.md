# TypeScript

js的超集

## 基础类型

类型基本是小写，区分js大写的基础数据类型

```js
// 布尔值
let isDone: boolean = false

// 数字
let num: number = 1

// 字符串
let str: string = '字符串'
	// 可以使用模板字符串
	let str2: string = `hello, my age is ${num}`
    
// 数组
let list: Array<number> = [1, 2, 3]
或者
let list: Number[] = [1, 2, 3]
或者类型未知
let list: Any[] = [1, '11', {}]

// 元组Tuple: 已知元素数量和类型
let x: [string, number]
x = ['1', 2]

// 枚举Enum
enum Color {Add = 1, Edit = 3, Audit = 4} // 不赋值默认0开始编号 
let colorNum: Color = Color.Edit // 3
let colorName: string = Color[1] // 'Add'

// Any：任何类型 
let a: any = 3
a = '11'
a = {} // 都不会报错
    // Void:没有任何类型（当函数没有返回值通常使用）
    function warnUser(): viod {
        console.log('测试')
    }
	// 声明一个void类型的变量没有什么大用，也能赋予undefined 和 null
	let unusable: void = undefined
// Null 和 Undefined
let u: undefined = undefined
let n: null = null

// Never:表示的是那些永不存在的值的类型
function error(message: string): never {
    throw new Error(message);
}
function fail() {
    return error("Something failed");
}
function infiniteLoop(): never {
    while (true) {
    }
}

// Object： 非原始类型
declare function create(o: object | null): void

create({ prop: 0 }) // OK
create(null) // OK

create(42); // Error
create("string") // Error
create(false) // Error
create(undefined) // Error

// 类型断言 
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
或者
let someValue: any = "this is a string"
let strLength: number = (someValue as string).length
```

## 接口

对值所具有的*结构*进行类型检查

### 接口初探

```js
interface SquareConfig {
  color: string
  width: number
  age: number
}
```

### 可选属性

可选属性： 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在

```js
interface SquareConfig {
  color: string // ?是可选属性，如果没有必需传入
  width?: number
  age?: number
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
```

### 只读属性

 一些对象属性只能在对象刚刚创建的时候修改其值

```js
interface Point {
    readonly x: number
    readonly y: number
}
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // error!

--对于数组

let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error!
ro.push(5) // error!
ro.length = 100 // error!
a = ro // error!
--上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写
a = ro as number[]

--最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。--
```

### 额外的属性检查

```js
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newData 
  config.color && (newData.color = config.color)
  config.width && (newData.area = config.width)
  return newData
}
let mySquare = createSquare({ width: 100, opacity: 0.5 })
--会报错--

// 1.绕开检查使用类型断言，最简单
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)

// 2.最佳的方式
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
--这样SquareConfig可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么。--

// 3.最后种方式， 将这个对象赋值给另外一个变量；因为 squareOptions不会经过额外属性检查，所以编译器不会报错
let squareOptions = { colour: "red", width: 100 }
let mySquare = createSquare(squareOptions)
```

### 函数类型

接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```typescript
interface SearchFunc {
	(source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子：
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```

用函数类型的接口，只会判断函数返回类型是否匹配。

### 可索引的类型

