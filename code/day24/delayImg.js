/* let $imgBox = $('.imgBox'),
    $img = $imgBox.children('img'),
    $window = $(window);

// 等到页面中所有资源加载完后再执行
// 滚轮的时候也会加载
// JQ中的事件绑定：支持多事件绑定：window.onload & window.onscroll 两个事件触发的时候执行相同的事情
$(window).on('load scroll', function(){
    if($img.attr('isLoad') === 'true') {
        // 之前加载过则不会重新加载
        return;
    }
    let $A = $imgBox.outerHeight() + $imgBox.offset().top; // 1400
    let $B = $window.outerHeight() + $window.scrollTop();
 
    if($A <= $B){
        // 加载真实图片
        let dataImg = $img.attr('data-img');
        $img.attr('src',dataImg);
        $img.on('load',function(){
            // 加载成功：fadeIn是JQ中的渐现动画
            // $img.css('display','block'); //直接出现
            $img.stop().fadeIn(); // 渐变效果
        });
        $img.attr('isLoad',true);// attr存储的自定义属性值都是字符串格式 "true"
    }
}); */

let $container = $('.container'),
    $imgBoxes = null,
    $window = $(window);

// 造点假数据
let str = ``;
// 创建长度为20的数组，每一项用null填充
new Array(20).fill(null).forEach(item=>{
    str += `<div class="imgBox">
    <img src=""
    alt="" data-img="https://i2.hdslb.com/bfs/archive/4d9d81c12716da8b602942786f9fe8dd0c8ef0cb.jpg@672w_378h_1c_!web-home-common-cover.avif">
        </div> `
});

$container.html(str);
$imgBoxes = $container.children('.imgBox');

// 多张图片延迟加载
$window.on('load scroll',function(){
    // $B：获取浏览器底边框距离body的距离
    let $B = $window.outerHeight() + $window.scrollTop();
    $imgBoxes.each((index,item)=>{
        // 循环每一个图片区域，根据自己区域距离body的距离，计算出里面的图片是否加载
        let $item = $(item);
        let $itemA = $item.outerHeight() + $item.offset().top;
        let isLoad = $item.attr(('isLoad'));
        if($itemA<=$B && isLoad !== 'true'){
            $item.attr('isLoad',true);
             // 加载真实图片
             let $img = $item.children('img');
            let dataImg = $img.attr('data-img');
            $img.attr('src',dataImg);
            $img.on('load',function(){
                // 加载成功：fadeIn是JQ中的渐现动画
                // $img.css('display','block'); //直接出现
                $img.stop().fadeIn(); // 渐变效果
            });
            $img.attr('isLoad',true);// attr存储的自定义属性值都是字符串格式 "true"
        }
    });

    
});