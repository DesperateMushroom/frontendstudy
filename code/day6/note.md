### 1. Math
> 数学函数：但是他不是函数，他是一个对象，对象中存储了很多操作数字的属性方法，因此被称为数学函数

##### Math中常用的属性和方法
1. Math.abs([num value]);
> 获取绝对值(绝对值永远是正数或者0)

2. Math.ceil/floor([num value])
>  把一个数向上取整 / 向下取整

3. Math.round()
> 四舍五入


4. Math.max / min([val1],[val2]...)
> 获取一堆数中的最大值和最小值

5. Math.sqrt /pow()
> sqrt: 给一个数开平方
> pow：计算一个数的多少次幂

6. Math.random()
> 获取0～1之间的随机小数

扩展：获取[n-m]之间的随机整数
> 包含n也包含m
Math.round(Math.random()*(m-n)+n);


### 数组及数组中常用的方法
> 数组是对象数据类型的， 它属于特殊的对象

##### 1. 数组中常用的方法
- 方法的作用和含义
- 方法的实参（类型含义
- 方法的返回值
- 原来的数组是否会发生改变

** 实现数组增删改的方法 **
> 这一部分方法都会修改原有的数组
` push `
> push：向数组末尾增加内容
    @params：多个任意类型
    @return：新增后数组的长度

` unshift `
> unshift: 向数组开始位置增加内容
    @params：多个任意类型
    @return：新增后数组的长度

` shift `
> shift：删除数组中的第一项
    @params：
    @return：删除的那一项

` pop `
> pop：删除数组中的最后一项
    @params：
    @return：删除的那一项

` splice `
> splice: 实现数组的增加，删除，修改
    @params：n，m都是数字，从索引n（包含）开始删除m个元素（m不写就是删除到末尾
    @return：把删除的部分用新数组存储起来返回


###### 2. 数组的查询和拼接
> 此组学习的方法，原来的数组不会变
` slice `  
    slice：实现数组的查询
    @params
        n m都是数字，从索引n开始，找到索引为m的地方，不包括m
    @return
        把找到的内容以一个新数组形式返回/


###### 3. 把数组转换为字符串
` concat `
    concat: 实现数组拼接
    @params
        多个任意类型值
    @return
        拼接好后的新数组（原来数组不变

` toString `
    toString: 把数组转换为字符串
    @params
    @return
        转换后的字符串（原来数组不变



###### 6. 遍历数组中每一项的方法
` forEach `
    forEach: 遍利数组中的每一项内容
        @params：回调函数
        @return：
` map `
` filter `
` find `
` reduce `


` forEach `
` forEach `
` forEach `
` forEach `

数组的塌陷问题，如果用for循环遍利数组，循环体里删除了某一项元素，此时指针要后退一步，以免跳过了还没遍历的元素