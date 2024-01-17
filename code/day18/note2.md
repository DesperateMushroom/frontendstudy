### this和面向对象的另外一种深入理解


```
function sum(){
    //arguments: 内置的实参集合（箭头函数中没有），不是数组是类数组
    //他不是数组的实例，不能直接使用数组的方法
    // arguments.__proto__ === Object.prototype
    console.dir(arguments);
    console.dir([12,3,4,5,]);
}

sum(1,2,3,4);
```


```
function myUnique(){
    //...
    // this: 当前类的实例(也不一定)

    let obj = {};
    for(let i = 0; i<this.length; i++){
        //...
    }
    obj = null;

}


Array.prototype.myUnique = myUnique;


let ary = [1,1,2,3,4,5,5,5];
ary.myUnique(); // this:ary 
// 去重的代码是给this这个数组实现的，需要保证this是个数组 
Array.prototype.myUnique(); // this:Array.prototype

```

```
    // arg: 存储传递的实参信息（数组
    // eval：把字符串转换为js表达式执行
let sum = (...arg) => eval(arg.join('+'));
let total = sum(1,2,3,4);
```


如果arguments是一个数组就好了
```

~function (){
    function slice(n){
        // n = 0; 把数组克隆一份新的出来
        let newAry = [];
        for(let i = n; i<this.length; i++){
            newAry.push(this[i]);
        }
        return newAry;
    }
    Array.prototype.slice = slice; 


}();

let ary = [1,2,3,4];
let newAry = ary.slice(0); // 数组克隆，给新数组

// ------------------------------


function sum(){
    // 把arguments转换为数组
    let arg = [].slice.call(arguments, 0);
    // 数组求和
    return eval(arg.join('+'));
}
```

不仅仅是一个方法可以这样调用，很多数组的方法，类数组都能用
```
function sum(){
    let total = null;

    [].foreach.call(arguments, item=>{
        total += item;
    });

    return item;

}

```



#### UI组件库
> 有结构，样式，功能的库，里面提供很多开发中常用的组件，开发中直接把组件调取过来使用即可
> 无需从头发开（可能需要二次开发）
- bootstrap（经常配合jquery使用）：支持响应式布局开发（栅格系统）
- vue：vue element / iview
- react：antd
- EasyUI / AmazeUI

https://www.bootcss.com/ 
Bootstrap
- v3.x

#### json格式的数据
> 我们基于ajax等其他方式从服务器获取的数据结果一般都是：JSON格式 或者 XML格式
- JSON格式的字符串
- JSON格式的对象

```
// 普通对象
let obj = {
    name:"嗷嗷"
};


// JSON格式对象
// 其实就是把属性名用双引号包起来
obj = {
    "name":"珠峰"
};


// JSON格式的字符串
let str = '{"name":"嗷嗷"}'; 

```

把JSON格式的字符串转换为对象：window.JSON.parse

```
let str = '{"name":"嗷嗷"}'; 
let obj = JSON.parse(str);
//{name: '嗷嗷'}

// 在ie低版本浏览器中，全局对象window中没有json这个对象，
// 也就没有所谓的parse等方法
// 这个不考虑，现在不用了ie678了
obj = eval("("+str+")"); // 基于eval可以实现
// 但是为了保证转换格式正确，我们需要把字符串用小括号包起来转换

```


把对象转换为JSON格式字符串的：JSON.stringify(obj)

```
let obj = {
    name:"嗷嗷"
};
let str = JSON.stringify(obj); //'{"name":"嗷嗷"}'
```


#### 关于sort排序的
```
let ary = [{
    id:1,
    age:25,
    name : '张三'
},{
    id:2,
    age:32,
    name : '李四'
},
{
    id:3,
    age:23,
    name : '张五'
}];

// 把数组中的每一项按照age进行升序排列
ary.sort((a,b)=>{
    // b: 当前项
    // a：当前项的下一项

    // 升序 a-b
    // 降序 b-a
    // return -1; 会把整个数组倒转过来
    return a.age-b.age; // 按照age实现升序 
    // return b.age-a.age; or return (a.age-b.age)*(-1); 按照age实现降序
})

// sort中传递一个函数，函数中有a/b
// a当前项的后一项
// b当前项
// 如果当前函数返回的是一个小于零的值，让a和b的位置互换
// 如果返回的是大于等于零的，位置保持不变



// 按照name排序
ary.sort((a,b) => {
    // localeCompare：能够进行字符串比较
    return a.name.localeCompare(b.name);
})

```