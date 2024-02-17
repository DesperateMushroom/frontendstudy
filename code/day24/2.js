// =====================练习4=======================
/** 如何把一个字符串的大小写取反（大变小，小变大），ex AbC => aBc */
// 字符串替换：replace
/* let str = "aoaoISsuperCute";
str = str.replace(/[a-zA-Z]/g, (content)=>{
    // content：每一次正则匹配的结果
    // 验证是否为大写字母: - 把字母转换为大写后，看是否和之前一样，如果一样，之前也是大写
    //                   - 在ascii表中找到大写字母的取值范围进行判断（A-Z：65-90）
    // content.toUpperCase() === content
    // content.charCodeAt()>=65&&content.charCodeAt()<=90
    
    

    return content.toUpperCase() === content?content.toLowerCase():content.toUpperCase();;
});

console.log(str); */





// =====================练习5=======================
/** 实现一个字符串匹配算法，从字符串S中，查找是否存在字符串T，若存在返回所在位置，不存在返回-1
 *  不能基于indexof / includes 等内置方法
 */
// ~function(){
//     /**
//      * 循环原始字符串中的每一项，让每一项从当前位置向后截取T.length个字符
//      * 然后和T进行比较，如果不一样，继续循环；如果一样返回当前索引即可（循环结束）
//      */
// /*     function myIndexOf(T){
//         // this: 原始字符串S
//         let lenT = T.length,
//             lenS = this.length;
//         if(lenS<lenT) return -1;
//         let charT = T[0];

//         for(let i = 0; i<=lenS-lenT;i++){
//             if(this.charAt(i) === charT ){
//                 if( this.substr(i,lenT) === T){
//                     return i;
//                 }
//             }
//         }

//         return -1;

//     } */

//     /**
//      * 正则处理
//      */
//     function myIndexOf(T){
//         // this：S
//         let reg = new RegExp(T);
//         let res = reg.exec(this);
//         if(res === null){
//             return -1;
//         }
//         return res.index;
//     }
//     String.prototype.myIndexOf = myIndexOf;
// }();


// let S = "aoaoISsuperCute",
//     T = "ute";

// console.log(S.myIndexOf(T));


// =====================练习6=======================
/** 输出下面代码运行结果 */
// example1
/* var a = {}, b='123', c=123;
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); //-> 'c'  a['123'] <=> a[123]

// example2
var a={}, b=Symbol('123'), c=Symbol('123');
// Symbol 创建的值是唯一的
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // Symbol是es6中新增的数据类型，typeof Symbol('123') === "symbol"
                // 它创建出来的值是唯一值，Symbol('123') === Symbol('123')  false

// example3
var a={}, b={key:'123'}, c={key:'456'};
a[b] = 'b';
a[c] = 'c';
console.log(a[b]); // Object.toString => "object Object"
// 1. 对象的属性名不能是一个对象，遇到对象属性名，会默认转换为字符串
//  obj = {}  arr[12,23]  obj[arr] = 'aoao'   obj => {"12,23":“aoao”}
// 2. 普通对象.toString() 调取的是Object.prototype上的方法（这个方法是用来检测数据类型的
// obj = {}  obj.toString() => "[object Object]"
// obj[b] = 'b' => obj[ "[object Object]"] = 'b' */



// =====================练习7=======================
/* 在输入框中如何判断输入的是一个正确的网址，例如：用户输入一个字符串，验证是否符合url网址的格式 */
let str = "http://www.baidu.com/index.html?lx=1&from=wx#video";
let reg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
// -> url格式
// 1. 协议://  http 或者 https 或者 ftp
// 2. 域名
//    - www.baidu.com
//    - baidu.com
//    - kbs.sport.qq.com
//    - kbs.sport.qq.com.cn
// 3. 请求路径 (斜杠后有东西或者没东西)
//    - /
//    - /index.html
//    - /stu/index/html
//    - /stu/
// 4. 问号传参
//    - ?xxx=xxx&xxx=xxx
// 5. 哈希值
//    - #xxx
console.log(reg.exec(str));