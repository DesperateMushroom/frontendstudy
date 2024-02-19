/**
 * 瀑布流效果实现
 *  1. 单例模式构建
 *  2. 基于jq开发
 *  3. ajax获取数据和数据绑定
 *  4. 图片懒加载
 *  5. 加载更多数据
 */

/* 
工具模块
let utils = (function(){
    let query=()=>{}
    return {
        query
    }
})();
utils.query(); */


// 业务模块
let flowModule = (function(){
    let $columns = $('.column'),
        _DATA = null; //存储从服务器获得的数据

    
    // queryData: 基于ajax从服务器获取数据
    let queryData = function(){
        // !!!真实项目中都是异步
        $.ajax({
            url:'data.json',
            method:'GET',
            async:false, //不是异步
            success: result=>{
                _DATA=result;
            }
        });
        // console.log(_DATA);
    };

    // 把数据绑定在页面上
    // bindHTML: 实现页面中的数据绑定
    let bindHTML = function(){

        // 可以将_DATA中的三项拎出来，从大到小排，然后把大的插入col的最小的哪里

        // 瀑布流实现原理: 每一次从_DATA中取出三条数据
        //                按照三列由矮到高的顺序依次插入 
        for(let i = 0; i<_DATA.length; i+=3){
            $columns.sort((A,B)=>{
                // A/B是原生js元素对象，要想使用jq方法，需要转换为jq对象
                let $A = $(A),
                    $B = $(B);
                
                // A和B都是一个columns: 一个columns是一个盒子，都有自己的高度
                // 按照每一列的高度排序
                return $A.outerHeight()-$B.outerHeight();
            }).each((index, column)=>{
                let $column = $(column);
                
                let dataItem = _DATA[i+index];
                if(! dataItem){
                    // 没有数据，说明数据都已经处理完了，我们结束循环
                    return false;
                }

                let {
                    pic,
                    width,
                    height,
                    title,
                    link
                } = dataItem;
                
                // index==0 放_DATA[i]
                // index==1 放_DATA[i+1]
                // index==2 放_DATA[i+2]
                // _DATA[i+index] 计算出要往每一列中插入的数据
                $column.append(`
                        <a class="item" href="${link}">
                            <div class="imgBox" style="height:${height}px">
                                <img src="" alt="" data-img="${pic}">
                            </div>
                            <p>
                                ${title}
                            </p>
                        </a>
                `)
            });

          
            
        //   console.log($columns);

            /*   // 在flex布局里，一排元素默认按主轴排列，高度会被统一
            // 所以用float布局，然后清除样式影响
            _DATA[i]
            _DATA[i+1]
            _DATA[i+2] */
          
            
        }


        // 实现图片延迟加载
        // 数据绑定完后，延迟1000ms加载真实图片
        setTimeout(lazyImgs, 1000);
    };

    // 图片延迟加载
    let lazyImgs = function(){
        // 要给每一个imgBox都绑定
        let $imgBoxes = $('.container .column .imgBox[isLoad!="true"]'),
            $window = $(window),
            $B = $window.outerHeight()+$window.scrollTop();
        
        // 循环每个图片，计算其底边距离body的偏移，从而验证是否加载真实图片
        $imgBoxes.each((index, imgBox)=>{

            // console.log(imgBox);
            let $imgBox = $(imgBox),
                $img = $imgBox.children('img'),
                $A = $imgBox.outerHeight()+$imgBox.offset().top;

            if($B>=$A ){
                // 加载真实图片
                $img.attr('src',$img.attr('data-img'));
                $img.on('load',function(){
                    // 加载成功：fadeIn是JQ中的渐现动画
                    // $img.removeAttr('style');
                    $imgBox.attr('style','');
                    // $img.css('display','block'); //直接出现
                    $img.stop().fadeIn(); // 渐变效果
                });
                $imgBox.attr('isLoad','true');
            }
        })
    }


    // 加载更多数据
    let loadMore = function(){
        // 滚动到底端（一屏幕高度+卷去的高度+ 100~500（误差值）>= 页面真实的高度（约等于）
        let $window = $(window),
            winH = $window.outerHeight(),
            scrollT = $window.scrollTop(),
            pageH = $(document).height();

        if(winH + scrollT + 100 >= pageH){
            queryData();
            bindHTML();
        }
        


    }


      /**
          * debounce: 函数的防抖
          *     @param：
          *         func：要执行的函数
          *         wait：间隔等待时间
          *         immediate：在开始边界还是结束边界触发执行（true：在开始边界
          *     @return
          *         可被调用的函数
          */ 
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

    return {
        init(){
            queryData();
            bindHTML();

            let lazyFn = debounce(function(){
                lazyImgs(); loadMore();
            },50);


            window.onscroll = lazyFn;
           /*  // 滚动条滚动处理一些事情
            $(window).on('scroll',function(){
                // 延迟加载图片
                lazyImgs();

                // 滚动到底端（一屏幕高度+卷去的高度+ 100~500（误差值）>= 页面真实的高度（约等于）
                // 加载更多数据
                loadMore();
            } ); */
        }
    }
})();

flowModule.init();