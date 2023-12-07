let url = 'www.aaabbb?lx=1&name=aoao&name2=sushi#box';  // #号代表哈希值
/**
 * 想要一个结果当对象
 * 结果：{
 *      lx：1
 *      name:aoao
 *      name2:'sushi'
 *      HASH: 'box'
 * }
 */

// 1. 获取问号后面的值
/* let questionMarkIndex = url.indexOf('?');
let hashtagIndex = url.indexOf('#');
let afterQuestion = url.substring(questionMarkIndex+1, hashtagIndex);
console.log(afterQuestion);
let afterHashtag = url.substring(hashtagIndex+1);
console.log(afterHashtag);
*/



let res = queryURLParams(url);
console.log(res);


/**
 *  queryURLParams ： 获取url地址中问号和井号
 *  @params 
 *      url[string] 要解析的url字符串
 *  @return
 *      [object] 包含参数和哈希值信息的对象
 */
function queryURLParams(url){
    // 如果没有？或者#，afterQuestion和afterHash 要为空串
    //先正常获取？#的index
    //如果没有#，那么#的index改为url.length =》这样可以保证afterHash为空串

    let questionMarkIndex = url.indexOf('?'), hashtagIndex = url.indexOf('#');
    let afterQuestion='', afterHashtag='';
    let res = {};
    

    
    // 如果问号存在则设置afterQuestion
    if(hashtagIndex!==-1){
        //如果不存在 # afterHashtag就是空串，反之就是#号后的字符串
        afterHashtag = url.substring(hashtagIndex+1);
        afterQuestion = questionMarkIndex===-1?afterQuestion:url.substring(questionMarkIndex+1,hashtagIndex);
    }
    else{
        afterQuestion = questionMarkIndex===-1?afterQuestion:url.substring(questionMarkIndex+1);
    }
    // 如果不为空串，设置res[hash]
    //hash 记得要用字符串！！！！
    if(afterHashtag!=='') res['HASH']=afterHashtag;
    console.log('afterHashtag'+afterHashtag);
    console.log('afterQuestion' + afterQuestion);
    // 设置res的？
    if(afterQuestion!==''){
        let arr = afterQuestion .split('&');
    
        arr.forEach((item)=>{
            let itemArr = item.split('=');
            res[itemArr[0]] = itemArr[1];
        })
    }

    return res;


}