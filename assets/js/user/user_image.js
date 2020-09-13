$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    
    // 1.2 配置选项
    const options = {
        // 纵横比，也就是指定裁剪框是啥样的，可以设置16/9 或者 4/3等
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //点击上传的时候，模拟用户点击file
    $("#choose").click(function () {
        $("#file").click()
    })

    // 如何拿到图片？
    $("#file").change(function (e) {
        //获取到上传的文件  
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layui.layer.msg("请重新选择文件")
        }
        //1.拿到用户选择的文件
        var file = e.target.files[0]
        //2.根据选择的文件，创建一个对应的 URL 地址，因为image的url需要一个地址：
        var newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    //为确定按钮绑定点击事件
    $("#makesure").on("click", function () {
  
        //1.要拿到用户裁剪后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')  // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

            var layer = layui.layer
        //2.调用接口，把头像上传到服务器
        $.ajax({
            method: "post",
            url: '/my/update/avatar',
            data: {
                avatar: dataURL//将用户新头像作为数据传进服务器
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更换头像失败！")
                }

                layer.msg("更换头像成功!")
                //然后重新更新下用户信息，用window.parent调用父亲的方法，重新渲染头像
                top.window.parent.getUserInfo()
            }
        })

    })
})