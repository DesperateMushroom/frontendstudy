/* window.name = 'WINDOW';
let obj = {name:'OBJ'};

let fn = function(){
    console.log(this.name);
};

fn(); // this: window => output: 'WINDOW'

fn.call(obj); // this:obj   output => 'OBJ'
fn.call(); // 不传参，非严格下this:window
 */
/*
// 我们的需求是想让fn执行的时候，方法中的this指向obj

obj.fn(); // uncaught typeerror: obj.fn is not a function  
        // 此时obj中并没有fn这个属性


----------解决方法---------
obj.fn = fn;
obj.fn(); //  this:obj  => output : 'OBJ'
delete obj.fn;
console.log(obj); 


*/


//  实现一个myCall方法
~ function(){
    /**
     * call: 改变函数中的this指向
     *      @params
     *          context 可以不传递，若传递，必须是引用类型值（因为后面要给它加$fn的属性
     * 如果一个都不传 默认this是window
     * 如果传的是undefined 或者null this也是window
     * 
     * context 必须是引用类型值
     */
    function call(context){

        context = context || window;

        
        let args = [], //=>除了第一个参数外剩余传递的信息值
            result; 
        
        for(let i = 1; i<arguments.length; i++){
            args.push(arguments[i]);
        }

        // 可以使用21-24行的解决方法来改变指向
        // 此时this:fn  也就是当前要操作的这个函数的实例
        context.$fn = this;

        // ... ： 在es6中，展开运算符 作用：把数组中的每一项分别的展开传递给函数
        // args = [10,20]   => context.$fn(10,20);
        result = context.$fn(...args);
        delete context.$fn;
        console.dir(context);
        return result;


    }

    /* 扩展到内置类的原型上 */
    Function.prototype.call = call;
}();


/* let obj = {
    name : 'obj'
};

function sum(n,m){
    console.log(this);
    return n+m;
}
var res = sum.call(obj,10,20);
console.log(res);

 */


// ------------阿里面试题------------
function fn1(){console.log(1);};
function fn2(){console.log(2);};
fn1.call(fn2); // => 1

fn1.call.call(fn2);  // 不管前面有多少call，执行的是最后一个call方法  context：fn2   this：fn1.call
// 第一次执行call方法
// fn2.$fn = fn1.call
// fn2.$fn() -> fn1.call 方法执行，方法中的this变为fn2


Function.prototype.call(fn1);
// 没有任何输出结果

Function.prototype.call.call(fn1); 
// 输出1


// 总结： 
//      一个call，call 前面的函数执行；this变成传递的参数
//      两个及其以上，是让传参的函数执行；方法中的this变成window