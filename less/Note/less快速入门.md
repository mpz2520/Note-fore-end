### 变量（Variables）
1. 可变变量：在Less中，可以使用另一个变量定义变量的名称。color: @@color;
2. 懒惰评估：变量在使用之前不必声明。

```
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
编译为：

#header {
  width: 10px;
  height: 20px;
}
```

### 混合（Mixins）
混合（Mixin）是一种将一组属性从一个规则集包含（或混入）到另一个规则集的方法。

假设我们定义了一个类（class）如下：
```
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

如果我们希望在其它规则集中使用这些属性呢？没问题，我们只需像下面这样输入所需属性的类（class）名称即可，如下所示：
```
#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}  
```
  
.bordered 类所包含的属性就将同时出现在 #menu a 和 .post a 中了。（注意，你也可以使用 #ids 作为 mixin 使用。#ids{}与#ids()）

### 嵌套（Nesting）
Less 提供了使用嵌套（nesting）代替层叠或与层叠结合使用的能力。假设我们有以下 CSS 代码：
```
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

用 Less 语言我们可以这样书写代码：
```
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

你还可以使用此方法将伪选择器（pseudo-selectors）与混合（mixins）一同使用。下面是一个经典的 clearfix 技巧，重写为一个混合（mixin） (& 表示当前选择器的父级）：
```
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```

#### @规则嵌套和冒泡
@ 规则（例如 @media 或 @supports）可以与选择器以相同的方式进行嵌套。`@ 规则会被放在前面`，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡（bubbling）。
```
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
```

编译为：
```
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```
可见，她只是把@media（媒体查询）放到最外层

### 运算（Operations）
算术运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算。

算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。

```
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%
```
另：Less 提供的 色彩函数 更有使用价值。

### 转义（Escaping）
转义（Escaping）允许你使用任意字符串作为属性或变量值。任何 ~"anything" 或 ~'anything' 形式的内容都将按原样输出，除非 interpolation。
```
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

编译为：
```
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

注意，从 Less 3.5 开始，可以简写为：
```
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```
在 Less 3.5+ 版本中，许多以前需要“引号转义”的情况就不再需要了。

### 函数（Functions）
Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。这些函数在Less 函数手册中有详细介绍。

下面这个例子将介绍如何利用 percentage 函数将 0.5 转换为 50%
```
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%); //将颜色饱和度增加 5%
  background-color: spin(lighten(@base, 25%), 8); //颜色亮度降低 25% 并且色相值增加 8 
}
```

### 命名空间和访问符
有时，出于组织结构或仅仅是为了提供一些封装的目的，你希望对混合（mixins）进行分组。你可以用 Less 更直观地实现这一需求。假设你希望将一些混合（mixins）和变量置于 #bundle 之下，为了以后方便重用或分发：
```
#bundle() {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
  .tab { ... }
  .citation { ... }
}
```

现在，如果我们希望把 .button 类混合到 #header a 中，我们可以这样做：
```
#header a {
  color: orange;
  #bundle.button();  // 还可以书写为 #bundle > .button 形式
}
```
注意：如果不希望它们出现在输出的 CSS 中，例如 #bundle .tab，请将 () 附加到命名空间（例如 #bundle()）后面。

### 映射（Maps）
从 Less 3.5 版本开始，你还可以将混合（mixins）和规则集（rulesets）作为一组值的映射（map）使用。
```
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

输出符合预期：
```
.button {
  color: blue;
  border: 1px solid green;
}
```

### 作用域（Scope）
Less 中的作用域与 CSS 中的作用域非常类似。首先在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承。
```
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```

与 CSS 自定义属性一样，混合（mixin）和变量的定义不必在引用之前事先定义。因此，下面的 Less 代码示例和上面的代码示例是相同的：
```
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

### 注释（Comments）
块注释和行注释都可以使用：
```
/* 一个块注释
 * style comment! */
@var: red;

// 这一行被注释掉了！
@var: white;
```

### 导入（Importing）
“导入”的工作方式和你预期的一样。你可以导入一个 .less 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 .less 扩展名，则可以将扩展名省略掉：
```
@import "library"; // library.less
@import "typo.css";
```

### 安装
通过 npm 安装    
```
npm install less -g   //-g 参数表示将 lessc 命令安装到全局环境。
```

```
npm i less --save-dev  //这将在项目文件夹中安装 lessc 的最新正式版本，并将其添加到 package.json 文件中的 devDependencies 配置段中。
```


#### 命令行用法
将 bootstrap.less 编译为 bootstrap.css
```
lessc bootstrap.less bootstrap.css
```

Version
```
lessc -v
lessc --version
```

Help
```
lessc --help	
lessc -h
```

