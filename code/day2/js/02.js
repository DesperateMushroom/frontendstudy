/*let a = 10;
if(!a){
    // 条件可以多样性，等于大于小于的比较/一个值或者取反等
    // =》 最后都是要计算出是true还是false
}

if(a<=10){
    console.log('a<=10');
}
else if(a>0 && a<10){
    // A && B：A 和B都成立才为true
    // A || B: A或者B只有一个成立久违true
    console.log('a>0 && a<10');
}
else if(a==10){
    console.log('a==10');
}
else{
    console.log('else')
}*/


//===========三元匀速福：简单if else的特殊处理
let a = 10;

//条件?条件成立处理的事：不成立处理的事
// 1. 如果处理的事情比较多，我们用括号包起来，每一件事用逗号分隔
// 2. 如果不需要处理事情，可以使用null/undefined占位

/*if(a>0){
    if(a<10){
        a++;
    }
    else{
        a--;
    }
}
else{
    if(a > -10){
        a+=2;
    }
}

a>0?(a<10?a++:a--):(a>-10?a+=2:null);*/

/*if(a>0 && a<20){
    a++; // a+=1 a=a+1
    console.log(a);
}
(a>0&&a<20)?(a++,console.log(a)):null;*/


/*a>=10?console.log('a>=10'):console.log('else');
if(a>=10){
    console.log('a>=10');
}
else{
    console.log('else');
}*/


//=============switch case: 一个变量在不同值情况下的不同操作
// 1. 每一种case情况结束后最好都加上break
// 2. default等价于else，以上都不成立干的事
// 3. 每一种case情况的比较用的都是=== “绝对相等”
switch(a){
    case 1:
        console.log('a==1');
        break;
    case 5:
        console.log('a==5');
        break;
    case 10:
        console.log('a==10');
        break;
    default:
        console.log('default');
}


if(a==1){
    console.log('a==1');
}
else if(a==5){
    console.log('a==5');
}
else if(a==10){
    console.log('a==10');
}
else{
    console.log('default');
}

//不加break，当前条件成立执行完成后，后面条件不论是否成立都要执行，直到遇到break为止
//不加break可以实现变量在某些值的情况下做相同的事情
let b = 1;
switch(b){
    // b==1 || b==5 => b+=2
    case 1:
    case 5:
        b += 2;
        break;
    default:
        b--;
}
console.log('b: '+b);

// 
b='5';
if(b==5){
    console.log('b is string')
}