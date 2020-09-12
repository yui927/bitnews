$(function(){
//密码验证规则
    var form = layui.form
   form.verify({
       pad:[/^[\S]{6,12}$/,"密码必须为6到12位，且不能出现空格!"],
       //value是指使用samepad这个验证规则的输入框的值，这里是确认密码框的值
       samepad:function(value){
        if(value===$('.layui-form [name=oldPwd]').val()){
            return "新旧密码不能相同！"      
       }
       
       },
       //这里的value是确认密码input中的值
       repad:function(value){
           //与新密码做对比，看两者是否一致
       if(value!==$('.layui-form [name=newPwd]').val()){
         return "两次密码不一致！"
       }
    }
   })

//提交密码框
   $(".layui-form").submit(function(e){
   e.preventDefault()
   $.ajax({
    url: "/my/updatepwd",
    method: "post",
    data: $(this).serialize(),
    success: function (res) {
        if (res.status !== 0) {
            return layui.layer.msg(res.message)
           
        }
         //重置表单  有一个reset方法，但是注意这个重置方法只有原生dom才能使用，jquery不能使用
        layui.layer.msg(res.message)
        $(".layui-form")[0].reset()
        //jquery对象转为dom对象两种方式  //$("div")[index] index是索引号    $("div").get(index)
        //修改密码成功后需要清除token
        localStorage.removeItem("token")
        //跳转回登陆页面
        top.window.location.href = "/login.html"

    }
    

   })
})

})