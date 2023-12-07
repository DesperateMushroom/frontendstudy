### 日期对象的基本操作
```
let time = new Date(); //获取当前客户端（本机电脑）本地的时间
                        // 这个时间用户时可以自己修改的，所以不能作为重要的参考依据
                        // 获取的结果不是字符串，时对象数据类型的，属于日期对象（Date这个类的实例对象
//Tue Nov 28 2023 14:37:52 GMT-0700 (Mountain Standard Time)
typeof time; //=> 'object'
```

标准日期对象中提供了一些属性和方法，可操作日期信息
- getFullYear() 获取年
- getMonth() 获取月 结果是0~11 代表第1月到第12月
- getDate() 获取日
- getDay() 获取星期 结果是0~6 代表周日到周六
- getHours() 获取小时
- getMinutes() 获取分
- getSeconds() 获取秒
- getMilliseconds() 获取毫秒 1000ms = 1s
- getTime() 获取当前日期距离1970/1/1 00:00:00 这个日期之间的毫秒差
- toLocaleDateString() 获取年月日（字符串）
- toString()
- toLocaleString() 获取完整的日期字符串 年月日 时分秒


> new Date() 除了获取本机时间，还可以把一个时间格式字符串转换为标准的时间格式
```
    new Date('2019-05-09');
    /*
        支持的格式
            yyyy/mm/dd
            yyyy/mm/dd hr:mm:ss
            yyyy-mm-dd 此格式再ie下不支持
    */
```

**时间字符格式化案例**
> DOM: document object model 文档对象模型，提供一些属性和方法供我们操作页面中的元素
**获取DOM元素的方法**
- document.getElementById() 指定再文档中，基于
- [context].getElementsByTagName(): 再指定上下文（容器）中，通过标签名获取一组元素集合 
- [context].getElementsByClassName() 再指定上下文中，通过样式类名获取一组元素集合 （不兼容ie6-8
- document.getElementsByName() 再整个文档中，通过标签的NAME属性值获取一组节点集合（再ie中只有表单元素的name才能识别，所以我们一般只应用于表单元素的处理
- document.head / document.body / document.documentElement 获取页面中的HEAD / BODY / HTML三个元素
- [context].querySelector([selector]) 在指定上下文中，通过选择其获取到指定的元素对象
- [context].querySelectorAll([selector]) 在指定上下文中，通过选择其获取到指定的元素集合
``` 
    //=> querySelector/ querySelectorAll 不兼容ie6-8
    let box = document.querySelector('#box'); 
    let links = box.querySelectorAll('a'); 
    //let links = document.querySelectorAll('#box a'); 
```

**js中的节点和描述节点之间关系的属性**
> 节点：Node （页面中所有的东西都是节点
> 节点集合：NodeList (getElementsByName/querySelectorAl 获取的都是节点集合)
- 元素节点（元素标签）
    + nodeType： 1 
    + nodeName：大写的标签名
    + nodeValue: null
- 文本节点
    + nodeType： 3 
    + nodeName：'#text'
    + nodeValue: 文本内容
- 注释节点
    + nodeType： 8
    + nodeName：'#comment'
    + nodeValue: 注释内容
- 文档节点 document
    + nodeType： 9
    + nodeName：'#document'
    + nodeValue: null
- 。。。

描述这些节点之间关系的属性 是属性！！所以用的时候不用加()
- childNodes: 获取所有的子节点
- children：获取所有的元素子节点（子元素标签集合
- firstChild：获取第一个子节点
- lastChild：获取最后一个子节点
- firstElementChild / lastElementChild：获取第一个或者最后一个元素子节点（不兼容ie6-8
- previousSibling: 获取上一个哥哥节点
- nextSibling：获取下一个弟弟节点
- previousElementSibling / nextElementSibling：获取哥哥或弟弟元素节点（不兼容ie6-8