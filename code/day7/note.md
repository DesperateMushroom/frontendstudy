### 字符串中常用的方法
> 所有用单引号，双引号，反引号 包起来的都是字符串
```
 // 每一个字符串都是由零到多个字符组成的
    str = 'abcdefghijklmnop'
    str[0] // 获取索引为0 第一个 字符
    str[str.length-1] //=> 获取最后一个字符，str.length-1最后一项索引
    str[10000] //-> undefined 不存在这个索引


    for(let i = 0; i<str.length; i++){
        console.log(str[i]); 
    }
```

` charAt/charCodeAt `

` indexOf / lastIndexOf `
` toUpperCase / toLowerCase `

` split(分隔符): 把字符串按照指定的分隔符拆分成数组`

` replace `
` match `
` localCompare `
` trim/trimLeft/trimRight ` 
...
控制台输出String.prototype查看左右字符串中提供的方法

>实现一个方法queryURLParameter 获取一个url地址问号后面传递的参数信息



> 实现一个最low的验证码：数字 字母共四位
> 验证码的目的：防止外挂程序恶意批量注入