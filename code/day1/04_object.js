let person = {
    name:'john doe',
    age:40,
    height:'185cm',
    weight:'80kg',
    1:100
};

// 删除属性
// => 真删除：把属性彻底删掉
delete person[1];
// => 假删除：属性还在，值为空
person.weight = null; // 或者可以设为undefined
console.log(person); // weight = null



// 设置属性名属性值
// => 属性名不能重复，如果属性名已经存在，则修改原来的属性值
person.GF = 'aoao';
person.name = 'lyf';
console.log(person['GF']);
console.log(person.GF);
console.log(person['name']);


// 获取属性名对应的属性值
// => 对象.属性名
// => 对象[属性名]   属性名是数字或者字符串格式的
// => 如果当前属性名不存在，默认的属性值是undefined
// => 如果属性名是数字,则不能使用点方式获取属性值, 只能用中括号[]
console.log('person.name: '+ person.name);
console.log('person[\'age\']: '+ person['age']);
console.log('person.sex: ' + person.sex); // => undefined
console.log('person[1]: '+person[1]);
//console.log(person.1);// syntax error 


/**
 * 数组是特殊的对象
 *  1. 我们在中括号中设置的是属性值，它的属性名是默认生成的数字，从0开始递增
 *      而且这个数字代表每一项的位置，我们把其称为索引index=> 从0开始连续递增，代表每一项位置的数字属性名
 *  2. 天生默认一个属性名length，存储数组的长度
 */
let arr = [12,'ee',true,13];
console.log(arr.length);
console.log(arr['length']);
console.log('arr[1]: '+arr[1]);
// 第一项索引0， 最后一项索引arr.length-1
console.log('arr[\'length\'-1]:'+arr[arr.length-1]);

//往数组末尾增加内容
arr[arr['length']] = 100;
console.log(arr); 