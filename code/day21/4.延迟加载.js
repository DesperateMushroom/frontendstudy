/**
 * 图片完全显示出来的条件
 *  A：盒子底边距离body（页面最顶端）的距离：盒子的高度+盒子据body的上偏移
 *  B：浏览器底边距离body的距离：一屏幕的高度 + 卷去的高度
 * 
 *  A <= B 盒子就完全出现在用户的视野中
 * 
 * 让图片显示
 *  获取图片trueImg属性的值，赋值给src属性，当图片能正常加载出来后，让图片显示即可
 * 
 */
// 想操作谁就先获得谁
let imgBox = document.querySelector(".imgBox");
let _img = imgBox.querySelector('img');


// 显示图片
// curImg: 要显示的图片
function lazyImg(curImg){
    // 给src赋值真实的图片地址
    let trueImg = curImg.getAttribute('trueImg');
    curImg.src = trueImg;

    // 校验图片地址是否正确，图片是否能够正常加载出啦
    curImg.onload = function(){
        // img.onload 事件用来监听图片是否能加载
        curImg.style.display = 'block';
    };

    
    // 设置自定义属性：isLoaded存储当前图片已经加载过了
    curImg.isLoaded = true;


}

// 监听页面滚动事件 （不论基于什么方式，只要页面滚动了，则触发事件）
window.onscroll = function(){
    // -> 已经加载过就不要再重复加载了
    if(_img.isLoaded){
        return;
    }

    let HTML = document.documentElement;
    let B = HTML.clientHeight + HTML.scrollTop;
    let A = imgBox.clientHeight + offset(imgBox).top; 
    // -> 当前案例中，获取距离body的上偏移完全可以imgBox.offsetTop,
    //    因为父级参照物就是body

    if( A <= B ) {
        // 符合图片显示的条件了
        lazyImg(_img);
    }

};




        /**
         * offset：获取当前元素距离body的左/上偏移（不论其父级参照物是谁）
         *  @params: current Element
         *  @return：[object] 包含上/左偏移的信息 -> {top:xxx, left:xxx}
         */
        function offset(curEle) {
            let parent = curEle.offsetParent,
                left = curEle.offsetLeft,
                top = curEle.offsetTop;
            
            
            // 存在父级参照物
            while(parent){

               

                // 在原有的偏移的基础上累加：父参照物的边框，父参照物的偏移
                if(/MSIE 8\.0/.test(navigator.userAgent)){
                    // ie8中偏移值自己就算了边框了，不需要我们再加边框的值
                    // navigator.userAgent 获取当前浏览器的版本信息
                    left += parent.clientLeft;
                    top += parent.clientTop;
                }
                left += parent.offsetLeft;
                top += parent.offsetTop;

                // 继续获取上级参照物
                parent = parent.offsetParent;
                
            }

            return {
                'top': top,
                'left':left
            };
        }