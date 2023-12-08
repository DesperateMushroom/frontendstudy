console.log(a); // undefined
var a = 12;
var b = a;
b = 13;
console.log(a); //12

console.log(sum(1,2)); 
function sum(n,m){
    return n+m;
}


// 函数表达式方法，由于使用var来创建sum，变量提升阶段只会声明变量，不会赋值,
// 说一此时函数在前面执行，函数是没有值的，不能执行
// 真实项目中这种方式常用，因为它操作严谨
// sum(1,2); // uncaught typeerror
var sum = function (n,m){return n+m;}
sum (10,10);
// let sum=(n,m) => n+m;