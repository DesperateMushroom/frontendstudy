let filter = (function($){

    // 准备两组数据
    let _SELECTED = [{
        // 第一个的默认数据
        type:1,
        name:'苹果'
    }];

    let _DATA = [
        {
            type:1,
            text:"品牌",
            content:["苹果","小米","锤子","魅族","华为","三星","OPPO","VIVO","乐视","360","中兴","索尼"]

        },
        {
            type:2,
            text:"尺寸",
            content:["3.0英寸以下","3.0-3.9英寸","4.0-4.5英寸","4.6-4.9英寸","5.0-5.5英寸","6英寸以上"]
        },
        {
            type:3,
            text:"系统",
            content:["安卓","苹果（iOS）","微软(windowsPhone)","无","其他"]
        },
        {
            type:4,
            text:"网络",
            content:["联通3G","双卡单4G","双卡双4G","联通4G","电信4G","移动"]
        }
    ]


    // =》 需要操作的元素
    let $typeBox = $('#type'),
        $chooseBox = $('#choose');

    // => 根据数据渲染视图
    function render(){
        // 待选取数据
        let str = ``;
        _DATA.forEach(item => {
            let {type, text,content} = item;
         /*    let contentText = ``;
            content.forEach(contentItem=>{
                contentText += `<a href="javascript:;">${contentItem}&nbsp&nbsp&nbsp&nbsp </a>`;
            }) */
            str += `<li data-type=${type}>
                        ${text}：
                        ${content.map(A=>{
                            return `<a href="javascript:;">&nbsp;&nbsp;${A}&nbsp;&nbsp; </a>`;
                        }).join('')}
                    </li>`;
        });

        $typeBox.html(str);

        
        // -> 选择区
        str = `  你的选择：\n`;

        //绑定之前先根据type排序
        _SELECTED.sort((A,B)=> A.type - B.type );

        _SELECTED.forEach(item=>{
            str += `<mark>
                        ${item.name} <a href="javascript:;" data-type=${item.type}>X</a>
                    </mark>`
        });

        // html() 会覆盖原理的内容
        $chooseBox.html(str);

        // 渲染完后，绑定事件
        handle();
        handleSelected();
    }

    // => 待选区绑定点击事件
    function handle(){
        $typeBox.find('a').click(function(){
            let $this = $(this),
                obj = {};

            // 构建存储的内容
            obj.type = parseFloat( $this.parent().attr('data-type'));
            obj.name = $this.text().trim(); // 添加文本并且去除首尾空格
            // console.log(obj);
            
            // 点击谁就把谁存储到_SELECTED里
            // 1. 存储之前，先看看原有数组中是否存在type和当前存储这一项相同的，
            //    有相同的就要干掉，（同一个类别的只能存储一个）
            _SELECTED.forEach((item,index)=>{

                // item.type存的是数字，obj.type存的是字符串，所以要先把obj.type转型
                if (item.type === obj.type){
                    _SELECTED.splice(index,1);
                }
            });
            _SELECTED.push(obj);
            // console.log(_SELECTED);

            // 重新渲染
            render();
        });
      
        
    }


    // => 已选区绑定点击事件
    function handleSelected(){
        // 点击的时候在_SELECTED里删除这一项
        $chooseBox.find('a').click(function(){
            let $this = $(this),
                myType = parseFloat($this.attr('data-type'));
            
            _SELECTED.forEach( (item,index)=>{
                if(item.type === myType){
                    _SELECTED.splice(index,1);
                }
            })
            render();
        });
    }

    return {
        init(){
            render();
        }
    }
})(jQuery);

filter.init();
