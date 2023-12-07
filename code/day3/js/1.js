//求两个数的和，算完后乘以10，然后再除以2

// sum是函数名，代表这个函数
// sum() 是让函数执行，代表的是函数执行返回的结果
// n.m是形参，用来存储执行函数时传递的实参


console.log(sum);
sum();
sum(10,20);


//=============形参的细节
// 创建函数的时候我们设置了形参变量，单如果执行的时候并没有给传递对应的实参值，
// 那么形参变量的默认的值是：undefined
/*function sum(n,m){
    // 形参默认值处理：如果没有传递形参值，给于一个默认值
    if(n===undefined){
        n=0;
    }
    if(typeof m === "undefined"){
        m = 0;
    }
    let result = n+m;
    result *= 10;
    result /= 2;

    console.log('result:'+result);
}*/


//===================函数中的返回值
//函数执行的时候，函数题内部创建的变量我们是无法获取和操作的
//如果要获取内部信息，需要return返回值机制，把信息返回才行
function sum(n,m){
    // 形参默认值处理：如果没有传递形参值，给于一个默认值
    if(n===undefined){
        n=0;
    }
    if(typeof m === "undefined"){
        m = 0;
    }
    let result = n+m;
    console.log('result:'+result);
    // return: 把result变量存储的值返回
    return result;
}

let result = sum(10,10);
console.log(result);

//没有写return，函数默认返回值是undefined

//函数题中遇到return，后面代码则不再执行了
 

//=====================匿名函数
// 匿名函数值函数表达式：把一个匿名函数本身作为赋值给其他东西
//这种函数一般不是手动触发执行的，而是靠其他程序驱动触发执行
// 例如：触发某个事件的时候把它执行等


//定时器，在一秒钟之后执行这个函数
//setTimeout(function(){},1000);

//创建完立马让它执行
// 匿名函数之自执行函数：创建完一个匿名后，紧接着就把当前函数加小括号执行
(function(n){console.log(n);}) (100);