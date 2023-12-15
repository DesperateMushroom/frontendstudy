### 闭包的两个而作用
> 从性能角度讲，我们真实项目中应该减少对闭包的使用（因为闭包会产生不释放的栈内存，过多使用导致内存溢出或者降低性能

- 保护
- 保存
1. JQuery （JQ）前端非常经典的类库：提供了大量的方法供开发人员使用
    -》 为了防止全局变量污染（解释：导入jq后，如果它里面有大量的方法，如果这些方法不保护起来，用户编写的方法很容易和jq方法名字相同，产生冲突，产生冲突可以理解为全局变量污染），jq中的方法需要用闭包保护起来
    ```

    //typeof window !=="undefined"?window:this 验证当前所处换的全局对象是window还是global
    (function(global, factory ){//...}) (typeof window !=="undefined"?window:this， function fn(window, noGlobal ){   //...
    
        var jQuery = function(selector, context){//...};

        // => 通过全局对象增加属性： jQuery 和 $，把私有的jQuery方法暴露到全局作用域下，供外面使用（等价于return jQuery）外界需要使用函数中的私有内容，我们可以基于
        //window.xxx 和 return xxx 两种方式实现这个需求 
        window.jQuery = window.$ = jQuery;
    } )


    // 开始使用JQ
    jQuery(); //=> window.jQuery();
    //  $();  $ 符号就是jquery
    ```

    在真实项目中，我们一般都要把自己写的内容放到一个闭包中，这样可以有效防止自己的代码和别人代码产生冲突（全局变量污染：真实项目中是要尽可能减少对全局变量的使用的）；如果需要把自己的东西给别人用，基于return和window.xxx等方式暴露给别人即可
    ```
    //原生js
     var xxx =（function () {
        //...A自己写的代码
        return xxx;
     })(); 

     （function () {
        //...A自己写的代码
        window.xxx = xxx;
     })(); 

    // -> jq
    $(function(){
        //...这样写在某些角度上也是为了减少全局的变量
    })；

    ```
    暴露给全局的函数的名字再特别注意，不要和别人的重名


2. 基于let/const/class等创建变量，会把所在的大括号（除了对象的大括号之外）当作一个全新的私有块级作用域
    - 函数执行会产生私有的栈内存，（作用域/执行上下文
    - let等也会产生私有的块作用域（var不会

```
    if(1===1){
        var a = 10;
    }
    console.log(a); //-> 10  a是全局作用域
```

```
    if(1===1){
        // let 会有块作用域（现在大括号就是一个私有作用域
        // a是私有变量

        let a = 10;
    }
    console.log(a); // referenceError
```




### this
> 函数执行的主体（不是上下文）：意思是谁把函数执行的，那么执行主体就是谁
> this非常不好理解，以后遇到this，想一句话：“你以为你以为的就是你以为的”

1. 给元素的某个时间绑定方法，当事件触发方法执行的时候，方法中 this是当前操作的元素本身
2. 如何确定执行主体 this 是谁？当方法执行的时候，我们看方法前面是否有点，没有点this是window或者undefined；有点，点前面是谁this就是谁
```
var name='aoao'
function fn(){
    console.log(this.name);
}

var obj = {
    name:"hello world",
    fn:fn
};
obj.fn(); //->this:obj
fn(); //-> this:window 非严格模式，严格模式下是undefined，window.fn()把window.省略了

(function(){
    //自执行函数中的this是window或者undefined
})();
```

思考？
```
 // hasOwnProperty方法中的this：ary.__proto__.__proto__
 ary.__proto__.__proto__.hasOwnProperty();


 let obj={
    fn:(function(n){
        // 把自执行函数执行的返回结果赋值给fn
        //this: window 有冒号没点，也是window，自己执行的就是在window下执行的
        return function(){
            // =》 fn等于这个返回的小函数
            // 因为fn在obj下面
            // this：obj
        };
    })(10)
 }

 obj.fn();

function fn(){
    // this:window
    console.log(this);
}

document.body.onclick = function(){
    // 这个function的this 是document.body

    fn(); // 这个的是window，前面没有点
}

```



#### 面向对象
> 标记语言：HTML5/CSS3
> 编程语言：编程思想
    - 面向过程  C
    - 面向对象 JAVA，PHP，C#（ASP.NET) 、JavaScript

##### 单例设计模式
```
 

// 把描述当前事物特征的信息进行分组归类（减少全局变量的污染）
// 这就是js中的单例设计模式

/*
    beautygirl不仅仅被叫做变量（对象名），也被称为“命名空间”
        单例模式:把描述事物的信息放到一个命名空间中进行归组，防止全局变量的污染
*/
let beautiGirl = {
    name = 'aoao',
    age:18
};

let oldMan = {
    name='sushi',
    age:81
};
```

为了让单例模式变得高大上一些，真实项目中的单例模式都这样处理

```
function fn(){}

let namespace = (function(){
    let fn = function (){
        //...
    };

//内部函数用对象的形式返回
    return {
        name:'xxx',
        fn:fn
    }

})();

namespace.name; 
namespace.fn();
```

例如：完成一个需要团队协作开发的案例（百度首页）
```
/*
    公共模块
*/
let utils = (function(){
    
    let queryElement = function(){....}
    
    return {

    
         //  queryElement:queryElement  
        queryElement
    };
})();



/*
    a负责页卡模块
*/
let pageTabModule = (function(){

    //获取元素 调取其他命名空间下的方法
    // 调用别人模块
    let tabBox = utils.queryElement('.tabBox');

    let show = function(){...};


    return {
        init:function(){
            // 调用自己模块下的方法
            show();
        }

    };
})();
pageTabModule.init();
```


### 工厂模式
> 批量生产：把实现某个功能的代码进行封装，后期在想实现这个功能，我们直接执行函数即可
> - 低耦合：减少页面中冗余的代码
> - 高内聚：提高代码的重复使用率

```
function createPerson(name, age){
    let person = {};
    person.name = name;
    person.age = age;
    return person;
}

let beautyGirl = createPerson("aoao",18);
let oldMan = createPerson("sushi",81);
beautyGirl.name;
oldMan.name;
```


研究一个实例
    1. 私有的信息
    2. 所属类共有的信息
    3. 一层层从小类向大类研究属性和方法（一直到头Object为止）
=》控制台展开一层层的找，一个个学即可


#### 构造原型模式（正统面向对象编程）
> 自己能够创造出自定义类和对应实例，构建起一套完整的面向对象模型