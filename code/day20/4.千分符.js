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
    


    /**
     * queryURLParams: 获取url地址问号后面的参数信息（可能也包含hash值
     *  @params
     *  @return
     *      [object]把所有问号参数信息以键值对的方式存储起来,并且返回
     * 
     */
    function queryURLParams(){
        let obj = {};

        // 正则规则：要获取等号左右两边的键值。
        //          特殊符号不能取：? = # & 不能取
       let reg = /([^?=&#]+)=([^?=&#]+)/g;

       this.replace(reg, (...[,$1,$2])=> obj[$1] = $2 );

       this.replace(/#([^&?=#]+)/g,(...[,$1])=> obj['HASH'] = $1);
       return obj;
    }


    /**
     * millimeter: 实现大数字的千分符处理
     *  @params
     *  @return
     *      [string]千分符后的字符串
     */
    function millimeter(){
        let reg = /\d{1,3}(?=(\d{3})+$)/g;

        return this.replace(reg,(content)=>{return content + ","});


    }



    /* 扩展到内置内String.prototype上 */
    // String.prototype.formatTime = formatTime;
    ["formatTime", "queryURLParams", "millimeter"].forEach(item=>{
        // 扩展方法多的时候可以用这种方法添加到prototype上
        String.prototype[item] = eval(item);
    });

}();

let num = "2244221133"; // => "15,628,954" 千分符
num =num.millimeter();
console.log(num);

// 不用正则
// 1. 先倒过来
// 2. 每三个加一个，
/* num = num.split('').reverse().join('');
for(let i = 2 ;i<num.length; i+=3){
    let f = num.substring(0,i+1);
    let r = num.substring(i+1);
    num = f+","+r;
    i++;
}
console.log(num);
num = num.split('').reverse().join(''); */