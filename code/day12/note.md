1. **带var和不带var的区别**
```
// 在全局作用域下的区别
/**

    不带var的：相当于给全局对象window设置了一个属性a
        window.a = 13;
*/
a = 13;


/*
    栈内存变量存储空间
        b
    带var的: 实在全局作用域下声明了一个变量b （全局变量）。但是在全局下声明的变量也
            同样相当于给window增加了一个对应的属性（只有全局作用域具备这个特点
*/
var b = 14; //=》 创建变量b & 给window设置了属性b
console.log(b);
console.log(window.b);





```

#### let/const 和var 的区别
`1. let和const不存在变量提升机制`
> 创建变量的六种方式中：var/fucntion 有变量提升，而let/const/class/import都不存在这个机制 
`2. var允许重复声明，而let是不允许的`
> 在相同的作用域中（或执行上下文中），
- 如果使用var/function关键词声明变量并且重复声明，是不会有影响的
    （声明第一次之后，之后在遇到就不再重复声明了
- 但是使用let/const就不行，浏览器会校验当前作用域中是否已经存在这个变量了，
    如果已经存在，则再次基于let的声明会报错

`3. let能解决typeof检测时出现的暂时性死区问题 （let比var更严谨`



var a = 10, b = 20; 等价于 var a = 10; var b = 20;
var a=b=10; 等价于 var a = 10; b=10;  b不带var 