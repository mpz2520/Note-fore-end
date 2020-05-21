## JSON vs XML
 **最大的不同是：XML 需要使用 XML 解析器来解析，JSON 可以使用标准的 JavaScript 函数来解析。**
    * JSON.parse(): 将一个 JSON 字符串转换为 JavaScript 对象。
    * JSON.stringify(): 于将 JavaScript 值转换为 JSON 字符串。

## JSON语法
**JSON 语法规则**
JSON 语法是 JavaScript 对象表示语法的子集。
  * 数据在名称/值对中
  * 数据由逗号分隔
  *	大括号保存对象
  *	中括号保存数组
### JSON 名称/值对
JSON 数据的书写格式是：名称/值对。 例如：`"name" : "菜鸟教程"`  ` "sites": []`   `"ojb": {}`

### JSON 值
JSON 值可以是：
	* 数字（整数或浮点数）
	* 字符串（在双引号中）
	* 逻辑值（true 或 false）
	* 数组（在中括号中）
	* 对象（在大括号中）
	* null
## JSON 使用 JavaScript 语法
实例
```
var sites = [
    { "name":"runoob" , "url":"www.runoob.com" }, 
    { "name":"google" , "url":"www.google.com" }, 
    { "name":"微博" , "url":"www.weibo.com" }
];
```
可以像这样访问 JavaScript 对象数组中的第一项（索引从 0 开始）：
``` sites[0].name;`  //返回的内容是：runoob ```


## JSON.parse()
JSON 通常用于与服务端交换数据。
在接收服务器数据时一般是字符串。
我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。

### 语法
`JSON.parse(text[, reviver])`

参数说明：
   * text:必需， 一个有效的 JSON 字符串。
   * reviver: 可选，一个转换结果的函数， 将为对象的每个成员调用此函数。

## JSON.stringify()
JSON 通常用于与服务端交换数据。
在向服务器发送数据时一般是字符串。
我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串。
### 语法
`JSON.stringify(value[, replacer[, space]])`
#### 参数说明：
value:
必需， 要转换的 JavaScript 值（通常为对象或数组）。

replacer:
可选。用于转换结果的函数或数组。

如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。

如果 replacer 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。当 value 参数也为数组时，将忽略 replacer 数组。

space:
可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格，如果 space 大于 10，则文本缩进 10 个空格。space 也可以使用非数字，如：\t。


## JSON 使用
创建包含 JSON 语法的 JavaScript 字符串：
```
var txt = '{ "sites" : [' +
'{ "name":"菜鸟教程" , "url":"www.runoob.com" },' +
'{ "name":"google" , "url":"www.google.com" },' +
'{ "name":"微博" , "url":"www.weibo.com" } ]}';
```
JavaScript 函数 eval() 可用于将 JSON 文本转换为 JavaScript 对象。
``` var obj = eval ("(" + txt + ")");```

### 实例1 用eval函数方法
```
var txt = '{ "sites" : [' +
'{ "name":"菜鸟教程" , "url":"www.runoob.com" },' +
'{ "name":"google" , "url":"www.google.com" },' +
'{ "name":"微博" , "url":"www.weibo.com" } ]}';
 
var obj = eval ("(" + txt + ")");
 
document.getElementById("name").innerHTML=obj.sites[0].name 
document.getElementById("url").innerHTML=obj.sites[0].url
```

### 例子2 用JSON.parse方法更安全
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
<h2>从 JSON 字符串中创建对象</h2>
<p>
网站名: <span id="name"></span><br> 
网站地址: <span id="url"></span><br> 
</p> 
<script>
var txt = '{ "sites" : [' +
'{ "name":"菜鸟教程" , "url":"www.runoob.com" },' +
'{ "name":"google" , "url":"www.google.com" },' +
'{ "name":"微博" , "url":"www.weibo.com" } ]}';

obj = JSON.parse(txt);

document.getElementById("name").innerHTML=obj.sites[0].name 
document.getElementById("url").innerHTML=obj.sites[0].url
</script>
</body>
</html>
```