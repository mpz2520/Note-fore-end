// $.fn.extend({
// 	alertWhileClick:function() {  
// 		console.log('$.fn.extend()--alertWhileClick')
// 		  $(this).click(function(){                 
// 				$(this).css("background-color","black") 
// 				console.log('$.fn.extend()--alertWhileClick--.click')		 
// 		   });   
		
// 		// $(this).css("background-color","#00BCD4")
// 		// $(this).css({"background-color":"yellow","font-size":"200%"})	  
// 	 }       
// });



var mpz = '张三';    
console.log(mpz);   //自调用函数前面的代码后面要记得加分号（;）。
// console.log('aaa')
//这里添加自执行，发现结果与上面没有自执行一样
(function () {
	$.fn.extend({
		alertWhileClick:function() {  
			console.log('$.fn.extend()--alertWhileClick')
			  $(this).click(function(){                 
					$(this).css("background-color","red") 
					console.log('$.fn.extend()--alertWhileClick--.click')
			   });   
			
			// $(this).css("background-color","#00BCD4")
			// $(this).css({"background-color":"yellow","font-size":"200%"})	  
		 }       
	});
}())

/*
 总结:
 function () { $.fn.extend({}); }  -- 这样是不行的，因为加载时函数只是加载并不会执行
*/