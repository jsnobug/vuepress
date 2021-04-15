# 原生table

## 一、标题和内容描述

```html
<table summary='描述'>
    <caption>标题</caption>
</table>
```

表格的标题用caption标签表示，它会自动出现在整张表格的上方。

对内容的更长描述可以写在table标签的summary属性中。

## 二、表头和表尾

从结构上看，表格可以分成表头、主体和表尾三部分，在HTML语言中分别用thead、tbody、tfoot表示。

```html
<table border="1" style="border-collapse:collapse;">
    <thead>
        <tr>
            <td>1</td>
        </tr>
    </thead>
    <tbody>
    </colgroup>
        <tr>
            <td>2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>3</td>
        </tr>
    </tfoot>
</table>
```

1）thead和tfoot在一张表中都只能有一个，而tbody可以有多个。

2）tfoot必须出现在tbody前面，这样浏览器在接收主体数据之前，就能渲染表尾，有利于加快表格的显示速度。这一点对大型表格尤其重要。

3）thead、tbody和tfoot里面都必须使用tr标签。

## 三、列的分组

tbody可以用来对"行"进行分组，而colgroup则用来对"列"进行分组。

```html
<table border="1" style="border-collapse:collapse;">
    // 下面的代码表示前2列为一组，每列的宽度为200像素。
    // span属性，可以指定colgroup标签能够影响到的列数。
    <colgroup span="2" width="200"></colgroup>
    <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
    </tr>
    <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
    </tr>
</table>
```

在colgroup标签内部，可以使用col标签为这一列组中的每一列指定属性。

```html
<table border="1" style="border-collapse:collapse;">
    <colgroup width="500">
        // 第一列
        <col width="200"/>
        // 第二列
        <col width="300"/>
        // 第三列
        <col width="400"/>
        // 第四列 不指定其他列就指向500宽度
        <col/>
        // 不写剩余列，宽度是默认值
    </colgroup>
    <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
    </tr>
    <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
    </tr>
</table>
```

如果5列中只有最后一列的样式不一样，那就这样写，方便在CSS中指定：

```html
<table border="1" style="border-collapse:collapse;">
    <colgroup width="500">
        // 指定第二列
        <col span="2" />
        // 变成第三列，且id标记为text,也可以class
        <col id="text" />
    </colgroup>
    <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
    </tr>
    <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
    </tr>
</table>

<style>
    // 第3列底色变为pink色
    #text {
        background: pink;
    }
</style>
```

## 四、CSS中的table-layout语句

这个语句可以用来指定表格显示的样式，比如

```css
table { table-layout: fixed }
* auto（缺省）
* fixed
* inherit
```

auto表示单元格的大小由内容决定。fixed表示单元格的大小是固定的，由第一个指定大小的单元格决定；如果所有单元格都没有指定大小，则由第一个单元格的默认大小决定；如果单元格中的内容超出单元格的大小，则用CSS中的overflow命令控制。微软公司声称使用这个命令，表格的显示速度可以加快100倍。

顺便说一句，为了加快表格显示，最好事先就在CSS（或者table标签的width和height属性）中指定表格的宽度和高度。

## 五、th和td

表示单元格的标签是th（table head）和td（table data），前者用来显示数据的名称，后者用来显示数据的内容。

```html
<table border="1" style="border-collapse:collapse;">
    <tr>
        <th>标题</th>
        <th>标题</th>
        <th>标题</th>
        <th>标题</th>
        <th>标题</th>
    </tr>
    <tr>
        <td>2</td>
        <td>2222</td>
        <td>2</td>
        <td>2</td>
        <td>2</td>
    </tr>
</table>
```

更多属性： https://www.w3schools.com/TAGS/tag_td.asp

### td属性

| 属性    | 值        | 描述                                                         |
| ------- | --------- | ------------------------------------------------------------ |
| colspan | number    | 指定单元格应该跨列的列数                                     |
| headers | header_id | 指定与单元格相关的一个或多个标题单元格(普通的Web浏览器中没有视觉效果，但是可以由屏幕阅读器使用。) |
| rowspan | number    | 设置单元格应该跨越的行数                                     |

```html
<table border="1" style="border-collapse:collapse;">
    <tr>
        <th>Month</th>
        <th>Savings</th>
    </tr>
    <tr>
        <td>January</td>
        <td>$100</td>
    </tr>
    <tr>
        <td>February</td>
        <td>$80</td>
    </tr>
    <tr>
        <td colspan="2">Sum: $180</td>
    </tr>
</table>

<table border="1" style="border-collapse:collapse;">
    <tr>
        <th id="name">Name</th>
        <th id="email">Email</th>
        <th id="phone">Phone</th>
        <th id="addr">Address</th>
    </tr>
    <tr>
        <td headers="name">John Doe</td>
        <td headers="email">someone@example.com</td>
        <td headers="phone">+45342323</td>
        <td headers="addr">Rosevn 56,4300 Sandnes,Norway</td>
    </tr>
</table>

<table border="1" style="border-collapse:collapse;">
    <tr>
        <th>Month</th>
        <th>Savings</th>
        <th>Savings for holiday!</th>
    </tr>
    <tr>
        <td>January</td>
        <td>$100</td>
        <td rowspan="2">$50</td>
    </tr>
    <tr>
        <td>February</td>
        <td>$80</td>
    </tr>
</table>
```

### td使用css

```html
<td style="text-align:right;white-space:nowrap;">$80</td>
// vertical-align:bottom 垂直对齐
// width:70% 宽度
// height:100px 高度
// style="text-align:right" 内容对其方式
// background-color:#FF0000 底色
// white-space:nowrap;  // 内容不换行
```

### th属性

| 属性    | 值                                    | 描述                                                         |
| ------- | ------------------------------------- | ------------------------------------------------------------ |
| abbr    | text                                  | 指定标题单元格中内容的缩写版本(普通的Web浏览器中没有视觉效果，但是可以由屏幕阅读器使用。) |
| colspan | number                                | 指定单元格应该跨列的列数                                     |
| headers | header_id                             | 指定与单元格相关的一个或多个标题单元格(普通的Web浏览器中没有视觉效果，但是可以由屏幕阅读器使用。) |
| rowspan | number                                | 设置单元格应该跨越的行数                                     |
| scope   | col<br/>colgroup<br/>row<br/>rowgroup | 指定标题单元格是列、行还是列或行组的标题(该`scope`属性在普通的Web浏览器中没有视觉效果，但是可以由屏幕阅读器使用。) |

## 六、frame和rules

table标签的frame和rules属性，可以控制边框的显示。frame属性控制着表格最外围的四条边框的可见性，而 rules 则控制着表格内部边框的可见性。

frame属性可取的值及含义如下：

```
* void - 默认值。表示不显示表格最外围的边框。
* box - 同时显示四条边框。
* border - 同时显示四条边框。
* above - 只显示顶部边框。
* below - 只显示底部边框。
* lhs - 只显示左侧边框。
* rhs - 只显示右侧边框。
* hsides - 只显示水平方向的两条边框。
* vsides - 只显示垂直方面的两条边框。
```

rules 属性可取的值有五个，分别是：

```
* none - 默认值。无边框。
* groups - 为行组或列组加边框。
* rows - 为行加边框。
* cols - 为列加边框。
* all - 为所有行列（单元格）加边框
```

