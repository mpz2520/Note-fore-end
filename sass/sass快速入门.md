### 预处理
npm 安装 Sass：
```
npm install -g sass
```

 将会把 Sass 文件 input.scss 编译输出为 output.css。
 ```
 sass input.scss output.css
 ```
 
 你还可以利用 --watch 参数来监视单个文件或目录。   
  --watch 参数告诉 Sass 监听源文件的变化， 并在每次保存 Sass 文件时重新编译为 CSS。    
  如果你只是想监视 （而不是手动构建）input.scss 文件，你只需在 sass 命令后面添加 --watch 参数即可，如下：   
``` 
 sass --watch input.scss output.css
 ```
 
 可以使用文件夹路径作为输入和输出， 并使用冒号分隔它们，来监听文件并输出到目录。例如:
```
 sass --watch app/sass:public/stylesheets
 ```
 Sass 将会监听 app/sass 目录下所有文件的变动，并 编译 CSS 到 public/stylesheets 目录下。
 

### 1. 变量
Sass 使用 $ 符号 作为变量的标志。例如：
```
//scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

//sass
SASS SYNTAX
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color

//编译后的CSS
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

### 2. 嵌套CSS 规则
```
//scss
SCSS SYNTAX
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}

//sass
SASS SYNTAX
nav
  ul
    margin: 0
    padding: 0
    list-style: none

  li
    display: inline-block

  a
    display: block
    padding: 6px 12px
    text-decoration: none


//编译后的css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

#### 2-1. 父选择器的标识符&
```
#content aside {
  color: red;
  body.ie & { color: green }
}

/*编译后*/
#content aside {color: red};
body.ie #content aside { color: green }
```

#### 2-2. 群组选择器的嵌套;
```
//在css中
.container h1, .container h2, .container h3 { margin-bottom: .8em }

//在scss中
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
```

#### 2-3. 子组合选择器和同层组合选择器：>、+和~;
```
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}

//sass会如你所愿地将这些嵌套规则一一解开组合在一起：
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```
在sass中，不仅仅css规则可以嵌套，对属性进行嵌套也可以减少很多重复性的工作。

#### 2-4. 嵌套属性;
在sass中，除了CSS选择器，属性也可以进行嵌套。尽管编写属性涉及的重复不像编写选择器那么糟糕，但是要反复写border-styleborder-widthborder-color以及border-*等也是非常烦人的。在sass中，你只需敲写一遍border：
```
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}
```

嵌套属性的规则是这样的：把属性名从中划线-的地方断开，在根属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中。就像css选择器嵌套一样，sass会把你的子属性一一解开，把根属性和子属性部分通过中划线-连接起来，最后生成的效果与你手动一遍遍写的css样式一样：
```
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```

对于属性的缩写形式，你甚至可以像下边这样来嵌套，指明例外规则：
```
nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
```

这比下边这种同等样式的写法要好：
```
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

### 3. 导入SASS文件;

#### 3-1. 使用SASS部分文件;
那些专门为@import命令而编写的sass文件，并不需要生成对应的独立css文件，这样的sass文件称为局部文件。

此约定即，sass局部文件的文件名以下划线开头。这样，sass就不会在编译时单独编译这个文件输出css，而只把这个文件用作导入。

举例来说，你想导入themes/_night-sky.scss这个局部文件里的变量，你只需在样式表中写`@import "themes/night-sky"`;。


#### 3-2. 默认变量值;
一般情况下，你反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值。举例说明：
```
$link-color: blue;
$link-color: red;
a {
color: $link-color;
}
```

在上边的例子中，超链接的color会被设置为red。这可能并不是你想要的结果，假如你写了一个可被他人通过@import导入的sass库文件，你可能希望导入者可以定制修改sass库文件中的某些值。使用sass的!default标签可以实现这个目的。它很像css属性中!important标签的对立面，不同的是!default用于变量，含义是：如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。
```
$fancybox-width: 400px !default;
.fancybox {
width: $fancybox-width;
}
```
在上例中，如果用户在导入你的sass局部文件之前声明了一个$fancybox-width变量，那么你的局部文件中对$fancybox-width赋值400px的操作就无效。如果用户没有做这样的声明，则$fancybox-width将默认为400px。

#### 3-3. 嵌套导入;
跟原生的css不同，sass允许@import命令写在css规则内。这种导入方式下，生成对应的css文件时，局部文件会被直接插入到css规则内导入它的地方。举例说明，有一个名为_blue-theme.scss的局部文件，内容如下：
```
aside {
  background: blue;
  color: white;
}
```

然后把它导入到一个CSS规则内，如下所示：
```
.blue-theme {@import "blue-theme"}
```

生成的结果跟你直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样。
```
.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
```

#### 3-4. 原生的CSS导入;
由于sass兼容原生的css，所以它也支持原生的CSS@import。尽管通常在sass中使用@import时，sass会尝试找到对应的sass文件并导入进来，但在下列三种情况下会生成原生的CSS@import，尽管这会造成浏览器解析css时的额外下载：

被导入文件的名字以.css结尾；    
被导入文件的名字是一个URL地址（比如http://www.sass.hk/css/css.css），由此可用谷歌字体API提供的相应服务；   
被导入文件的名字是CSS的url()值。    
这就是说，你不能用sass的@import直接导入一个原始的css文件，因为sass会认为你想用css原生的@import。但是，因为sass的语法完全兼容css，所以你可以把原始的css文件改名为.scss后缀，即可直接导入了。




### 5. 混合器;
混合器使用@mixin标识符定义。 `@mixin 变量名`
```
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

