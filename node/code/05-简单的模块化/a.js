//b.js
var b = require('./b');
console.log(b)
b.world();
console.log(b.add(10,15))


//  c.js
var Cexprot = require('./c'); 
console.log(Cexprot)
//因为c.js文件的接口对象 Hello 对象本身,所以需要new一个对象
c = new Cexprot(); 
c.setName('BYVoid'); 
c.sayHello(); 

var d = require('./d'); 
console.log(d)
console.log(d.abc)


// d.abc.setName('BYVoid'); 
// d.abc.sayHello(); 
// 上面使用方式不行

//  e.js  
var functions = require("./e");
functions.function1();
functions.function2();
// functions.abc.add(); 不行