let bannerModule = (function(){

    // 获取所有要操作的元素
    let $container = $('.container'),
        $wrapper = $container.children('.wrapper'),
        $changeLeft = $container.find('.changeLeft'),
        $changeRight = $container.find('.changeRight'),
        $pagination = $container.find('.pagination'),
        $paginationList = $pagination.find('li');


    let step = 0,
        autoTimer = null;

    // 自动轮播
    function autoMove(){
        step ++;
        if(step>=5){
            $wrapper.css('left',0);
            step = 1;
        }

        $wrapper.stop().animate({
            left: -step * 1100
        },300,'linear');
        // $wrapper.css('transform','translateX('+(-step * 1100)+'px)');

        // 自动焦点对齐
        autoFocus();

    }

    // 自动对焦
    function autoFocus(){
        $paginationList.each((index,item)=>{
            let $item = $(item);
            if(index === step){
                // $item.attr('class','active');
                $item.addClass('active');
            }
            else if(index===0&&step===4){
                // $item.attr('class','active');
                $item.addClass('active');
            }
            else{
                // $item.attr('class','');
                $item.removeClass('active');
            }
        });
    }

    // 点击焦点切换到指定位置
    function handlePagination(){
        // 获取点击到的索引，将图切换到该索引，最后自动对焦
        // 每一个页签都要绑定点击事件
        $paginationList.click(function(){
            step = $(this).index();
            console.log(step);
            $wrapper.stop().animate({
                left: -step*1100
            },300);
            autoFocus();
        })
    }
    

    // 点击按钮处理
    function handleArrow(){
        // 右按钮 (和自动轮播一样)
        // 可以添加防抖处理，防止用户点击多次
        $changeRight.click(autoMove);

        // 做按钮处理
        $changeLeft.click(function(){
            
            step--;
            if(step<0){
                $wrapper.css('left',-4*1100);
                step = 3;
            }
            $wrapper.stop().animate({
                left: -step * 1100
            },300,'linear');
            // $wrapper.css('transform','translateX('+(-step * 1100)+'px)');
    
            // 自动焦点对齐
            autoFocus();
        })
    }

    return {
        init(){
            autoTimer = setInterval(autoMove,3000);
            
            // 控制自动轮播的暂停和开始
            $container.on('mouseenter',()=>clearInterval(autoTimer))
            .on('mouseleave',()=>autoTimer = setInterval(autoMove,3000));

            // 焦点点击
            handlePagination();
            
            // 按钮点击
            handleArrow();
          
        }
    };
})();


bannerModule.init();

// let $container = $('.container'),
//     $wrapper = $container.children('.wrapper');

// // timer: 存储自动轮播的定时器
// // step：当前展示的是索引为n的slider
// let timer = null,
//     step = 0;

// // autoMove: 开启自动轮播    
// function autoMove(){
//     // 让wrapper向左移动
//     step++;
//    /* 
//     jq中不支持某些css3的参数，所以可以让wrapper相对container定位，用left/top来换位
//     在css中加入position:absolute
//    $wrapper.stop().animate({
//         transform:`translateX(${-step*1100}px)`
//     },300,'linear'); */

//     if(step>=5){
//         // 上一次显示的克隆的第一帧
//         // 此时我们让其立即跳转到真实的第一张 left:0
//         // 然后再让其运动到第二张即可
//         $wrapper.css('left',0);
//         step = 1;
//         // console.log('clone');
        
//     }
//     // jq中的animate动画库，不支持css3中的transform样式改变
//     $wrapper.stop().animate({
//         left: -step*1100 // 这里不用加px，因为jq会自动帮我们加上
//     },300);

// }

// // 无缝衔接
// // 1. 把第一帧克隆一份到到末尾，wrapper比真实多一张
// // 2. 到最后一帧切换到克隆图是，瞬间跳回真实的第一帧（肉眼看不出来

// timer = setInterval(autoMove, 2000);