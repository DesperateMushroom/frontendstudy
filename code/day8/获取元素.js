// 获取
// let tabBox = document.getElementById('tabBox');
// console.log(tabBox);

// 基于getElementsByTagName / getElementsBYClassName 获取到的是元素集合，想要操作某一个元素，
// 需要在集合中根据索引取出来才可以使用
// let tabBox = document.getElementsByClassName('tabBox')[0];

// querySelector 获取的是一个元素对象，哪怕页面中由多个符合的，也只获取第一个
// querySelectorAll获取的是一个集合，那么只有一个符合，也是一个集合集合中只有一项
// let tabBox = document.querySelector('.tabBox');


// getElementsByTagName 获取指定上下问后代中所有的标签名为N的元素集合 
// let navList = tabBox.getElementsByTagName('li');
//let navList = tabBox.querySelectorAll('.tab li');

// let divList = document.querySelectorAll('.tabBox>div');
// let divList = tabBox.querySelectorAll('div'); //4个
// console.log(divList);

// 可兼容ie
var genderList = document.getElementsByName('gender');
var submit = document.getElementById('submitBtn');
console.log(genderList,submit);

//也可以用query
// genderList = document.querySelectorAll('[name=gender]');

// 按钮被点击后 查看哪个元素被选中了
submit.onclick = function(){
    let res = null;
    for(let i = 0;i<genderList.length;i++){
        let item = genderList[i];
        if(item.checked){
            res = item.value;
            break;
        }
    }

    alert(res);
}
