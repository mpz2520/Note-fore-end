## node.js介绍
 **Node.js是一个可以让JavaScript运行在服务器端的平台。**
 它是一个为实时Web应用开发而诞生的平台，它从诞生之初就充分考虑了在实时响应、超大规模数据要求下架构的可扩展性。这使得它摒弃了传统平台依靠多线程来实现高并发的设计思路，而采用了单线程、异步I/O、事件驱动式的程序设计模式。`

## ip与端口号
 * ip地址用来定位计算机
 * 端口号用来定位具体的的应用程序
 * 一切需要联网的软件都会占用一个端口号
 * 端口号范围0到65536
 * 计算机中一些默认端口号最后不要去用
    - 例如 http服务器的80
## 服务器
服务器其实就是一台24小时不关机的电脑，上面有服务器软件，例如运行 Apache服务器软件，可能还有其他例如QQ，微信，浏览器等

## 核心模块
**Node为JavaScript提供了很多服务器级别的API，这些API绝大多数被包装到一个具名的核心模块中**
例如：
   * 文件操作 `fs`核心模块
   * http服务器构建的`http`核心模块
   * 路径操作模块`path`
   * 操作系统信息模块`os`

## 模块系统
Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
注意：下面两种公开接口被加载返回的类型是不一样的
  * module.exports = function(){..}  //被加载返回数组型
  * exports.abc = function(){..}   //被加载返回对象型， 

exports.abc 和 module.exports 的使用
如果要对外暴露单个属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。