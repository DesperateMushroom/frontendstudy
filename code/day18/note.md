#### es6中 "..."的作用
- 拓展运算符（多用在解构赋值中）
- 展开运算符（多用在传递实参中）
- 剩余运算符（多用在接收实参中）

```
 //=> 解构赋值
 // 这里的... 是拓展运算符
 let [n,...m] = [12,23,34];
 // n = 12,  m=[23,34];


// => 传递实参
let ary = [1,2,3,4,5];
let min = Math.min(...ary);


// 克隆一份数组(浅克隆)
let cloneAry = [...ary,5,6];


// 对象克隆（浅克隆）
let obj = {
    name:'aoao',
    age : 1
};

let cloneObj = {
    ...obj,
    sex:'f', //不仅把原来的克隆过来了，还添加了新东西
    age:2 //后面加相同的会把原来的obj的覆盖掉
};


// => 接受实参
let fn = (n, ...arg) => {
    // n : 10
    // arg:[20,30]
};
fn(10,20,30);


```




#### class 创建类

```
// -> 传统es3/4/5中创建类的方法
function Fn(){
    this.x = 100;
};
Fn.prototype.getX = function(){
    console.log(this.x);
};

var f1 = new Fn();
f1.getX();

// 也可以把它当作普通函数执行
Fn();

// 还可以把Fn当作普通的对象设置键值对
Fn.queryX = function(){};
Fn.queryX();

```


```
//=> es6 中创建类的方法
class Fn{
    // 等价于之前的构造函数体
    constructor (n,m){
        this.x = 100;
    }

    // 直接写的方法就是加在原型上的
    // === Fn.prototype.getX...
    getX(){
        console.log(this.x);
    }

    //前面设置static的：把当前Fn当作普通对象设置的键值对
    static queryX(){}
    static z=300;

    // 给实例设置的私有属性
    y = 200;

    

}
// 也可以在外面单独这样写
Fn.prototype.getY = function(){}
Fn.z = 300;
Fn.prototype.y = 200;

let f = new Fn(10,20);
f.getX();

Fn.queryX();

Fn(); // Class constructor Fn cannot be invoked without 'new'
// class 创建的类只能new执行，不能当作普通函数执行


```


#### es6中的模板字符串
```
let year = '2024',
    month = '01',
    day = '13';

// => 拼接字符串
let res = "今天是"+year+"年" +month+"月" +day+"日" ;
console.log(res);


let ID = 'box';
let html = '<ul class="list clear" id="'+ID+'" >';

// 我们真实项目中会进行大量的字符串拼接
// 尤其是需要动态绑定数据：把现有的html代码拼接成有数据的html字符串
// 传统的es3语法模式下，字符串拼接是非常苦逼的
```


```
let year = '2024',
    month = '01',
    day = '13';

// 反引号（``） tab上面的 （es6模板字符串语法）
// ${}  模板字符串中书写js表达式的方式（凡是有输出结果的都可以被称为js表达式）
//     一般都是一行搞定的
let res = `今天是${year}年${month}月${day}日`;
console.log(res);


let ID = "box";
let html = `<div id="${ID}">Tue Nov 28 2023 15:17:33</div>`
console.log(html);

```