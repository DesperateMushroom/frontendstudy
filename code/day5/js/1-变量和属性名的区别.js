/* 
var name = 10;
var obj={
    name: 'aoao',
   // ['age']:11 => 属性名是‘age’
};

console.log(obj.name); // =》 ‘aoao’
// 一个对象的属性名只有两个格式，数字或者字符串等基本类型值
console.log(obj['name']); // =》 aoao

*/



// obj [name变量代表的值] => obj[10] => undefined
//console.log(obj[name]);

/* var name = 'aoao';
var obj={
    // name = 'aoao'
    // 属性名：属性值（放的是变量也是变量存储的值哪来做属性值
    //name: name
    name, //=> es6的简化 和 name:name 一模一样
    age : 1===1? 100:200
}; */

// -> for in 循环：用来循环便利对象中的键值对的
// continue 和 break 同样适用
var obj = {
    name: 'aoao',
    age:1,
    friends: 'sushi,butter',
    1:150,
    2:111,
    3:22
};

// for ( var 变量(key) in 对象)
// 对象中有多少组简直对，循环就执行几次（除非break结束
for( var key in obj){
    // 每一次循环key变量存储的值：当前东西的属性名
    // 获取属性名：obj[属性名] =》 ojb[key] 
    console.log('obj['+key+']: '+obj[key]);

    
}

// for in 在便利的时候，优先循环数字属性名（从小到大
