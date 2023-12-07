
let a = {n:1};
let b = a;
// 创建了一个堆存储 {n:1} 000x1
// a -> 000x1    b -> 000x1



a.x = a = {n:2};
//连等赋值，是让这两个值都和右边关联
//先创建值和变量，再让他们关联

//创建了一个堆存储 {n:2} 000x2
//因为成员属性运算符的运算优先级大于赋值运算符，所以先执行a.x(step1)
// . 的优先级比 = 的优先级高
// 在000x1 里创建了一个x 000x1: {n:1, x:undefined}


console.log('a: '+ a.toString());
console.log('a.x: '+ a.x);
console.log('b: '+b);