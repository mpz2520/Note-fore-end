const express = require('express')
const app = express(); //express()本质上就是调用了createApplication()方法，返回了一个express对象
const bodyParser = require('body-parser')
//处理静态资源
//你可以使用express.static中间件来设置静态文件路径。
//例如，如果你将图片， CSS, JavaScript文件放在public目录下，你可以这么写：app.use(express.static('public'));
app.use(express.static('public'));

//利用body-paser中间件处理文件格式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  //设置请求头
  //允许所有来源访问
  res.header('Access-Control-Allow-Origin', '*')
  //用于判断request来自ajax还是传统请求
  res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept, mytoken");
  //允许访问的方式
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  //修改程序信息与版本
  res.header('X-Powered-By', ' 3.2.1')
  //内容类型：如果是post请求必须指定这个属性
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

//路由
app.get('/data',(req,res) => {
	res.send('hello world')
})
app.get('/data1',(req,res) => {
	setTimeout(function(){
	res.send('hello TOM')	
	},1000)
})
app.get('/data2',(req,res) => {
	res.send('hello JERR')
})

//路由 --Promise常用API的测试
app.get('/a1',(req,res) => {
	setTimeout(function(){
	res.send('hello TOM')	
	},1000)
});
app.get('/a2',(req,res) => {
	setTimeout(function(){
	res.send('hello Jerry')	
	},2000)
});
app.get('/a3',(req,res) => {
	setTimeout(function(){
	res.send('hello Spike')	
	},3000)
})


//路由 --fetch的测试
app.get('/fdata',(req,res) => {
	setTimeout(function(){
	res.send('hello fetch')	
	},3000)
})
//路由 --fetch带参数请求的路由
app.get('/books',(req,res) => {
	res.send('传统的URL传递参数' + req.query.id)	
})
app.get('/books/:id',(req,res) => {  
	// request respond
	res.send('Resetful形式的URL传递参数' + req.params.id)	
})
app.delete('/books/:id',(req,res) => {
	res.send('DELTET请求传递参数' + req.params.id)	
})
app.post('/books',(req,res) => {
	res.send('POST请求传递参数:' + req.body.uname + '---' + req.body.pwd)	
})
app.put('/books/:id',(req,res) => {
	res.send('PUT请求传递参数:' + req.body.uname + '---' + req.body.pwd + '---' + req.params.id )	
})

//路由 --fetch-json格式请求
app.get('/json',(req,res) => {
	res.json({
		uname:'张三',
		age:25,
		gender:'male'
	});	
})


//axios请求基本用法
app.get('/adata',(req,res) => {
	res.send('Hello axios')	
})
//url传参与params对象传参也是调用这个
app.get('/axios',(req,res) => {
	res.send('axios get 传递参数' + req.query.id)	
})
app.get('/axios/:id',(req,res) => {
	res.send('axios get (Restful) 传递参数' + req.params.id)	
})
app.delete('/axios',(req,res) => {
	res.send('axios DELETE 传递参数' + req.query.id)	
})
app.post('/axios',(req,res) => {
	res.send('axios POST 传递参数' + req.body.uname + '---' + req.body.pwd)	
})
app.put('/axios/:id',(req,res) => {
	res.send('axios POST 传递参数' + req.params.id + ': ' + req.body.uname + '---' + req.body.pwd)	
})
app.get('/axios-json',(req,res) => {
	res.json({
		uname: '法外狂徒',
		pwd: 'admin12345'
	})	
})
//async/await处理多个异步请求
app.get('/async1',(req,res) => {
	res.send('hello async/await')
})
app.get('/async2',(req,res) => {
	if(req.query.info == 'hello async/await'){
		res.send('hello async/await')
	}else{
		res.send('error')
	}	
})

//启动监听
app.listen(3000,()=>{
	console.log('running123')
	//console.log(app)   //[Function: app] EventEmitter {...}
	//console.log(express) //[Function: createApplication] {application: {...} }
})
