//=======================练习1=============================
// function C1(name){
//     // name:undefined, 设形参但是没有传形参
//     // undefined == false
//     if(name){ // 条件不成立
//         this.name = name;
//     }
// }

// function C2(name){
//     // name:undefined, 设形参但是没有传形参
//     // this.name = undefined 
//     this.name = name;
// }

// function C3(name){
//     // this.name = undefined 
//     // this.name = undefined || 'join'  = 'join'
//     // false || b => 返回b
//     this.name = name || 'join';
// }

// C1.prototype.name = 'TOM';
// C2.prototype.name = 'TOM';
// C3.prototype.name = 'TOM';

// /* 
// (new C1().name)
// let c = new C1();
// c.name; // -> 'TOM' */

// // (new C2().name)// => undefined

// alert((new C1().name) + (new C2().name) + (new C3().name));  // 'TOMundefinedjoin'





//=======================练习2=============================
function Fn(num){
    this.x = this.y = num;
}
Fn.prototype = {
    x:20,
    sum: function (){
        console.log(this.x + this.y);
    }
};

let f = new Fn(10);
console.log(f.sum === Fn.prototype.sum); // true
f.sum(); // 20
Fn.prototype.sum(); // 20 + undefined => NaN
console.log(f.constructor); // Object 没有constructor会继续按原型链找constructor，最后会找到Object.prototype.constructor => Object




//=======================练习3=============================
/* function Fn(){
    let a = 1;
    this.a = a;
}

Fn.prototype.say = function (){
    this.a = 2;
}
Fn.prototype = new Fn; // new Fn的时候没有重定向，所以开辟的新对象指向原来的Fn.prototype, 赋值的时候Fn.prototype重定向
let f1 = new Fn;

Fn.prototype.b = function(){
    this.a = 3;
}

console.log(f1.a);//1
console.log(f1.prototype);// undefined 因为prototype是对象专有的，这里f1的原型链上没有
console.log(f1.b); // function(){this.a = 3}
console.log(f1.hasOwnProperty('b')); // false
console.log('b' in f1); // true
console.log(f1.constructor == Fn); //true
f1.say(); // this:f1  f1.a = 2 */


//=======================练习3-1=============================
/* function Fn(){
    this.x = 100;
    this.y = 100;
}
Fn.prototype.getX = function (){
    console.log(this.x);
}
let f1 = new Fn;
Fn.prototype = {
    getY:function(){
        console.log(this.y);
    }
};
let f2 = new Fn; */



//=======================练习4=============================
// 实现这个功能
//用闭包实现
~function (){
    // 检测输入参数
    function checkX(x){
        x = Number(x);
        return isNaN(x)?0:x;
    }

    function plus(x){
        // this: 我们要操作的原始值数字（this=xxx 我们不能给this手动赋值
        x = checkX(x);
        return this + x;
    }

    function minus(x){
        x = checkX(x);
        return this-x;
    }

    /* 扩展到内置类的原型上 */
    Number.prototype.plus = plus;
    Number.prototype.minus = minus;
}();


let n = 10;
let m = n.plus(10).minus(5);
console.log(m); // 15  


// 思考题：重构数组的slice方法，基于原生js实现出内置方法一模一样的效果