然后就可以在你的样式表中通过@include来使用这个混合器   `@include 变量名`
```
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}

//sass最终生成：

.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

#### 5-1. 何时使用混合器;
如果你能找到一个很好的短名字来描述这些属性修饰的样式，比如rounded-cornersfancy-font或者no-bullets，那么往往能够构造一个合适的混合器。如果你找不到，这时候构造一个混合器可能并不合适。

#### 5-2. 混合器中的CSS规则;

#### 5-3. 给混合器传参;
混合器并不一定总得生成相同的样式。可以通过在@include混合器时给混合器传参
```
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
当混合器被@include时，你可以把它当作一个css函数来传参。如果你像下边这样写：

a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

sass允许通过语法$name: value的形式指定每个参数的值。这种形式的传参，参数顺序就不必再在乎了
```
a {
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}
```

#### 5-4. 默认参数值;
为了在@include混合器时不必传入所有的参数，我们可以给参数指定一个默认值。参数默认值使用$name: default-value的声明形式，
```
@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```
如果像下边这样调用：@include link-colors(red) $hover和$visited也会被自动赋值为red。

也可以这样调用：@include link-colors(red,blue,green) $hover和$visited会分别赋值blue,green。

### 6. 使用选择器继承来精简CSS;
选择器继承是说一个选择器可以继承为另一个选择器定义的所有样式。这个通过@extend语法实现，如下代码:
```
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

.seriousError不仅会继承.error自身的所有样式，任何跟.error有关的组合选择器样式也会被.seriousError以组合选择器的形式继承，如下代码:
```
//.seriousError从.error继承样式
.error a{  //应用到.seriousError a
  color: red;
  font-weight: 100;
}
h1.error { //应用到hl.seriousError
  font-size: 1.2rem;
}
```

#### 6-1. 何时使用继承;
当一个元素拥有的类（比如说.seriousError）表明它属于另一个类（比如说.error），这时使用继承再合适不过了。

#### 6-2. 继承的高级用法;
继承复杂的选择器
```
.hoverlink{
  @extend a:hover;
}
a:hover{
text-decoration:underline;
}
```编译后```
a:hover, .hoverlink{
  text-decoration:underline;
}
```

继承多个选择器
```
.one{
  width:100px;height:100px;
}
.two{
  @extend .one;
  @extend .three;
background:red;
border:5px solid #000;
}
.three{
padding:10px;
}


---也可以写成如下代码---

.one{
  width:100px;height:100px;
}

编译后：
.one, .two{
	width:100px;height:100px;
}
.two{
	background:red;
	border:5px solid #000;
}
.three, .two{
	padding:10px;
}
```

链式继承（多重继承）

```
.one{
  width:100px;height:100px;
}
.two{
  @extend .one;
background:red;
border:5px solid #000;
}
.three{
  @extend .two;
padding:10px;
}
```

继承的局限性  
  * 包含选择器（.one .two）或者相邻兄弟选择器（.one+ .two）目前还是不支持继承。 
  * 但若继承的元素是“a”,恰巧这个元素“a”又有hover状态的样式，那么hover状态的样式也会被继承。  
```
.myLink{
@extend a;
}
a{
  color:blue;
&:hover{
  text-decoration:underline;
}
}
```

编译后：
```
.myLink, a{color:blue;}
a:hover, .mtLink:hover{
	text-decoration:underline;
}
```



### 模组(Modules)
您不必将所有Sass都写在一个文件中。您可以根据需要将其拆分,然后用 `@use '文件名' ` 使用`文件名.$变量名`  。
```
// _base.scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}


// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}

//CSS  输出
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.inverse {
  background-color: #333;
  color: white;
}
```








