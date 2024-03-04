// 轮播图数据绑定

let $container = $('.container'),
    $wrapper = $container.find('.wrapper'),
    $pagination = $container.find('.pagination');

$.ajax({
    url:"json/bannerData1.json",
    method:'GET',
    success:result=>{
        let str1=``;
        let str2=``;
        result.forEach((item,index)=>{
            str1 += `<div class="slide">
            <img src="${item.pic}" alt="">
        </div>`
            //  str2 += `<span class='${index===0?'active':' '}'></span>`
        });

        $wrapper.html(str1);
        // $pagination.html(str2);

        new Banner('.container',{
                initialSlide:2,
                autoplay:2000, // 设置为null就是只能手动左右切换
                speed:300,
                // navigation:null,
                pagination:{
                    triggerEvent:'mouseenter'
                },
                on:{
                    init:function(){
                        console.log('初始化');
                    },

                    transitionStart:function(){
                        console.log('动画开始');
                    },

                    transitionEnd:function(){
                        console.log('动画结束');
                    }
                }
        });
    }
});



// 节流: 频繁触发的时候。间隔多长时间就来一次：频率降低
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var _now = now();
      if (!previous && options.leading === false) previous = _now;
      var remaining = wait - (_now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = _now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

// 防抖：频繁触发的时候，只有第一次才产生效果
function debounce(func, wait, immediate){
    let result = null,
        timeout = null;

    // 返回一个可以被执行的函数
    return function (...args){
        let context = this,
            now = immediate && !timeout;
        clearTimeout(timeout); //  在设置新的定时器之前，我们要把之前设置的定时器都干掉
                                // 因为防抖的目的是等待时间内，只执行一次
        timeout = setTimeout(()=>{
            // if() result = func.call(context,...args);
            !immediate?result = func.call(context,...args):null;

            // clearTimeout(timeout);
            timeout=null;   
        },wait);
        // 只有当现在立马被执行且没有别的定时器的时候才触发
        now?result = func.call(context,...args):null;
        return result;
    }
}

let bannerModule = (function(){

    let _DATA = null;
    // 获得要操作的数据
    let $container = $('.container'),
        $wrapper = $container.find('.wrapper'),
        $pagination = $container.find('.pagination'),
        $paginationList = null,
        $slideList = null,
        $buttonPrev = $('.button-prev'),
        $buttonNext = $('.button-next');

    // 设置轮播图需要的变量    
    let autoTimer = null,
        interval = 2000,
        speed = 1000,
        activeIndex = 0,
        length = 0;

    // queryData: 获取数据
    let queryData = function(callback){
        $.ajax({
            url:"json/bannerData1.json",
            method:"GET",
            async:true, //不写默认也是true
            success:result =>{
                // _DATA = result;
                // typeof callback==='function'?callback():null;
                callback&&callback(result);
            }
        });
    };

    // bindHTML: 绑定数据
    let bindHTML = function(data){
        // 绑定图片数据
        let picStr = ``;
        let count = data.length;
        let pageStr = `<span class='active'></span>`;
        for(let i = 0; i<count; i++){
            picStr += `<div class="slide">
                    <img src="${data[i].pic}" alt="">
                </div>`

            if(i!==0) pageStr += `<span></span>`;
        }

        $wrapper.append(picStr);
        $pagination.append(pageStr);
        // console.log(picStr);

        // 获取完数据后，就可以获取结构内容 
        $paginationList = $pagination.find('span');
        $slideList = $wrapper.find('.slide');
    };


    // 实现切换，单独提取出来，因为有多个地方需要使用
    let change = function(){
        
        // eq 和 get的区别：eq得到的是jq对象，get得到的是原生js对象
        let $active = $slideList.eq(activeIndex);
        let $siblings = $active.siblings();

        // 基于css3中的transition实现动画
        $active.css('transition',`opacity ${speed}ms`);
        $siblings.css('transition',`opacity 0ms`);

        $active.css('z-Index',1);
        $siblings.css('z-Index',0);
        $active.css('opacity',1).on('transitionend',function(){
           // transitionend: 当css3过渡动画结束后触发的事件
           // 特殊注意的是，如果是多个样式执行了过渡效果，则当前事件被触发多次
        });
        $siblings.css('opacity',0);
        // $paginationList.eq(activeIndex).attr('class','active').siblings().attr('class','');
        autoFocus();
    }

    // 自动轮播
    let autoMove = function(){
        
        // 1. 每一次进来步长累加，累加到超过边界，则从头开始
        activeIndex++;
        activeIndex >= length?activeIndex=0:null;

        // 2. 实现切换
        change();
    };

    // 焦点对齐
    let autoFocus = function(){

        $paginationList.each((index,item)=>{
            $item = $(item);
            if(index === activeIndex){
                $item.addClass('active');
                return;
            }
            $item.removeClass('active');
        })
    };

    // 鼠标滑过页签切换图片
    // 给焦点绑定触发的事件
    let handlePagination = function(){
        // 要获得activeIndex并且实现切换效果
        $paginationList.mouseover(function(){
            $this = $(this);
            activeIndex = $this.index();
            change();
        });
    };

    // 点击左右按钮实现切换
    let handleButton=function(){
        // 右按钮就是直接切换
        $buttonNext.on('click',debounce(autoMove(),speed,true));

        // 左按钮要边界判断
        $buttonPrev.on('click', throttle(()=>{
            console.log('kef');
            activeIndex--;
            if(activeIndex<0) activeIndex = length-1;
            change();
        },speed,true) );
    };

    return {
        init(){
            // ajax采用异步编程，我们需要在获取到数据后
            // 才能进行数据绑定，轮播图处理等事情
            // 此时我们可以基于回调函数来完成这件事
            queryData(function(data){
                // data就是从服务器获取的数据
                bindHTML(data);
                length = data.length;
                autoTimer = setInterval(autoMove, interval);

              /*   // 鼠标进来清空timer，鼠标移除开启timer
                $container.mouseenter(()=>{
                    clearInterval(autoTimer);
                }).mouseleave(()=>{
                    autoTimer = setInterval(autoMove, interval);
                }); */

                handlePagination();
                handleButton();
            });

              // 鼠标进来清空timer，鼠标移除开启timer
            //   这一段放外面也可以，因为它也是异步的
              $container.mouseenter(()=>{
                clearInterval(autoTimer);
            }).mouseleave(()=>{
                autoTimer = setInterval(autoMove, interval);
            });
        }
    };    
})();

// bannerModule.init();