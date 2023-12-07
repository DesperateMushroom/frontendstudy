function sum(n , m){
    return n+m;
}

//改写成箭头函数
let sum = (n,m) =>{
    return n+m;
};

//如果函数题中只有一行return，可以省略return和大括号，一行搞定
let sum = (n,m) =>n+m;

function fn(n){
    return function(m){
        return n+m;
    }
}

/*let fn = n=>{
    return function(m){
        return n+m;
    }
}*/

/*let fn = n => {
    return m => n+m;
}*/

let fn =n=> m=>n+m;


function sum(n,m){
    if(typeof n === 'undefined'){
        n = 0;
    }
    if(typeof m === 'undefined'){
        m = 0;
    }

    return n + m;
}

//es6箭头函数里可以不用判断undefined
//形参赋值默认值：当没有给形参传递实参的时候，执行默认值
let sum = (n=0,m=0) => n+m;


let sum = (...args) => {
    //我们可以用剩余运算符获取到传递的实参集合（它是数组
    console.log(args);
    eval(args.join('+'));
}