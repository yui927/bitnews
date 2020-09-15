$(function () {
    /*获取文章类别*/
    articleType()
    function articleType() {
        $.ajax({
            url: "/my/article/cates",
            method: "get",
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg("初始化文章分类失败！")
                }
                //渲染模板引擎
                var textHTML = template("tpl-select", res)
                $("#selecet-form [name=cate_id]").html(textHTML)
                //需要用form()重新渲染
                layui.form.render()
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()


    /*裁剪区域*/

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").click(function () {
        $("#coverFile").click()
    })

    // 如何拿到图片？
    $("#coverFile").change(function (e) {
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


    //发布和存草稿
    var art_state = '已发布'
    //点击草稿的时候把数据改为草稿
    $("#save").on("click", function () {
        var art_state = "草稿"
    })

    //表单提交
    $("#selecet-form").on("submit", function (e) {
        e.preventDefault()
        //根据form表单生成FormData对象
        var fd = new FormData($(this)[0])//jquery转dom
        fd.append("state", art_state)
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publish(fd)
            })
    })

    //发布文章请求
    function publish(fd) {
        $.ajax({
            url: '/my/article/add',
            method: "post",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("文章发布成功！")
                location.href = "/article/art_list.html"
            }
        })
    }
})