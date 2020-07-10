# Vue常用特性
## 5.1常用特性概述
	1. 表单操作
	2. 自定义指令
	3. 计算属性
	4. 侦听器
	5. 生命周期
## 5.2表单操作
1. 基于vue的表单操作
	* input 单行文本
	* textarea 多行文本
	* select 下拉多选
	* radio 单选框
	* checkbox 多选框

### 表单修饰符 
  + .lazy
	- 将input事件切换为change事件，input事件每次输入都会触发，change事件当失去焦点时触发
	- ``` <input v-model.lazy="msg" type="text">```
	- ``` <div>{{msg}}</div> ``` <!-- 用于观察触发时机-->
  + .number
	- 转化为数字
	- ```<input v-model.number="age" type="text">```
  + .trim
	- 去掉开始和结尾的空格
	- ```<input v-model.trim="info" type="text">```

```
<!-- 表单语法与用法都在这了 -->
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<script src="vue.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<div id="app">
	<div id="example-1">
		<!-- 单行输入， placeholder是null时，填入的值-->
		<input v-model="message" placeholder="edit me">
		<p>Message is: {{ message }}</p>
		<!-- 多行输入 -->
		<textarea v-model="message2" placeholder="add multiple lines"></textarea>
		<p style="white-space: pre-line;">{{ message2 }}</p>
		<br />
		
		<div style="margin-top:20px;">
			<!-- 复选框 -->
			<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
			<label for="jack">Jack</label>
			<input type="checkbox" id="john" value="John" v-model="checkedNames">
			<label for="john">John</label>
			<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
			<label for="mike">Mike</label>
			<br>
			<span>Checked names: {{ checkedNames }}</span>
		</div>
		
		<div style="margin-top:20px;">
			<!-- 单选按钮 -->
			<input type="radio" id="one" value="One" v-model="picked">
			<label for="one">One</label>
			<br>
			<input type="radio" id="two" value="Two" v-model="picked">
			<label for="two">Two</label>
			<br>
			<span>Picked: {{ picked }}</span>
		</div>
		<br>
		<div>
			<p>单选下拉框</p>
			<!-- 下拉单选-->
			<select v-model="occupation">
				<p>下拉选项框下不能添加其他不相干内容 </p>
				<option value="a">请选择职业</option>
				<option value="b">教师</option>
				<option value="c">软件工程师</option>
				<option value="d">律师</option>
				<p>下拉选项框下不能添加其他不相干内容 </p>
			</select>
		</div>
		<br>
		<div>
			<p>多选框</p>
			<!-- 多选框，设置属性：multiple="true"-->
			<select v-model="occupation2" multiple="true">
				<option value="e">请选择职业</option>
				<option value="f">教师</option>
				<option value="g">软件工程师</option>
				<option value="h">律师</option>
				<p>Picked: </p>
			</select>
		</div>

		<button type="button" @click="submit">提交</button>
	</div>

</div>
<script type="text/javascript">
var vm = new Vue({
	el : "#app",
	data : {
		message : "",
		message2 :"",
		checkedNames : ["Jack",12],   //默认选择value="Jack" 的复选框，12是没用的，测试语法也不报错
		picked : "Two",
		occupation : "c" ,    //默认选中的option标签中的value属性值
		occupation2 : ["f","g"]
	},
	methods: {
		submit : function () {
			console.log(this.message);
			console.log(this.checkedNames);
			var postObj = {
				msg1 : this.message,
				msg2 : this.message2,
				checkval : this.checkedNames,
				pickval : this.picked
			}
			console.log(postObj);
			console.log(this.occupation)
			console.log(this.occupation2.toString())
			// postObj.msg1 = 345; 错误不能设置值
		}
	}
});
// vm.checkedNames[3] = "Mike";   能设置值，但不能重新渲染页面
</script>

</body>
</html>

```


## 5.3 自定义指令
### 自定义指令语法规则
```
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素,el是绑定元素对象，.focus是对象方法
    el.focus()
  }
})

//如果想注册局部指令，组件中也接受一个 directives 的选项：类似于注册方法组件methods的用法。Vue实例对象就是一个组件，例如：data{}
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```
### 钩子函数
一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- inserted：被绑定元素插入父节点时调用
- update：所在组件的 VNode 更新时调用，
- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用
- unbind：只调用一次，指令与元素解绑时调用。
### 钩子函数参数
* el：指令所绑定的元素，可以用来直接操作 DOM 。
* binding：一个对象，包含以下属性：
	+ name：指令名，不包括 v- 前缀。
	+ value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
	+ oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。
