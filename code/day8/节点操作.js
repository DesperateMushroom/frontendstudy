let box = document.getElementById('box');

// 标准浏览器（非ie6-8）中会把空格和换行当作文本节点处理
// console.log(box.childNodes);

// 只想要元素节点 (但是ie6-8下，使用children会把注释也当作元素节点)
// console.log(box.children);

/**
 * children：获取指定上下文中，所有的元素子节点
 *  @params
 *      context [element object]: 指定的上下文元素信息
 *  @return
 *      [array] 返回所有的元素子节点集合 
 */
function children(context){
    // 1. 先获取所有的子节点
    let childList = context.childNodes;
    let res = [];
    // 2. 循环遍历所有的子节点，找出元素子节点，存储到res里
    for(let i = 0; i<childList.length; i++){
        if(childList[i].nodeType === 1){
            res.push(childList[i]);
        }
    }

    return res;
}

// let res = children(box);
// console.log(res);

//=========================================================
// console.log(box.firstChild);
// console.log(box.firstElementChild);

//获取上一个哥哥元素节点
function prev(context){
    let temp = context;
    while(temp.nodeType!==1){
        temp = temp.previousSibling;
    }

    return temp;

}

let giveup = document.getElementById('giveup');
console.log(prev(giveup));


// jquery中提供一些方法共我们获取元素：children，prev，next，prevAll，nextAll，sibling，siblings，index。。。