
let obj = {
    name : "aoao",
    age:21,
    gf:null

}
console.log("name" in obj); // true
console.log("gf" in obj); // true
console.log("bf" in obj); // false
// [property] in [object] 验证当前属性是否属于这个对象  hasOwnProperty



//========================================
/**
 * 全局作用域
 *  1. 变量提升
 *      不管条件是否成立都要进行变量提升
 *      var a; //=> 创建一个全局变量a  =》 window.a
 *  2. 代码执行
 */
/*  console.log(a); //=》 undefined
if(!('a' in window)){
    var a = 13;
}
console.log(a); //=》 undefined

 */

//========================================
/**
 * 全局作用域
 *  1. 变量提升
 *      但是做函数的有特殊性：再老版本浏览器中，不论条件是否成立，函数也是提前声明或者定义的，
 *      但是新版本浏览器中，为了兼容es6严谨的语法规范，条件中的函数再变量提升阶段只能提前声明，不能提前定义
 *     
 *  2. 代码执行
 */
/* console.log(fn); //=>undefined  因为函数是undefined，不能执行，41的fn() 直接报错，后面都不运行
// fn();
if('fn' in window){ //-》true
    function fn(){ //条件成立，进来后立马给fn赋值，然后再代码执行
        console.log("aaaa");
    }
}
fn(); */



//====================================
// f = function(){return true};
// g = function(){return false};

// ~function(){

//     /**
//      * 函数执行会形成一个私有作用域
//      *  1. 变量提升 function g;
//      *  2. 代码执行
//      */
//     if(g()&&[] == ![]){ //  g() 是undefined  声明但未定义，不能使用，会直接报错
//         f = function(){return false;}
//         function g() {return true;}
//     }

// }();
// console.log(f());
// console.log(g());

// 自执行函数（匿名函数）：前面夹的() 或者！、-、~、+ 只有一个目的，让语法符合
// 创建之后立马执行
// 自治性函数本身不进行变量提升，因为没有名字
// (function(n){})(10);
// !function(n){}(10);
// -function(n){}(10);
// ~function(n){}(10);
// +function(n){}(10);