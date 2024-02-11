/* let cartModule = (function($){


  
    // 获取list里的加减号
    let $btns = $('.list i'),
        $counts = $('.list em'),
        $strongs = $('.list strong'),
        $ems = $('.info em');

    console.log($counts, $strongs, $ems);

    // 实现加减号点击事件
    function handleClick(){

        // $btns.each((index,item)=>{
        //     // 给每一个按钮绑定点击事件
        //     $(item).click(function(){
        //         let $this = $(this);
        //         console.log(index);
                
        //     });
        // });


        $btns.click(function(){
            let $this = $(this),
                
                // JQ中的index获取的是元素在兄弟解构中的索引
                n = $this.index(); 
                // console.log(n);
                
                // 根据点击按钮，获取当前行中：
                // 存储的数字，单价，总价这几个元素
                // 可以获得它父元素，然后根据父元素的index获取兄弟姐妹

                let $parent = $this.parent(),
                    $count = $parent.children('em'),
                    $strongs = $parent.find('strong'),
                    $unitPrice = $strongs.eq(0),  // eq获取的依然是jq对象，get获取的是js对象
                    $total = $strongs.eq(1);

                // 0减2加: 根据点击的加减号，计算出最新购买的数量
                let x = parseFloat( $count.html()); // html()方法获得的是字符串
                if(n === 0){
                    // 减号
                    x--; 
                    x<0?x=0:null;
                }
                else{
                    // 加号
                    x++;
                    x>10?x=10:null;
                }

                $count.html(x);

                // -> 获取单价计算总价
                let uPrice = Number($unitPrice.html().replace(/\$/,''));
                $total.html("\$"+uPrice * x);
                
                // 每次点击的时候执行
                computeTotal();
        });
    }


    // 计算总信息
    // 每次点击的时候执行
    function computeTotal(){
        let totalCount = 0,
            totalPrice = 0,
            allPrice = [];

        // 计算总购买数
        $counts.each((index, item)=>{
            totalCount += parseFloat($(item).html());
            console.log(totalCount,$(item).html());

        });
        $ems.eq(0).html(totalCount);

        // 计算总价格
        $strongs.each((index,item)=>{
            item = Number($(item).html().replace(/\$/,''))
            if(index % 2 === 1){
                totalPrice += item;
            }
            else{
                // 只有购买了才能进入比较序列
                if($strongs.eq(index+1).html()!=='$0'){
                    allPrice.push(item);
                // }
                
            }
        });
        console.log(totalPrice);
        $ems.eq(1).html(totalPrice);
        $ems.eq(2).html(Math.max(...allPrice));
    }
        


    return {
        init(){
            handleClick();
            // computeTotal();
        }

    }

})(jQuery);

cartModule.init(); */


// 根据数据模型
let cartModule = (function($){

    let $btns = null; //数据渲染完才能拿到btns

    // -》准备数据模型（页面就是按照数据模型渲染出来的
    let _DATA = [
        {
            id:1,
            count:0,
            price:12.5,
            total:0
        },
        {
            id:2,
            count:0,
            price:10.5,
            total:0
        },
        {
            id:3,
            count:0,
            price:8.5,
            total:0
        },
        {
            id:4,
            count:0,
            price:8,
            total:0
        },
        {
            id:5,
            count:0,
            price:14.5,
            total:0
        }
    ];


    // => render：按照数据模型渲染视图
    function render(){
      // 用数据渲染的话，html里的li就可以不需要了

      // 这里渲染操作区域
      let str = ``;
      $.each(_DATA,(index,item)=>{
        let {count,price,total,id} = item;
        str += ` <li>
                    <i group=${id}>-</i>
                    <em>${count}</em>
                    <i group=${id}>+</i>
                    <span>
                        单价：<strong>$${price}</strong>
                        小计：<strong>$${total}</strong>
                    </span>
                </li> `
        
      });
    //   console.log(str);
      $('.list').html(str);


      // 这里渲染总计信息区视图
      let counts = 0,
          totalPrice = 0,
          maxUnitPrice = 0;
      _DATA.forEach(item=>{
        counts += item.count;
        totalPrice += item.total;
        if(item.count > 0){
            maxUnitPrice = maxUnitPrice>item.price?maxUnitPrice:item.price;
        }
      })
      str = `<span>商品总共：<em>${counts}</em>件</span>
             <span>共花费：<em>${totalPrice}</em>元</span>
            <span>其中最贵的商品单价：<em>${maxUnitPrice}</em>元</span>`;
        
      $('.info').html(str);

      // 执行事件绑定
      handle();
    }


   // => handle: 点击按钮操作（不操作dom，只改变_DATA的数据
    function handle(){
        $btns = $('.list').find('i');
        // console.log($btns);
        $btns.click(function(){
           /*  let $this = $(this),
                n = $this.index(),
                group = parseFloat($this.attr('group')); 
            
                let {count,price,total} = _DATA[group-1];
                
                console.log(n);
            if(n===0){
                // -
                if(count !== 0) {
                    count--;
                    total = count*price;
                }
            }
            else {
                // +
                count++;
                total = count*price;
            }
            _DATA[group-1].count = count;
            _DATA[group-1].total = total;

            console.log(_DATA);
            render(); */
            
            let $this = $(this),
                n = $this.index(),
                group = parseFloat($this.attr('group')); 
            
                _DATA = _DATA.map(item=>{
                    if(item.id===group){
                        if(n===0){
                            item.count--;
                            item.count<0?item.count=0:null;
                        }
                        else{
                            item.count++;
                            item.count>10?item.count=10:null;
                        }
                        
                        item.total = item.count * item.price;
                    }
                    return item;
                });

            //重新渲染
            render();
                
           
     
        });
    }

    return {
        init(){
            render();
        }
    }
})(jQuery); 

cartModule.init();


// vue: MVVM: 数据影响视图，视图影响数据
// react: MVC: 数据影响视图