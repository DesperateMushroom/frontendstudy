/**
 * 细节知识点
 *  1. 我们封装公共方法的时候，如果需要传递的参数过多（more than 2
 *     则不要定义为形参，让用户依次传递，这样会受到
 *     顺序，传或者不传等因素的影响，管理起来很复杂
 *     我们可以把需要传递的值，统一放到一个对象中
 *     一般都是options, 这样我们传递的信息，可传可不传
 *     顺序也随便，最后把传递的信息覆盖默认的信息即可
 *     方便管理，也方便进行二次扩展
 * 
 *  2. 我们把后期需要用到的信息都挂载到当前类的实例上，
 *     这样后面不管在哪个方法中用这些信息，只要能获取到实例
 *     直接通过实例获取即可
 * 
 *  3. 本插件中需要使用的工具类方法，我们一般放到类的私有属性上（把Banner当成普通对象
 * 
 *  代码最后可以用uglifyJs 进行压缩
 */
~ function () {

    // es6写法
    /* Banner：渐隐渐现轮播图插件 */
    class Banner {
        constructor(selector, options = {}) {
            // 参数初始化
            this.initialParams(options);

            // 如果没传selector，抛出异常
            if (!selector) throw new ReferenceError('selector must be passed');

            // 获取需要操作的容器
            // 判断selector是js元素还是需要找的元素

            if (typeof selector === 'string') {
                this.container = document.querySelector(selector);
            } else if (selector.nodeType) {
                this.container = selector;
            }


            this.wrapper = this.container.querySelector('.wrapper');
            this.slideList = this.wrapper.querySelectorAll('.slide');
            this.autoTimer = null;
            this.activeIndex = this.initialSlide;
            this.count = this.slideList.length;
            // console.log(this);


            // 初始展示slide（防止样式中默认展示
            // 不写的话，轮播会从activeIndex开始，但是初始展示的不是传进来的那一张
            [].forEach.call(this.slideList, (item, index) => {
                if (index === this.initialSlide) {
                    item.style.opacity = 1;
                    item.style.zIndex = 1;
                } else {
                    item.style.opacity = 0;
                    item.style.zIndex = 0;
                }
            })


            // bind原理：返回一个匿名函数，绑定事件，把匿名函数返回给定时器


            // 如果用户传进来的autoplay是null证明用户不想让其自动轮播(或许用户想要点击切换轮播效果)
            // 判断是否为null，不为null的执行自动轮播
            if (this.autoplay) {
                // let anonymous = this.autoMove.bind(this);
                // 开始执行轮播图效果
                this.autoTimer = setInterval(this.autoMove.bind(this), this.autoplay);
                // 当过了autoplay这么长时间后，autoMove里的this已经不是实例了，会被window替代，因为这里的autoMove相当于回调函数 
                // 用bind提前改变this指向, bind里的this就会一直指向此类的实例

                // 鼠标滑过暂停，离开开启事件
                this.container.addEventListener('mouseenter', () => {
                    clearInterval(this.autoTimer);
                    this.autoTimer = null;
                });
                this.container.addEventListener('mouseleave', () => {
                    this.autoTimer = setInterval(this.autoMove.bind(this), this.autoplay);
                });

            }


            // 分页器处理
            // 有pagination并且pagination里传入了页签的名字才处理
            if (this.pagination && this.pagination.el) {
                this.handlePagination();
            }



            // 前进和后退按钮处理
            // 同理，有navigation才处理
            if (this.navigation) {
                console.log(navigation);

                this.handleButton();
            }


            // 钩子函数的处理
            // 初始化成功
            this.on && this.on.init && this.on.init.call(this, this);

        }

        // 直接在这里写的会写在Banner.prototype上
        // Banner.prototype
        /**
         * initialParams: 初始化插件的参数配置信息
         */
        initialParams(options) {
            // 1. 首先设置默认的参数信息
            let _default = {
                initialSlide: 0, // 初始展示slide的索引
                speed: 300, // 切换动画的速度
                autoplay: 3000, // 每间隔3000ms自动切换一次
                pagination: {
                    // 设置分页器
                    el: '.pagination',
                    // 焦点操作是否触发轮播图切换，不设置则为不触发
                    // 想要触发请给触发事件类型
                    triggerEvent: 'click'
                },
                navigation: {
                    // 设置前进后退按钮
                    nextEl: '.button-next',
                    prevEl: '.button-prev',
                    hide: true //默认隐藏，鼠标进入容器才显示
                },
                // 设置生命周期函数（钩子函数  
                on: {
                    // 初始化成功
                    init: function (examp) {
                        // this:当前创建的Banner类的实例
                        // examp等同于this
                    },
                    transitionStart: function (examp) {},
                    transitionEnd: function (examp) {}

                }


            };

            // 2. 把传递进来的options中的信息替换_default中的信息
            // 外层 -> 里层
            for (let key in options) {
                if (!options.hasOwnProperty(key)) break;

                if (/^(pagination|navigation|on)$/i.test(key)) continue;
                _default[key] = options[key];

            }

            //2.2 二级对象单独处理
            // => pagination
            let pagination = options.pagination; // 如果传了就是传进来的那个，如果没传就是一个空对象
            if (pagination !== null) {
                pagination = pagination || {};
                for (let key in pagination) {
                    if (!pagination.hasOwnProperty(key)) break;
                    _default['pagination'][key] = pagination[key];
                }
            } else {
                _default['pagination'] = null;
            }


            // => navigation
            let navigation = options.navigation;
            if (navigation !== null) {
                navigation = navigation || {};

                for (let key in navigation) {
                    if (!navigation.hasOwnProperty(key)) break;
                    _default['navigation'][key] = navigation[key];
                }
            } else {
                _default['navigation'] = null;
            }

            // => on
            let _on = options.on;
            if (_on !== null) {
                _on = _on || {};
                for (let key in _on) {
                    if (!_on.hasOwnProperty(key)) break;
                    _default['on'][key] = _on[key];
                }
            } else {
                _default['on'] = null;
            }


            // ↓ 简便写法
            // 解构赋值，取别名，设置默认参
            /* let {
                pagination = {},
                navigation = {},
                on:_on = {}
            } = options; */

            // 3. 把处理好的信息挂载到实例上
            for (let key in _default) {
                if (!_default.hasOwnProperty(key)) break;
                this[key] = _default[key];
            }

            // console.log(this);
        }


        /* 实现轮播图切换 */
        // 用原生js，不是用jquery
        change() {
            // 动画开始前的钩子函数 
            // this.on && this.on.transitionStart && this.on.transitionStart.call(this,this);

            // 不能这么写，因为slideList是类数组，不是数组，要先将其转为数组
            // this.slideList.forEach((item,index)=>{    })
            [].forEach.call(this.slideList, (item, index) => {
                /// this: 实例
                if (this.activeIndex === index) {
                    // 当前要操作的slide
                    // 基于css3中的transition实现动画
                    item.style.zIndex = 1;
                    item.style.transition = `opacity ${this.speed}ms`;

                } else {
                    // 其余的slide
                    item.style.zIndex = 0;
                    item.style.transition = `opacity 0ms`;
                }



                // 开始动画
                let active = this.slideList[this.activeIndex];
                active.style.opacity = 1;

                active.addEventListener('transitionend', () => {
                    // addEventListener: dom2级事件绑定


                });

                [].forEach.call(this.slideList, (item, index) => {
                    if (index !== this.activeIndex) {
                        item.style.opacity = 0;
                    }
                })



            });

            // 动画结束后的钩子函数
            //  this.on && this.on.transitionEnd && this.on.transitionEnd.call(this,this);




            // 焦点对齐
            if (this.paginationList) {
                [].forEach.call(this.paginationList, (item, index) => {
                    if (index === this.activeIndex) {
                        item.className = "active";
                    } else {
                        item.className = '';
                    }
                })
            }
        }

        /* 自动轮播 */
        autoMove() {
            // console.log('mpve');
            this.activeIndex++;
            this.activeIndex >= this.count ? this.activeIndex = 0 : null;

            this.change();

        }


        /* 分页器处理 */
        handlePagination() {
            // 获取分页器盒子，动态创建内容
            this.paginationBox = this.container.querySelector(this.pagination.el);
            let str = ``;
            for (let i = 0; i < this.count; i++) {
                str += `<span class='${i===this.activeIndex?'active':''}'></span>`;
            }
            this.paginationBox.innerHTML = str;
            this.paginationList = this.paginationBox.querySelectorAll('span');
            console.log(this.paginationList);


            // 是否焦点触发切换
            if (this.pagination.triggerEvent) {
                [].forEach.call(this.paginationList, (item, index) => {
                    item.addEventListener(this.pagination.triggerEvent,
                        Banner.throttle(() => {
                            // console.log('111');
                            this.activeIndex = index;
                            this.change();
                        }, 500))
                })
            }
        }


        /* 前进和后退按钮处理 */
        handleButton() {
            this.prevEl = this.container.querySelector(this.navigation.prevEl);
            this.nextEl = this.container.querySelector(this.navigation.nextEl);

            this.prevEl.addEventListener('click', Banner.throttle(() => {
                this.activeIndex--;
                if (this.activeIndex < 0) {
                    this.activeIndex = this.count - 1;
                }
                // console.log('pre');
                this.change();
            }), 300);

            // 给当前元素某个实际行为绑定方法，方法中的this是元素本身而不是实例，
            // 要把this指向实例要用bind处理一下
            /*     this.nextEl.addEventListener('click',()=>{
                    // 用箭头函数这个this就是实例本身
                //    this.activeIndex++;
                    // if(this.activeIndex>=this.count) this.activeIndex=0;
                    // console.log('next'); 
                    // this.change();
                    this.autoMove();
                }); */

            // 不用箭头函数这个function就是回调函数，this是元素本身
            this.nextEl.addEventListener('click', this.autoMove.bind(this));


            // 显示隐藏的处理
            if (!this.navigation.hide) {
                this.prevEl.style.display = 'block';
                this.nextEl.style.display = 'block';
            }
        }

        /* 钩子函数的处理 */
        // 初始化成功



        /* 设置私有的方法 */
        static throttle(func, wait) {
            let timer = null,
                result = null,
                previous = 0;

            return function anonymous(...args) {
                let context = this,
                    now = new Date,
                    spanTime = wait - (now - previous);

                if (spanTime <= 0) {
                    result = func.call(context, ...args);
                    clearTimeout(timer);
                    timer = null;
                    previous = null;
                } else {
                    timer = setTimeout(() => {
                        result = func.call(context, ...args);
                        timer = null;
                        previous = new Date;
                    }, spanTime);
                }

                return result;

            }
        }

    }




    // 暴露出来
    window.Banner = Banner;
}();


// new Banner('.container',{
//     autoplay:2000,
//     speed:300,
//     pagination:{
//         triggerEvent:null
//     }
// });

/**
 * 枚举属性 可枚举或者不可枚举
 *  =》 在for in 遍历循环的时候可以被迭代到的，就是可枚举属性
 *      反之是不可枚举的
 * 
 *  =》 可枚举的：
 *      1. 一般自己设置的私有属性方法 或者 公有的属性方法都是可枚举的
 *          
 */
/* Object.prototype.AAA = 'eeee'; // 这个也会被迭代到，也属于可枚举
let obj = {
    name:'珠峰',
    year:10
    // __proto__: Object.prototype
};

for(let key in obj){
    // 如果obj上没有这个私有属性，不继续遍历，因为不想遍历这个公有属性
    if(!obj.hasOwnProperty(key)) break;
} */
/* 
function Fn(){
    this.x = 100;

}
Fn.prototype.y = 200;
let f = new Fn;
for(let key in f){
    console.log(key);
    // x y 
} */