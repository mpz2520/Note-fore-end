## Vue语法细节补充

### vue定义data的三种方式与区别
1.第一种写法，对象。
```
var app = new Vue({
　　el: '#yanggb',
　　data: {
　　　　yanggb: 'yanggb'
　　}
})
```

2.第二种写法，函数。
```
var app = new Vue({
　　el: '#yanggb',
　　data: function() {
　　　　return {
　　　　　　yanggb: 'yanggb'
　　　　}
　　}
})
```

3.第三种写法，函数，是第二种写法的ES6写法。
```
var app = new Vue({
　　el: '#yanggb',
　　data() {
　　　　return {
　　　　　　yanggb: 'yanggb'
　　　　}
　　}
})
```

在简单的vue实例应用中，三种写法几乎是没有什么区别的，因为你定义的#yanggb对象不会被复用。

但是如果是在组件应用的环境中，就可能会存在多个地方调用同一个组件的情况，为了不让多个地方的组件共享同一个data对象，只能返回函数(用第二、第三种定义方式)

这个与JavaScript的作用域特性有关，函数自己拥有私有的作用域，函数之间的作用域相互独立，也就不会出现组件对数据的绑定出现交错的情况。

### Window方法

#### Window setInterval() 方法
setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。

每三秒（3000 毫秒）弹出 "Hello" :
```
setInterval(function(){ alert("Hello"); }, 3000);
```

clearInterval() 方法可取消由 setInterval() 函数设定的定时执行操作。

clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。

#### Window setTimeout() 方法
setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。

3 秒（3000 毫秒）后弹出 "Hello" :
```
setTimeout(function(){ alert("Hello"); }, 3000);
```

提示： 使用 clearTimeout() 方法来阻止函数的执行。
`clearTimeout(id_of_settimeout)`

### Vue数组变更方法
push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。

pop() 方法用于删除并返回数组的最后一个元素。

shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。

unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。

splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

sort() 方法用于对数组的元素进行排序。

reverse() 方法用于颠倒数组中元素的顺序。

替换数组
filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

concat() 方法用于连接两个或多个数组。

slice() 方法可从已有的数组中返回选定的元素。

其他
split() 方法用于把一个字符串分割成字符串数组。


### 阻止事件冒泡和默认事件
原生js取消事件冒泡
```
    try{
        e.stopPropagation();//非IE浏览器
    }
    catch(e){
        window.event.cancelBubble = true;//IE浏览器
    } 
```

原生js阻止默认事件      
一些html元素默认的行为，比如说a标签，点击后有跳转动作；form表单中的submit类型的input有一个默认提交跳转事件；reset类型的input有重置表单行为。
```
if ( e && e.preventDefault ) {
            e.preventDefault()//非IE浏览器
} else { window.event.returnValue = false; } //IE浏览器
``` 

vue.js取消事件冒泡
```
<div @click.stop="doSomething($event)">vue取消事件冒泡</div>
```

vue.js阻止默认事件
```
<div @click.prevent="doSomething($event)">vue阻止默认事件</div>
```

### 123