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