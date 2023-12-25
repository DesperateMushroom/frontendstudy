/**
 * 基于内置类的原型扩展方法
 *      在内置类原型上的方法，类所对应的实例可以直接调取使用，例如：实例.方法（）  ary.push()
 *      如果我们也把自己写的方法放到原型上，那么当前类的实例也可以直接这样调取使用了，很方便
 * 
 *   但是也有需要注意的地方
 *      1. 自己扩展的方法不能影响原有内置的方法 (我们自己设置的方法最好加前缀：my)
 *      2. 扩展方法中的this一般都是当前类的实例（也就是要操作的值）：实例.方法（） 
 */

//  用一个自执行函数把unique先装进Array.prototype里
~function (){
    /**
     * myUnique: 实现数组去重
     *  @params:
     *  @return: [Array]: 去重后数组
     */
    function myUnique(ary){
        // 此时没有传递要操作的ary进来。但是方法中的this是当前要操作的数组：ary.myUnique()
        let obj = {};
        let _this = this;
        for(let i = 0; i< _this.length; i++) {
            let item =  _this[i];
            if(typeof obj[item] === 'undefined'){
                // 如果obj中不存在item这个属性
                obj[item] = item;
            }
            else{
                //如果存在，在数组中去掉这个item
                //把数组最后一位调上来，删掉数组最后一位
                _this[i] =  _this[ _this.length-1];
                _this.length--;
                i--;
                continue;
            }
        }
        obj = null;

        // 保证当前方法执行完返回的结果依然是Array类的一个实例
        return this;
    }

    // 扩展到内置类的原型上
    Array.prototype.myUnique = myUnique;
}();

let ary = [12,23,13,12,23,24,34,13,23];
// ary.myUnique(); 返回去重后的新数组（也是Array类的实例
// ary.sort((a,b)=>a-b); 返回排序后的数组

// 链式写法：保证返回值依然是当前类的实例，一般都会return this
ary.myUnique().sort((a,b) => a-b).reverse().slice(2).push('aoao'); // 链式写法
//执行完push返回的是一个数字（新增后的数组的长度），不是数组了，不能再继续使用数组的方法

/* 
Array.prototype.push = function(){
    console.log('dddd');
}
let ary = [1,2,3];
ary.push(100);
console.log(ary); // 数组没变
 */
/* function queryURLParams(url){
    //....
}

queryURLParams("https://www.a.com?lx=1&name=xxx");



// 原因：每一个字符串都是String的实例，substring方法在String.prototype上
"https://www.a.com?lx=1&name=xxx".substring(); */

