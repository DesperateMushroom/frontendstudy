/* 函数柯理化：预先处理的思想（利用闭包的机制） */
/* 就是闭包的保存和保护 */
/* 
 柯里化：
function fn(x){
    // 预先在闭包中把x值存储起来
    return function(y){
        return x+y;
    }
};
fn(100)(20); */

/* 
~function(){
    function myBind(context=window, ...outerArg){
        // this:需要改变this的函数
        // context: 需要改变的this指向
        // outerArg：其余需要传递给函数的实参信息
        let _this = this;

        return function(...innerArg){
            _this.call(context,...outerArg.concat(innerArg));
            // => _this.apply(context,outerArg.concat(innerArg));
        }
    }

    Function.prototype.myBind = myBind;
}();


let obj = {name : 'obj'};
function fn(...arg){
    console.log(this,arg);
}
document.body.onclick = fn.myBind(obj, 100,200); */

// 点击的时候fn中的this=>obj, arg=>[100,200,事件对象]
// document.body.onclick = fn.bind(obj, 100,200);

/* document.body.onclick = function(ev){
    fn.call(obj,100,200,ev);
} */
// 执行bind方法，会返回一个匿名函数，当事件触发，匿名函数执行，我们再处理fn即可

// document.body.onclick = fn; // this:body  arg:[事件对象]
/* document.body.onclick = function(ev){
    // ev事件对象：给元素的某个事件绑定方法，当事件触发会执行这个方法
    //            并且会把当前事件的相关信息传递给这个函数“事件对象”
    console.log(ev);
} */


// ===========================================
/* 实现一个add函数，满足以下功能 */
// add(1);//1
// add(1)(2); //3
// add(1)(2,3);//6
// add(1)(2)(3);//6
// add(1,2)(3);//6
// add(1,2,3);//6

function currying(fn, length){
    length = length || fn.length;
    return function (...args){
        if(args.length>=length){
            return fn(...args);
        }
        return currying(fn.bind(null, ...args), length-args.length);
    }
    
}

function add(n1,n2,n3,n4){
    return n1+n2+n3+n4;
}
add = currying(add,4); // 控制几个数相加
console.log(add(1)(2)(3)(4));

// $add.bind(null,1).bind(null,2).bind(null,3)(4)
// function anonymous1(...innerArgs) {$add.call(null,...[1,...innerArg])}
// function anonymous2(...innerArgs) {anonymous1.call(null,...[2,...innerArg])}
// function anonymous3(...innerArgs) {anonymous2.call(null,...[3,...innerArg])}
// anonymous3(4)
// 往回推
// anonymous2.call(null,3,4)
// anonymous2.call(null,2,3,4)
// $add.call(null,1,2,3,4)


add = currying(add,4); // 控制几个数相加
console.log(add(1,2)(3,4));

/* ~function(){
    function myBind(context=window, ...outerArg){
        // this:需要改变this的函数
        // context: 需要改变的this指向
        // outerArg：其余需要传递给函数的实参信息
        let _this = this;

        return function(...innerArg){
            _this.call(context,...outerArg.concat(innerArg));
            // => _this.apply(context,outerArg.concat(innerArg));
        }
    }

    Function.prototype.myBind = myBind;
}(); */

// 不固定小括号个数，固定传入个数
let add1 = currying((...arg)=> eval(arg.join('+')),5);
console.log(add1(1)(2,3)(4,5));