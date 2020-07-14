var fs = require('fs')
fs.readFile('../Note/nodejs.md',function(error,data){
	//这里error与data都是型参
	if(err){
		console.log(err)
	}else{
		console.log(data.toString());
	}
});

fs.writeFile('../Note/test.md','这里是第二个写入的内容',function(error){
	//写入成功error是null，
	//写入失败error是失败对象
	console.log(error);
})