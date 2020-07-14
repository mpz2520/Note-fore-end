/*
exports.abc = function(){..}  类型使用
*/
var func1 = function() {
   console.log("加油");
};
 
var func2 = function() {
   console.log("你最棒");
};
 
exports.function1 = func1;
exports.function2 = func2;
 
exports.abc = function() {
	console.log("坚持就是胜利");
	
	//下面添加方法是不行的，
	// this.add = function(x,y){
	// 	return x+y;
	// };
}