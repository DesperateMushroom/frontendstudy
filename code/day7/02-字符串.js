str = 'abcdefghijklmnop';

/* 
for(let i = 0; i<str.length; i++){
    console.log(str[i]);
} */

/*
    charAt: 根据索引获取指定位置的字符
    charCodeAt: 获取指定字符的ASCII码 unicode
        @params
            num：获取字符指定的索引
        @return
            返回查找到的字符
            找不到返回的是空字符串不是undefined，或者对应的编码值
    
    中括号找不到返回的就是undefined
*/
console.log(str.charAt(0)); // => ‘a’
console.log(str.charAt(10000)); // => ''
console.log(str[10000]); // => undefined

console.log(str.charCodeAt(0)); // 97
console.log(String.fromCharCode(122)); // => z

/**
 *  substr(n,m): 从索引n开始截取m个字符，m不写截取到末尾
 *  substring(n,m): 从索引n开始找到索引为m处（不包含m
 *  slice(n,m): 和substring一样，但是可以支持负数作为索引
 */

console.log(str.substr(3,7)); // defghij
console.log(str.substr(3)); // defghijklmnop
console.log(str.substring(3,7)); // defg
console.log(str.substring(3,100000)); // defghijklmnop
// 超过索引的也只截取到末尾

console.log(str.slice(3,7)); // defg
console.log(str.substring(-7,-3)); // ‘’ substring不支持负数
console.log(str.slice(-7,-3)); // jklm slice支持: str.length + 负数索引。左开右闭


/**
 * 验证字符是否存在
 *  indexOf(x,y)：获取x第一次出现位置的索引，y是控制查找的起始位置索引
 *  includes（val）：true、false
 */
console.log(str.indexOf('b'));//1
console.log(str.lastIndexOf('b'));//1
console.log(str.indexOf('1'));//-1

console.log(str.indexOf('def')) //3: 验证整体第一次出现的位置，返回的索引是第一个字符所在的位置
//如果没有就返回-1

// split：和数组中的join对应

// replace(old, new): 字符串替换。 经常伴随正则而用
//执行一次replace只能替换一次字符