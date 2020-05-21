## 安装 Express
1. 首先安装 Node.js，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录。运行:  
    * $ mkdir myapp
    * $ cd myapp
2. 通过 npm init 命令为你的应用创建一个 package.json 文件。 **$ npm init**       
   此命令将要求你输入几个参数，例如此应用的名称和版本。你可以直接按“回车”键接受默认设置即可，      
   其中  entry point: (index.js)    是入口文件      
3. 接下来安装 Express 并将其保存到依赖列表中：   
    $ npm install express --save   //如果只是临时安装 Express，不想将它添加到依赖列表中，只需略去 --save 参数即可：
4. 
#### 常用简写
* npm install=npm i。在git clone项目的时候，项目文件中并没有 node_modules文件夹，项目的依赖文件可能很大。直接执行，npm会根据package.json配置文件中的依赖配置下载安装。
* -global=-g，全局安装，安装后的包位于系统预设目录下
* --save=-S，安装的包将写入package.json里面的dependencies，dependencies：生产环境需要依赖的库
* --save-dev=-D，安装的包将写入packege.json里面的devDependencies，devdependencies：只有开发环境下需要依赖的库
	
## 1，Hello world 实例
```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```

## 2，Express 应用生成器
通过应用生成器工具 express 可以快速创建一个应用的骨架。   
1. 通过如下命令安装：`$ npm install express-generator -g`    
2. -h 选项可以列出所有可用的命令行选项： `$ express -h`     
3. 当前工作目录下创建一个命名为 myapp 的应用。`$ express myapp`
4. 然后安装所有依赖包：`$ cd myapp`   `$ npm install`
5. 启动这个应用（MacOS 或 Linux 平台）：$ DEBUG=myapp npm start   Windows 平台使用如下命令：> set DEBUG=myapp & npm start
6. 然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了。  

## 利用 Express 托管静态文件
假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：   
`app.use(express.static('public'));`    
现在，public 目录下面的文件就可以访问了。
http://localhost:3000/images/kitten.jpg   
http://localhost:3000/css/style.css   
http://localhost:3000/js/app.js   

如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：    
app.use(express.static('public'));    
app.use(express.static('files'));     
访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。

如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：     
app.use('/static', express.static('public'));   
现在，可以通过带有 “/static” 前缀的地址来访问 public 目录下面的文件了。   
[](http://localhost:3000/static/images/kitten.jpg   
http://localhost:3000/static/css/style.css    
http://localhost:3000/static/js/app.js)    

## 路由
### Express 路由
路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。  

路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： app.METHOD(path, [callback...], callback)， app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。

下面是一个基本的路由示例：    
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

### 路由方法
Express 定义了如下和 HTTP 请求对应的路由方法： get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect。

有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如：app['m-search']('/', function ...

app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。

app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();  //表示继续请求处理
});

### 路由路径
路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

使用字符串的路由路径示例：   
// 匹配根路径的请求
app.get('/', function (req, res) {
  res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
  res.send('random.text');
});

使用字符串模式的路由路径示例：      
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});

使用正则表达式的路由路径示例：     
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
  res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});

### 路由句柄
可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合，如下所示.

//使用一个回调函数处理路由：
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});

//使用多个回调函数处理路由（记得指定 next 对象）：    
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});

//使用回调函数数组处理路由：    
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

//混合使用函数和函数数组处理路由：       
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

### 响应方法
下表中响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

|方法	|描述|
|--	|--	|
|res.download()	 |提示下载文件。|
|res.end()	     |终结响应处理流程。|
|res.json()	     |发送一个 JSON 格式的响应。|
|res.jsonp()	 |发送一个支持 JSONP 的 JSON 格式的响应。|
|res.redirect()	 |重定向请求。|
|res.render()	 |渲染视图模板。|
|res.send()	     |发送各种类型的响应。|
|res.sendFile	 |以八位字节流的形式发送文件。|
|res.sendStatus()|设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。|

### app.route()
可使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。请参考 Router() 文档 了解更多有关路由的信息。

//下面这个示例程序使用 app.route() 定义了链式路由句柄。   
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
  
### express.Router
可使用 express.Router 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。    
在 app 目录下创建名为 birds.js 的文件，内容如下：
```
var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
```

然后在应用中加载路由模块：
```
var birds = require('./birds');
...
app.use('/birds', birds);
```
应用即可处理发自 /birds 和 /birds/about 的请求，并且调用为该路由指定的 timeLog 中间件。  

## Express 中间件
### 使用中间件
Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）  

中间件的功能包括：
* 执行任何代码。
* 修改请求和响应对象。
* 终结请求-响应循环。
* 调用堆栈中的下一个中间件。
如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。

Express 应用可使用如下几种中间件：
* 应用级中间件
* 路由级中间件
* 错误处理中间件
* 内置中间件
* 第三方中间件
使用可选则挂载路径，可在应用级别或路由级别装载中间件。    另外，你还可以同时装在`一系列`中间件函数，从而在一个挂载点上创建一个子中间件栈 见② 。   

### 应用级中间件
应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()，其中， METHOD 是需要处理的 HTTP 请求的方法，例如 GET, PUT, POST 等等，全部小写。例如：
```
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```

//下面这个例子展示了在一个挂载点装载一组中间件。② 
```
// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

作为中间件系统的路由句柄，使得为路径定义多个路由成为可能。在下面的例子中，为指向 /user/:id 的 GET 请求定义了两个路由。第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环。     
```
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
  //next(); 指向下一个路由，这里没有下面的路由不会被执行
});

// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
```

如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。   
```
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {      //--路由1
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 否则将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function (req, res, next) {     //--路由2
  res.render('special');
});
```


### 路由级中间件
路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。  
 `var router = express.Router();   `
 
//路由级使用 router.use() 或 router.VERB() 加载。   
// 上述在应用级创建的中间件系统，可通过如下代码改写为路由级：    
```
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// 将路由挂载至应用
app.use('/', router);
```

### 错误处理中间件
错误处理中间件有 4 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。    

错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。  
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

### 内置中间件
express.static(root, [options])   
express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。
参数 root 指提供静态资源的根目录。
可选的 options 参数拥有如下属性。

|属性			|描述																				|类型		|缺省值			|
|--	|--	|--	|--	|
|dotfiles		|是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”	            |String		|“ignore”	    |
|etag			|是否启用 etag 生成																	|Boolean	|true			|
|extensions		|设置文件扩展名备份选项																|Array		|[]				|
|index			|发送目录索引文件，设置为 false 禁用目录索引。										    |Mixed		|“index.html”	|
|lastModified	|设置 Last-Modified 头为文件在操作系统上的最后修改日期。可能值为 true 或 false。	        |Boolean	|true			|
|maxAge			|以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。						    |Number		|0				|
|redirect		|当路径为目录时，重定向至 “/”。												     	|Boolean	|true			|
|setHeaders		|设置 HTTP 头以提供文件的函数。														|Function	|				|

下面的例子使用了 express.static 中间件，其中的 options 对象经过了精心的设计。
```
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
```

每个应用可有多个静态目录。    
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));


### 第三方中间件
通过使用第三方中间件从而为 Express 应用增加更多功能。

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser     
$ npm install cookie-parser
```
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// 使用中间件  加载用于解析 cookie 
app.use(cookieParser());
```

## Express 中使用模板引擎
