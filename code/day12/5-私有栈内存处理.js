
// ======================练习1==========================
/* console.log(a,b); // undefined, undefined
var a = 12, b = 12;
function fn(){

    // 作用域链查找机制
    // 私有栈内存中，代码执行的时候，如果遇到一个变量：
    // 1. 首先看是否为自己作用域中的，是自己的以后操作都用自己的，
    //    不是自己的去上级作用域中查找，一直找到全局作用域为止
    // 2. 找到拿来用，找不到可能会报错
    console.log(a,b); // undefined 12

    // var a = 10, b = 20; 等价于 var a = 10; var b = 20;
    // var a=b=10; 等价于 var a = 10; b=10;  b不带var 
    var a = b = 13;
    console.log(a,b); // 13  13
}

fn();
console.log(a,b); // 12 13 */

// 函数执行形成的私有栈内存，会把内存中所有的私有变量保护起来
// 和外面没有任何的关系 -》 函数执行的之中保护机制就是 “闭包”



// ======================练习2==========================
/* console.log(a,b,c); // undefined * 3
var a = 12, b = 13, c = 14;
function fn(a){
    // 私有变量：再私有作用域中变量存储区存储的变量
    // 1. 函数中带 var let function const 的变量
    // 2. 形参变量也是私有变量
    console.log(a,b,c); // a传进来的值：10；13；14
    a = 100;
    c = 200;
    console.log(a,b,c); // 100，13，200
}
b = fn(10); // b=》undefined
console.log(a,b,c); //12，undefined，200


function sum(a){
    console.log(a);
    let a = 100; // 报错
    console.log(a); 
}*/


// ======================练习3==========================
/* var ary = [12,23];
function fn(ary){
    // 在这里操作的ary都是fn私有的
    console.log(ary); // 12 23
    ary[0] = 100;
    ary = [100];
    ary[0] = 0;
    console.log(ary); // 0
}
fn(ary);
console.log(ary); //100 23 */




// ======================练习4==========================
/* var n = 1;
function fn(){
    var n = 2;
    function f(){
        n--;
        console.log(n);
    }

    f();
    return f;
}
var x = fn(); // 1
x(); // 0
console.log(n);// 1 */


// ======================练习5==========================
var i = 5;
function fn(i){

    // 这个返回的函数被其他变量指向的时候，fn作用域不会被销毁。
    // 如果被销毁就找不到了，所以不能被销毁
    return function(n){
        console.log(n + (++i));
    }

}

var f = fn(1);
f(2); // 4
fn(3)(4); // 8
fn(5)(6); // 12
f(7); // 10
console.log(i); // 5 