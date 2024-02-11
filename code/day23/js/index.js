/** 单例模式 */
/* 
let xxxModule = (function(){
    function fn1(){}
    function fn2(){}

    return {
        fn1 
    }
})();

xxxModule.fn1(); */

// 基于单例设计模式来管理商城排序的代码
let shopModule = (function($){
    // 这个闭包里的$代表的就是jQuery。把jQuery当作参数传进啦，取名为$

    // 想要操作谁就先获取谁（项目中尽可能把创建变量提前放在一起
    let $navList = $('.navbar-nav li'),
        $cardBox = $('.row-cols-md-3'),
        $cardList = null, // 这个要数据绑定完才有数据，但是提前声明变量
        _DATA = null; // 存储从服务器获取的数据

    // queryData: 从服务器获取数据
    function queryData(){
        // 基于JQ的ajax方法获取数据
        // 相当于let xhr = new XMLHttpRequest; 和 xhr.open('GET', 'json/production.json', false);
        $.ajax({
            url:'json/production.json',
            method: 'GET',
            async:false,

            success:result =>{
            // 从服务器获取数据成功会执行success，
            // result存储的就是获取到的数据
            // 并且数据默认就已经转换为json格式对象                
                _DATA = result;
                // console.log(_DATA);
            }
        });

    }


    // bindHTML: 把数据绑定在页面中
    function bindHTML(){

        // debugger; // 设置断点

        // 执行这个方法的时候要保证_DATA存在，不然无法执行
        if(!_DATA || _DATA.length === 0) return;

        // 模板字符串
        let HTML = ``;

        // 循环_DATA
        $.each(_DATA, (index, item) => {

            // 解构
            let {
                id,
                title,
                price,
                time,
                hot,
                img 
            } = item;

            HTML += `<div class="col" data-price="${price}" 
                                      data-hot="${hot}"
                                      data-time="${time}" >
                        <div class="card h-100">
                            <img src=${img} class="card-img-top" alt="...">
                            <div class="card-body">
                                <h4 class="card-title">${title}</h4>
                                <p class="card-text">价格：$ ${price}</p>
                                <p class="card-text"> 好评: ${hot}</p>
                                <p class="card-text"></p>  <small class="text-body-secondary">
                                上架时间: ${time}</small></p>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary">Last updated 3 mins ago</small>
                            </div>
                        </div>
                    </div>`
        })

        $cardBox.html(HTML); // 等同于innerHTML方法

        // 数据绑定完成后，我们要获取所有的card
        $cardList = $cardBox.children('.col');
        // console.log($cardList);
    }

    // sortHandle: 实现商城排序功能
    function sortHandle(){

        // 用type会和bootstrap的属性冲突，用myType
        $navList.attr('myType',-1);

        $navList.on('click',function(){
            // 相当于给每一个li都绑定了点击事件
            // this：当前点击的li（原生js对象）=> $(THIS) 转换为JQ对象
            let $this = $(this);
            let type = $this.attr('myType');
            $this.attr('myType', type*(-1)).siblings().attr('myType',-1);
            // 获取排序维度（按什么排序
            let dataSort = $this.attr('data-sort');

            // JQ的内置方法，直接排序
            $cardList.sort((A,B) => {
                // A 和 B都是原生js对象，要转换成jq对象
                let $A = $(A),
                    $B = $(B);
                
                $A = $A.attr(dataSort);
                $B = $B.attr(dataSort);

                if(dataSort === 'data-time'){
                    $A = $A.replace(/-/g,'');
                    $B = $B.replace(/-/g,'');

                }

                return ($A - $B)*type;

            });

            $cardList.each((index, item)=>{
                $cardBox.append(item);
            })
        });
    }

    return {
        // 当前模块的入口：想让商城排序开始执行，
        // 我们只需要执行init，在init中会按照顺序
        // 依次完成具体的业务逻辑
        init(){
            // => init:function(){}

            // 分别调用上面三个方法：
            // 1. 先获得数据
            queryData();
            // 2. 绑定顺序
            bindHTML();
            // 3. 排序
            sortHandle();

        }
    };
})(jQuery);


shopModule.init();