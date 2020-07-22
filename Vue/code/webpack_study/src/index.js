import $ from 'jquery'
import './css/1.css'
import './css/1.less'
import './css/1.scss'
//引入单文件组件
import APP from './components/App.vue'


$(function() {
  $('li:odd').css('backgroundColor', 'blue')
  $('li:even').css('backgroundColor', 'lightpink')
})

class Person {
	// static info = "aaa123";   //虽然有红色线报错，但还是能执行
	static info2 () {
		console.log('sss')
	}
}

Person.info2();
// console.log(Person.info)

//-----------------------------------
import Vue from 'vue'
import App from './components/App.vue'
const vm = new Vue({
   // 3. 指定 vm 实例要控制的页面区域
   el: '#app',
   // 4. 通过 render 函数，把指定的组件渲染到 el 区域中
   render: h => h(App)
})
