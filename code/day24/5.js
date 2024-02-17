function Dog(name){
    this.name = name;
}

Dog.prototype.bark = function(){
    console.log('woof woof');
}

Dog.prototype.sayName = function(){
    console.log("my name is "+ this.name);
}


/*
// let sanmao = new Dog('sanmao');
    1. 像普通函数执行一样，形成一个私有的作用域
        + 形参赋值
        + 变量提升
    2. 默认创建一个对象，让函数中的this指向这个对象，这个对象就是当前类的一个实例
    3. 代码执行
    4. 默认把创建的对象返回
*/


// sanmao.sayName();
// sanmao.bark();

// 基于内置的new关键词，我们可以创建Dog的一个实例sanmao，实例可以调取原型上的属性和方法
// 需求：自己实现一个_new方法，也能模拟出内置new后的结果

// Fn当前要new的类 => Dog
// ARG：后期需要给构造函数传递的参数信息 => [‘三毛’]
function _new(Fn, ...arg){
    // 完成你的代码
    // let obj = {};
    // obj.__proto__ = Fn.prototype; // 创建一个空对象
    // 让他的原型链指向Fn.prototype(作为Fn的一个实例)
    // 上面两句合成一句话
    // Object.create([AA对象])：创建一个空对象，并且让空对象obj作为AA对象所属构造函数的实例
    //                         obj.__proto__ = AA
    let obj = Object.create(Fn.prototype);

    Fn.call(obj,...arg)
    return obj;
}

let sanmao = _new(Dog, 'sanmao');
sanmao.bark();
sanmao.sayName();
console.log(sanmao instanceof Dog); // true