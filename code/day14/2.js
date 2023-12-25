/**
 * this 是函数执行的主体（谁执行的）
 *      this是谁和函数在哪里创建的或者在哪里执行的都没有必然的联系
 *  
 *  掌握几条分清执行的主体和规律
 *      1. 给元素的某个事件绑定方法，当事件触发方法执行的时候，方法中的this是当前操作的元素
 *      2. 防止执行，看方法前面是否有点，有点，点前面是谁this就是谁，没有点this是window
 *          在严格模式下没有点this是undefined =》 "use strict"
 *      3. 在构造函数模式执行中，函数体中的this是当前类的实例
 * 
 */
/* 
// 1================
document.body.onclick = function(){
    this: body;
} */


// 2================
/* function fn(){
    console.log(this);
}
let obj ={
    fn:fn
}
fn(); // this:window
obj.fn(); // this:obj */


// 3===================
/* function Fn(){
    // this: f这个实例
    this.name = 'xxx';
}
let f = new Fn();
console.log(f.name); */




// ===============================练习1===================================
/* var fullName = 'language';
var obj = {
    fullName : 'javascript',
    prop:{
        getFullName : function(){
            return this.fullName;
        }
    }
};

console.log(obj.prop.getFullName()); // this: obj.prop    => return obj.prop.fullName:undefined
var test = obj.prop.getFullName;
console.log(test());// this:window  -> return window.fullName : language */





// ===============================练习2===================================
/* var name = 'window';
var Tom = {
    name : 'tom',
    show : function (){
        console.log(this.name);
    },
    wait : function(){
        // this : Tom => Tom.show 给了fun
        var fun = this.show;
        fun();// this：window  =》 console.log(window.name )=> 'window'
     }
};
Tom.wait(); */



// ===============================练习3===================================
/* function fun(){
    this.a = 0;
    this.b = function(){
        alert(this.a);
    }
}

fun.prototype={
    b:function(){
        this.a=20;
        alert(this.a);
    },
    c:function(){
        this.a = 30;
        alert(this.a);
    }
}
var my_fun = new fun();
my_fun.b();
my_fun.c(); */





// ===============================练习5===================================
/* window.val = 1;
var json = {
    val : 10,
    dbl : function (){
        this.val *=2;
    }
}
json.dbl(); // this:json   ->  json.val *= 2  -> json.val = 20

var dbl = json.dbl;
dbl(); // this:window  => window.val *= 2   => window.val = 2;


json.dbl.call(window);
// -> this:window (基于call方法改的)  =》 window.val = 4 
alert(window.val + json.val); //=> 4 + 20 = 24
 */



// ===============================练习6===================================
/* (function(){
    var val = 1;
    var json = {
        val : 10,
        dbl :function() {
            // 这个val应该是上级作用域的val，因为上级作用域（栈，不是堆），所以这个的上级作用域是全局作用域 
            val *= 2;
        }
    }
    json.dbl();
    alert(json.val + val);  // 12
}) (); */



// ===============================练习7===================================
var num = 10;
var obj = {num:20};
obj.fn = (function(num){
    this.num = num * 3;
    num ++ ;
    return function (n){
        this.num += n;
        num++;
        console.log(num);
    }
})(obj.num);

var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num,obj.num);
