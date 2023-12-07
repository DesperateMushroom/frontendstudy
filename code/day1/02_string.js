let a = 12;
console.log(a.toString()); //=>'12'
console.log((NaN).toString()); //=>'NaN'
//null 和 undefined是禁止直接toString的
// (null).toString() 报错
// 但是和undefined一样转换为字符串的结果就是'null'/'undefined'

//数组toString()
[].toString(); // ''
[12].toString(); // '12'
[12,13].toString(); //=> '12,13'
/^$/.toString; // 正则 ‘/^$/'

// 普通对象.toString() 的结果是 "[object Object]"
// Object.prototype.toString 方法不是转换为字符串的，而是用来检测数据类型的
({name:'xxx'}).toString(); //"[object Object]"


// ========================字符串拼接
// 四则运算中，除加法之外，其余都是数学计算，只有加法可能存在字符串拼接
// 一旦遇到字符串，则不是数学运算，而是字符串拼接
console.log('10'+10); //=> '1010'
console.log('10'-10); //=> 0 用Number()来转'10'然后进行数学运算
console.log('10px'-10); //=> NaN

let b=10+null+true+[]+undefined+'aoao'+null+[]+10+false;
/* 10 + null-> 10+0 -> 10
    10 + true -> 10+1 -> 11
    11 + [] -> 11 + '' -> '11'         底层先把空数组变成空字符串，在变成数字前和11相拼接了，导致11变成了字符串
                                空数组变成数字，先变成空字符串，遇到字符串，直接变成字符串拼接
    '11'+undefined -> '11undefined'
    '11undefinedaoaonull10false

*/
// 10+0+1+0+'undefined'+'aoao'+null+''+'10'+false