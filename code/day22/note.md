### jQuery
> 一款伟大的，用原生js封装的，"操作DOM"的类库: 
 ：它里面封装了大量的方法（在原先的版本中v1.xx, 这些方法兼容所有浏览器
 基于这些方法，我们可以快速的进行DOM操作和项目开发
 
学习jq
- 看书 《锋利的jQuery》
- api文档
- 案例
- 学源码

**JQ的三大版本**
- v1.xxx 第一代版本
    - jquery-1.11.3.min.js
        大而全，兼容所有浏览器包括ie6
- v2 第二代版本
    主要是为移动端开发准本，不再兼容低版本浏览器 ie8以及以下
    配合出现还有jQuery mobile等ui库
    但是不如zepto.js
- v3.xxx 第三代版本
    也不再兼容ie低版本浏览器，性能等方面都比之前的强
    生不逢时，angular / vue / react 这种框架崛起的时代
    不再基于操作dom的思想开发了


#### JQ中常用的方法
```
// =》 =============== 1. 获取DOM元素  ================
// 操作方法: JQ选择器（根据选择器类型快速获取需要的元素）
$([selector], [context]);
    $('#box');
    $('.imgBox');
document.getElementById("box");
document.querySelector("#box");

let box = document.getElementsByClassName('box')[0];
let links = box.getElementsByTagName('a');
links = document.querySelectorAll('.box a');
links = box.querySelectorAll('a');
    $('.box a')
    $('a', box)

/* JQ支持的选择器：传统css3中的大部分都支持，还支持一些自己独有的*/
/* 例如
        :eq(n)  获取集合中索引为n的
        :gt(n)  大于这个索引的
        :lt(n)  小于这个索引的
 */


// 节点之间关系的属性：用jq选择器获取的元素，我们设置变量名的时候一般都以$开头
// 还可以再设置选择器二次筛选
let $box = $('.box');
$box.children('a');  // 获取对应的子元素
$box.find('a'); // 获取对应的后代元素
$('a').filter('.active'); // 同级筛选，在所有的a中帅选出具备class='active'样式类的a
$box.prev();
$box.prev('p'); // 获取它上一个标签名为p的哥哥
$box.prevAll();
$box.next();
$box.nextAll();
$box.siblings(); // 获取所有的兄弟
$box.index(); // 获取索引
$box.parent(); // 获取父元素
$box.parents(); // 获取所有的祖先元素，一直到document

// =》 ============= 2. DOM增删改 ===============
// jquery 做法
let str = `<div id="box" class = "box">
    。。。
 </div>`;

$('body').append(str); // 追加到容器末尾

$('body').html(str); // 等价于innerHTML

$('body').html(); //不传参是获取body中的html内容，除了这个方法还有text方法，等价于innerText

$A.insertBefore($B); // 把$A放到$B的前面
$A.insertAfter($B); // 把$A放到$B的后面
// 注意： $A, $B都是页面中已经存在的元素

 // 需要把新增的元素放到A前面，需要把字符串用$()包起来，相当于创建了一个元素
$(`<div id="box" class = "box">
    。。。
 </div>`).insertBefore($A); 

 $A.appendTo($B); // => $B.append($A); 在$B容器的末尾追加$A

 $A.prependTo($B); //=> $B.prepend($A); 在$B容器的开头追加$A

// 原生js新增
/*
let divBox = document.createElement('div');
divBox.id = 'box';
divBox.className = 'box';
document.body.appendChild(divBox);

let str = `<div id="box" class = "box"> </div>` ;
document.body.innerHTML = str;
*/



$A.clone(); // 实现元素的克隆
$A.remove(); // 实现元素的删除


// =》 操作表单元素的内容
$inp.val(); // 获取表单元素内容
$inp.val('aaa');  // 设置表单元素内容
// html 和 text方法是操作非表单元素内容的





// =》===============  3. 操作自定义属性 =================
$box.attr('data-type'); // 获取自定义属性值
$box.attr('data-type', "B"); // 设置自定义属性值
$box.attr({
    'type':1,
    'name':'AA"
})； // 批量设置

$box.removeAttr('data-type'); // 移除自定义属性

// 表单元素操作内置或者自定义属性一般使用prop和removeProp
$inp.prop('checked')
$inp.prop('checked', true)
....




// =》 ============= 4. 操作css样式 （盒子模型属性）============

// 设置样式
$box.css('width',200); //css方法是设置或者批量设置样式
                        // 原理是设置style行内样式
                        // $box.css({width:200, height:200})
                        // 写的值不加单位，方法会帮我们自动设置上px单位

$box.addClass('active'); // 设置样式类
                        // 原理是对className的操作
                        // removeClass是移除
                        // hasClass验证是否存在某个样式类
                        // toggleClass 之前有就是移除，没有就是新增


// 获取样式
$box.css('width'); // 不设置值的时候就是获取
                    // 原理是 getComputedStyle, 
                    // 所有经过计算的样式都可以获取

$box.offset(); // 当前元素距离body的左偏移和上偏移

$box.position(); // 当前元素距离父参照物的左偏移和上偏移

$box.width(); // .height() 获取盒子的宽高，传递值进来就是设置

$box.innerWidth/.innerHeight/.outerWidth/.outerHeight()
// 等价于clientWidth/Height  和  offsetWidth/Height

$(document).scrollTop([val]); // 可以获取或者设置scrollTop的信息
                                // 对应的方法：.scrollLeft
```


除了操作DOM，JQ中还提供了其他有助于项目开发的方法
```
// -> 事件处理
// $元素.on([event type], [function])
// $元素.off([event type], [function])
// $元素.bind()   $元素.unbind()   $元素.delegate() ... 
// $元素.click()  .mouseover   .mouseout ...等常用事件的快捷绑定
$box.on('click', function(){

});

$box.click(function(){});


// -> 动画处理
// .animate([目标样式]，[总时间]，[运动方式]，[运动完做的事情])
// .stop / .finish
$box.animate({
    top: 100,
    left: 200
}, 1000, 'linear', function(){});


// -> ajax请求处理
let _DATA = null; 
$.ajax({
    url: 'json/product.json',
    method:'GET',
    async: false,
    dataType:'json' // json是默认值
    success:result => {
        //result : 当请求成功，执行success函数，
                // result就是从服务器获取的结果
        _DATA = result; 
    }
})



// -> 常用的工具方法
$.each([数组，类数组，对象],function(index, item){
    // 遍历数组中的每一项
    // index: 索引
    // item：当前循环这一项

    // 如果遍历的是对象:
    // index：属性名
    // item: 属性值
})

$('A').each(function(index,item){})

$.toArray(); 转换为数组  
$.merge() 数组合并
$.makeArray() 把类数组转换为数组
$.uniqueSort() 去重加排序
$.type 数据类型检测


```


>  原生JS对象和JQ对象中的属性和方法不能相互调用