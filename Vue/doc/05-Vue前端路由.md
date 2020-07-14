## vue前端路由
**学习目录**
   1. 路由的基本概念与原理
   2. vue-router的基本使用
   3. vue-router嵌套路由
   4. vue-router动态路由匹配
   5. vue-router路由命名
   6. vue-router编程式导航
   7. 基于vue-router的案例

### 1、路由的基本概念与原理
#### 1.1 路由
路由是一个比较广义与抽象的概念，路由的本质就是对应光系

在开发中路由分为：后端路由与前端路由
1. 后端路由
	- 概念：根据不同`用户的URL`请求，返回不同的内容
	- 本质：URL请求地址与服务器资源之间的对应关系
2. SPA(Single Page Application)
    - 后端渲染(存在性能问题)
	- Ajax渲染(前端渲染能力提高，但不支持浏览器的前进后退功能)
	- SPA(单页面应用程序)，整个网站只有一个页面，内容的变化通过Ajax局部更新实现，同时支持浏览器地址的前进后退
	- SPA实现原理之一：基于URL地址的hash(hash的变化会导致浏览器访问历史的变化，但hash的变化不会触发新的URL请求)
	- 在实现SPA过程中，最核心的技术点就是前端路由
3. 前端路由
    - 概念: 根据不同的用户事件，显示不同的页面内容
	- 本质：用户事件与事件处理函数之间的对应关系

4. 实现简易前端路由
- 基于URL的hash实现（点击菜单的时候改变URL的hash，根据hash的变化控制组件切换
- code- 01-模拟路由

#### 1.2 Vue Router
Vue Router(官网:https://router.vuejs.org/zh/)是vue.js 官方的路由
它和vue.js 的核心深度集成，可以非常方便的的用于SPA应用程序的开发

Vue Router包含的功能有:     
 * 支持HTML5历史模式或hash模式
 * 支持嵌套路由
 * 支持路由参数
 * 支持编程式路由
 * 支持命名路由

### 2 vue-router的基本使用
#### 2.1 vue-router的使用步骤（code：02vue-router的基本使用）
  1. 引入相关库文件（vue.js  vue-router.js）
  2. 添加路由链接(router-link标签)
  3. 添加路由填充位
  4. 定义路由组件
  5. 配置路由规则并创建路由实例
  6. 把路由挂载到根实例


#### 2.2路由重定向
路由重定向指的是：用户在访问地址A的时候，强制用户转跳到地址C，从而展示特定的组件页面   

通过路由规则的 redirect 属性。指定一个新的路由地址，可以很方便设置路由重定向   

```
const router = new VueRouter({
	routes: [
		//其中path 表示需要被重定向的原地址，redirect表示将要被重定向的新地址
		{ path: '/', redirect: '/Foo'},
		{ path: '/foo', component: Foo },
		{ path: '/bar', component: Bar }
	]		
})
```		

### 3 嵌套路由
#### 3.1 嵌套路由用法
 1. 嵌套路由功能分析
    - 点击父级路由显示模板内容
	- 模板内容中又有子级路由链接
	- 点击子级路由链接显示子级模板内容
  
 2. 实现过程   
   1. 在父级模板中添加路由链接(router-link)和路由填充位(router-view)
   2. 定义子路由组件
   3. 在父级路由规则中添加children属性，children表示子路由规则数组
### 4 动态路由匹配
#### 4.1 动态路由匹配的基本用法
 应用场景：通过动态路由参数的模式进行路由匹配(04-动态路由匹配)
 ```
 var router = new VueRouter({
	 routes:[
		 //动态路径参数以冒号(:)开头
		 { path: '/user/:id', component: User}
	 ]
 })
 
 const User = {
	 //路由组件中通过$route.params 获取路由参数
   template: '<div>User {{ $route.params.id }}</div>'
 }
 ```
 
#### 4.2 路由组件传递参数
 $route与对应路由形成高度耦合，不够灵活，所以可以使用props将组件和路由解耦
 
  1. props的值为布尔类型    
```
   const router = new VewRouter({
	   routes:[
		   //如果props被设置为true，$route.params 将会被设置为组件属性
		   { path: '/user/:id', component: User , props: true}
	   ]
   })
   
   const User = {
	   props: ['id'], //使用props接收路由参数
	   template: '<h1>用户ID为:{{id}}</h1>'
   }
```

   
   2. props的值为对象类型
   ```
   const router = new VewRouter({
   	   routes:[
   		   //如果props 是一个对象，它会按原样设置为组件属性
   		   { path: '/user/:id', component: User , props: {uname: 'zhangsan', age: '12'}}
   	   ]
   })
   
   const User = {
   	   props: ['uname','age',id], //使用props接收路由参数,这里ID无效了
   	   template: '<h1>用户信息:{{uname + '---' + age}}</h1>'
   }
   ```
   
   3. props的值为函数类型
   ```
   const router = new VewRouter({
   	   routes:[
   		   //如果props 是一个函数，则这个函数接收 route 对象为自己的形参
   		   { path: '/user/:id', component: User , 
		   props: route => ({ uname: 'lisi', age: 20, id: route.params.id})}
   	   ]
   })
   
   const User = {
   	   props: ['uname','age','id'], //使用props接收路由参数
   	   template: '<h1>用户信息:{{uname + '---' + age + '---' + id}}</h1>'
   }
   ```
   
### 5 vue-router 命名路由
#### 5.1 命名路由的配置规则
为了更方便的表示路由路径，可以给路由规则起一个名字，即为“命名路由”
```
   const router = new VewRouter({
   	   routes:[
   		   //创建 Router 实例的时候，在 routes 配置中通过name属性给某个路由设置名称。
   		   { 
			name: 'user', 
			path: '/user/:id', component: User , 
		    props: route => ({ uname: 'lisi', age: 20, id: route.params.id})
		   }
   	   ]
   })
   
   //要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：
   //其中params属性表示要传递的参数
   <router-link :to="{ name: 'user', params: {id: 123}}">User</router-link>
   //这跟代码调用 router.push() 是一回事：
	router.push({name: 'user', params: {id: 123}})
   }
```

### 6 vue-router 编程式导航
#### 6.1 编程式导航基本用法
1. 页面导航的两种方式
  * 声明式：通过点击链接实现导航
    - 例如：普通网页的`<a>` 或vue中的 `<router-link>`
  * 编程式导航通过调用Javascript的API实现导航
    - 例如：普通网页中的location.href
2. vue中编程式导航常用API
  * this.$router.push()
  * this.$router.go()

**router.push()方法参数规则**
```
// 字符串(路径)
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由(传递参数)
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

注意：如果提供了 path，params 会被忽略，
```
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```


**router.go(n)方法**

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
