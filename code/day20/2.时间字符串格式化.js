~function(){
    /**
     * formatTime: 时间字符串的格式化处理
     *  @params
     *      template：【string】我们最后期望获取日期格式的模板
     *      模板规则：{0}->年  {1~5} -> 月日时分秒
     *  @return
     *      [string]格式化后的时间字符串
     */

    function formatTime(template = "{0}年{1}月{2}日 {3}时{4}分{5}秒"){
        // 1. 首先获取时间字符串中的年月日等信息
        let timeAry = this.match(/\d+/g);
        // console.log(timeAry);

        template = template.replace(/\{(\d+)\}/g, (content, $1)=>{
            // content : {num} 本次大正则匹配的信息
            // $1: num;     本次小分组单独匹配的信息

            // 以$1作为索引，到timeAry中找到对应的时间
            let time = timeAry[$1] || "00"; // 防止$1的下标不存在，没有用"00"补
            if(time.length < 2) time = "0"+time;

            // 你返回的是啥，就相当于把这个大正则替换成了什么
            return time;
        });
        return template;
    }
    

    /* 扩展到内置内String.prototype上 */
    // String.prototype.formatTime = formatTime;
    ["formatTime"].forEach(item=>{
        // 扩展方法多的时候可以用这种方法添加到prototype上
        String.prototype[item] = eval(item);
    });

  


}();



let time = "2019-8-13 16:51:3";
// => 服务器获取的
// "2019-8-13 16:51:3"
// "2019/8/13 16:51:3"
// => 想要转变为的格式
// "08月13日  16时51分"
// "2019年08月13日"
// "2019年08月13日 16时51分03秒"
// 。。。
// 用户传入格式就用用户的格式
time = time.formatTime("{0}/{1}/{2}");
console.log(time);

time = "2019-8-13";
time = time.formatTime();
console.log(time);