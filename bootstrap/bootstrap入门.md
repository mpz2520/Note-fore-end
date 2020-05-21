## Bootstrap CSS 概览
Bootstrap 是移动设备优先的。
 
为了确保适当的绘制和触屏缩放，需要在 <head> 之中添加 viewport 元数据标签。    
`<meta name="viewport" content="width=device-width, initial-scale=1">`

在移动设备浏览器上，通过为视口（viewport）设置 meta 属性为 user-scalable=no 可以禁用其缩放（zooming）功能。    
`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`


**布局容器**  
.container 类用于固定宽度并支持响应式布局的容器。    
```
<div class="container">
  ...
</div>
```
.container-fluid 类用于 100% 宽度，占据全部视口（viewport）的容器。   
```
<div class="container-fluid">
  ...
</div>
```

### 排版
1. 标题  
   HTML 中的所有标题标签，`<h1>` 到 `<h6>` 均可使用。  
2. 中心内容  
   通过添加 .lead 类可以让段落突出显示。  
3. 被删除的文本   
   对于被删除的文本使用 `<del>` 标签。   
4. 无用文本   
   对于没用的文本使用 `<s>` 标签。
5. 插入文本  
   额外插入的文本使用` <ins>` 标签
6. 带下划线的文本   
   为文本添加下划线，使用 `<u>` 标签。
7. 小号文本  
   使用 `<small> `标签包裹 或使用.small 类
8. 着重    
   `<strong>`   
9. 斜体   
   `<em>`   
10. 对齐   
```
<p class="text-left">Left aligned text.</p>
<p class="text-center">Center aligned text.</p>
<p class="text-right">Right aligned text.</p>
<p class="text-justify">Justified text.</p>
<p class="text-nowrap">No wrap text.</p>
```

11. 改变大小写    
通过这几个类可以改变文本的大小写。  
```
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">Capitalized text.</p>
```

12. 缩略语  
使用`<abbr>` 元素包裹需要缩量的单词   
使用带有 title 属性显示完整内容  
`<abbr title="attribute">attr</abbr>`

13. 首字母缩略语   
为缩略语添加 .initialism 类，可以让 font-size 变得稍微小些。  仅此而已   
`<abbr title="HyperText Markup Language" class="initialism">HTML</abbr>`

14. 地址 `<address>`    
让联系信息以最接近日常使用的格式呈现。在每行结尾添加 `<br>` 可以保留需要的样式。   
```
<address>
  <strong>Twitter, Inc.</strong><br>
  1355 Market Street, Suite 900<br>
  San Francisco, CA 94103<br>
  <abbr title="Phone">P:</abbr> (123) 456-7890
</address>

<address>
  <strong>Full Name</strong><br>
  <a href="mailto:#">first.last@example.com</a>
</address>
```

15. 引用  
默认样式的引用   
将任何 HTML 元素包裹在 <blockquote> 中即可表现为引用样式。对于直接引用，我们建议用 <p> 标签。  
```
默认样式的引用
将任何 HTML 元素包裹在 <blockquote> 中即可表现为引用样式。对于直接引用，我们建议用 <p> 标签。
```

16. 多种引用样式   
对于标准样式的 <blockquote>，可以通过几个简单的变体就能改变风格和内容。

命名来源
添加 <footer> 用于标明引用来源。来源的名称可以包裹进 <cite>标签中。
```
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
```

另一种展示风格  
通过赋予 .blockquote-reverse 类可以让引用呈现内容右对齐的效果。
```
<blockquote class="blockquote-reverse">
  ...
</blockquote>
```

17. 列表  
无样式列表class="list-unstyled"
   
内联列表：class="list-inline" 通过设置 display: inline-block; 并添加少量的内补（padding），将所有元素放置于同一行。
 
18. 描述  
基本结构  
```
<dl>
  <dt>...</dt>
  <dd>...</dd>
</dl>
```
dl 包裹描述内容   
dt 大黑色号，一般为要解释的词
dd 一般色号，一般作为解释性内容

水平排列的描述  
.dl-horizontal 可以让 `<dl>` 内的短语dt排左边，其描述dd排在右边。

自动截断  
通过 .text-overflow 属性,水平排列的描述列表将会截断左侧太长的短语
### Bootstrap 栅格系统

#### 栅格参数