* vnode：Vue 编译生成的虚拟节点。
* oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。

### 带参数的自定义指令
直接上例子:
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>带参数的自定义指令</title>
		<script src="js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<input type="text" v-color="msg" v-focus>
			<input type="text" v-focus>
				<!-- 上面两个input都添加自定义的v-focus，执行过程，光标先给第一个，最后给了第二个 -->
		</div>
		<script>
			// 注册全局自定义指令
			// Vue.directive('color',{
			// 	bind: function(el,aaa){  //bingding是形参，是一个对象，包含三个属性，名字可以随意取，如改aaa，但el是固定的,指所绑定的元素
			// 		console.log(aaa)
			// 		console.log(aaa.value.color)
			// 		//根据指令的参数设置背景颜色
			// 		el.style.background = aaa.value.color
			// 		// name: "color"  定义的指令名
			// 		// rawName: "v-color"   
			// 		// value: {__ob__: Observer}  指绑定的msg
			// 	}
			// })
			var vm = new Vue({
				el : "#app",
				data : {
					msg : {
						color : 'blue'
					}
				},
				
				//注册局部自定义指令
				directives:{
					color:{
						bind:function(el,binding){
							el.style.background = binding.value.color;
						}
					},
					focus:{
						inserted:function(el){
							el.focus();   
						}
					}
				}	
			});
			
		</script>
	</body>
</html>
```

## 5.4计算属性
### 计算属性与方法的区别
	* 计算属性是基于他们的依赖就行缓存的，指依赖data中的数据
	* 方法不存在缓存

```
//计算属性与方法的使用
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<div>{{msg.split('').reverse().join('')}}</div>
			<div>{{msg}}</div>
			<br>
			<div>{{reverseMessage()}}</div>
			<div>{{reverseMessage()}}</div>
			<!-- 控制台打印两次 -->
			<br>
			<div>{{reverseString}}</div>
			<div>{{reverseString}}</div>
			<!-- 控制台打印一次，第二次由于依赖的data数据没变，直接返回上次的结果而不执行函数内容 -->
		</div>
		<script type="text/javascript">
			var vm = new Vue({
				el : "#app",
				data : {
					msg : "hello"
				},
				methods:{
					reverseMessage:function(){
						console.log('methods')
						return this.msg.split('').reverse().join('')
					}
				},
				computed:{
					reverseString:function(){
						console.log('computed')
						return this.msg.split('').reverse().join('')
						// console.log('methods')  放这里不会执行，可见return后退出函数了
					}
				}
			});	
		</script>
	</body>
</html>

```

## 5.5侦听器
![侦听器](img/侦听器.png)
### 侦听器的应用场景
	1. 数据变化时执行异步或开销较大的操作
	2. 侦听器的用法--引入新属性 watch
```
//例举了侦听器watch，计算属性computed，方法methods，实现input输入时，改变data数据。
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<span>姓：</span>
			<input type="text" v-model="firstName">
			<br>
			<span>名：</span>
			<input type="text" v-model="lastName">
			<div>{{fullName}}</div>
			<!-- <div>{{aaa}}</div> -->

		</div>
		<script type="text/javascript">
			var vm = new Vue({
				el : "#app",
				data : {
					firstName:'mai',
					lastName: 'peizhao',
					fullName: ''
				},
				//注册侦听器方法watch
				watch:{
					// 监听firstName
					firstName:function(val){
						// val是firstName的新值
						this.fullName = val + '' + this.lastName;
					},
					lastName:function(val){
						this.fullName = this.lastName + '' + val;
					}
				}
				// //使用methods方法
				// methods:{
				// 	// 要注释掉data中的fullName，或避免冲突重新命名为abc，因为这里的意思是定义一个方法，而不是监听某个属性
				// 	fullName:function(){
				// 		return this.firstName + '' + this.lastName
				// 	}
				// },
				// //使用计算属性
				// computed:{
				// 	aaa:function(){
				// 	return this.firstName + '' + this.lastName
				// 	}
				// }
			});	
		</script>
	</body>
