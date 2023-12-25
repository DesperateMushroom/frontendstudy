function Fn(){
    // => this:当前类的实例f1
    this.x = 100;
    this.y = 200;
    this.say = function(){
        this.x;
    }
}

Fn.prototype.say = function (){
    console.log(this.y);
}
Fn.prototype.eat = function (){
    console.log(this.x + this.y);
}
Fn.prototype.write = function(){
    this.z = 1000;
}

let f1 = new Fn;
f1.say();// this-> f1  f1.x => 100
f1.eat(); // this:f1  f1.y+f1.x => 300
f1.__proto__.say(); // this:f1.__proto__   f1.__proto__.y  f1.__proto__ 里没有y属性，往上找，找到Object，Object 也没有y属性 undefined
Fn.prototype.eat(); // this:Fn.prototype => Fn.prototype.x + Fn.prototype.y  => undefined + undefined = NaN
f1.write(); // this: f1   =>  f1.z = 1000 =>  给f1设置一个私有的属性z=1000
Fn.prototype.write(); // => this:Fn.prototype  -> Fn.prototype.z = 1000   => 给原型设置一个属性z=1000  属性是实例的公有属性
/**
 * 面向对象中有关私有/公有方法中的this问题
 *      1. 方法执行，看前面是否有点，点前面是谁this就是水
 *      2. 把方法中的this进行替换
 *      3. 再基于原型链查找的方法确定结果即可
 */