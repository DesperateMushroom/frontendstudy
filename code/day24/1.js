// =====================练习1=======================
/** call 和 apply 的区别，那个性能更好一些 */
// 都是改变this指向的, 都是function原型上的方法
// call的参数是一个个传递，apply是用数组的形式传递
// 3个或者3个以上的话，call比apply好一些，以下是差不多
// call的性能要比apply好那么一些，尤其是传递给函数的参数超过三个的时候
// 所以后期开发的时候，可以使用call多一点
// fn.call(obj,1,2,3);
// fn.apply(obj, [1,2,3]);
// let arr = [1,2,3];
// let obj = {};
// function fn(x,y,z){}
// fn.apply(obj,arr); // x=1,y=2,z=3
// fn.call(obj,call); //x=[1,2,3], y=z=undefined
// fn.call(obj,...arr);// 基于es6的展开运算符也可以实现把数组中的每一项依次传递给函数

// 自己实现性能测试（结果仅供参考
// 任何的代码性能测试都是和测试的环境有关系的
// 例如：cpu，内存，gpu等电脑当前性能不会有相同的情况
// 不同浏览器也会导致性能上的不同，例如 ie 和 chrome

/* let t1 = new Date();
for(let i = 0; i<10000000; i++){
    //...
}
console.log(new Date() - t1); */

// console.time() console.timeEnd可以测试出一段程序执行的事件
// 火狐: console.profile() 在火狐浏览器中安装FireBug，可以更精准的获取到当前程序每一个步骤所消耗的时间
/* console.time('A')
for(let i = 0; i<10000000; i++){
    //...
}
console.timeEnd('A')*/


// =====================练习2=======================
/** 实现(5).add(3).minus(2)，使其输出结果为6 */

//arr.push(); 因为arr是Array的实例，可以调用Array.prototype上的方法

/* ~function(){
    // 每一个方法执行完，都要返回Number这个类的实例，这样才可以继续调取Number类原型中的方法
    // 链式写法

    function check(n){
        n = Number(n);
        return isNaN(n)?0:n;

        // 赋值结果永远为真，前面为真，返回后面
        // 但是n没有改，还是字符串
      //  return n = Number(n) && isNaN(n)?0:n;
    }

    function add(n){
        n = check(n);
        return this+n;
    }

    function minus(n){
        n = check(n);
        return this-n;
    }

    //正常写法
    Number.prototype.add = add;
    Number.prototype.minus = minus;

    // 懒人写法
    ["add","minus"].forEach(item=>{
        Number.prototype[item] = eval(item);
    });

}();
console.log((5).add(3).minus(2)); */




// =====================练习3=======================
/** 箭头函数与普通函数function的区别是什么？
 * 构造函数function可以使用new生成实例，那么箭头函数可以吗？为什么
 */

/**
 * 箭头函数和普通函数的区别
 *  1. 箭头函数语法上比普通函数更加简洁（es6中，每一种函数都可以使用形参赋默认值和...剩余运算符
 *  2. 箭头函数中没有自己的this, 它里面的this是继承函数上下文中的this（使用call/apply等任何方法都无法改变this的指向
 *  3. 箭头函数中没有arguments（类数组），只能基于...arg获取传递的参数集合（数组）
 *  4. 箭头函数不能被new执行（因为：箭头函数没有this也没有prototype）
 */

/* function Fn(){
    this.x = 100;
}
Fn.prototype.getX = function(){};
let f = new Fn; */

/* let Fn = ()=>{
    this.x = 200;
}
let f = new Fn; // uncaught typeerror: Fn is not a constructor
 */
/* function fn(x){
    return function(y){
        return x+y;
    }
}

let fn = x => y => x+y;
 */

/* let obj = {
    name : 'obj'
};

function fn1(){
    console.log(this); // obj
}
fn1.call(obj);
let f2 = () => console.log(this);
f2.call(obj); // window; */

// document.body.onclick = () => {
//     // this: window  不是当前操作的body了
// };

// document.body.onclick = function(){
//     //this: body
//    /*  arr.sort(function(a,b){
//         // 我们仅是把这个function传给sort让sort帮我们执行，这个方法的this不是arr
//         // 回调函数中的this一般都是window
//       //  this:window
//       return a-b;
//     }) */

//     arr.sort ((a,b)=>{
//         // this: body
//         return a-b;
//     })

// };

// =》 回调函数：把一个函数B作为实参传递给另外一个函数A
//          函数A在执行的时候，可以把传递进来的函数B去执行（执行N次,可传值，可改this）
/* function each(arr,callback){
    // callback : function(item,index){}
    for(let i = 0; i<arr.length;i++){
        let flag = callback.call(arr,arr[i],i);
        // 接受回调函数返回的结果，如果是false，我们结束循环
        if(flag === false){
            break;
        }
    }
}
each([1,2,3,4],function(item,index){
    if(index>1) return false;
    // 内置forEach原理
}); */
/* 
let fn = (...arg) =>{
    // console.log(arguments); // uncaught referenceError
    console.log(arg);
};

fn(10,20,30); */


// =====================练习3思考题1=======================
// each
/* let arr = [1,2,3,'AA',4];
let obj = {};
arr = arr.each(function (item, index) {
    // this: obj (each第二个参数不传，this是window即可)
    
    // 如果return的是false，则结束当前数组的循环
    if(isNaN(item)) {return false;}

    return item * 10; // 返回的结果是啥，就把数组中当前项替换成啥

}, obj); */

// =====================练习3思考题2=======================
// replace 重写这个方法，实现和内置一模一样的效果（只需要考虑 replace([reg],[callback]);
/* let str = "zhufeng2019zhufeng2029";
str = str.replace(/zhufeng/g,function(...arg){
    //arg中存储了每一次大正则匹配的信息和小分组匹配的信息
    return '@'; // 返回的是啥把当前正则匹配的内容替换成啥
}); */