|					|超小屏幕 手机 (<768px)	|小屏幕 平板 (≥768px)								|中等屏幕 桌面显示器 (≥992px)	    |大屏幕 大桌面显示器 (≥1200px)	|
|--	|--	|--	|--	|--	|
|.container 最大宽度 |None （自动）			|750px												|970px							|1170px							|
|类前缀				|.col-xs-				|.col-sm-											|.col-md-						|.col-lg-						|
|最大列（column）宽	|自动					|~62px												|~81px							|~97px							|

#### 流式布局容器
将最外面的布局元素 .container 修改为 .container-fluid，就可以将固定宽度的栅格布局转换为 100% 宽度的布局。

#### 移动设备和桌面屏幕
即列类中同时添加 .col-xs-* 和 .col-md-*，它会根据屏幕大小选择适配

#### 列偏移 
使用 .col-md-offset-* 类可以将列向右侧偏移。  

#### 嵌套列  
为了使用内置的栅格系统将内容再次嵌套，可以通过添加一个新的 .row 元素和一系列 .col-sm-* 元素到已经存在的 .col-sm-* 元素内。

#### 列排序  
通过使用 .col-md-push-* 和 .col-md-pull-* 类就可以很容易的改变列（column）的顺序。

#### Less mixin 和变量  



### 代码样式
#### 内联代码
通过 `<code>` 标签包裹内联样式的代码片段。  
`<code>&lt;section&gt;</code> `

#### 用户输入
通过 `<kbd>` 标签标记用户通过键盘输入的内容。

#### 代码块
多行代码可以使用 `<pre>` 标签。为了正确的展示代码，注意将尖括号做转义处理。  
`<pre>&lt;p&gt;Sample text here...&lt;/p&gt;</pre>`

#### 变量
通过 `<var>` 标签标记变量。

#### 程序输出
通过 `<samp>` 标签来标记程序输出的内容。

### 表格

#### 基本实例
为任意 `<table>` 标签添加 .table 类可以为其赋予基本的样式

#### 条纹状表格
通过给table添加 .table-striped 类可以给 `<tbody>` 之内的每一行增加斑马条纹样式

#### 带边框的表格
添加 .table-bordered 类为表格和其中的每个单元格增加边框。

#### 鼠标悬停
通过添加 .table-hover 类可以让 `<tbody>` 中的每一行对鼠标悬停状态作出响应。

#### 紧缩表格
通过添加 .table-condensed 类可以让表格更加紧凑

#### 状态类
通过这些状态类可以为`行`或`单元格`设置颜色。

|Class		|描述								|
|--	|--	|
|.active	|鼠标悬停在行或单元格上时所设置的颜色	|
|.success	|标识成功或积极的动作					|
|.info		|标识普通的提示信息或动作				|
|.warning	|标识警告或需要用户注意				|
|.danger	|标识危险或潜在的带来负面影响的动作		|

#### 响应式表格
将任何 .table 元素包裹在 `.table-responsive` 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）增加水平滚动条。

注意是包裹在内的`table元`素,例如下面外层添加div.table-responsive
```
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```


### 表单
#### 表单实例
1. 所有设置了 `.form-control` 类的 `<input>`、`<textarea>` 和 `<select>` 元素都将被默认设置宽度属性为 width: 100%;

2. 包裹在 `.form-group` 中可以获得最好的排列

#### 内联表单
为 `<form>` 元素添加 .form-inline 类可使其内容左对齐并且表现为 inline-block 级别的控件。  
只适用于视口（viewport）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）。  

**注意点**  
 可能需要手动设置宽度：  
 在 Bootstrap 中，输入框和单选/多选框控件默认被设置为 width: 100%; 宽度。在内联表单，我们将这些元素的宽度设置为 width: auto;，   
 因此，多个控件可以排列在同一行。根据你的布局需求，可能需要一些额外的定制化组件。    
 一定要添加 label 标签：  
   可以通过为 label 设置 .sr-only 类将其隐藏   
   

#### 水平排列的表单
通过为表单`<from>`添加 .form-horizontal 类  

并联合使用 Bootstrap 预置的栅格类，可以将 label 标签和控件组水平并排布局。 
  
这样做将改变 .form-group 的行为，使其表现为栅格系统中的行（row），因此就无需再额外添加 .row 了。

#### 被支持的控件
包括大部分表单控件、文本输入域控件，还支持所有 HTML5 类型的输入控件： text、password、datetime、datetime-local、date、month、time、week、number、email、url、search、tel 和 color。 

