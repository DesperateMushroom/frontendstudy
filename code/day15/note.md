### 原型及原型链模式
1. 每一个函数数据类型的值都有一个天生自带的属性：prototype（原型），这个属性的属性值是一个对象（“用来存储实例公用的属性和方法的”）
    - 普通的函数
    - 类（自定义类和内置类）
2. 在prototype这个对象中，有一个天生自带的属性：constructor。 这个属性存储的是当前函数本身

```
Fn.prototype.constructor === Fn
```
3. 每一个对象数据类型的值，也有一个天生自带的属性：\__proto\__, 这个属性指向“所属类的原型prototype”
    - 普通对象，数组，正则，Math，日期，类数组等到
    - 实例也是对象数据类型的值
    - 函数的原型prototype属性的值也是对象类型的
    - 函数也是对象数据类型的值


#### 原型链查找机制
1. 先找自己私有的属性，有责调取，没有继续
2. 基于__proto__找所属类原型上的方法（Fn.prototype), 如果还没有则继续基于__proto__往上找... 一直找到Object.prototype 为止


**hasOwnProperty**
> 检测某一个属性名是否为当前对象的私有属性
> “in”：检测这个属性是否属于某个对象（不管是私有属性还是公有属性，只要是它的属性，结果就为true）

```
let ary = [10,20,30]
console.log('0' in ary);  // true
console.log('push' in ary); // true

console.log(ary.hasOwnProperty('0')); // true
console.log(ary.hasOwnProperty('push')); // false
// push 是它公有属性，不是私有的

console.log(Array.prototype.hasOwnProperty('push')); // true 是公有还是私有属性
// 需要看相对谁来说


console.log(Array.prototype.hasOwnProperty('hasOwnProperty')); // false 
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')); // true

// 自己堆中有的就是私有属性，需要基于__proto__查找的就是公有属性
// （__proto__ 在ie浏览器（edge除外）中被保护起来了，不让我们在代码中操作它）
```

> 检测某个属性是否为对象的公有属性：hasPubProperty 
> 是它的属性，但不是它的私有属性
```
// 基于内置类原型扩展方法
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
console.log([].prototype.hasPubProperty('push')); // true

```