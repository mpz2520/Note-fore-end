### JavaScript prototype 属性
prototype 属性使您有能力向对象添加属性和方法。

语法  `object.prototype.name=value`

在本例中，我们将展示如何使用 prototype 属性来向对象添加属性：
```
<script type="text/javascript">

function employee(name,job,born)
{
this.name=name;
this.job=job;
this.born=born;
}

var bill=new employee("Bill Gates","Engineer",1985);

employee.prototype.salary=null;
bill.salary=20000;

document.write(bill.salary);
</script>
```

### jQuery noConflict() 方法
noConflict() 方法会释放对 $ 标识符的控制，这样其他脚本就可以使用它了。
```
$.noConflict();
jQuery(document).ready(function(){
  jQuery("button").click(function(){
    jQuery("p").text("jQuery is still working!");
  });
});
```

您也可以创建自己的简写。noConflict() 可返回对 jQuery 的引用
```
var jq = $.noConflict();
jq(document).ready(function(){
  jq("button").click(function(){
    jq("p").text("jQuery is still working!");
  });
});
```

如果你的 jQuery 代码块使用 $ 简写，并且您不愿意改变这个快捷方式，那么您可以把 $ 符号作为变量传递给 ready 方法。这样就可以在函数内使用 $ 符号了 - 而在函数外，依旧不得不使用 "jQuery"：
```
$.noConflict();
jQuery(document).ready(function($){
  $("button").click(function(){
    $("p").text("jQuery is still working!");
  });
});
```

### jquery自执行的匿名函数
$(function(){ } 这是jquery里的copy,是当文档载入完毕就执行意思.
```
$(function(){
// do something
});
```

//等价于
```
$(document).ready(function(){
//do something
})
```

允许外界访问的属性或方法可以挂载到window上
```
(function(){
  var count=0;
  var addOne=function(){
    alert(count++);
  };
  window.outerAddOne=addOne; //挂到window上外界方可访问
})();

outerAddOne();//alert "0"
console.log(count);//error
console.log(addOne);//error
```



### 理解jquery的$.extend()、$.fn和$.fn.extend()

#### jQuery.extend() 
1. $.extend( [deep ], target, object1 [, objectN ] )
```
var settings = { validate: false, limit: 5, name: "foo" }; 
var options = { validate: true, name: "bar" }; 
jQuery.extend(settings, options); 
结果：settings == { validate: true, limit: 5, name: "bar" }
```

2. jQuery.extend(object)

为jQuery类添加类方法，可以理解为添加静态方法。如：
```
jQuery.extend({
min: function(a, b) { return a < b ? a : b; },
max: function(a, b) { return a > b ? a : b; }
});
jQuery.min(2,3); //  2 
jQuery.max(4,5); //  5
//jQuery换成$一样,混合使用也许
```

#### jQuery.fn.extend(object);
jQuery.fn.extend = jQuery.prototype.extend

你可以拓展一个对象到jQuery的 prototype里去，这样的话就是插件机制了。

比如我们要开发一个插件，做一个特殊的编辑框，当它被点击时，便alert 当前编辑框里的内容。可以这么做：
```
$.fn.extend({          
    alertWhileClick:function() {            
          $(this).click(function(){                 
                 alert($(this).val());           
           });           
     }       
});       
$("#input1").alertWhileClick(); // 页面上为：
 
 //去掉.fn 会报错，因为$.extend只适用添加静态方法，$("#input1").alertWhileClick();就属于动态方法
//jQuery换成$一样,混合使用也许
```

## this

### 例子1
例子1：
```
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this); //Window
}
a();
```
按照我们上面说的this最终指向的是调用它的对象，这里的函数a实际是被Window对象所点出来的，下面的代码就可以证明。

```
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
    }
}
o.fn();
```
和上面代码一样吧，其实alert也是window的一个属性，也是window点出来的。

### 例子2
```
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
    }
}
o.fn();  //等于window.o.fn();
```

### 例子3
```
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user); //追梦子
    }
}
window.o.fn();

//this指向的也只是它上一级的对象
var o = {
    a:10,
    b:{
        // a:12,
        fn:function(){
            console.log(this.a); //undefined
        }
    }
}
o.b.fn();
```

### 还有一种比较特殊的情况，例子4：
```
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn;
j();
```
this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的，例子4中虽然函数fn是被对象b所引用，但是在将fn赋值给变量j的时候并没有执行所以最终指向的是window，这和例子3是不一样的，例子3是直接执行了fn。

### 构造函数版this：
```
function Fn(){
    this.user = "追梦子";
}
var a = new Fn();
console.log(a.user); //追梦子

//var a = new Fn();这句话等价于
var a = {
	user : "追梦子"
}

```
这里之所以对象a可以点出函数Fn里面的user是因为new关键字可以改变this的指向，将这个this指向对象a

因为用了new关键字就是创建一个对象实例，理解这句话可以想想我们的例子3


如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。
```
function fn()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined

//再看一个
function fn()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined

//再看一个
function fn()  
{  
    this.user = '追梦子';  
    return 1;
}
var a = new fn;  
console.log(a.user); //追梦子

```


### 深入理解js构造函数
在JavaScript中，创建对象的方式包括两种：对象字面量和使用new表达式。对象字面量是一种灵活方便的书写方式，例如：
```
var o1 = {
    p:”I’m in Object literal”,
    alertP:function(){
        alert(this.p);
    }
}
```

```
function CO(){
    this.p = “I’m in constructed object”;
    this.alertP = function(){
        alert(this.p);
    }
}
var o2 = new CO();
```
