/**
 * 全局作用域（栈内存
 *  1. 变量提升
 *      var a;  默认值undefined
 *  2. 代码执行
 * 
 */

/* console.log(a); // undefined
var a = 12;
a = 13;
console.log(a); //13
 */

//=============================================
/**
 * 全局作用域（栈内存
 *  1. 变量提升
 *      var a;  默认值undefined
 *  2. 代码执行
 * 
 */
/* console.log(a); // referenceError 初始化之前引用了a
// 在js中上一行代码报错，下面的代码都不会再去执行了
let a = 12;
a = 13;
console.log(a); //13
 */


//=============================================
/* console.log(a);// referenceerror: a is not defined
a = 13; //=> window.a = 13  相当于给window这个变量给予了一个属性a =  13
console.log(a); */


//=======================================================
var b = 14;
console.log(b);
console.log(window.b);