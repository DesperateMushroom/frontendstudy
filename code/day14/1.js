//==================================练习1=======================================
/**
 * 全局作用域
 *  变量提升    var a; function fn() {...}
 */

// console.log(a);//undefined
// var a =12;
// function fn(){
//     /**
//      * 私有作用域（私有执行上下文
//      *      形参赋值 & 变量提升  var a;
//      *      代码执行
//      */
//     console.log(a); //undefined
//     var a = 13;
// }

// fn();
// console.log(a); // 12




//==================================练习2=======================================
/**
 * 全局作用域
 *  变量提升    var a; function fn() {...}
 */

// console.log(a);//undefined
// var a =12;
// function fn(){
//     /**
//      * 私有作用域（私有执行上下文
//      *      形参赋值 & 变量提升  var a;
//      *      代码执行
//      */
//     console.log(a); //12
//      a = 13;
// }

// fn();
// console.log(a); // 13



//==================================练习3=======================================
// console.log(a);//reference error 报错
/**
 * 在全局作用于下，带var/function声明的全局变量相当于给window设置了对应的属性（即是全局变量也是属性），
 * 不带var等声明的只是给window设置了对应的属性，如果使用的是let/const声明的，
 * 只是全局变量，没有给window设置属性
 */
/* a =12;
function fn(){
  
    console.log(a); 
     a = 13;
}

fn();
console.log(a); */


//==================================练习5=======================================
/* var n = 0;
function a(){
    var n = 10;
    function b(){
        n++;
        console.log(n); 
    }

    b();
    return b;
}

var c = a();
c();

console.log(n); */

// 函数执行形成私有作用域：私有和全局变量
// 作用域链的查找机制：看当前函数是在哪个作用域下创建的，和在哪执行没关系
// 栈内存释放问题：一般执行完就释放了，但是如果里面的某些内容被栈以外的其他事物占用了，则不能销毁
// -》 掌握了闭包运行的机制


//==================================练习6=======================================
/* var a =10,b=11,c=12;
function test(a){

    a=1;
    var b=2;
    c=3; // c是全局的
    console.log(a,b,c); //1,2,3
}
test(10);
console.log(a); // 10
console.log(b); // 11
console.log(c); // 3 */



//==================================练习7=======================================
/**
 * 不管条件是否成立都要进行变量提升
 *      var a; // 全局下声明一个a也相当于给window.a => 'a' in window =》 true
 */
// if( !("a" in window) ){
//     var a = 10;
// }
// console.log(a); // undefined



//==================================练习8=======================================
/**
 * arguments 是函数内置的实参集合（箭头函数中没有arguments)：不管是否定义了形参，也不管传递了多少实参
 * arguments中包含素有传递的实参信息（类数组集合
 */
// var a = 4;
// function b(x,y,a){
//     /**
//      *  形参赋值
//      *      x=1   y=2   a=3
//      * 
//      *  在js非严格模式下，arguments和形参存在映射关系，一个改都会跟着改变
//      */
//     console.log(arguments); // => {0:1, 1:2, 2:3, length:3..}
//     console.log(a); // 3
//     arguments[2] = 10; // 把传递的第三个实参值改为10，所以形参a也跟着改为10
//     console.log(a);// 10
// }

// a = b(1,2,3); // a=b 执行的返回结果（只看return） =》 a = undefined
// console.log(a); // undefined


// 开启js语法的严格模式  es6或者平时开发，我们一般都用严格模式
// 严格js模式下arguments和形参的映射机制就切断了
/* "use strict"
var a = 4;
function b(x,y,a){
    arguments[2] = 10; 
    console.log(a); // =》 3
} */




//==================================练习9=======================================
// 逻辑或 ||  和 逻辑与 &&  在赋值操作中的意义
//  A||B：先验证A的真假, 如果A为真，返回的是A的值，如果A为假，返回的是B的值
//  A&&B：A真返回B值，A假返回A值
//  && 的优先级高于 ||
/* let a = 0 || false; // a=false; 因为A为false
a = 1||false; //a = 1
a = 1&&100; // a= 100
a = 0 && 100; // a=0
a = 0 || 1 && 2 || 3; // => 0 || 2 || 3    =》   2 || 3    =》 2 */


// function fn(x,callback){
//     typeof x === 'undefined'?x=0:null;
//     x = x || 0; // 不传为0，传了就是传进来的值

//     // callback 代表回调函数（传递的是个函数: 我们需要保证它是一个函数才能执行‘
//     typeof callback === 'function'?callback():null;
//     callback && callback();

// }

// var foo = 'hello';
// (function(foo){
//     /**
//      * 形参赋值 & 变量提升
//      *  foo = "hello"
//      */


//     console.log(foo); // hello
//     var foo = foo || 'world';
//     console.log(foo); // hello
// })(foo); // 把全局的foo的值“hello” 作为实参传递给函数的形参
// console.log(foo);// hello




//==================================练习10=======================================
// var a = 9;
// function fn(){
//     a = 0;
//     return function(b){
//         return b+a++;
//     }
// }

// var f = fn();
// console.log(f(5));//5
// console.log(fn()(5));//5
// console.log(f(5));//6
// console.log(a);//2



//==================================练习11=======================================
// var ary = [1,2,3,4];
// function fn(ary){
//     ary[0] = 0; // 内&外ary = 0,2,3,4
//     ary = [0]; // 内ary=0 外ary=0，2，3，4
//     ary[0] = 100; //内ary=100
//     return ary; // 返回内ary
// }

// var res = fn(ary); //res = 内ary = [100]
// console.log(ary); // 外ary = 0,2,3,4
// console.log(res);






//==================================练习12=======================================
/**
 * var test = 自执行函数执行的返回结果
 *      1. 自执行函数执行
 */
// var test = (function(i){
//     /**
//      *  形参赋值 & 变量提升
//      *      i=2
//      */
//     // return 一个堆内存（小函数
//     return function(){
//         alert(i*=2);
//     }
// })(2);
// test(5);






//==================================练习13=======================================
// var a = 1;
// var obj = {
//     "name":"tom"
// };
// function fn(){
//     /**
//      * 形参赋值 & 变量提升   var a2；
//      */
//     var a2 = a; 
//     obj2 = obj;
//     a2 = a;
//     obj2.name = "jack";
// }

// fn();
// console.log(a); // 1
// console.log(obj); // name = jack




//==================================练习14=======================================

/**
 *  变量提升
 *      var a；
 *      function fn...;
 */
// var a = 1;
// function fn(a){
//     /**
//      *  形参赋值
//      *      a = 1；
//      *  变量提升
//      *      var a;(无效) a已经存在过了，不会再var
//      *      function a...; 声明无效，但是需要给a赋值为函数
//      * a = function..
//      */
//     console.log(a);
//     var a = 2;
//     function a(){};
//     console.log(a); // -> 2
// }
// fn(a);// 把全局a的值1当作实参传递给fn

/**
 * 变量提升
 *      fn = AF3（函数输出3
 */
// fn(); // 3
// function fn(){console.log(1);}
// fn(); //3
// function fn(){console.log(2);}
// fn(); // 3
// var fn = 10;
// fn();  // 报错 fn is not a funtion 
// function fn(){console.log(3);}
// fn();






//==================================练习15=======================================
var a = 0, b=0;
function A(a){
    A = function(b){
        alert(a+b++);
    };
    alert(a++);
}
A(1); // 
A(2);