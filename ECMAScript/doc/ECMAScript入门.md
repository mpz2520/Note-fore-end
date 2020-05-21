## 数据类型
### 原始数据类型
* undefined - 如果变量是Undefined类型的
* boolean - 如果变量是Boolean类型的
* number - 如果变量是Number类型的
* string - 如果变量是String类型的
* object - 如果变量是一种引用类型或Null类型的


值undefined并不同于未定义的值。但是，typeof运算符并不真正区分这两种值。
```
var oTemp;

alert(typeof oTemp);  //输出 "undefined"
alert(typeof oTemp2);  //输出 "undefined"
```

当函数无明确返回值时，返回的也是值"undefined"，如下所示：
```
function testFunc() {
}

alert(testFunc() == undefined);  //输出 "true"
```

另一种只有一个值的类型是Null，它有唯一专用值null，即它的字面量。值undefined实际上是从值null派生来的，因此ECMAScript把它们定义为相等的。
```
alert(null == undefined);  //输出 "true"
```
尽管这两个值相等，但它们的含义不同。undefined是声明了变量但未对其初始化时赋予该变量的值，null则用于表示尚未存在的对象。如果函数或方法要返回的是对象，那么找不到该对象时，返回的通常是null。

### ECMAScript 引用类型


## 12


### let与const
ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
```
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

```
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```
上面代码中，变量i是var声明的，在全局范围内都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。


```
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。


let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。
```
console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError

var foo = 2;
let bar = 2;
```

暂时性死区   
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
```
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```
上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。


####  const命令  
* const声明一个只读的常量。一旦声明，常量的值就不能改变。
* const一旦声明变量，就必须立即初始化，不能留到以后赋值。对于const来说，只声明不赋值，就会报错。
* const的作用域与let命令相同：只在声明所在的块级作用域内有效。
* const声明的常量，也与let一样不可重复声明。