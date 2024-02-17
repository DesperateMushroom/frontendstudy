// let ary1 = ['a1','a2','b1','b2','c1','c2','d1','d2'];
// let ary2 = ['a','b','c','d'];
// 合并后的数组为：[a1,a2,a,b1,b2,b,c1,c2,c,d1,d2,d];

// 方法1：在ary2每一项后面加一个比ary1大的字符，合并排序最后删掉添加的字符
/* ary2 = ary2.map(item=>{
    return item+"zhufeng";});
console.log(ary2);
let arr = ary1.concat(ary2).sort((a,b)=>a.localeCompare(b));
arr = arr.map(item=>item.replace("zhufeng",""));
console.log(arr);
 */


/* 
let ary1 = ['d1','d2','a1','a2','c1','c2','b1','b2'];
let ary2 = ['b','a','d','c'];
// 合并成：['d1','d2','d','a1','a2','a','c1','c2','c','b1','b2','b'];

let n = 0;
for(let i = 0;i<ary2.length; i++){
    let item2 = ary2[i];
    for(let k = 0; k<ary1.length; k++){
        let item1 = ary1[k];
        if(item1.includes(item2)){
            // 如果包含就记录一下当前这一项的索引位置
            // 后面还有包含的会重新记录这个值
            n = k;
        }
    }
    // 把当前item2这一项插入到n的后面
    ary1.splice(n+1,0,item2);
}

console.log(ary1); */


//==========================================================

// 定时器是异步编程：
// 每一轮循环设置定时器，无需等定时器出发执行，继续下一轮循环
// 定时器触发的时候，循环已经结束了
/* for(let i = 0; i<10;i++){
    // let: 存在会计作用域，每一次循环都会再当前块作用域中形成一个私有变量i
    //      存储0-9索引
    // 当定时器执行的时候，所使用的i就是所处块作用域中的i
    setTimeout(()=>{
        console.log(i);
    },1000);
} */


// 闭包解决1
/* for(var i = 0; i<10;i++){
    ~function(i){
        setTimeout(()=>{
            console.log(i);
        },1000);
    }(i);
   
} */

// 闭包解决2
/* for(var i = 0; i<10;i++){
    setTimeout((i=> ()=>console.log(i))(i),1000);
} */

// 可以基于bind的预先处理机制
// 再循环的时候就把每次执行的函数需要输出的结果，预先传给函数即可
/* var fn = function(i){
    console.log(i);
};
for(var i = 0; i<10;i++){
    setTimeout(fn.bind(null,i),1000);
}  */


//==========================================================
/* 下面代码输出的结果是多少 */
/* 怎么改造使其输出20 10 */
/* var b = 10;
(function b(){
    b = 20;
    console.log(b); // 函数 function b()
})();
console.log(b);// 10 */

/* let fn = function AAA(){
    "use strict";
    AAA = 1000; // uncaught typeError: assignment to constant variable
    console.log(AAA); // 当前函数
}; */
// AAA(); // uncaught referenceError: not defined 
       // 1. 本应匿名的函数如果设置了函数名，在外面还是无法调用
       //    但是在函数里面是可以使用的
       // 2. 而且类似于创建常量一样
       //    这个名字存储的值不能再被修改 
       //    非严格模式下不报错，但是不会有任何的效果
       //    严格模式下直接爆多，我们可以把AAA理解为使用const创建出来的

var b = 10;
(function b(){
    var b = 20;
    console.log(b); // 20 里面的b一定需要是私有的，不能是全局的
                    // 声明它或者改为形参
})();
console.log(b);