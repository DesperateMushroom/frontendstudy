/* 编写一个程序，将数组扁平化，并去除其中重复部分数据，最终得到一个升序且不重复的数组 */
let arr = [[1,2,3],[3,4,5,5,],[6,7,8,9,[11,12,[12,13,[14]]]],10];

// 1.==================================
// => 使用es6中提供的 Array.prototype.flat 处理
// arr = arr.flat(Infinity);
// console.log(arr);

// 2.==================================
// => 把数组变成字符串即可(数组toString之后，不管你有多少级，最后都会变为以逗号分隔的字符串)
// 没有后中括号和所谓的层级了，相当于直接的扁平化了
// arr = arr.toString().split(',').map(item => Number(item));
// console.log(arr);

// 3.==================================
// => JSON.stringify(arr) 也可以扁平化数组
// JSON.stringify(arr).replace(/\[|\]/g,"");
// '1,2,3,3,4,5,5,6,7,8,9,11,12,12,13,14,10'.split(',').map(item=>Number(item));


// 4.==================================
// => 基于数组的some方法进行判断检测 es5
// 验证数组中的某一项有没有符合函数中提供的规则的
// find和some 的区别：some返回的是boolean，find找到符合规则的就返回当前这一项
//                   没找到符合规则的，返回undefined
// Array.isArray([val]): 检测某个值是否为数组类型 
                        // （挺准的，比instanceof还准，
                        // 即使手动指向Array.prototype，
                        // 不是数组的就是不是数组
/* var ary = [1,2,3,4,5];
var B = ary.some(item=>{
    return item%2===0;
});
console.log(B); // 当前数组中有没有能被2整除的对象 */
/* 
let flag = arr.some(item=>{
    return Array.isArray(item);
});
 */
/* 
while(arr.some(item=>Array.isArray(item))){
    arr = [].concat(...arr);
}
console.log(arr); */


// 5.==================================
// => 自己递归处理
~function(){
    function myFlat(){
        let res = [],
            _this = this;
        let fn = (arr)=>{
            for(let i = 0; i<arr.length; i++){
                if(Array.isArray(arr[i])){
                    fn(arr[i]);
                    continue;
                }
                res.push(arr[i]);
            }
        };
        fn(_this);
        return res;
    }

    Array.prototype.myFlat = myFlat;
}();

arr = arr.myFlat();
console.log(arr);
// 基于new Set() 去重（也可以自己写方法
// [...new Set(arr)]
// Array.from(new Set(arr));
// arr = Array.from(new Set(arr)).sort((a,b)=> a-b);
// console.log(arr);

// 去重：1. 自己写对象；2. for循环，indexof,includes; 3. new Set
