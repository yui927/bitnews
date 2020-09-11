// $(function() {
//   // 点击“去注册账号”的链接
//   $('#link_reg').on('click', function() {
//     $('.login-box').hide()
//     $('.reg-box').show()
//   })

//   // 点击“去登录”的链接
//   $('#link_login').on('click', function() {
//     $('.login-box').show()
//     $('.reg-box').hide()
//   })

//   // 从 layui 中获取 form 对象
//   var form = layui.form
//   var layer = layui.layer
//   // 通过 form.verify() 函数自定义校验规则
//   form.verify({
//     // 自定义了一个叫做 pwd 校验规则
//     pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
//     // 校验两次密码是否一致的规则
//     repwd: function(value) {
//       // 通过形参拿到的是确认密码框中的内容
//       // 还需要拿到密码框中的内容
//       // 然后进行一次等于的判断
//       // 如果判断失败,则return一个提示消息即可
//       var pwd = $('.reg-box [name=password]').val()
//       if (pwd !== value) {
//         return '两次密码不一致！'
//       }
//     }
//   })

//   // 监听注册表单的提交事件
//   $('#form_reg').on('submit', function(e) {
//     // 1. 阻止默认的提交行为
//     e.preventDefault()
//     // 2. 发起Ajax的POST请求
//     var data = {
//       username: $('#form_reg [name=username]').val(),
//       password: $('#form_reg [name=password]').val()
//     }
//     $.post('/api/reguser', data, function(res) {
//       if (res.status !== 0) {
//         return layer.msg(res.message)
//       }
//       layer.msg('注册成功，请登录！')
//       // 模拟人的点击行为
//       $('#link_login').click()
//     })
//   })

//   // 监听登录表单的提交事件
//   $('#form_login').submit(function(e) {
//     // 阻止默认提交行为
//     e.preventDefault()
//     $.ajax({
//       url: '/api/login',
//       method: 'POST',
//       // 快速获取表单中的数据
//       data: $(this).serialize(),
//       success: function(res) {
//         if (res.status !== 0) {
//           return layer.msg('登录失败！')
//         }
//         layer.msg('登录成功！')
//         // 将登录成功得到的 token 字符串，保存到 localStorage 中
//         localStorage.setItem('token', res.token)
//         // 跳转到后台主页
//         location.href = '/index.html'
//       }
//     })
//   })
// })

$(function () {
  /*登录和注册切换*/
  //点击去注册账号的链接
  $("#link_reg").on("click", function () {
    $(".reg-box").show()
    $(".login-box").hide()
  })
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  })

  /*form表单验证规则*/
  //从layui中获取form对象
  var form = layui.form
  //通过form.verify()函数自定义检测规则
  form.verify({
    //\S指不能有空格
    pwd: [/^[\S]{6,12}$/, "密码必须是6到12位，且不能出现空格"],
    repwd: function (value) {
      //通过形参拿到的是再次确认密码框中的内容
      //还要拿到密码框的内容
      //把两个密码做个判断
      //结果不一致就提示
      var mima = $(".reg-box [name=password]").val()
      if (mima != value) {
        return "两次密码不一致"
      }
    }
  })

  //和form一样，layer也是layui内置方法，接收layui的layer方法
  var layer = layui.layer
  //监听表单注册事件
  $("#form-reg").on("submit", function (e) {
    e.preventDefault()
    $.post("/api/reguser",
      {
        username: $("#form-reg [name=username]").val(),
        password: $("#form-reg [name=password]").val()
      }, function (res) {
         if(res.status!=0){
           //注册失败
          return layer.msg(res.message);
        }
        //注册成功，res.message是后台写好了返回结果
        layer.msg(res.message)
        $("#link_login").click()
      }
    )
  })

  //监听表单登录事件
  $("#form-login").submit(function(e){
    e.preventDefault()
    $.ajax({
      url:"/api/login",
      //快速获取表单中的数据
      data:$(this).serialize(),
      method:"post",
      success:function(res){
        if(res.status!=0){
          return layer.msg(res.message)
        }
        // //登录成功
        layer.msg(res.message)
        // 将登录成功之后的token值存到localStorage中,因为只有登录的时候才有这个token值
        localStorage.setItem("token",res.token)
        //跳转到后台主页
        location.href = "./index.html"
      }
    })
  })
})