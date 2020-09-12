// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
// options对象 包括accepts、crossDomain、contentType、url、async、type、headers、error、dataType等许多参数选项
  //统一为有权限的接口，设置headers请求头
  //注意判断：只有以/my开头的请求路径才需要加headers
  if (options.url.indexOf("/my") != -1) {
    options.headers = {
      // 如果本地没有就为空
      Authorization: localStorage.getItem("token") || ""
    }
  }
options.complete = function(res){
  if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
      //清除token
      localStorage.removeItem("token")
      //跳转回登录界面
      location.href = "/login.html"
  }
}
})
