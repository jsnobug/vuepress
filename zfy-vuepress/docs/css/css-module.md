# module/scoped及scss用法

## module/scoped

css特点：全局的。导致命名互相影响覆盖

vue中提出module和scoped解决方案。

### Scoped

```css
<style lang="scss" scoped>
.content {
  .title-wrap {
    font-size: 20px;
    color: red;
  }
}
</style>
```

scoped作用的阻止上层的css样式传递到下层，限制当前css作用域，使其只对当前组件生效。

原理：scoped的实现是借助了PostCSS实现的，一旦增加了scoped，他会将之前覆盖的样式转换成下面的样式

```css
<style lang="scss">
.content[data-v-67e6b31f] {
  .title-wrap[data-v-67e6b31f] {
    font-size: 20px;
    color: red;
  }
}
</style>
```

深度作用：

```css
<style scoped>
.content >>> .title-wrap {
    font-size: 20px;
    color: red;
}
</style>
// scss 用 /deep/
<style lang="scss" scoped>
.content {
  /deep/ {
    .title-wrap {
      font-size: 20px;
      color: red;
    }
  }
}
</style>
```

### Module

直接让类名变为哈希值,加了:global就变成全局，不会转变

```vue
<template>
  <div :class="$style.content">
    <div :class="$style['title-wrap']">我是红色的</div>
    <green-title class='text'></green-title>
  </div>
</template>
 
<style lang="scss" module>
.content {
  .title-wrap {
    font-size: 20px;
    color: red;
      :global .text {
          color: pink;
      }
  }
}
</style>
```

## scss

### 变量 

```scss
$yellow: yellow
.text {
	color: $yellow
}
```

### 嵌套及缩写

```scss
.text {
	.text2 {
		color: bule;
		&:hover {
			// 类似.text:hover
			color: #fff;
		}
	}
}
```

### 混入

```scss
@mixin poaLayout ($top: 0, $right: 0, $transformX: null, $transformY: null) {
  position: absolute;
  top: $top;
  right: $right;
  @if($transformX !=null) {
    transform: translateX($transformX);
  }
  @if($transformY !=null) {
    transform: translateY($transformY);
  }
}
// 使用
.content {
    font-size: 18px;
    font-weight: 400;
    line-height: 36px;
    margin-bottom: 30px;
    @include frontFlex($just: space-between);
}
```

### 导入

```scss
<style lang="scss" module>
  @import "../front-style/front-common";
</style>
```

### %操作符

%与.功能类似，但是不会输出代码

```scss
@media screen {
  %icon {
    transition: background-color ease .2s;
    margin: 0 .5em;
  }
}

.error-icon {
  @extend %icon;
}

.info-icon {
  @extend %icon;
}
// 最终输出
@media screen {
  .error-icon, .info-icon {
    transition: background-color ease .2s;
    margin: 0 .5em;
  }
}
```

