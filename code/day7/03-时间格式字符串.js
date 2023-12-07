let time = '2019-7-24 12:6:23';
// 变成自己需要呈现的格式
// 2019年07月24日 12时06分秒

//方法1：一路replace

//方法2：获取到年月日 时分秒的值，然后想怎么拼接怎么拼接
let n = time.indexOf('-');
let m = time.lastIndexOf('-');
let yr = time.substring(0,n);
let mon = time.substring(n+1,m);
//... 

// 方法2 v2
// 用split先获得 年月日 和 时分秒
let arr1 = time.split(' ');
// 再分别获得各个值
yr = arr1[0].split('-');
let hr = arr1[1].split(':');

// 不足十位补零:箭头函数
let addZero = val => val.length<2?'0'+val:val;
