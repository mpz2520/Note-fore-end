### XHR 创建对象
XMLHttpRequest的对象用于客户端和服务器之间的异步通信。  

//创建 XMLHttpRequest 对象   
variable=new XMLHttpRequest();   

#### XMLHttpRequest对象的属性   
XMLHttpRequest对象的常见属性如下：

|属性	         |描述										|
|--              |--                                        |
|onreadystatechange	|存储函数（或函数名），每当readyState的属性改变时，就会调用该函数。|
|readyState	|存有的XMLHttpRequest的状态从0到4发生变化0：请求未初始化	1：服务器连接已建立 2：请求已接收 3：请求处理中 4：请求已完成，且响应已就绪	|
|reponseText	|以文本形式返回响应。												|
|responseXML	|以XML格式返回响应												|
|status				|将状态返回为数字（例如，“Not Found”为404，“OK”为200）			|
|statusText		|以字符串形式返回状态（例如，“Not Found”或“OK”）				    |

XMLHttpRequest对象的重要方法如下：   

|方法	         |描述										|
|--              |--                                        |
|abort()	     |取消当前请求。				                |
|getAllResponseHeaders()	|以字符串形式返回完整的HTTP标头集。	|
|getResponseHeader( headerName )|返回指定HTTP标头的值。       |
|void open（method，URL）	|打开指定获取或交的方法和URL的请求。|
|void open（method，URL，async）	|async：true（异步）或 false（同步）	|
|void open（method，URL，async，userName，password）|与上面相同，但指定用户名和密码。|
|void send（content）	|发送获取请求。		            	|
|setRequestHeader（ label，value）|将标签/值对添加到要发送的HTTP标头。|

//说明:method 参数是用于请求的 HTTP 方法。值包括 GET、POST 和 HEAD。(大小写不敏感)    
//void send（content）
   ```
   xhr在get请求方式下，content-type一般是不用设置的；因为get请求方式，只有一种传参方式，参数xhr.send(null)
   xhr在post请求方式,参数是通过xhr.send(data)方式发送的
   ```



### XHR 请求
AJAX使用的XMLHttpRequest的对象与服务器通信。让我们尝试通过下面显示的图像了解AJAX的流程或AJAX的工作原理 
![ajax](./public/img/ajax.png)

　XMLHttpRequest 对象用于和服务器交换数据。

　当你的页面全部加载完毕后，客户端会通过 XMLHttpRequest 对象向服务器请求数据，服务器端接受数据并处理后，向客户端反馈数据。

　如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的open()和send()方法：   
 `  xmlhttp.open("GET","ajax_info.txt",true);    `
 `  xmlhttp.send();   `
 
 **实例**
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tryrun 1</title>
</head>
<body>
    <div id="view">
        <p>点击下面的按钮，将 Ajax 请求回来的数据更新在该文本内</p>
    </div>
    <button type="button" id="btn">发起 Ajax 请求</button>

    <script>
        document.getElementById("btn").onclick = ajaxRequest;

        function ajaxRequest () {
            var xhr = new XMLHttpRequest();

            xhr.open("GET", "https://www.w3cschool.cn/statics/demosource/ajax_info.txt", true);
            xhr.send();

            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status === 200) {
                    document.getElementById("view").innerHTML = xhr.responseText;
                }                
            }
        }
    </script>
</body>
```


### AJAX 数据库
