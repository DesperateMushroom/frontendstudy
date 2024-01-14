/* let obj = {};
let fn = (context = window, ...args) => {
    // console.log(arguments);// arguments is not defined: 箭头函数中没有arguments
    console.log(args);
};

fn(obj,10,20,30); // context : obj   arg : [10,20,30]
fn(); // context:window   arg:[]
 */

//===============================================
/* window.name = "win";
let obj = {
    name:"obj"
};

let fn = n =>{
    console.log(this.name);
};

fn(10); // this:window  output:win
fn.call(obj,10); // this:window  output:win 不是我们预期的obj
document.body.onclick = fn; // this:window 不是我们预期的body 

// ==============================================
window.name = "win";
let fn = n =>{
    console.log(this.name);
};
let obj = {
    name:"obj",
    fn:fn
};

obj.fn(10); // this 还是window，因为fn的上下文是window
 */


//====================================
/* let obj = {
    name: 'obj',
    fn:function (){
        // => this:obj 普通函数是由自己的this的
        let f = () => {
            //f里的this是上下文的this 
            console.log(this);
        };
        f(); // this:obj
        return f;
    }
};
let f = obj.fn();
f(); // this:obj
 */




// let obj = {
//     name: 'obj',
//     fn:function (){
//         // this:obj
//         //...
//         //原本期望的需求是：1s后把obj中的name改为 aoao
//     /*     setTimeout(function(){
//             console.log(this); // 如果用的是普通函数，this是window
//             this.name = 'aoao';
//         },1000); */
// /* 
//         let _this = this; // 把需要的this提前用变量存储起来
//         setTimeout(function(){
//             console.log(_this); // 此时_this指向obj
//             _this.name = 'aoao'; //需要使用的时候拿出来用即可
//         },1000); */

//         setTimeout(()=>{
//             console.log(this);
//             this.name="aoao";
//         },1000);

//     }
// };
// obj.fn();



//============================
/* 数组的解构赋值 */
//  let ary = [1,2,3,4,5];
/*
let n = ary[0],
    m = ary[1],
    x = ary.slice(2); */

/**
 *  ...x 拓展运算符：把剩下的内容存储到x中（x是个数组），但它只能出现在最后
 */
// ...x 之类的只能出现到末尾
// let [n,m, ...x] = ary;
// console.log(n,m,x); //=> n=1; m=2; x=[3,4,5];


// let [n, ,m, , ,x=0] = ary; // 如果没有这一项，我们可以基于等号赋默认值
// console.log(n,m,x);// n=1;  m=3; x=0


//多维数组解构赋值
let ary = [1,[2,3,[4,5]]];

let [n,[,,[,m]]] = ary;
console.log(n,m);  //=> n=1; m=5




//============================
/* 对象的解构赋值 */
let obj = {
    name:'aoao', 
    age:1, 
    sex:'f',
    friends:['sushi','butter','barney','kitty']
};

// 多维对象获取
let {
    name,
    friends:[firstFriend]
} = obj;
console.log("my name is " + name +" and my fristFriend is "+ firstFriend);

/* 
let name = obj.name;
let sex = obj.sex;
 */

// 创建的变量要和对象的属性名一致（默认）
/* let {
    name,
    nianling,
    sex
} = obj;
console.log(name,sex); // aoao   f
console.log(nianling);//undefined */

// 冒号相当于给获取的结果设置了一个别名（变量名）：创建了一个叫做nianling的变量
// 存储了obj.age 的值
/* let {
    age:nianling
} = obj;
console.log(nianling);// 1
 */

// 给获取的结果设置默认值（没有这个属性设置的就是默认值）
/* let {
    height = "180cm"
} = obj;
console.log(height); //"180cm"
 */

// 从服务器获取的data数据
let data = {
    "code":0,
    "data":{
        "today":"date",
        "data":[{weekday:"thur",date:"0108"},{weekday:"wed",date:"0107"}],
    },
    "version":"abc"
};

let {
    code,
    // 相同解构
    data:{
        today,
        data:calenderData // 重命名
    }
} = data;

console.log(code, today, calenderData);

// 两种写法
// calenderData.forEach(item => {
//     let {weekday, date} = item;
//     console.log(weekday, date);
// })

// calenderData.forEach(({weekday,date} )=> {
//     console.log(weekday, date);
// });
