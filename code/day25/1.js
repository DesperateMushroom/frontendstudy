// ===========================================
// a在什么情况下成立
/**
 *  == 两个等号进行比较的时候，如果左右两边数据类型不一样
 *     则先转换为相同的数据类型，然后再进行比较
 *     1. {}=={} 两个对象进行比较，比较的是堆内存的地址
 *     2. null == undefined 相等的   null === undefined 不相等
 *     3. NaN == NaN 不相等  NaN和谁都不想等
 *     4. [12] == "12" 对象和字符串比较，是把对象toString()转换为字符串后再进行比较
 *     5. 剩余所有情况在进行比较的时候，都是转换为数字 (前提数据类型不一样)
 *        对象转数字：先转换为字符串，然后在转换为数字
 *        字符串转数字：只要出现一个非数字字符串，结果就是NaN  
 *        布尔转数字：true -> 1     false -> 0
 *        null转数字: 0
 *        undefined转数字: NaN
 *        [12] == true  => Number([12].toString())=>12 == 1 结果false 不相等
 *        []==false     => 0==0     true
 *        []==1         => 0==1     false
 *        "1"==1        => 1==1     true
 *        true==2       => 1==2     false
 * 
 * 
 */


// 方法1：
// 对象和数字比较：先把对象.toString()变为字符串，然后再转换为数字
/* var a = {
    n:0,
    // 私有的属性方法
    toString:function(){
        return ++this.n;
    }
};
// a.toString(); //此时调取的就不再是Object.prototype.toString()了，调取的是自己私有的
if(a==1 && a==2 && a==3){
    console.log(111);
} */

// 方法2：
// shift: 删除数组的第一项，把删除的内容返回，原有数组改变
/* let a = [1,2,3];
a.toString = a.shift;
if(a==1 && a==2 && a==3){
    console.log(111);
}  */


/**
 * es6中新增加的一些方法
 *  String.fromCharCode([n]);  <=> "z".charCodeAt() 122
 *  Array.from();
 *  Array.isArray();
 *  Object.create([obj]); 
 *  Object.defineProperty();
 */

// let obj = {};
// vue 的设计原理
/* Object.defineProperty(obj, 'name',{
    // 执行obj.name 的时候，会自动触发此函数
    // 返回值就是此函数的返回值
    get:function(){
        console.log('eee');
        return "aoao";
    },
    set:function(){
        console.log('fff');
        this.value = "aoao";
    }

})
obj.e; */

/* let n = 0;
Object.defineProperty(window,'a',{
    get:function(){
        // 判断value是否存在，存在自增，不存在赋值，且返回
        // this -> window.a
        let val = this.value;
        val?++this.value: this.value=1;
        return this.value;
    }
});

if(a==1 && a==2 && a==3){
    console.log(111);
}   */

// ===========================================
// 下面代码输出结果？为什么？

// 实现push方法
/* Array.prototype.push = @@function(val){
    this[this.length]=val;
    this.length++;
    // this.length在原理的基础上加1
    return this.length;
}
 */
/* let obj = {
    2:3, // -> 1
    3:4, // -> 2
    length:2, // ->3->4
    push:Array.prototype.push
}
obj.push(1); // -> @@(1): this:obj  obj[obj.length]=obj[2]=1=> obj{2:1,3:4,length:3,push..}
obj.push(2);// -> @@(2): this:obj  obj[obj.length]=obj[3]=2=> obj{2:1,3:2,length:4,push..}
console.log(obj); */



// ===========================================
// 完成如下需求
/** 某公司1-12月的销售额存在一个对象里面
 *  如下{
 *      1:222,
 *      2:123,
 *      5:888
 *  }
 * 
 * 请把数据处理成：[222,123,null,null,888,null,null,null,null,null...]
 */

// 方法1：
/* let obj = { 
    1:222,
    2:123,
    5:888
}
let ary = new Array(12).fill(null);

ary = ary.map((item,index)=>{
    console.log(obj[index+1]);
    return obj[index+1] || null;
});
console.log(ary); */

// 方法2：
/* let obj = { 
    1:222,
    2:123,
    5:888
};

obj.length = 13;
let arr = Array.from(obj).slice(1).map((item)=> item === undefined? null : item);
console.log(arr);
 */


// 方法3：
/* let obj = { 
    1:222,
    2:123,
    5:888
};
// Object.keys(obj): 获取obj中所有的属性名，以数组的方式返回
// console.log(Object.keys(obj));  ['1', '2', '5']
let arr = new Array(12).fill(null);
Object.keys(obj).forEach(item=>{
    arr[item-1] = obj[item];
});
console.log(arr);
 */

// Array.prototype
// push/pop/shift/unshift/splice/slice/concat/
// join/toString/reverse/sort/indexOf/lastIndexOf
// includes/forEach/map/some/find/flat/fill...




// ===========================================
// 给定两个数组，写一个方法来计算他们的交集
// 思考题：交差并补
/* let nums1 = [1,2,2,1];
let nums2 = [2];
// 输出结果 [2,2];

let arr = [];
nums1.forEach(item=>{
    if(nums2.includes(item)){
        arr.push(item);
        nums2.splice(nums2.indexOf(item),1);
    }
}); */
// 差集：我有你没有，用交集取反
/* for(let i = 0; i<nums1.length; i++){
    let item1 = nums1[i];
    for(let j = 0; j<nums2.length; j++){
        let item2 = nums2[j];
        if(item1 === item2){
            arr.push(item1);
            nums2.splice(j,1);
            break;
        }
    }
} */
// console.log(arr);


// ===========================================
/**
 * 旋转数组
 *  给定一个数组，将数组中的元素向右移动k个为止，其中k是非负数
 */
function rotate(k){
    // 参数处理
    k = k%this.length;
    if(k<0 || k%this.length===0) return this;
    
    // 旋转数组
    // 方法1：
    // return this.slice(-k).concat(this.slice(0,this.length-k));

    // 方法2：
    // return [...this.splice(this.length-k), ...this];

    // 方法3
 /*    for(let i = 0; i<k; i++){
        this.unshift(this.pop());
    } */

    // 方法3.2
    new Array(k).fill('').forEach(()=>{
        this.unshift(this.pop());
    });

    return this;
}
Array.prototype.rotate = rotate;
let arr = [1,2,3,4,5,6,7],
    k = 3;
console.log(arr.rotate(k));