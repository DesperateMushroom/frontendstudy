let cartModule = (function($){

    // 0. 建立变量
    let $listAry = $('.list>li');
    console.log($listAry);

    let $listEmAdd = $('.list>li>em'),
        $listPerMinus = $('.list>li>span>strong:first-child');
        $listUnitTotal = $('.list>li>span>strong:last-child');
        console.log($listEmAdd, $listPerMinus,$listUnitTotal);
    
    $listEmAdd.each((index,item)=>{
        
        let $item = $(item);
        let unitPrice =Number( ($($listPerMinus[index])).text().replace(/\$/g,''));
        // console.log(unitPrice);

        $item.on('click',function(){
            // console.log($item.html);
            let count = Number($item.text())+1;
            let totalPrice = count * unitPrice;
            $item.text(count); 
            $($listUnitTotal[index]).text("\$"+totalPrice);
        })

    
        
    })

    $listPerMinus.each((index,item)=>{
        
        let $item = $(item);
        let unitPrice =Number( ($($listPerMinus[index])).text().replace(/\$/g,''));
        // console.log(unitPrice);

        $item.on('click',function(){
            let $count = $($listEmAdd[index]);
            // console.log($item.html);
            let count = Number($count.text());
            // console.log(count);
            if(count === 0) return;

            let totalPrice =Number($($listUnitTotal[index]).text().replace(/\$/g,'')) ;
            console.log(totalPrice);
            $count.text(count-1); 

            totalPrice = totalPrice - unitPrice;
            $($listUnitTotal[index]).text("\$"+totalPrice);
        })

    
        
    })



    // 1. 获取参数

    // 2. 绑定点击

    return {
        init(){

        }

    }

})(jQuery);

cartModule.init();