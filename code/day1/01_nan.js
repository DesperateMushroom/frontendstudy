
console.log(Number(true)); //=>1
console.log(isNaN(true));   //=> false
console.log(Number(false));//=>0
console.log(isNaN(false));  //=> false
/*====================================*/

console.log(Number([])); //=>0
console.log(isNaN([])); //=>false

console.log(Number([12])); //=>12
console.log(isNaN([12])); //=>false


// NaN和谁都不相等（甚至本身）
console.log(NaN == NaN); // false
// 使用isNaN检测是否为非有效数字类型 如果是非有效 则返回 true
let num = 1000
console.log(num == NaN); // false
console.log(isNaN(num)); // false
console.log(isNaN(NaN)); // true
console.log(isNaN('你好')); // true string类型
console.log(isNaN('10')); // false 有效数字  ----> 字符串数字类型
/**
* 使用isNaN会隐式类型转换
* isNaN会转换 - 调用Number方法转化
*/
console.log(Number('10000'));

/** 其他类型转化为数值类型
* 
* Number 中只要包含非有效数字则是返回NaN 除了一个点会转化为小数点 俩个小数点则是 NaN
* 空字符串为 0
* 
*/

console.log('字符串转化为数值类型',Number('12.5')); // 12.5
console.log('12.5px',Number('12.5px')); // NaN
console.log('空字符串',Number('')); // 0
console.log('true',Number(true)); //=>1
console.log('false',Number(false)); //=>0
console.log('isNaN(false)',isNaN(false)); // false 会先进行Number类型转化 --- Number(true/false) - 1 / 0
console.log('undefinde',Number(undefined)); // NaN
console.log('null',Number(null)); // 0
/**
* 把引用数据类型转化为Number先调用toString方法 然后判断是否是有效数字类型
* */ 

console.log('普通对象{a:10}',Number({a:10})); // NaN
console.log('[]',Number([])); // 0
console.log('[{}]',Number([{}])); // NaN
console.log('[10,20]',Number([10,20])); // NaN
console.log('[10]',Number([10])); // 10

// 执行toString
console.log('{}',({}).toString());
console.log('{a:10}.toString() --- ',({a:10}).toString());
console.log('[]空数字使用toString之后是空字符串所以经过Number转化之后是0',[].toString());
console.log('[10000,20]',[1000,2000].toString());
console.log('[1000]',[1000].toString());


/** parseInt/parseFloat ([val],[进制]) 依次从左到右查找有效数字字符直到查到非有效数字类型 ---   */
console.log('parseInt 12.5px',parseInt('12.5px'));
console.log('parseFloat 12.5px',parseFloat('12.5px'));
console.log('parseInt width:12.5px',parseInt('width:12.5px')); // NaN 因为w就是一个无效数字，不再往下找了

console.log('111' == 111) // true
console.log('1111' === 1111); // false
console.log(parseInt('12.5px') == 12); // true
console.log(parseInt('12.5px') === 12); // true
console.log('parseInt(true)',parseInt(true)); // NaN
console.log('Number(true)',Number(true));

