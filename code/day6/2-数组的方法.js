//let ary = [12,23,34,45];
// console.log(typeof ary); //object
// console.dir(ary);

/*
    ary = {
        0:12,
        1:
        2
        3:
        4:

    }

    数字作为索引（key 属性名
    legnth代表长度

    ary[0] 根据索引获取制定想的内容
    ary.length 获取数组的长度
    ary.length - 1: 最后一项的索引
*/

// push
console.log(ary.push(11,'aa',{name:'arar'})) ;
console.log(ary);

//基于原生js操作键值对的方法，也可以
ary[ary.length]='jhh';
console.log(ary);


//======================unshift
let res = ary.unshift('begin','22',true);
console.log(ary,res);

//在ary前面加个100，然后把原来的ary克隆进去
//基于原生es6展开运算符，把原来的ary克隆一份，在新的数组中创建第一项，
//其余的内容实用原始ary中的信息
//ary = [100,...ary];

res = ary.shift();
console.log(ary,res);

//因为ary也是对象，里面的也是属性，所以可以用delete删除
// 把数组当作普通的对象，确实可以删除一项
// 但是不会影响数组本身的结构特点（length长度不会跟着修改，真实项目中杜绝这样使用
delete ary[0];
console.log(ary);

ary.pop();

// 基于原生js让数组长度减掉一位，默认干掉的就是最后一项
ary.length--;

//基于这种方法可以清空一个数组，把原始数组中的内容以新数组存储
//有点类似数组的克隆。
res=ary.splice(0);

//删除最后一项和第一项
ary.splice(ary.length-1);
ary.splice(0,1)
console.log(ary);

/**
 * ` splice `
> splice: 实现数组的增加，修改
    @params：
        n，m,x 从索引n（包含）开始删除m个元素,用x占用删除的部分
        n,0,x 从索引n开始，一个不删，把x放到索引n 的前面
    @return：把删除的部分用新数组存储起来返回
 */

    //删除两个，增加两个 =》 修改
ary = [1,2,3,4,5,6];
ary.splice(3,2,'tttt',undefined);
console.log(ary);

//在某个位置之前增加
//在2位置删掉0个，增加222
ary.splice(2,0,222);

//在数组末尾加
ary.splice(ary.length,0,3,4,5,6);
//在数组开始加
ary.splice(0,0,3,4,5,6);


//===========================
/*
    slice：实现数组的查询
    @params
        n m都是数字，从索引n开始，找到索引为m的地方，不包括m
    @return
        把找到的内容以一个新数组形式返回/
    
*/
let arr = [1,2,3,4,5,6];
res = arr.slice(1,3);
console.log(res); //=>2 3

// m不写是找到末尾
res = arr.slice(1);
console.log(res); // 2,3,4,5,6

//数组的浅克隆，参数0不写也可以
res = arr.slice(0);
console.log(res); // 1,2,3,4,5,6

// 思考：
// 1. 如果n/m为负数会怎样   length + n/m 得到的index 来计算
// 2. 如果n>m会怎样     空数组
// 3. 如果是小数        小数向下取整
// 4. 如果是非有效数字   空数组
// 5. 如果比length大会怎样   只取完数组里有效的，后面不取



