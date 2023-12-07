      // 
      let arr = [1,2,3,3,2,1,2,3,1,2,3,1,2]

      /**
       * 方案一 ： 是个办法 不推荐 方法很多 临时尝试的一种
       *    用for循环foreach 循环遍利每一项，每一项都查看新数组里有没有存在
       *    不存在加入，存在return
       * 
      */
      let _arr = arr.sort((n,m) => n - m)
      console.log(_arr); // 升序排列之后的数组
      let done = null // 标记点
      let copyArr = []

      _arr.forEach(item => {
        // 但是ie6-8 不兼容includes
        if(copyArr.includes(item)) return;
        copyArr.push(item);
      })


   /*    _arr.forEach((item,index) => {
          let idx = _arr.lastIndexOf(item)
          if(idx !== done) {
              done = idx
              copyArr.push(done)
          }
          console.log(copyArr); // 标记点集合 
      }) */
      let result = []
      copyArr.forEach(item => {
          result = [...result,..._arr.slice(item,item+1)]
      })
      console.log('去重之后的结果',result);

      /**
       * 方案二： 更容易操作理解  但不兼容ie6~8
       * 
      */
      
      let Arr = [1,2,3,3,2,1,2,3,1,2,3,1,2]
      let _Arr = [] // 声明接收的空数组
      Arr.forEach(item => {
          if(!_Arr.includes(item)) {
              _Arr.push(item)
          }
      })
      console.log('去重之后的新数组',_Arr);


      

      /**
       * 方案三: 递归查找
       * 
      */

      let as = [1,2,3,3,2,1,2,3,1,2,3,1,2,4,6,4,8,2,1,3,4,5,1,56]
      function uniq(nums){
          let right = null
          let _as = nums.sort((n,m) => n - m)
          console.log('_As',_as);
          for(let i = 0 ;i < _as.length - 1; i++) {
              right = _as[i + 1]
              if(_as[i] == right) {
                  let f = _as.splice(i,1) // 到这里因为改变了数组的长度 所以应该按照最新数组长度进行递归重新查找
                  return uniq(_as)
              }
          }
          return _as
      }
      console.log('uniq',uniq(as)); // [1, 2, 3, 4, 5, 6, 8, 56]

      /** 方案4：利用双重for循环 */
      let ds = [1,2,3,3,2,1,2,3,1,2,3,1,2,4,6,4,8,2,1,3,4,5,1,56]
      // let ds = [1,2,3,3,2,1,2,3,1,2,3,1,2]
      function _uniq (nums){
          for(let i = 0;i < nums.length; i++) {
              for(let j = i + 1 ;j < nums.length;j++){
                  if(nums[i] == nums[j]) {
                      nums.splice(i,1) // 数组塌陷 因为splice的使用原来的数组长度减少了 所以不能i++需要i--抵消 使用递归也可以
                      i--
                      // return _uniq(nums)
                  }
              }
          }
          return nums
      }
      console.log('_uniq',_uniq(ds));
      

      /**
       * 创建一个对象去重
       */
      let arr2 = [1,2,1,3,1,2,3,2,3];

      let obj = {};

      for(let i = 0; i<arr2.length; i++){
        let item = arr2[i];
        if(obj[item] === undefined){
            obj[item] = item;
            continue;
        }

        /*
        arr2.splice(i,1);
        i--; //防止数组塌陷
      //基于splice实现删除性能不好：当前项被删后，后面每一项的索引都有向前提一位，如果后面内容过多，一定影响性能
            */
           //另一种防塌陷，把重复的放到末尾，然后数组长度减一
           arr2[i] = arr2[arr2.length-1];
           arr2.length--;
           
      }

      console.log(arr2);

      
      // 封装成函数
      function rmDuplicate(arr2){
        let arr2 = [1,2,1,3,1,2,3,2,3];

        let obj = {};
  
        for(let i = 0; i<arr2.length; i++){
          let item = arr2[i];
          if(obj[item] === undefined){
              obj[item] = item;
              continue;
          }
  
          /*
          arr2.splice(i,1);
          i--; //防止数组塌陷
        //基于splice实现删除性能不好：当前项被删后，后面每一项的索引都有向前提一位，如果后面内容过多，一定影响性能
              */
             //另一种防塌陷，把重复的放到末尾，然后数组长度减一
             arr2[i] = arr2[arr2.length-1];
             arr2.length--;
             
        }
        return arr2;
      }