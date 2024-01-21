**正则的捕获**
> 实现正则捕获的方法
 - 正则RegExp.prototype里的方法：
    + exec
    + test
 - 字符串String.prototype 上支持正则表达式处理的方法
    + replace
    + match
    + split
    + 。。。

```
let str = "aoao2020sushi2021butter2022";
let reg = /\d+/;

/*
 * 基于exec实现正则的捕获
 *  1. 捕获到的结果是null或者一个数组
 *     第一项：本次捕获到的内容
 *     其余项：对应小分组本次单独捕获的内容
 *     index：当前捕获内容在字符串中的起始索引
 *     input: 原始字符串
 *
 *  2. 每执行一次exec，只能捕获到一个符合正则规则的
 *     但是默认情况下，我们执行一百遍，获取的结果永远都是第一个匹配到的，其余的捕获不到
 *          =》 “正则捕获的懒惰性”：默认只捕获第一个
 */
reg.exec(str); // -> ['2020', index: 4, input: 'aoao2020sushi2021butter2022', groups: undefined]
reg.exec(str); // -> ['2020', index: 4, input: 'aoao2020sushi2021butter2022', groups: undefined]
reg.exec(str); // -> ['2020', index: 4, input: 'aoao2020sushi2021butter2022', groups: undefined]


/* // 实现正则捕获的前提是：当前正则要和字符串匹配，如果不匹配捕获的结果是null
let reg = /^\d+$/;
reg.test(str); // F
reg.exec(str); // null  */
```


懒惰性的解决方法
```
 let str = "aoao2020sushi2021butter2022";
        /**
         * reg.lastIndex: 当前正则下次匹配的起始索引位置
         *    懒惰性捕获的原因：默认情况下lastIndex的值不会被改变，
         *                      每一次都是从字符串开始位置查找，
         *                      所以找到的永远只是第一个
         *    
         *    解决方法：全局修饰符g
         */

        /* 
        let reg = /\d+/;
        console.log(reg.lastIndex); // 0 下面匹配捕获是从str索引0的位置开始找
        console.log(reg.exec(str)); 
        console.log(reg.lastIndex); // 0 第一次匹配捕获完成，lastIndex没有改变，
                                    // 所以下一次exec依然是从字符串最开始找
                                    // 找到的永远是第一个匹配到的
         */
        /* 
         let reg = /\d+/g;
         console.log(reg.exec(str)); // [2020,...]
         console.log(reg.lastIndex); // 8   设置全局匹配修饰符g后，第一次匹配完
                                    // lastIndex会自己修改
        console.log(reg.exec(str)); // [2021,...]

        console.log(reg.lastIndex); // 17
        console.log(reg.exec(str)); // [2022,...]
        
        console.log(reg.lastIndex); // 27
        console.log(reg.exec(str)); // null 当全部捕获后，再次捕获的结果是null
        // lastIndex又回归了初始值零，再次捕获又从第一个开始了
        console.log(reg.lastIndex); // 0 
        console.log(reg.exec(str)); // [2020,...] */

        /* 
        let reg = /\d+/g;
        if(reg.test(str)){
            // 验证一下：只有正则和字符串匹配我们再捕获
            console.log(reg.lastIndex); // 8 基于test匹配验证后，
            // lastIndex已经被修改为第一次匹配后的结果，所以下一次捕获不再从头开始了
            console.log(reg.exec(str)); // 2021
        } */


        // 需求：编写一个方法execAll，执行一次可以把所有匹配的结果捕获到
        //  前提正则一定要设置全局修饰符g
        ~function(){
            function execAll(str = ""){
                // => str: 要匹配的字符串
                // => this: RegExp的实例 （当前操作的正则）
                if(!this.global) return this.exec(str);

                // 进来后的第一件事，验证当前正则是否设置了g
                // 不设置则不能再进行循环捕获，否则会死循环


                // => ary
                let ary = [];
                let res = this.exec(str);

                while(res){
                    // 把每一次捕获的内容res[0]存放到数组中
                    ary.push(res[0]);
                    // 只要捕获内容不为null，则继续捕获下去
                    res = this.exec(str); 
                }

                return ary;
            }

            RegExp.prototype.execAll = execAll;
        }();

        let reg = /\d+/g;
        let res = reg.execAll(str);
        console.log(res);

        // 字符串中的match方法，可以在执行一次的情况下，捕获到所有匹配的数据
        // 前提：正则也要设置g
        console.log(str.match(reg));
```

**正则的分组捕获**
```
// -> 身份证号码
let str = "121111199012040112";
let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/;
console.log(reg.exec(str));
console.log(str.match(reg));

//['121111199012040112', '121111', '1990', '12', '04', '1', '2', index: 0, input: '121111199012040112', groups: undefined]
// 数组第一项：大正则匹配的结果
// 其余项：每一个小分组单独匹配捕获的结果
// 如果设置了分组（改变优先级），但是捕获的时候不需要单独捕获
//    可以基于?:来处理

```

