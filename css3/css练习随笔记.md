## CSS常用属性

### CSS3 opacity 属性
opacity 属性设置元素的不透明级别。

语法:  opacity: value|inherit;
 
value	规定不透明度。从 0.0 （完全透明）到 1.0（完全不透明）。默认值1

### CSS3 border-radius 属性
该属性允许您为块元素添加圆角边框！

语法：border-radius: 1-4 length|% / 1-4 length|%;     


两或三个值
```
border-radius: 2em 1em 4em / 0.5em 3em;

等价于：

border-top-left-radius: 2em 0.5em;
border-top-right-radius: 1em 3em;
border-bottom-right-radius: 4em 0.5em;
border-bottom-left-radius: 1em 3em;
```

### box-sizing属性定义及用法
`box-sizing: content-box/border-box/inherit;`

* content-box： width，height指内容的宽高，默认的
* border-box：  width，height包括padding内边距和border边框。

### CSS3 :nth-child() 选择器
:nth-child(n) 选择器匹配属于其父元素的第 N 个子元素，不论元素的类型。

n 可以是数字、关键词或公式。

### css 中 max-width 和 min-width 的区别
max-width:规定元素本身最大宽度，即元素本身 (该div) 的宽度应小于等于其最大宽度值。

min-width:规定元素本身最小宽度，即元素本身应大于等于其宽度值。

###  filter(滤镜) 属性
**语法**   
`filter: none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia() | url();`

