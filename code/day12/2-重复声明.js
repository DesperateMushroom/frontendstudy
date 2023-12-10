/* var a = 12;
var a = 13;
console.log(a); */

//==================================
// let a = 12;
//let a = 13;syntaxError already been declared


//===============================================
//=> 在浏览器开辟栈内存共代码自上而下执行之前，不仅有变量提升的操作，还有很多其他的操作=》“词法解析”或者“此法检测”
//=》就是检测当前即将要执行的代码是否会出现语法错误syntaxError
// 如果出现错误，代码将不会再执行（第一行都不执行  就先编译的意思
/* console.log(1); =》这行代码就已经不会再被执行了
let a = 12;
console.log(a);
let a = 13; syntaxError already been declared
console.log(a); */


//=========================================
// 所谓重复是：不管之前通过什么方法，只要当前栈内存中存在了这个变量，我们使用let/const 等重复声明
// 这个变量就是语法错误
// var a = 12;
// let a = 12; => syntaxError


//=========================================
// 操作到35行的时候创建fn变量但没指向log3，一直到39指向log5，34和之前都打印5，解析35行，指向log3，后面都打印3
/* fn();
function fn(){console.log(1)}; 
fn();
function fn(){console.log(2)}; 
fn();
var fn = function (){console.log(3)}; 
fn();
function fn(){console.log(4)}; 
fn();
function fn(){console.log(5)}; 
fn(); */
// 5，5，5，3，3，3 


