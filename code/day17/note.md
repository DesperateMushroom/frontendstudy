### THIS
> 每一个函数（普通函数/构造函数/内置类）都是Function这个内置类的实例，所以：
> 函数.\__proto\__ === Function.prototype, 函数可以直接调取Function原型上的方法

```
// Function.prototype => function anonymous(){}
/*
    call / apply / bind 原型上提供的三个公有属性方法
    每一个函数都可以调用这个方法执行
    这些方法都是用来改变函数中this指向的
*/


function fn(){}
fn.call(); //=》 fn函数基于原型链找到Function.prototype上的call方法，并且让其执行（执行的是call方法：方法中的this时fn）
fn.call.call(); // fn.call 就是Function.prototype上的call方法，也是一个函数，只要是函数就能用原型上的方法，所以可以继续调用call来执行

/*
Function.prototype.call = function $1(){
    //...
}
fn.call => $1
fn.call() => $1()  this:fn
fn.call.call() => $1.call() => 继续让call执行， this:$1


实例.方法(): 都是找到原型上的内置方法，让内置方法先执行
（只不过执行的时候做了一些事情会对实例产生改变，而这也是这些内置方法的作用）
内置方法中的this一般都是当前操作的实例

*/
```


`call方法`

> 语法: 函数.call([context],[params1],....)
> 函数基于原型链找到Function.prototype.call 这个方法，并且把它执行，
> 在call方法执行的时候完成了一些功能
- 让当前函数执行
- 把函数中的this指向改为第一个传递给call的实参
- 把传递给call其余的实参当作参数信息传递给当前函数
    如果执行call同一个实参都没有传递
    非严格模式下是让函数中的this指向window
    严格模式下指向的是undefined 

```
window.name = 'WINDOW';
let obj = {name:'OBJ'};

let fn = function(){
    console.log(this.name);
};

fn(); // this: window => output: 'WINDOW'   严格下是undefined
fn.call(obj); // this:obj   output => 'OBJ'
fn.call(); // 不传参，非严格下this:window   严格下是undefined
fn.call(null);  // 非严格下this:window   严格下是null(第一个参数传递的是null/undefined/不传，
                //                                  非严格模式下this指向window，严格模式下传递的谁this就是谁，不传就是undefined)

Object.prototype.toString() //=> toString 方法中的 this:Object.prototype
Object.prototype.toString.call(100) // -> toString方法中的this:100

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
```



`apply方法`
> 和call方法一样，都是把函数执行，并且改变里面的this关键字，唯一的区别就是传递给函数的参数的方式不同
- call是一个个传参
- apply是按照数组传参

```
let obj = {name:'obj'};

let fn = function(n,m){
    console.log(this.name);
}

// => 让fn方法执行，让方法中的this变为obj，并且传递10/20
fn.call(obj,10,20);
fn.apply(obj,[10,20]);
```


`bind方法`
> 和call/apply一样，也是用来改变函数中的this关键字的
> 只不过基于bind改变this，当前方法并没有被执行，类似于预先改变this
```
let obj = {name:'obj'};

function fn(){
    console.log(this.name);
}

document.body.onclick = fn; // -> 当事件触发，fn中的this:body
// 我们想：点击body，让fn中的this指向obj

document.body.onclick = fn.call(obj); // 基于call/apply 这样处理
    // 不是把fn绑定给事件，而是把fn执行后的结果绑定给事件

document.body.onclick = function(){
    //this:body
    fn.call(obj);
}

document.body.onclick = fn.bind(obj); 
// => bind的好处是：
// 通过bind方法只是预先把fn中的this修改为obj，此时fn并没有执行
// 当点击事件触发才会执行fn
// （call/apply都是改变this的同时立即把方法执行）
// -》 在ie6-8中不支持bind方法    
// 预先做啥事情的思想 = “柯里化函数”

```
