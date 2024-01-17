~ function () {
    // 第一步：从服务器获取需要展示的数据，然后绑定到页面中

    // 1: 基于ajax获取服务器端数据，把数据存储到DATA中
    let DATA = null;

    // 如何用ajax获取数据
    // a. 创建ajax实例
    let xhr = new XMLHttpRequest; // XMLHttpRequest 就是ajax请求的一个内置类

    // b. 打开一个请求链接，基于get请求和同步编程完成
    // 参数1：请求方式
    // 参数2：请求地址
    // 参数3：false
    // 除了参数2，其他两个参数都是固定的
    xhr.open('GET', 'json/production.json', false);

    // c. 监听服务器返回的状态信息（在http状态码为200，请求状态为4的时候能拿到数据）
    // 监听就是一个事件绑定
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 基于responseText获取相应回来的信息 (JSON字符串)
            DATA = xhr.responseText;
        }
    };


    // d. 发送ajax请求
    xhr.send();
    // console.log(DATA); // typeof DATA = string

    // e. 把获取的JSON字符串转换为对象
    DATA = JSON.parse(DATA);
    console.log(DATA[1].id);


    // 2. 把获取的数据展示在页面当中
    // 根据获取的DATA，DATA中有多少项，就动态创建出多少个card盒子
    // 项目中都是基于字符串拼接的方式，把需要创建的card拼出来
    let htmlStr = '';
    DATA.forEach(item => {
        // 解构赋值
        let {
            id,
            title,
            price,
            time,
            hot,
            img 
        } = item;


        // item是每一项信息（对象），包含需要展示的每一个产品的详细信息
        // 我们需要拿出每一项信息展示到页面中（拼到模板字符串中）
        // 把需要的数据绑定在元素card的自定义属性data-xxx上
        // 后期需要这些数据，直接基于自定义属性获取即可
        // 在元素的<>里写相当于 setAttribute，下面用getAttribute 获取即可 
        htmlStr += `<div class="col" data-price="${price}" 
                                    data-hot="${hot}"
                                    data-time="${time}" >
                        <div class="card h-100">
                            <img src="${img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h4 class="card-title">${title}</h4>
                                <p class="card-text"> $ ${price} </p>
                                <p class="card-text"> 好评: ${hot}</p>
                                <p class="card-text"></p>  <small class="text-body-secondary">
                                上架时间: ${time}</small></p>
                            </div>
                            <div class="card-footer">
                                <small class="text-body-secondary">Last updated 3 mins ago</small>
                            </div>
                        </div>
                    </div>`;
    });

    // console.log(htmlStr);
    
    // 把拼接好的字符串，放到页面指定容器中<div class="row row-cols-1 row-cols-md-3 g-4">
    let cardDeck = document.querySelector('.g-4');
    cardDeck.innerHTML = htmlStr;


    // 第二步：点击价格/热度/上架时间，可以把内容按照升序降序排列
    // 1. 想操作谁先获取谁（三个排序按钮）和所有的card产品内容
    let navList = document.querySelectorAll('.nav-item');
    let cardList = document.querySelectorAll('.g-4 .col'); // 获得的是类数组，不能用sort方法

    // console.log(navList);
    // console.log(cardDeck);

    // 2. 先实现按照价格的升序排序
    // 设置data-type自定义属性记录排序的状态（1升序  -1降序）
/*     navList[1]['data-type']=-1;
    console.log(cardList);
    navList[1].onclick = function(){
        // 控制升降序切换
        this['data-type'] *= -1;

        // 把类数组转换为数组，目的是为了使用sort进行排序
        // cardDeck = [...cardDeck];
        // 或者
        cardDeck = [].slice.call(cardDeck,0);
        // console.log(cardDeck);
        // 进行排序（按照每个产品中的价格进行升序）
        cardDeck.sort((next,curr)=>{
            // next 和 curr存储的是元素对象
            // 此时我们需要使用每个元素的价格：在数据绑定的时候，
            //          我们就把价格等信息绑定给当前元素的某个自定义属性，
            //          此时需要使用的时候，直接基于自定义属性的方法获取到即可

            let curPrice = curr.getAttribute('data-price');
            let nextPrice = next.getAttribute('data-price');
            // consol(e.log(curPrice, nextPrice);
            return (nextPrice - curPrice) * this['data-type'];
            // 这个this是箭头函数所属上下文的this
        });

         // 以上只是让数据排好序，但是页面中的结构还没有改
        // 我们需要按照当前的顺序，把每一个card重新增加到容器中才可以
       
        cardDeck.forEach(item => {
            cardList.appendChild(item);
        });
        console.log(cardList);
    }
 */
    

    // 第三步：点击实现升降序排序

    // 循环给所有的按钮绑定点击事件，点击的时候按照指定的规则排序
    for(let i = 0; i<navList.length; i++){
        let item = navList[i];

        item['data-type'] = -1; // 控制升降序


        item.onclick = function(){
            // 点击当前某个按钮，让其按照升降序切换，而其余的都应该回归-1

            [].forEach.call(navList, item => {
                if(item === this){
                    //当前按钮继续按照升降序切换
                    this['data-type'] *= -1;
                }
                else{
                    // 其余的都变成-1
                    item['data-type'] = -1;
                }
            })

            cardList = [].slice.call(cardList,0);
            cardList.sort((next,cur) => {
                // 获取当前按钮记录的排序方式
                let sort = this.getAttribute('data-sort');
                cur = cur.getAttribute(sort);
                next = next.getAttribute(sort);

                if(sort === 'data-time'){
                    // 获取的是日期数据，我们要把字符串中的 - 给去掉
                    cur = cur.replace(/-/g, '');
                    next = next.replace(/-/g, '');
                }

                return (next-cur) * this['data-type'];
            });

            cardList.forEach( item => cardDeck.appendChild(item));
        }
    }


}();




