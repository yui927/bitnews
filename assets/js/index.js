$(function () {
    //进入页面就调用getUserInfo获取用户基本信息
    getUserInfo();
    //获取用户基本信息
    function getUserInfo() {
        $.ajax({
            //get是默认的，可以忽略不写
            method: "get",
            url: "/my/userinfo",
            //因为这次请求的接口是一个有权限的接口，所以必须设置一个headers一个请求头，但是因为很多都要用到请求头每次写就很麻烦
            //所以统一写在baseAPI.js中
            // headers: {
            //     // 如果本地没有就为空
            //     Authorization: localStorage.getItem("token") || ""
            // },

            //成功走success函数
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg("获取用户信息失败！")
                }

                //获取成功的话调用renderAvater渲染用户的头像
                renderAvater(res.data)
            },
           
            //失败调用error函数
              
            //无论成功还是失败都会调用complete函数,这个就是为了防止用户不登录直接在网址输入首页地址
            // complete:function(res){
            //   console.log(res);
            //   if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //       //清除token
            //       localStorage.removeItem("token")
            //       //跳转回登录界面
            //       location.href = "/login.html"
            //   }
            // }

        })
    }

    //渲染用户的头像
    function renderAvater(user) {
        // console.log(user);
        //1.获取用户的名称
        var name = user.nickname || user.username;
        //2.设置欢迎的文本
        $("#welcome").html("欢迎&nbsp&nbsp;" + name)
        //3.按需渲染用户的头像
        if (user.user_pic !== null) {
            //有图片头像，显示图片头像，隐藏文字头像
            //attr是对src属性进行设置
            $(".layui-nav-img").attr("src", user.user_pic).show()
            $(".text-avater").hide()
        } else {
            //没有图片头像就隐藏图片，显示文本
            //获取用户名称的第一个字,toUpperCase()获取的字首字母大写
            var first = name[0].toUpperCase()
            $(".text-avater").html(first).show()//这个是图片里的字大写
            $(".layui-nav-img").hide()
        }
    }

    //退出功能
    $("#loginout").on("click", function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //1.清空本地存储的token
            localStorage.removeItem("token")
            //2.重新跳转到登陆页面
            location.href = "/login.html"
            //关闭confirm询问框
            layer.close(index);
        });

    })
})