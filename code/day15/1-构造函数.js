/**
 * 类：函数数据类型
 * 实例：对象数据类型的
 */

function Fn(){
    /**
     * new 执行也会把类当作普通函数执行（当然也有类执行的一面）
     *  1. 创建一个私有的栈内存
     *  2. 形参赋值 & 变量提升
     *  3. 浏览器创建一个对象出来（这个对象就是当前类的一个新实例），并且让函数中的this指向这个实例对象
     *      =》 “构造函数模式中，方法中的this是当前类的实例
     *  4. 代码执行
     *  5. 在我们不设置return的情况下，浏览器会把创建的实例对象默认返回
     * 
     * 
     */

    this.x = 100;
    this.y = 200;
}

Fn.prototype.eat = function (){}
Fn.prototype.say = function (){}


let f1 = new Fn();
let f2 = new Fn();

//f1.eat()
// “原型链”
//1. 先找自己私有的属性，有责调取，没有继续
//2. 基于__proto__找所属类原型上的方法（Fn.prototype), 如果还没有则继续基于__proto__往上找... 一直找到Object.prototype 为止


console.log(f1.__proto__ === Fn.prototype); // 在谷歌和edge下是true，ie下都是false
console.log(f1.__proto__.eat()); // 在谷歌和edge下可以输出，ie下报错 ie浏览器中__proto__是undefined



Object.prototype.hasPubProperty = function (property){
    // 验证传递的属性名合法性（一般只能是数字和字符串 布尔 等基本值）
    let x = ["string","boolean","number"];
    let y = typeof property;

    if(!x.includes(y)) return false; 

    // => 开始校验是否为公有属性 （方法中的this就是要校验的对象）
    let n = property in this;
    let m = this.hasOwnProperty(property);

    return n && !m; 

}


console.log(Array.prototype.hasPubProperty('push')); // false
console.log([].hasPubProperty('push')); // true
