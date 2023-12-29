// ==========================练习1==============================
function Fn(){
    this.x = 100;
    this.y = 200;
    this.getX = function(){
        console.log(this.x);
    }
}

Fn.prototype.getX = function(){
    console.log(this.x);
};

Fn.prototype.getY = function(){
    console.log(this.y);
};

let f1 = new Fn;
let f2 = new Fn;

console.log(f1.getX === f2.getX); // false
console.log(f1.getY === f2.getY); // true
console.log(f1.__proto__.getY === Fn.prototype.getY); // true
console.log(f1.__proto__.getX === f2.getX); //false
console.log(f1.getX===Fn.prototype.getX);//false
console.log(f1.constructor); // Fn
console.log(Fn.prototype.__proto__.constructor);// Object
f1.getX(); // 100
f1.__proto__.getX(); // undefined
f2.getY();// 找的是公有方法 this:f2  console.log(this.y)  console.log(f2.y) : 200
Fn.prototype.getY();// undefined


// 基于constructor实现数据类型检测就是这样来玩的
// 但是这种方式有很大的弊端：因为用户可以去随意修改对应的constructor值或者手动给ary增加一个私有的constructor属性等
// let ary = [];
// console.log(ary.constructor === Array); // true




// ==========================练习2==============================
function fun(){
    this.a = 0;
    this.b = function(){alert(this.a)};
}
fun.prototype = {
    b:function(){
        this.a = 20;
        alert(this.a);
    },
    c:function(){
        this.a = 30;
        alert(this.a);
    }
}

var my_fun = new fun();
my_fun.b(); // 私有的  this:my_fun  my_fun.a -> 0
my_fun.c(); // 共有的  this:my_fun  my_fun.a = 30;  alert.(my_fun.a) => 30