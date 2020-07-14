//用来获取机器信息的
var os = require('os')

//用来获取操作路径的
var path = require('path')

//获取当前CPU的信息
console.log(os.cpus())

//获取内容，memory
console.log(os.totalmem())

//path的extname 方法获取扩展名
console.log(path.extname('c:/a/b/c/hello.txt'))