**必须添加类型声明**   
只有正确设置了 type 属性的输入控件才能被赋予正确的样式。   
`<input type="text" class="form-control" placeholder="Text input">`

**文本域**   
支持多行文本的表单控件。可根据需要改变 rows 属性。  
`<textarea class="form-control" rows="3"></textarea>`

#### 多选和单选框
```
<div class="checkbox">
  <label>
    <input type="checkbox" value="">
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>
<div class="checkbox disabled">
  <label>
    <input type="checkbox" value="" disabled>
    Option two is disabled
  </label>
</div>

<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
    Option two can be something else and selecting it will deselect option one
  </label>
</div>
<div class="radio disabled">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
    Option three is disabled
  </label>
</div>
```

#### 内联单选和多选框
通过将 .checkbox-inline 或 .radio-inline 类应用到一系列的多选框（checkbox）或单选框（radio）控件上，可以使这些控件排列在一行。

#### 下拉列表（select）

#### 静态控件
如果需要在表单中将一行纯文本和 label 元素放置于同一行，为 `<p>` 元素添加 .form-control-static 类即可。

#### 焦点状态

#### 禁用状态
为输入框设置 `disabled` 属性可以禁止其与用户有任何交互（焦点、输入等）

并且还添加了 not-allowed 鼠标状态。

#### 被禁用的 fieldset
为`<fieldset>` 设置 disabled 属性,可以禁用 `<fieldset>` 中包含的所有控件。

#### 只读状态
为输入框设置 `readonly` 属性可以禁止用户修改输入框中的内容。处于只读状态的输入框颜色更浅（就像被禁用的输入框一样）

只是没有添加了 not-allowed 鼠标状态。

#### help txt
添加.help-block类，使文字谈一点，多应用于帮助说明

#### 校验状态
Bootstrap 对表单控件的校验状态，如 error、warning 和 success 状态，都定义了样式。

使用时，添加 .has-warning、.has-error 或 .has-success 类到这些控件的父元素即可。

`任何包含在此元素之内的` .control-label、.form-control 和 .help-block 元素都将接受这些校验状态的样式

注意直接设置控件的class="has-error",不行的，要在父级设置class类，因为是作用于包裹在内的元素

#### 添加额外的图标
1. 在父级设置.has-feedback 类
2. 在input控件添加对应的图标属性
   * aria-describedby="inputSuccess2Status"
   * aria-describedby="inputWarning2Status"
   * aria-describedby="inputError2Status"
3. 注意图标样式不显示时，把link静态地址样式换成网络地址,例如   
   `<link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">`
#### 控件尺寸
通过 .input-lg 类似的类可以为控件设置高度，通过 .col-lg-* 类似的类可以为控件设置宽度。

#### 水平排列的表单组的尺寸
通过添加 .form-group-lg 或 .form-group-sm 类，为 .form-horizontal 包裹的 label 元素和表单控件快速设置尺寸。

#### 调整列（column）尺寸
用栅格系统中的列（column）包裹输入框或其任何父元素，都可很容易的为其设置宽度。
```
<div class="row">
  <div class="col-xs-2">
    <input type="text" class="form-control" placeholder=".col-xs-2">
  </div>
  <div class="col-xs-3">
    <input type="text" class="form-control" placeholder=".col-xs-3">
  </div>
  <div class="col-xs-4">
    <input type="text" class="form-control" placeholder=".col-xs-4">
  </div>
</div>
```


### 按钮
#### 可作为按钮使用的标签或元素
为 `<a>`、`<button>` 或 `<input>` 元素添加按钮类（button class）即可使用 Bootstrap 提供的样式。   
`<a>` 元素,务必为其设置 role="button" 属性  

#### 预定义样式
```
      
<!-- Standard button -->
<button type="button" class="btn btn-default">（默认样式）Default</button>

<!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
<button type="button" class="btn btn-primary">（首选项）Primary</button>

<!-- Indicates a successful or positive action -->
<button type="button" class="btn btn-success">（成功）Success</button>

<!-- Contextual button for informational alert messages -->
<button type="button" class="btn btn-info">（一般信息）Info</button>

<!-- Indicates caution should be taken with this action -->
<button type="button" class="btn btn-warning">（警告）Warning</button>

<!-- Indicates a dangerous or potentially negative action -->
<button type="button" class="btn btn-danger">（危险）Danger</button>

<!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
<button type="button" class="btn btn-link">（链接）Link</button>
```

