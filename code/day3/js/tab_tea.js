var tabBox = document.getElementById('tabBox');
var tabList = tabBox.getElementsByTagName('div');
console.log(tabList);
var navBox = document.getElementById('navBox');
var navList = navBox.getElementsByTagName('li');

// 获取多个元素的是get Element s 有复数


/* 解决方法1 */
//循环三个li，给每一个li都绑定点击事件
for(var i = 0; i<navList.length; i++){
    // navList[i]: 当前循环下我们要操作的li
    //（i变量存储的值是我们需要获取指定元素的索引


    // 在循环给每个li绑定点击事件的时候，我们给每一个li设置一个自定义属性
    // 属性值存储的是当前li的索引
    navList[i].newIndex = i;
    navList[i].onclick = function(){
        //可以先让所有的li都没有样式，再让当前这个有样式
        console.log('i:'+i);
        // changeTab(i);


        //this 是当前点击这个元素li，this.newIndex获取的就是
        //之前绑定在元素自定义属性上的索引值
        changeTab(this.newIndex);
    }
}

/* 解决方法2: 闭包解决 */

/* ES6的let解决方法 */

/*
 只有js代码加载完了才能看到页面，只有看到页面用户才能点击
    加载到循环
*/


//封装一个函数实现选项卡的切换
// index: 创建函数的时候不知道点的是谁，所以定义一个入口clickindex
// 点击这一项的索引
// 执行方法的时候把点击这一项的索引传递进来即可
function changeTab(index){
    // 1. 先让所有的li和div都没有选中的样式
    for(var i = 0; i<navList.length; i++){
        navList[i].className='';
        tabList[i].className='';
    }

    // 2. 点击的是谁就给谁加
    navList[index].className='active';
    tabList[index].className='active';


}