</html>

```
		
## 5.6过滤器
   1. 过滤器的作用
      + 格式化数据，比如将字符串格式化为首字母大写，将日期格式化为指定格式
   2. 定义全局过滤器
	    ```
		Vue.filter('过滤器名',function(val){   //val是message 的值将作为第一个参数
			//过滤器业务逻辑
		});
        ```
   3. 过滤器的使用
	   ```
	   <div>{{msg | upper}}</div>
	   <div>{{msg | upper | lower}}</div> <!-- msg参数的值传到upper函数，得到的过滤值再传给liwer函数进行过滤-->
	   <div v-bind:id='id | formatId'></div>
       ```
   4. 定义局部过滤器
	    ```
		filter：{
			过滤器名：function（）{	
			}	    
		}
        ```
   5. 带参数的过滤器
	    ```
		Vue.filter('filterA'function(value,arg1,arg2){
			//第一个默认是message属性值，第二个开始是函数执行接受的参数
		})
		{{ message | filterA('arg1', arg2) }}
		<!-- 这里，filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数。 -->
        ```		
   6. 使用js中的迭代函数filter 
       filter() : 对数组中的每一项运行给定函数，并返回该函数会返回true的项组成的的数组
	   
```
//过滤器的基本用法，与例举过滤器格式化日期
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/vue.js"></script>
		<style type="text/css">
			#hello{
				width: 200px;
				height: 200px;
				background: green;
			}
		</style>
	</head>
	<body>
		<div id="app">
			<input type="text" v-model="msg">
			<div>{{msg | upper}}</div>
			<div>{{msg | upper | lower}}</div>
			<div v-bind:id="msg | lower"></div>
			<!-- 过滤器案例 格式化日期 -->
			<div>{{dateA | format("aaa1")}}</div>
			
		</div>
		<script type="text/javascript">
			// 全局过滤器
			Vue.filter('upper',function(val){
				// 用原生的JavaScript方法，分别是截取首字符，大写，从第二个开始拼接
				return val.charAt(0).toUpperCase() + val.slice(1);
			}); 
			Vue.filter('lower',function(val){
				// toLowerCase()方法让内容变小写
				return val.charAt(0).toLowerCase() + val.slice(1);
			});
			
			// 过滤器案例，格式化日期
			Vue.filter('format',function(val,arg1){
				if(arg1 == "aaa"){
					var ret = '';
					ret += val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate();
					return ret;  //返回ret值，结束函数
				}
				return val;   //如果arg1不等于'aaa',则返回val值
			});
			var vm = new Vue({
				el : "#app",
				data : {
					msg : "",
					dateA : new Date()
				}
			});
		</script>	
	</body>
</html>
```
	
## 5.7生命周期
   1. 主要阶段
	   * 挂载（初始化相关属性）
		  + beforeCreate
		  + create
		  + beforeMount
		  + mounted
	   * 更新（元素或组件的变更操作）
		  + beforeUpdate
		  + update
	   * 销毁（销毁相关属性）
	      + beforeDestroy
		  + destroy
```
Vue生命周期触发的函数测试
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<div>{{msg}}</div>
			<div @click="update">更新阶段触发的钩子函数</div>
			<div @click="destroy">销毁阶段触发的钩子函数</div>
		</div>
		<script>
			var vm = new Vue({
				el : '#app',
				data :{
					msg : '生命周期'
				},
				methods: {
					update : function(){
						this.msg = 'hello'
					},
					destroy : function(){
						this.$destroy();
					}		
				},
				// 生命周期的钩子函数
				beforeCreate : function(){
					console.log('beforeCreate')
				},
				create  : function(){
					console.log('create ')
				},
				beforeMount : function(){
					console.log('beforeMount')
				},
				mounted : function(){
					console.log('mounted')
				},
				beforeUpdate : function(){
					console.log('beforeUpdate')
				},
				update : function(){
					console.log('update')
				},
				beforeDestroy : function(){
					console.log('beforeDestroy')
				},
				destroy : function(){
					console.log('destroy')
				}		
			})
		</script>
	</body>
</html>

