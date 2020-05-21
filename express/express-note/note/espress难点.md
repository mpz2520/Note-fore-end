## 1.app.use和app.get的区别及解析
app.use(path,callback)中的callback既可以是router对象又可以是函数   
app.get(path,callback)中的callback只能是函数   

```
var express = require('express');
var app = express();
app.get('/hello',function(req,res,next){
    res.send('hello test2');
 
});
等同于：
var express = require('express');
var app = express();
var router = express.Router();
 
router.get('/', function(req, res, next) {
  res.send('hello world!');
});
app.use('/hello',router);
```

那么，什么时用app.use，什么时用app.get呢？    
路由规则是app.use(path,router)定义的，router代表一个由express.Router()创建的对象，在路由对象中可定义多个路由规则。可是如果我们的路由只有一条规则时，可直接接一个回调作为简写，也可直接使用app.get或app.post方法。即
当一个路径有多个匹配规则时，使用app.use，否则使用相应的app.method(get、post)
 
总结：   
app.use用来使用中间件（ middleware）


### 例子2     
```
//我们可以创建一个router.js 专门用来一个路由匹配多个子路由
var express = require('express')
var router = express.Router()
router.get("/",(req,res)=>{
    res.send("/")
})
router.get("/one",(req,res)=>{
    res.send("one")
})
router.get("/second",(req,res)=>{
    res.send("second")
})
router.get("/treen",(req,res)=>{
    res.send("treen")
})
module.exports = router;
```

在app.js中导入router.js   
```
var express = require('express')
var router = require("./router")
var app = express()

app.use('/home',router) //router路由对象中的路由都会匹配到"/home"路由后面
app.get('/about', function (req, res) {
  console.log(req.query)
  res.send('你好，我是 Express!')
})

// 4 .启动服务
app.listen(3000, function () {
  console.log('app is running at port 3000.')
})
```
总结：    
路由规则是app.use(path,router)定义的，router代表一个由express.Router()创建的对象，在路由对象中可定义多个路由规则。   
可是如果我们的路由只有一条规则时，可直接接一个回调作为简写，也可直接使用app.get或app.post方法。即    
当一个路径有多个匹配规则时，使用app.use（）

### 为了提供对静态资源文件（图片，css，js文件）的服务，请使用Express内置的中间函数express.static.   
比如用以下代码来提供public目录下的图片、css文件和js文件：   
`app.use(express.static('public'));`

如果前台想请求后台public目录下images/08.jpg静态的图片资源  
通过： http://localhost:3000/images/08.jpg  


## 其他