#### 尺寸
需要让按钮具有不同尺寸吗？使用 .btn-lg、.btn-sm 或 .btn-xs 就可以获得不同尺寸的按钮。  

#### 激活状态与禁用状态
//添加.active类，设置为激活状态  
`<button type="button" class="btn btn-default btn-lg active">Button</button>`
//为 `<button>` 元素添加 disabled 属性，使其表现出禁用状态。  
`<button type="button" class="btn btn-default btn-lg" disabled="disabled">Button</button>`  
//为基于 `<a>` 元素创建的按钮添加 .disabled 类。
`<a href="#" class="btn btn-primary btn-lg disabled" role="button">Primary link</a>`

### 图片
#### 响应式图片
通过为图片添加 .img-responsive 类可以让图片支持响应式布局。   //其实质是为图片设置了 max-width: 100%;、 height: auto; 和 display: block; 属性，从而让图片在其父元素中更好的缩放。   

如果需要让使用了 .img-responsive 类的图片水平居中，请使用 .center-block 类，不要用 .text-center    

#### 图片形状
```
<img src="..." alt="..." class="img-rounded">
<img src="..." alt="..." class="img-circle">
<img src="..." alt="..." class="img-thumbnail">
```

### 辅助类

#### 情境文本颜色
```
//通过颜色来展示意图
<p class="text-muted">...</p>
<p class="text-primary">...</p>
<p class="text-success">...</p>
<p class="text-info">...</p>
<p class="text-warning">...</p>
<p class="text-danger">...</p>
```

#### 情境背景色
```
<p class="bg-primary">...</p>
<p class="bg-success">...</p>
<p class="bg-info">...</p>
<p class="bg-warning">...</p>
<p class="bg-danger">...</p>
```

#### 关闭按钮
`<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`

#### 三角符号
`<span class="caret"></span>`

#### 快速浮动
```
<div class="pull-left">...</div>
<div class="pull-right">...</div>
```

#### 让内容块居中
`<div class="center-block">...</div>`

#### 清除浮动 
通过为父元素添加 .clearfix 类可以很容易地清除浮动（float）。  
  
```
<!-- Usage as a class -->
<div class="clearfix">...</div>
--------------------------------
// Mixin itself
.clearfix() {
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
}

// Usage as a mixin
.element {
  .clearfix();
}
```

#### 显示或隐藏内容
```
<div class="show">...</div>
<div class="hidden">...</div>
```

#### 图片替换
使用 .text-hide 类或对应的 mixin 可以用来将元素的文本内容替换为一张背景图。   
```
<h1 class="text-hide">Custom heading</h1>
// Usage as a mixin
.heading {
  .text-hide();
}
```

#### 阅读
**aria-label**   
正常情况下，form表单的input组件都有对应的label.当input组件获取到焦点时，屏幕阅读器会读出相应的label里的文本。   
```
<form role = "form">
        <div class="form-group col-lg-3 form-horizontal">
            <label for = "idCard" class="control-label col-lg-5">身份证号：</label>
            <div class="col-lg-7">
                <input type = "text" id = "idCard" class="form-control">
            </div>        
        </div>    
 </form>
```

但是如果我们没有给输入框设置label时，当其获得焦点时，屏幕阅读器会读出aria-label属性的值，aria-label不会在视觉上呈现效果。
如：   
```
<form role = "form">
        <div class="form-group col-lg-3 form-horizontal">
            <div class="col-lg-7">
                <input type = "text" id = "idCard" class="form-control" aria-label = "身份证号">
            </div>        
        </div>    
    </form>
```

当想要的标签文本已在其他元素中存在时，可以使用aria-labelledby，并将其值为所有读取的元素的id。如下：
当ul获取到焦点时，屏幕阅读器是会读：“选择您的职位”   
```
<div class="dropdown">
       <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" 
          data-toggle="dropdown">
          选择您的职位
          <span class="caret"></span>
       </button>
       <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
          <li role="presentation">
             <a role="menuitem" tabindex="-1" href="#">测试工程师</a>
          </li>
          <li role="presentation">
             <a role="menuitem" tabindex="-1" href="#">开发工程师</a>
          </li>
          <li role="presentation">
             <a role="menuitem" tabindex="-1" href="#">销售工程师</a>
          </li>          
       </ul>
    </div>
```


PS：如果一个元素同时有aria-labelledby和aria-label，读屏软件会优先读出aria-labelledby的内容