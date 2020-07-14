exports.abc = function () { 
    var name; 
    this.setName = function aaa(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function ccc() { 
        console.log('Hello ' + name); 
    }; 
}; 
