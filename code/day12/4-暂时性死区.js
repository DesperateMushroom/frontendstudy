// console.log(a);   referenceError: a is not defined

// console.log(typeof a); undefined 浏览器的bug，本应该是报错的，因为没有a（暂时性死区


/** 词法解析 */
console.log(typeof a); // referenceError: cannot access 'a' before initialization
let a;

