/**
 * JQUERY: extend  向jq内部扩展方法
 *  // 向jq的原型上扩展方法（写插件, 所有jq的实例都可以用
 *   $.fn.extend({xxx:function(){} })
 *   用法：$('.box').xxx();
 * 
 *  // 向jq对象中增加私有的属性方法【完善类库，提供更多工具类方法
 *   $.extend({xxx:function(){}})
 *   用法：$.xxx()
 */

~function($){
    if(typeof $ === 'undefined' ){
        // throw new Error() 抛出异常信息，此时下面的代码不再执行
        throw new Error('当前插件必须依托jquery才可实现');
    }

 /*    function debounce(func, wait, immediate){
        let result = null,
            timeout = null;

        // 返回一个可以被执行的函数
        return function (...args){
            let context = this,
                now = immediate && !timeout;
            clearTimeout(timeout); //  在设置新的定时器之前，我们要把之前设置的定时器都干掉
                                    // 因为防抖的目的是等待时间内，只执行一次
            timeout = setTimeout(()=>{
                if(!immediate) result = func.call(context,...args);
                // clearTimeout(timeout);
                timeout=null;   
            },wait);
            // 只有当现在立马被执行且没有别的定时器的时候才触发
            if(now){
                result = func.call(context,...args);
            }
        }
    }

    let throttle = function (func, wait){
        let timeout = null,
            result = null,
            previous = 0; // 上次执行的时间点
        
        return function (...args){
            let now = new Date,
                context = this;
            
            // remaining小于等于0，表示上次执行至此缩减个时间已经超过了一个时间间隔
            let remaining = wait - (now-previous);
            if(remaining<=0){
                clearTimeout(timeout);
                previous = now;
                timeout = null;
                result = func.apply(context, args);
            }
            else if(!timeout){
                timeout = setTimeout(()=>{
                    previous = new Date;
                    timeout = null;
                    result = func.apply(context, args);
                },remaining);
            }
            return result;
        };

    }; */

    // banner plugin: 只封装和轮播图相关的功能（自动轮播，焦点触发，左右按钮
    // 防抖和节流是标配
    function bannerPlugin(){
        // this: 要实现轮播图的容器（原生js对象）
        let $this = $(this),
            $wrapper = $this.find('.wrapper'),
            $pagination = $this.find('.pagination'),
            $buttonPrev = $this.find('.changeLeft'),
            $buttonNext = $this.find('.changeRight'),
            $paginationList = $pagination.find('li'),
            $slideList = $wrapper.find('.slide'); // 这个插件建立在有数据的情况下才能用

         // 设置轮播图需要的变量    
        let autoTimer = null,
            interval = 2000,
            speed = 300,
            activeIndex = 0,
            length = $slideList.length;
            
        
        // 实现切换，单独提取出来，因为有多个地方需要使用
        let change = function(){
            console.log('change');
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
                console.log(activeIndex);
                $this = $(this);
                activeIndex = $this.index();
                change();
            });
        };

        // 点击左右按钮实现切换
        let handleButton=function(){
            // 右按钮就是直接切换
            $buttonNext.on('click',autoMove());

            // 左按钮要边界判断
            $buttonPrev.on('click', _.throttle(()=>{
                console.log('kef');
                activeIndex--;
                if(activeIndex<0) activeIndex = length-1;
                change();
            },speed,true) );
        };


        autoTimer = setInterval(autoMove, interval);
          handlePagination();
          handleButton();
          $this.mouseenter(()=>{
            clearInterval(autoTimer);
            }).mouseleave(()=>{
                autoTimer = setInterval(autoMove, interval);
            });
    }


    $.fn.extend({
        // -> bannerPlugin:bannerPlugin
        // 在es6中可以这么写
        bannerPlugin
    })

}(jQuery);


// 使用，实例.bannerPlugin
$('.container').bannerPlugin();
// $('#container2').bannerPlugin();