```

## 补充知识（数组相关API）
   1. 变异方法（修改原有的数据）--》响应式的方法
	    * push()  往数组最后面添加一个元素(这里的元素可以是数组的一个对象)，成功返回当前数组的长度
		* pop()   删除数组的最后一个元素，成功返回删除元素的值
		* shift()  删除数组的第一个元素，成功返回删除元素的值
		* unshift()  往数组最前面添加一个元素，成功返回当前数组的长度
		* splice()  有三个参数，第一个是想要删除的元素的下标（必选），第二个是想要删除的个数（必选），第三个是删除后想要在原位置替换的值（可选）
		* sort()  使数组按照字符编码默认从小到大排序,成功返回排序后的数组
		* reverse()  将数组倒序，成功返回倒序后的数组
   2. 替换数组（生成新的数组）--》非响应式方法
 它们不会改变原始数组，而总是返回一个新数组。
        * filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。filter() 不会改变原始数组。
		* concat()
          - concat()方法可以简单的将其理解为合并数组。基于当前数组中的所有项创建一个新数组。简单的说，concat()先给当前数组创建一个副本，然后将接收到的参数添加到这个副本（数组）的末尾，最后返回一个新的数组。
		  - var arr2 = arr.concat('Blog','2014');  //往arr数组后面添加两项数据
		* slice() 接受一个或两个参数，即要返回项的起始和结束位置。当只给slice()传递一个参数时，该方法返回从该参数指定位置开始到当前数组末尾的所有项。


## 补充知识（数组响应式变化）
   3. 修改响应式数据
		* Vue.set(vm.items,indexofitem,newValue)
		* vm.$set(vm.items,indexofitem,newValue)
			1. 参数一表示要处理的数组名称
			2. 参数二表示要处理的数组的索引
			3. 参数叁表示要处理的数组的值
   4. 添加响应式对象属性
        * Vue.set(object, propertyName, value)
		* 你还可以使用 vm.$set 实例方法，它只是全局 Vue.set 的别名：
		    1. 参数一表示要处理的对象的名称
			2. 参数二表示要添加的属性名
			3. 参数三表示对应的属性值

```
//补充知识，数组变异方法，与动态添加响应式对象属性
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<span>
				<input type="text" v-model="fname">
				<button @click="add">添加</button>
				<button @click="del">删除</button>
				<button @click="change">替换</button>
			</span>
			<ul>
				<li :key="index" v-for="(items,index) in list">{{items}}</li>
			</ul>
			<br>
			//响应式修改数据
			<div>{{info}}</div>
			<div>{{info.name}}</div>
			<div>{{info.age}}</div>
			<div>{{info.gender}}</div>
			
		</div>
		<script>
			vm = new Vue({
				el : '#app',
				data : {
					fname : '',
					list : ['apple','orange','banana'],
					ceshi : '',
					info : {
						name :'mpz',
						age : 18
					}
				},
				methods:{
					add : function(){
						this.list.push(this.fname);
					},
					del :function(){
						this.list.shift();  //响应式方法，数据改变同时页面重新渲染
						// this.ceshi = this.list.pop();  //跟上面结果一样，只是把返回值赋给this.ceshi
					},
					change : function(){
						// this.list = this.list.slice(1,3); //截取数组从索引1开始，到第三个
						// this.list = ['apple123','orange123'];  // 响应式的
						//可见，this.list是响应式，而this.list.slice(1,3)只是替换数组，并不是响应式
						// 官方说明类似`vm.a` 也是响应式的
					}
				}
			})
			vm.list[1] = 'lemon'   //控制台输入vm.list[1] ->结果为"lemon"。可见后台数据已经改变了，但页面没有改变。因为它不是响应式的
			// Vue.set(vm.list,0,'pear');  //
			vm.$set(vm.list,0,'pear'); //vm实例对象方法，与Vue.set方法用法一样
			vm.info.gender = 'male';   //这样添加的对象属性不是响应式。数据页面能显示内容，但在控制台输入vm.info.gender ='female'，不能改变页面内容，时间数据已经改了，
			//在控制台输入vm.info.age = 20 ，vm.info.name ='mai' ，数据改变同时页面也改变，这说明原先定义的对象属性默认是响应式的
			vm.$set(vm.info,'dizhi','湛江') //添加响应式数据，在控制台输入vm.info.dizhi ='雷州'，数据改变同时页面也改变
		</script>
	</body>
</html>

```