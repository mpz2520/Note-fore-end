## css新特性

### 浏览器前缀
1. -moz-代表firefox浏览器私有属性
2. -ms-代表ie浏览器私有属性
3. -webkit-代表safari、chrome私有属性
4. -o-代表Opera

```
-webkit-transform: rotate(0deg);
-moz-transform: rotate(0deg);
-ms-transform: rotate(0deg);
-o-transform: rotate(0deg);
transform: rotate(0deg);
```

### CSS动画

#### 实例 (@keyframe创建动画)
from{}规定开始的样式。to{}规定结束的样式,等价于 0% 和 100%。

背景颜色逐渐地从红色变化到蓝色：
```
@keyframes mymove
{
from {background-color:red;}
to {left:blue;}
}

/*Safari 和 Chrome:*/
@-webkit-keyframes mymove
{
from {background-color:red;}
to {background-color:blue;}
}
```

也可以用百分比%设置过度的样式
```
@keyframes mymove
{
0%   {top:0px;}
25%  {top:200px;}
50%  {top:100px;}
75%  {top:200px;}
100% {top:0px;}
}

@-moz-keyframes mymove /* Firefox */
{
0%   {top:0px;}
25%  {top:200px;}
50%  {top:100px;}
75%  {top:200px;}
100% {top:0px;}
}
```

#### CSS3 动画绑定
当在@keyframe创建动画，通过animation熟悉把它绑定到一个选择器，否则动画不会有任何效果。

至少指定这两个animation属性值：
   * 规定动画的名称
   * 规定动画的时长

#### CSS3 animation 属性
animation 属性是六个动画属性的速记属性：用于指定@keyframe创建的动画名，动画播放速度，延时，循环，次数等效果

**语法**  
`animation: name duration timing-function delay iteration-count direction;`

1. animation-name: keyframename|none;	规定需要绑定到选择器的 keyframe 名称。。
2. animation-duration: time;	规定完成动画所花费的时间，以秒或毫秒计。
3. animation-timing-function: value;	规定动画的速度曲线。
   * 与transition-timing-function 属性用法一样，
4. animation-delay: time;	规定在动画开始之前的延迟。
5. animation-iteration-count:n|infinite;	规定动画应该播放的次数。(默认1次，infinite无限次，)
6. animation-direction: normal|alternate;	规定是否应该轮流反向播放动画。


