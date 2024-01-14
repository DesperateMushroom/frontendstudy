/**
 * 函数数据类型
 *    1. 普通函数
 *    2. 类(内置类 or 自定义类)
 * 
 * 对象数据类型：
 *    1. {} 普通对象  []数组对象  /^$/正则对象   日期对象   Math数学函数对象
 *       arguments等类数组对象    HTMLCollection/NodeList 元素或者节点集合类数组对象
 *    2. 实例也是对象数据类型的
 *    3. 类的prototype也是对象数据类型的（Function.prototype除外，它是一个匿名空函数）
 *    4. 函数也是对象
 * 
 * 
 * =========================================================
 * 函数有三种角色
 *  1. 普通的函数
 *      + 形参，实参，arguments，return，箭头函数
 *      + 私有作用域（栈内存/执行上下文）
 *      + 形参赋值 & 变量提升
 *      + 作用域链
 *      + 栈内存的释放和不释放（闭包）
 *      + ...
 *  2. 构造函数（类）
 *      + 类和实例
 *      + prototype  和  __proto__ 原型和原型链
 *      + instanceof
 *      + constructor
 *      + hasOwnProperty
 *      + ...
 *  3. 普通对象
 *      + 它是由键值对组成的
 *      + 。。。
 * 
 *  函数中的this也是重点需要学习的内容
 */

function Fn(n,m){
    this.x = n+m;
    this.y = n-m;
    let total = n*m;
    return total;
}

Fn.prototype.say = function(){
    console.log('say');
}


// 普通函数
let total = Fn(20,10);

//构造函数
let f = new Fn(20,10);

//普通对象
Fn.total = 1000;

// Object.__proto__.__proto__ === Object.prototype  true 


// jquery
// typeof window !=="undefined"? window:this   window 如果存在，那么运行环境就是浏览器，否则是node
(function (global, factory ) {
    // =》 global：window（浏览器下运行）  or   global（node下运行）
    // =》 factory: function (window,noGlobal) {...}

    "use strict";
    if(typeof module === "object" && typeof module.exports ==="object"){
        // => node下运行
        //。。。
    }
    else{
        // -> 浏览器运行
        factory(global);
    }
})
(typeof window !=="undefined"? window:this,  function (window, noGlobal){

    // -> window:window
    // -> noGlobal:undefined
     var jQuery = function(selector, context){
        return new jQuery.fn.init(selector, context);
     };

     var init;

     init = jQuery.fn.init = function(selector, context,root){
        //...
     };

     init.prototype = jQuery.fn = jQuery.prototype;


     if(!noGlobal){
        // => !undefined -> true
        window.jQuery = window.$ = jQuery; 
     }

});

/**
 * jQuery是一个构造函数：jQuery.prototype上有很多供实例操作的方法，例如css。。。
 *      $().css()
 * 
 * jQuery也是一个普通的对象，在它的堆空间中也存在很多的方法，例如ajax。。。
 *      $.ajax()
 */
$(); // -> 创建了jQuery这个类的一个实例。可以调取jQuery.prototype (jQuery.fn) 上的方法






//======================阿里面试=================================
function Foo(){
    getName = function(){
        console.log(1);
    };
    return this;
}

Foo.getName = function(){
    console.log(2);
};

Foo.prototype.getName = function(){
    console.log(3);
};

var getName = function(){
    console.log(4);
};

function getName(){
    console.log(5);
}

Foo.getName(); // 2
getName();  // 4
Foo().getName(); // 1 Foo前面没有点，运行Foo，return this 此时的this就是window 
getName();// 1


// 运算优先级 

// 首先找到Foo.getName  成员访问 > 不带参new
// Foo.getName: 输出2这个方法
new Foo.getName();// 2


// 首先new Foo() 创造一个实例
// 实例.getName() 执行
new Foo().getName(); // 3


new new Foo().getName(); //3