```
// 既要捕获到{数字}，也想单独的把数字也获取到，
// ex：第一次找到{0}  还需要单独获取0
let str = "{0}年{1}月{2}日";
//let reg = /\{/d+\}/;

/*
// 不设置g只匹配一次，exec和match获取的结果一致（既有大正则匹配的信息，也有小分组匹配的信息）
let reg = /\{(\d+)\}/;
console.log(reg.exec(str));
console.log(str.match(reg));
//  ['{0}', '0', index: 0, input: '{0}年{1}月{2}日', groups: undefined] -->
*/



let reg = /\{(\d+)\}/g;
console.log(str.match(reg));
// ['{0}', '{1}', '{2}']
//  多次匹配的情况下，match只能把大正则的内容获取到
//  小分组匹配的信息无法获取

let aryBig = [],
   arySmall = [],
   res = reg.exec(str);

while(res){
   aryBig.push(res[0]);
   arySmall.push(res[1]);

   res = reg.exec(str);
}

console.log(aryBig, arySmall);
// (3) ['{0}', '{1}', '{2}']      (3) ['0', '1', '2']
```


```
// => 分组的第三个作用：“分组引用”
let str = "book"; // good, look, moon, foot
let reg = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/
// =》 分组引用就是通过 “\数字” 让其代表和对应分组出现一模一样的内容
console.log(reg.test(str));   // T
console.log(reg.test("feet"));// T
console.log(reg.test("deff"));// F

```


**正则捕获的贪婪性**

```
let str = "嗷嗷2023@2024猫猫";
// 正则捕获的贪婪性：默认情况下，正则捕获的时候，是按照当前正则所匹配的最长结果来获取的
let reg = /\d+/g;

console.log(str.match(reg)); // => ["2023","2024"]

// =》 在量词元字符后面设置? : 取消捕获时候的贪婪性（按照正则匹配的最短结果来获取）
reg = /\d+?/g;
console.log(str.match(reg)); // => ['2', '0', '2', '3', '2', '0', '2', '4']
```

问号在正则中的五大作用
 - 问号左边是非量词元字符：本身代表量词元字符，出现0到1次
 - 问号左边是量词元字符：取消捕获时候的贪婪性
 - (?:) 只匹配不捕获
 - (?=) 正向预查
 - (?!) 负向预查


括号在正则中的三大作用
 - 改变优先级
 - 分组捕获
 - 分组引用


**其它正则捕获的方法**
1. test也能捕获（本意是匹配）
```
let str = "{0}年{1}月{2}日";
let reg = /\{(\d+)\}/g;

console.log(reg.test(str)); // true
console.log(RegExp.$1); // "0"

console.log(reg.test(str)); // true
console.log(RegExp.$1); // "1"

console.log(reg.test(str)); // true
console.log(RegExp.$1); // "2"

console.log(reg.test(str)); // false
console.log(RegExp.$1); // "2" 存储的是上次捕获的结果

// RegExp.$1 ~ RegExp.$9 : 获取当前本次正则匹配后，第一个到第九个分组的信息
```

2. replace 字符串中实现替换的方法（一般都是伴随正则一起使用的）
```
let str = "aoao@2023|aoao@2024";
// -> 把 “aoao” 替换成 “嗷嗷”
// 1. 不用正则，执行一次只能替换一个
// str = str.replace("aoao", "嗷嗷");

// 2. 使用正则会简单一点
str = str.replace(/aoao/g, "嗷嗷");
console.log(str);
```

```
let str = "aoao@2023|aoao@2024";
// -> 把 “aoao” 替换成 “aoaocute”
// str = str.replace("aoao","aoaocute").replace("aoao","aoaocute");
// 'aoaocutecute@2023|aoao@2024'
// 每次替换都是从字符串第一个位置开始找的（类似于正则捕获的懒惰性


// 基于正则g可以实现
str = str.replace(/aoao/g, "aoaocute");
console.log(str);

```

案例：把时间字符串进行处理
```
let time = "2019-08-13";
// -> 变为 2019年08月13日

let reg = /^(\d{4})-(\d{1,2})-(\d{2})$/;

// -》 这样可以实现
// time = time.replace(reg,"$1年$2月$3日");
// console.log(time);

// 还可以这样处理  [str].replace([reg],[function])
// 1. 首先拿reg和time进行匹配捕获，能匹配几次就会把传递的函数执行几次
//    而且是匹配一次就执行一次
// 2. 不仅把方法执行了，而且replace还给方法传递了实参信息 
//   （和exec捕获的内容一致的信息：大正则匹配的内容，小分组匹配的信息 ...）
// 3. 在函数中我们返回的是啥，就把当前大正则匹配的内容替换成啥
/*
time = time.replace(reg, (big, $1, $2, $3) => {
   // 这里的$1 - $3 是我们自己设置的变量
   console.log(big, $1, $2, $3);
});
*/

time = time.replace(reg,(...arg)=>{
   let [ ,$1,$2,$3] = arg;
   $2.length<2?$2="0"+$2:null;
   $3.length<2?$3="0"+$3:null;
   return $1+"年"+$2 +"月"+ $3 +"日";

});
```

单词首字母大写
```
let str = "good good study, day day up";
let reg = /\b([a-zA-Z])[a-zA-Z]*\b/g;

// 函数被执行了六次，每一次都把正则匹配信息传递给函数
// 每一次arg：["good","g"] ["good","g"] ["study","s"]
str = str.replace(reg,(...arg)=>{
   let [content, $1] = arg;
   $1 = $1.toUpperCase();
   content = content.substring(1);
   return $1+content;
});
```

验证一个字符串中那个字母出现的次数最多，多少次
```
let str = "zhufengpeixunzhoulaoshi";

/*=====去重思维=====*/
let obj = {};
[].forEach.call(str,char=>{

   // char in obj
   // obj.hasOwnProperty(char)
   // typeof obj[char]!=="undefined"
   if(typeof obj[char]!=="undefined"){
      obj[char]++;
   }
   else{
      obj[char] = 1;
   }
});

console.log(obj);

```