### ES6基础语法

#### 1. let/const
> es6中新增的用来创建变量和常量的
```
let a = 12;
a = 13;
console.log(a); //-> 13

const b = 12;
b = 13;
console.log(b); // assignment to constant variable  基于const创建变量，变量存储的值不能被修改（常量


//----------------------
// const 确保一个变量的固定性
const fn = (n,m) => {};

```

> let和var的区别
- let 不存在变量提升（当前作用域中，不能再let声明前使用变量
- 同一个作用域中，let 不允许重复声明
- let解决了typeof的一个暂时性死区问题
- 全局作用域中，使用let声明的变量并没有给window加上对应的属性
- let会存在块作用域（除了对象以外的大括号都可以被看作块级私有作用域）


#### 2. 箭头函数及this问题
> es6中新增了创建函数的方式：“箭头函数”
> 真实项目中 箭头函数 和 function 这种函数混合使用

箭头函数简化了创建函数的代码
```
//=> 箭头函数的创建都是函数表达式方式（变量=函数），这种模式下，不存在变量提升
// 也就是函数只能在创建完成后被执行（也就是创建的代码之后执行

// fn：函数名
const fn = (/*形参*/) => {
    //函数体 （return）
};

//使用
fn(/*实参*/);

// -> 形参只有一个，小括号可以不加
const fn2 = n => {};

// -> 函数体中只有一句话，并且是return xxx的，可以省略大括号和return等
const fn3 = n => {
    return n*10;
};
const fn3 = n => n*10;



/* function fn(n){
    return function(m){
        return m+(++n);
    };
} */
// 改成箭头函数

const fn4 = n => m => m+(++n);

```

箭头函数中没有arguments，但是可以基于剩余运算符获取实参集合，而且es6中是支持给形参设置默认值的
```
let obj = {};
let fn = (context = window, ...args) => {
    // console.log(arguments);// arguments is not defined: 箭头函数中没有arguments

    // ...args: 剩余运算符（把除了第一项外的，其他传递的实参信息都存储到args这个数组集合中）

    console.log(args);
};

fn(obj,10,20,30); // context : obj   arg : [10,20,30]
fn(); // context:window   arg:[]
```

箭头函数中没有自己的this，它里面用到的this都是自己所处上下文中的this
（真实项目中，一旦涉及this问题，箭头函数慎用）
```

window.name = "win";
let obj = {
    name:"obj"
};

let fn = n =>{
    console.log(this.name);
};

fn(10); // this:window  output:win
fn.call(obj,10); // this:window  output:win 不是我们预期的obj
document.body.onclick = fn; // this:window 不是我们预期的body 

// ==============================================
window.name = "win";
let fn = n =>{
    console.log(this.name);
};
let obj = {
    name:"obj",
    fn:fn
};

obj.fn(10); // this 还是window，因为fn的上下文是window
```
```
let obj = {
    name: 'obj',
    fn:function (){
        // => this:obj 普通函数是由自己的this的
        let f = () => {
            //f里的this是上下文的this 
            console.log(this);
        };
        f(); // this:obj
        return f;
    }
};
let f = obj.fn();
f(); // this:obj


```


this: 
1. 绑定事件：操作哪个元素this就是那个元素
2. 函数调用的时候前面有点  this就是.前面的  没有点就是window
3. 构造函数：this是这个类的实例
4. 用call / apply / bind 改变this指向
5. 箭头函数：this是上下文的this


真实项目中的一个应用
```
let obj = {
    name: 'obj',
    fn:function (){
        // this:obj
        //...
        //原本期望的需求是：1s后把obj中的name改为 aoao
    /*     setTimeout(function(){
            console.log(this); // 如果用的是普通函数，this是window
            this.name = 'aoao';
        },1000); */
/* 
        let _this = this; // 把需要的this提前用变量存储起来
        setTimeout(function(){
            console.log(_this); // 此时_this指向obj
            _this.name = 'aoao'; //需要使用的时候拿出来用即可
        },1000); */

        setTimeout(()=>{
            console.log(this);
            this.name="aoao";
        },1000);

    }
};
obj.fn();

```


#### 解构赋值
> 让左侧出现和右侧值相同的结构，以此快速获取到我们需要的内容
> 真实项目中最常用的就是对数组和对象的解构赋值
