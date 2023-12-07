 $ git reset --hard 版本号 

github：

1. settings 用户设置
- profile 修改自己的基本信息
- account 可以修改用户名
- security 修改密码
- emails 

2. 创建仓库 -> 填写信息 -> create repository
    new repository
    - public 公共仓库作为开源的项目
    - private 私有仓库作为内部团队协作管理的项目 
    settings：删除仓库 delete
            -> collaborators：设置协作开发的人员    
    code 可以查看历史版本信息和分支信息

3. 把本地仓库信息提交到远程仓库
```
 建立本地仓库和远程仓库的连接
 查看本地仓库和那些远程仓库保持连接
 $ git remote -v
 让本地仓库和远程仓库新建一个连接 origin是随便其的一个连接名（可以改成自己想要的，不过一般都用这个
 $ git remote add origin [git仓库地址]
 删除关联信息
 $ git remote rm origin
```

```
提交之前最好先拉取
 $ git pull origin master

把本地代码提交到远程仓库（需要输入github用户名和密码 
 $ git push origin master
```

```
$ git clone 远程仓库git地址 [别名：可以不设置，默认为仓库名]
真实项目开发流程
    1. 组长或者负责人先创建中央仓库
    2. 小组成员基于 $ git clone 把远程仓库克隆到本地一份
    （解决了3件事：1.初始化一个本地仓库 "git init"，
                2.和对应的远程仓库也保持了关联"git remote add",
                3.把远程仓库默认内容拉取到本地git pull
    3. 每一个组员写完自己的程序后，基于"git add/git commit" 把自己修改的内容存放到历史区，然后通过"git pull/git push"
        把本地信息和远程仓库信息保持同步即可
```


### NPM
> node package manager: NODE模块管理工具，根据npm我们可以快速安装，卸载所需要的资源文件（ex：jQuery，vue，vue-router。。。
 去node官网下载 lts 安装node后npm也一起安装了
 $ node -v
 $ npm -v 出现版本号就下载成功了

 #### 基于npm进行模块管理
 > www.npmjs.com 基于npm是从npmjs.com 平台上下载安装
 ```
  $ npm install xxx 把模块安装在当前项目中 node_modules
  $ npm install xxx -g 把模块安装在全局环境中
  $ npm i xxx@1.0.0 安装指定版本号的模块  @latest 安装最新
  $ npm view xxx versions > xxx.version.json 查看某个模块的版本信息，输出到指定json文件中


  什么情况下会把模块安装在全局？
    -> 可以使用"命令"对任何的项目进行操作
    -> 通过 $ npm root -g 查看全局安装的目录
    -> 因为在安装目录下生成了 xxx.cmd 的文件，所以我们能使用 xxx 的命令进行操作

  安装在本地项目中的模块
    -> 可以在项目中导入进来使用
    -> 但是默认不能基于命令来操作（因为没有.cmd文件
    -> 但是可以基于package.json 中的scripts，配置一些npm可以执行命令，配置后通过 $ npm run xxx执行  

  $ npm init -y   初始化当前项目的配置依赖清单（项目文件夹的名字不能出现中文大写字母和特殊符号
        -》 创建成功后在当前项目中生产 package.json 的清单文件
        dependencies: 生产依赖模块（开发和项目部署的时候都需要
        devDependencies: 开发依赖模块（只有在开发的时候需要
        scripts: 配置本地可执行命令的

  $ npm i xxx --save  把模块保存在清单生产依赖中
  $ npm i xxx --save-dev  把模块保存在清单开发依赖中
  $ npm install 跑环境，按照清单安装所需的模块

  $ npm root -g 查看全局安装模块的目录
  $ npm uninstall xxx
  $ npm uninstall xxx -g 卸载安装过的模块


=================================================
  一个新项目的开始：
  1. 创建项目文件夹
  2. 把他作为一个新的仓库进行代码管理（可以基于$git clone 把远程仓库克隆下来
  3. 初始化模块配置清单package.json: $npm init -y
  4. 安装所需要的模块：$npm i jquery bootstrap@3 less...
  5. 正常开发
  6. 开发中：可能需要在本地配置命令去完成一些功能（例如less文件编译，此时需要配置npm可执行的命令
  ```
  "scripts{
    "less":"ee",
    "eee":"webpack"...
  }
  ```
  需要编译的时候 $npm run less

  7. 开发中我们需要基于git把文件进行管理：生成对应的历史版本
    提交到暂存区，历史区，远程仓库的时候，项目中很多文件时无须处理和提交的，例如：node_modules, .idea... 不需要提交的，
    我们会生成一个  .gitignore 忽略文件

   ```
    # dependencies
    node_modules

    # testing
    /coverage

    # production
    /build

    # misc
    .DS_Store
    .env.local
    .env.development.local
    .env.test.local 
    .env.production.local 

    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*

    # webStorm
    .idea
   ```
   8. 由于每次git提交的时候，我们都不去提交node_modules,所以团队协作开发中，我们每当拉下来程序后，都需要”跑环境”
   执行 $ npm install, 按照项目中的package.json 中的依赖项信息，把缺失的模块都安装一遍


yarn 和 npm语法基本一样 就把npm换成yarn 