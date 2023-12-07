console.log(typeof Math);//=> object
console.dir(Math);

/**
 * Math = {
 *  PI: 3.14....
 *  abs: function(){[native code]};
 *  ceil: function(){[native code]}
 * }
 * 
 *  Math.abs();
 *  Math.PI();
 */


// 传递的不是数字类型的值, 先基于number() 转换为数字再处理
console.log(Math.abs('-1')); // 1
console.log(Math.abs('-1px')); //NaN
console.log(Math.abs(true)); // 1


//=====================
console.log(Math.ceil(12)); //=> 12
console.log(Math.ceil(12.1)); // 13
console.log(Math.ceil(12.9));// 13
console.log(Math.ceil(-12.1)); //-12
console.log(Math.ceil(-12.9)); //-12

console.log(Math.floor(12)); //=> 12
console.log(Math.floor(12.1)); // 12
console.log(Math.floor(12.9));// 12
console.log(Math.floor(-12.1)); //-13
console.log(Math.floor(-12.9)); //-13


//===================
console.log(Math.round(12)); //=> 12
console.log(Math.round(12.1)); // 12
console.log(Math.round(12.5)); // 13
console.log(Math.round(12.9));// 13
console.log(Math.round(-12.1)); //-12
console.log(Math.round(-12.5)); //-12 负数中.5属于舍
console.log(Math.rounds(-12.9)); //-13


//===================
console.log(Math.max(1,2,3,4,5,6,7));
console.log(Math.min(1,2,3,4,5,6,7));
console.log(Math.min([1,2,3,4,5,6,7]));//=>NaN, 因为只传递了一个值，而且不是数字，和内置的语法要求不符


//===================
console.log(Math.sqrt(9));//3 符合N*N=M
console.log(Math.sqrt(-9));//NaN 负数开不了平方
console.log(Math.pow(2,10)); //1024


// 获取1-10之间的随机整数

Math.round(Math.random()*(10-1)+1);

//0-1 *9
//0-9 +1
// 1-10