//(function () {

    function Slider(option) {
        this.wrap = option.wrap; //调用slider的元素  div.demo
		var aaa = option.wrap;   
		console.log('aaa');
		var bbb = 2;
		console.log(aaa)
		console.log('打印Slider函数里的 this ')
		console.log(this);        // 返回 --Slider {wrap: m.fn.init(1)}activeSpanColor: "red"btnBackgroundColor: "rgba(0, 0, 0, 0.3)"btnHeight: 30btnWidth: 30direction: "right"flag: falseheight: 300imgList: (3) [{…}, {…}, {…}]imgNum: 3isAuto: truemoveTime: 3000nowIndex: 0spanColor: "#fff"spanHeight: 10spanMargin: 3spanRadius: "50%"spanWidth: 10time: 1width: 500wrap: m.fn.init [div.demo, prevObject: m.fn.init(1), context: document, selector: ".demo"]__proto__: Object
        console.log(this.width)   //undefined  这里的this是指这函数体内的this.value 变量，放下面就可以
		console.log('打印Slider函数里的option')
		console.log(option)    //跟new slider() 前打印一样 放回html上调用时传递的对象{}
		console.log('打印Slider函数里的 option.wrap ')   //this.wrap = option.wrap
		console.log(option.wrap)   //--div.demo
		console.log('打印Slider函数里的 $(option.wrap) ')
		console.log($(option.wrap))
		console.log('Slider函数内的 $ --' + $)     //$ -- function(a,b){return new m.fn.init(a,b)}
        this.imgList = option.imgList; //图片列表
		var ccc = option.imgList;
        this.imgNum = this.imgList.length; //图片的长度
        this.width = option.width || $(option.wrap).width(); //图片的宽
        this.height = option.height || $(option.wrap).height(); //图片的高
        this.isAuto = option.isAuto || true; //是否自动轮播
        this.moveTime = option.moveTime; //轮播的时间
        this.direction = option.direction || 'right'; //轮播的方向
        this.btnWidth = option.btnWidth; //按钮的宽
        this.btnHeight = option.btnHeight; //按钮的高
        this.spanWidth = option.spanWidth; //span的宽
        this.spanHeight = option.spanHeight; //span的高
        this.spanColor = option.spanColor; //span按钮的背景颜色
        this.activeSpanColor = option.activeSpanColor; //选中span的颜色
        this.btnBackgroundColor = option.btnBackgroundColor; //按钮的背景颜色
        this.spanRadius = option.spanRadius; //按钮的圆角程度
        this.spanMargin = option.spanMargin; //span之间的距离
        this.flag = false;
        this.nowIndex = 0;
        // this.createDom();
		test();     //可行，但不方便，不直观，var name ，只能在内部函数使用，而this.name 可以在外部prototype添加属性时使用，代码更加直观
        this.initStyle();
        this.bindEvent();
		abc();
		function abc(){
			console.log('自定义abc()函数里的aaa');
			console.log(aaa);  //可以
			console.log(this.wrap)  //undefined
			//console.log(wrap)   //报错
			console.log(ccc)
		}
		this.shux = function() {
			console.log('自定义的shux');
			console.log(this.wrap)  //可以
			console.log(aaa);   //可以
			/*
			 总结：this.name 只能属性对象内使用
			 var name 可以在普通函数对象内使用，也可以在属性对象内使用
			*/
		}
		this.shux();
		console.log(this.width + 1)   //501
        if(this.isAuto){
            this.autoMove()
        }
		function test() {
			
		    var oUl = $('<ul class="imgList"></ul>');
		    var Spot = $('<div class="spot"></div>')
		    ccc.forEach(function(item) {
		        var oLi = ('<li><a href=" ' + item.a +' "><img src=" ' + item.img + ' "></a></li>');
		        oUl.append(oLi);
		        var span = ('<span></span>');
		        Spot.append(span);
		    });
		    var leftBtn = $('<div class="left-btn">&lt</div>');
		    var rightBtn = $('<div class="right-btn">&gt</div>');
		    aaa.append(oUl).append(leftBtn).append(rightBtn).append(Spot);
			
			
		   
		   /*
		     函数内部的this.name 与 var name 的区别
		   */
		   //onsole.log('这里是Slider函数内定义函数体内')
		   // console.log(bbb)   报错
		   
		}  
    }
	
	
  //向Slider构造函数对象添加属性，属性对象内可以用this.name,但不能用var name
  //   Slider.prototype.createDom = function() {
		
  //       var oUl = $('<ul class="imgList"></ul>');
  //       var Spot = $('<div class="spot"></div>')
  //       this.imgList.forEach(function(item) {
  //           var oLi = ('<li><a href=" ' + item.a +' "><img src=" ' + item.img + ' "></a></li>');
  //           oUl.append(oLi);
  //           var span = ('<span></span>');
  //           Spot.append(span);
  //       });
  //       var leftBtn = $('<div class="left-btn">&lt</div>');
  //       var rightBtn = $('<div class="right-btn">&gt</div>');
  //       this.wrap.append(oUl).append(leftBtn).append(rightBtn).append(Spot);
		
		
	   
	 //   /*
	 //     函数内部的this.name 与 var name 的区别
	 //   */
	 //   console.log('这里是Slider函数内定义函数体内')
	 //   // console.log(bbb)   报错
	   
  //   }
  
    
	
    
    Slider.prototype.initStyle = function() {
        $('*', this.wrap).css({         //选择this.wrap下面的所以 
            'margin': 0,
            'padding': 0,
            listStyle: 'none',
        });
        $(this.wrap).css({      //选择this.wrap
            overflow: 'hidden',
            position: 'relative',
        })
        $('.imgList', this.wrap).css({     //选择this.wrap下面的.imgList
            width: this.width,
            height: this.height,
            position: 'relative',
        });
        $('.imgList li', this.wrap).css({
            width: this.width,
            height: this.height,
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'none',
        }).eq(this.nowIndex).css({
            display: 'block',
        })
        $('.imgList li a, .imgList li a img', this.wrap).css({
            display: 'inline-block',
            width: this.width,
            height: this.height,
        });
        $('.left-btn, .right-btn', this.wrap).css({
            width: this.btnWidth,
            height: this.btnHeight,
            backgroundColor: this.btnBackgroundColor,
            color: '#fff',
            textAlign: 'center',
            lineHeight: this.btnHeight + 'px',
            position: 'absolute',
            top: '50%',
            marginTop: - this.btnHeight / 2,
            cursor: 'pointer',
        });
        $('.right-btn', this.wrap).css({
            right: 0,
        });
        $('.spot', this.wrap).css({
            height: this.spanHeight + (this.spanMargin * 2),
            position: 'absolute',
            left: '50%',
            marginLeft: - this.imgNum * (this.spanWidth + (this.spanMargin) * 2) / 2,
            bottom: 10,
        })
        $('.spot span', this.wrap).css({
            display: 'inline-block',
            width: this.spanWidth,
            height: this.spanHeight,
            margin: this.spanMargin,
            backgroundColor: this.spanColor,
            borderRadius: this.spanRadius,
            cursor: 'pointer',
        }).eq(this.nowIndex).css({
            backgroundColor: this.activeSpanColor,
        })
    }

    Slider.prototype.bindEvent = function() {
        var self = this;
        $('.left-btn', this.wrap).click(function() {
            self.move('prev');
        });
        $('.right-btn', this.wrap).click(function() {
            self.move('next');
        });
        $('.spot span').click(function(e) {
            self.move($(this).index())
        });
        $(this.wrap).mouseenter(function () {
            clearInterval(self.time);
        }).mouseleave(function() {
            self.autoMove()
        })
    }

    Slider.prototype.move = function(dir) {
        if(this.flag) {
            return false;
        }
        this.flag = true;
        switch(dir) {
            case 'prev':
                if(this.nowIndex === 0) {
                    this.nowIndex = this.imgNum -1;
                }else{
                    this.nowIndex --;
                }
                break;
            case 'next':
                if(this.nowIndex === this.imgNum - 1) {
                    this.nowIndex = 0;
                }else{
                    this.nowIndex ++;
                }
                break;
            default: 
                this.nowIndex = dir;
                break;
        }
        var self = this;
        $('.imgList li', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function() {
            self.flag = false;
        });
        $('.spot  span', this.wrap).css({
            backgroundColor: this.spanColor,
        }).eq(this.nowIndex % this.imgNum).css({
            backgroundColor: this.activeSpanColor,
        })
    }

    Slider.prototype.autoMove = function() {
        var self = this;
        this.time = setInterval(function() {
            if(this.direction == 'left') {
                $('.left-btn', this.wrap).trigger('click');
            }else{
                $('.right-btn', this.wrap).trigger('click');
            }
        }, self.moveTime)
    }

    $.fn.extend({
        slider: function(option) {
			console.log('打印传递参数option')
			console.log(option)  //调用时传递的对象{}
			console.log(option.width)  //500
            option.wrap = this;    // div.demo 指向调用slider属性的对象，$('.demo').slider 是$('.demo')对象调用slider，所以指向div.demo对象
			
			console.log('分割线')
			console.log(this[0])   //返回 <div class="demo">... <div>
			console.log('打印this')
			console.log(this)   // 返回长度为1的数值， m.fn.init [div.demo, ...] 
            new Slider(option);  //构造函数要用new方式
        }
    })
	
//} ())