// =====================练习8=======================
/* function Foo(){
    Foo.a = function(){
        console.log(1);
    }
    this.a = function(){
        console.log(2);
    }
}

// => 把Foo当作类，在原型上设置实例公有的属性方法
//    实例.a();
Foo.prototype.a = function(){
    console.log(3);
}

// => 把Foo当做普通对象设置私有的属性方法
// => Foo.a();
Foo.a = function(){
    console.log(4);
}

Foo.a(); // 4
let obj = new Foo(); // obj可以调取原型上的方法   Foo.a:f=>1   obj.a:f=>2
obj.a(); // 2
Foo.a(); // 1 因为newFoo的时候执行了Foo.a() = function 第三行

 */
// jQuery.prototype={}; $().xxx
// jQuery.xxx; $.xxx



// =====================练习9=======================
/** 实现图片懒加载
 *    1. 前端性能优化的重要方案，
 *       + 通过图片或者数据的延迟加载，我们可以加快页面渲染的速度
 *       + 只有滑动到某个区域，我们才加载真实的图片，这样也可以节省加载的流量
 *       + 。。。
 *    2. 处理方案
 *       + 把所有需要延迟加载的图片用一个盒子包起来，设置宽高和默认占位图
 *       + 开始让所有的img的src为空，把真实图片的地址放到img的自定属性上
 *         让img隐藏
 *       + 等待所有其他资源都加载完成后，我们再开始加载图片
 *       + 对于很多图片，需要当页面滚动的时候，
 *         当前图片区域完全显示出来后再加载真实图片
 *       + 。。。
 *   见delayImg.js
 */


// =====================练习10=======================
/* 编写一条正则，验证：一个6-16位的字符串，必须同时包含有大小写字母和数字 */
// 正向预查?= 必须包括     负向预查?! 不能包括
// (?!^[a-z]+$) 不能纯小写
// (?!^[A-Z]+$) 不能纯大写
// (?!^[0-9]+$) 不能纯数字
// (?!^[a-zA-Z]+$) 不能纯字母
// ^([a-zA-Z0-9]{6,16})$ 6-16位
// let reg = /(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[0-9]+$)(?!^[a-zA-Z]+$)^([a-zA-Z0-9]{6,16})$/;

/* 1-10位：数字，字母，下划线组成字符串，必须有_ */
// 用负向预查
// let reg1 = /(?!^[a-zA-Z0-9]+$)^\w{1,10}$/;

/* 字符串中包含“\w” 但是必须包含_ */
// let reg = /\w+(?=_)/;


// =====================练习11=======================
/**
 * 实现一个$attr(name,value)遍历
 * 属性为name
 * 值为value的元素集合
 *  
 *  /\bbox\b/ 两个\b单词边界
 * 
 * 例如：
 */
/* function $attr(property,value){
    // 获取当前页面中所有的标签
    let elements = document.getElementsByTagName("*");
    let arr = [];

    // [].forEach.call(elements,item=>{});

    elements = Array.from(elements); // 把非数组转换为数组
    elements.forEach(item=>{s
        // 存储的是当前元素property对应的属性值
        let itemValue = item.getAttribute(property);
        if(property==='class' ){
            // 样式类属性名要特殊的处理
            let reg = new RegExp("\\b"+value+"\\b");
            reg.test(itemValue)?arr.push(item):null;
            return;
        }
        if(itemValue === value){
            // 获取的值和传递的值校验成功：当前就是我们想要的
            console.log(value);
            arr.push(item);
        }
    });

    return arr;
}

let ary = $attr('class','box');
console.log(ary);

 */

// =====================练习12=======================
/* 英文字母汉字组成的字符串，用正则给英文单词前后加空格 */
let str = "no做no死，你can你up，不能no逼逼";
let reg = /\b[a-z]+\b/ig; //i: 忽略大小写

str = str.replace(reg,value=>{
    // value: 当前正则匹配到的结果
    return " "+value+" ";
}).trim(); //String.prototype.trim / .trimLeft / .trimRight 去除字符串首尾空格

console.log(str);