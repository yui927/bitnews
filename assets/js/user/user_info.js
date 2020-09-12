$(function () {
    //验证规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称必须在1到6个字符'
            }
        }
    })

    //获取用户基本信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            type: "get",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }

                //渲染数据
                //layui表单赋值，res.data是想展示的数据
                //注意：如果想赋值成功，后台返回的字段需要和name中的字段一致，会显示到对应的name位置
                form.val("formUserInfo", res.data)
            }
        })
    }


    //重置表单
    $("#result").on("click", function (e) {
        //阻止默认行为
        e.preventDefault()
        //重新渲染用户基本信息
        initUserInfo()
    })

    /*更新基本资料 */
    $("#changeUserInfo").submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: "/my/userinfo",
            method: "post",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                //主体页面都是写在iframe里面的
                //调用父页面的方法，可以使用window.parent
                // window.parent.getUserInfo()
                console.log(window.parent)
            }
        })
    })
})