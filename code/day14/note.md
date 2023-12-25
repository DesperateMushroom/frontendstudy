document.parentNode 和 document.parentnode 的区别
- parentNode：找document的父节点，没有所以是null，有这个属性但是没有值
- parentnode：在document中找名字为parentnode的属性，因为没有所以是undefined，连这个属性都没有


你理解的闭包作用是什么，优缺点
- 函数执行会开辟一个新的私有作用域栈内存，保存保护里面的变量不受外界影响
- 函数执行会形成一个私有作用域，这个栈内存不销毁，所以是闭包
- 作用  保护 & 保存
- 缺点：会占用内存



简述let和var的区别
1. let没有变量提升（但是在词法解析阶段也得知某个变量是否为私有变量
2. let不允许在相同的作用域下重复声明
3. let解决了js中的暂时性死区问题
4. let创建的全局变量没有给window设置对应的属性
5. let会产生块级作用域
。。。。。