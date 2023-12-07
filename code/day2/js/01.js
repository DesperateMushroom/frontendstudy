/**
 * 基于typeof检测出来的结果
 *  1. 首先是一个字符串
 *  2. 字符串中包含对应的类型
 * 
 * 局限性：
 *  1. typeof null => “object” 但是null并不是对象
 *          这里null代表了空对象指针
 *  2. 基于typeof无法细分出当前值是普通对象还是数组对象等，因为只要是对象数据类型，返回的结果都是“object”
 */
console.log(typeof(1));
console.log('NaN:'+ typeof NaN);

let a = 'eee';
console.log(typeof(a));
console.log(a);


console.log(1);

console.log(typeof undefined)
console.log(typeof {})
console.log(typeof [])
console.log(typeof /^/);
console.log(typeof function(){});



//practice: 
console.log(typeof typeof typeof []);
// typeof[] => "object"
// => typeof "object" => "string"
// =》 “string”

//因为typeof检测的结果都是字符串，所以只要两个以及以上同时检测，最后结果必然是string