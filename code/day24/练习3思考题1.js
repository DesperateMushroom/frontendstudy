// =====================练习3思考题1=======================
// each
/* let arr = [1,2,3,'AA',4];
let obj = {};
arr = arr.each(function (item, index) {
    // this: obj (each第二个参数不传，this是window即可)
    
    // 如果return的是false，则结束当前数组的循环
    if(isNaN(item)) {return false;}

    return item * 10; // 返回的结果是啥，就把数组中当前项替换成啥

}, obj); */

/* 
(function(){


    function each(...arg){
        let callback = arg[0];
        
    }


    Array.prototype.each = each;
    
})(); */