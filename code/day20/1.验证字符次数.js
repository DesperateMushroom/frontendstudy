let str = "zhufengpeixunzhoulaoshi";

/*=====去重思维=====*/
/* let obj = {};
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

let max = 1;
let res = [];
for(let key in obj){
    let item = obj[key];
    item > max? max = item:null;
}
console.log(max);
for(let key in obj){
    let item = obj[key];
    if(item === max){
        res.push(key);
    }
}

console.log(`出现次数最多的字符是：${res}, 出现了${max}次`);
 */

/* ==========排序字符============ */
let newStr = str.split('').sort ((a,b) =>{
    return a.localeCompare(b);
} ).join('');

console.log(str, newStr);

// newStr ： aeefghhhiilnnoopsuuuxzz

/* let reg = /([a-zA-Z])\1+/g
let ary = newStr.match(reg); //['ee', 'hhh', 'ii', 'nn', 'oo', 'uuu', 'zz']
ary.sort((a,b)=>{
    return b.length - a.length;
}); //['hhh', 'uuu', 'ee', 'ii', 'nn', 'oo', 'zz']

let maxLen = ary[0].length;
let res = [ary[0].substring(0,1)];

for(let i = 1; i<ary.length; i++){
    if(ary[i].length < maxLen){
        break;
    }
    res.push(ary[i].substring(0,1));
}

console.log(`出现次数最多的${res}, 出现次数${ary[0].length}次`)
 */



/* ======================= */
let max = newStr.length;
let res = [];
let flag = false;

for(let i = newStr.length; i>0; i--){

    // 让相同字符连续出现多少次
    //  => [a-zA-Z]\d 相同字符
    //  => [a-zA-Z]\d{?} 连续出现？次相同字符

    let reg = new RegExp("([a-zA-Z])\\1{"+(i-1)+"}","g");
    
    newStr.replace(reg, (content , $1)=> {
        // content: "hhh"
        // $1: 'h'
        res.push($1);
        max = i;
        flag = true;
    });

    if(flag) break;

}

console.log(`出现次数最多的${res}, 出现次数${max}次`)
