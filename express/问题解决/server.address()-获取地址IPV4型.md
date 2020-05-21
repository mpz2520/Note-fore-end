问题
教程中有段代码是这样得
```
var express = require('express');
var app = express();    

var server = app.listen(8081, function () {
     
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
```
用来获取访问地址，应得到该图片所示得效果
但是我写完得到得是以下内容
我又打印了一下server.address()的内容得到的是
显示的是IPv6
修改之后写成了以下的形式
```
var express = require('express');
var app = express();  
var server = app.listen(8081, '0.0.0.0',function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
```


而打印server.address()的内容得到的是
这一次变为了IPv4.

分析
应该是在默认只写端口的模式下，是默认的IPv6的模式，如果想要变更为IPv4的模式的话，需要在指定端口之后添加一个指定ip地址的参数才可以。
————————————————
版权声明：本文为CSDN博主「莫奈小姐姐」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zora_55/article/details/93750740