//=========
let a1 = [1,2,3];
let a2 = [4,5,6];
 res = a1.concat();
 res===a1; // false, 不同数组
 res = a1.concat('arar');
 //res = [1,2,3,'arar']
 res = res.concat(a2);
 //res = [1,2,3,'arar',4,5,6]


 /** 
                    * 
                    * 数组的其他方法
                    * join、from、sort、find、forEach、map、findIndex、includes、indexOf...
                    * 创建
                    *  
                */
                
  arr = [1,10,1,2,3,3,4,5,6,'454','你好']
 // forEach循环
 arr.forEach(element => {
     console.log('ele',element);
 });

 console.log('includes',arr.includes(1)); // true 返回的是Boolean值

 // findIndex
 console.log('findIndex',arr.find(item => item == 0)); // 找不到返回undefined
 console.log('findIndex',arr.find(item => item == 1)); //找到之后返回符合条件的那一项值

 // indexOf
 console.log('indexOf',arr.findIndex(item => item == 1)); // 返回第一个符合条件的值的下标
 // lastIndexof
 console.log('lastIndexOf',arr.lastIndexOf(3)); // 返回符合条件的最后一个值的下标
 // fill 方法将数组所有的项填充为指定的值
 arr.fill(10)
 console.log(arr);
 let _arr = [1,2,3,4,5,6]
 _arr.fill(100)
 console.log('_arr',_arr);

 // concat 链接两个数组组成新的数组 es6提供的解构赋值 也可以实现
 let s = [1,2]
 let ss = s.concat([1,2])
 console.log('ss',ss);

 sss = [...[1,2],...[3,4]]
 console.log('sss',sss);

 // some
 let _as = [1,2,3,4,5,6]
 let _sa = [2,3,4,5,6,7]

 let done = _as.some(item => item >= 1 )
 console.log('[1,2,3,4,5,6].some(item => item >= 1)',done); // true
 // some是如果里面有一个为真则直接进行返回真 every如果有一个假则返回假
 let _done = _sa.some(item => item < 1) 
 console.log('[2,3,4,5,6,7].some(item => item < 1)',_done); // false

 // every
 let ds = _as.every(item => item > 1)
 console.log('ds',ds); // false
 let sd = _sa.every(item => item > 1)
 console.log('sd',sd); // true


    // toString把数组变为字符串 转换之后原来数组不变 每一项用逗号分割 --> 空数组为空字符串
     arr = [1,2,2,3]
    let str = arr.toString()
    console.log('str',str,'arr',arr); // 1,2,3 <==> [1,2,3]
    // join 方法指定数组的值 以什么参数拼接成字符串 也不会改变原来数组 不指定分隔符则还是逗号 
    let _str = arr.join(':')
    console.log('当前的join(:)之后的_str',_str,'arr',arr); // 1:2:3 <==> [1,2,3]
     ss = arr.join('+') // 1+2+3 字符串
    console.log(eval(ss)); // 使用eval变为js表达式 ==>  6

    // 检测数组中是否包含某一项 找不到时候返回的是-1 indexOf ==> 第一次出现的下标索引 lastIndexOf ==> 最后一次出现的下标索引  ==> (IE6~8不兼容 但已经不需要考虑ie了 直接使用)
    console.log('arr.indexOf(1)',arr.indexOf(1));
    console.log('arr.indexOf(2)',arr.indexOf(2));
    console.log('arr.indexOf(44)',arr.indexOf(44));  // -1
    console.log('arr.lastIndexof(2)',arr.lastIndexOf(2));

    // includes 判断该数组里面是否含有某个值 返回布尔值
    let s_s = ['zp','yz',123,456,789]
    console.log(s_s.includes('zp')); // true
    console.log(s_s.includes(1234)); // false

    /** 关于数组的排序或者排列 */
    /** reverse 将数组倒序  改变原数组 */
    console.log('------------reverse()改变原数组将数组倒序会改变原来数组--------------'); 
    let _Arr = [1,5,6,8,9,1,2,11,5,89,45]
    let __arr = _Arr.reverse()
    console.log('_Arr',_Arr,'__arr',__arr); // [45,89,5,11,2,1,9,8,6,5,1]

    /** sort 将数组排序 具体排序方法需要自己决定 */
    let __Arr = [5,1,5,8,6,84,1]
    let ar = __Arr.sort((n,m) => n - m) // 升序  ==> 降序则为 m - n ==> 降序
    console.log('排序后的',ar,'原来数组',__Arr); // [1,1,5,5,6,8,84]
    let __ar = [5,1,5,8,6,84,1]
    console.log('默认是升序排列 --> 但是sort不传递参数函数无法处理10以上的排序 进制问题 默认按照第一个字符排列',__ar.sort()); /// 默认是升序


         // 使用forEach ---- 在forEach里面不能跳出循环 --> return也没有办法跳出循环
         arr.forEach((item,index) => {
            console.log('当前是第'+index+'项');
            console.log('值为',item);
            // if(index ==3 ) {
            //     return 
            // }
            // if(index == 3) {
            //     break
            // }
        })