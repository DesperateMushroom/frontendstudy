console.log(Boolean(0)); // => false
console.log(Boolean('')); // => false
console.log(Boolean(' ')); // => true
console.log(Boolean(null)); // => false
console.log(Boolean(undefined)); // => false
console.log(Boolean([])); // => true
console.log(Boolean([1])); // => true
console.log(Boolean(-1)); // => true

// !: 取反 （先转为布尔，然后取反
console.log(!1);// => false
// 取反再取反，变成布尔类型 <=> Boolean()
console.log(!!1); // => true

// 条件判断
// 如果条件只是一个值， 不是==/===/!=/>= 等这些比较，是要把这个值线转换为布尔类型，然后验证真假
if(1){
    console.log('hello world');
}
if('3px'+3){
    // => '3px3' 为true
    console.log('3px'+3);
}
if('3px'-3){
    // => NaN-3 => NaN => false
    console.log('3px'-3);
}