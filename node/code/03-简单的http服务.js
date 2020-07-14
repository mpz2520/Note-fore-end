//1，加载http核心模块
var http = require('http')

//2，使用http.createServer()创建一个web服务器
//返回一个server实例
var server = http.createServer()

//注册request请求事件，等待客户端发送请求
//request请求事件的回调函数接受两个参数
//request请求对象
//response响应对象
server.on('request',function(request123,response123){
	console.log('收到客户端的请求了，请求路径是:' + request123.url)
	response123.write('hello,node.js')
	response123.end()
})

//绑定端口号,启动服务器应用
server.listen(3000,function(){
	console.log('Server running at http://127.0.0.1:3000/')
})