/*
有时候我们只是想把一个对象封装到模块中，格式如下：
module.exports = function() {
   ...
}
*/

function Hello() { 
    var name; 
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + name); 
    }; 
}; 
module.exports = Hello;
//其接口对象就是要输出的 Hello 对象本身，而不是原先的 exports。
//用require获取模块对象，返回的是数组

//而b.js中exports.world的形式返回的是对象


