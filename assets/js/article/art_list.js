$(function () {
    //定义一个查询的参数对象,将来请求数据的时候,需要将这个查询参数上传到服务器
    var query = {
        pagenum: 1,//当前的页码值
        pagesize: 20,//每页显示的条数,默认2条
        cate_id: "",//文章分类的id
        state: ""//文章的状态,已发布和草稿
    }


    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //用插件定义时间
    // res.data.foreach(function(item){
    //     item.pub_data = dayjs(item.pub_data).format('')
    // })

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }


    /*获取文章列表*/
    initTable()
    function initTable() {
        $.ajax({
            url: "/my/article/list",
            method: "get",
            data: query,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                //渲染模板引擎
                var textHTML = template("tpl-table", res)
                //数据添加到tbody中
                $("tbody").html(textHTML)
            }
        })
    }

    /*获取渲染所有分类*/
    initCate()
    //首先进入列表区就要获取到所有数据列表
    function initCate() {
        $.ajax({
            url: "/my/article/cates",
            method: "get",
            success: function (res) {
                console.log(res.data)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                //用模板引擎渲染数据
                var listHTML = template("tpl-list", res)
                $(".layui-form [name = cate_id]").html(listHTML)
                //必须调用layui中的form.render()方法,通知layui重新渲染表单区域的结构,这样才能获取的数据
                layui.form.render()
            }
        })
    }

    // 筛选区域,这是个表单
    // $("#selectall").submit(function (e) {
    //     e.preventDefault()
    //     var id = $('[name = cate_id]').val()
    //     var state = $('[name = state]').val()
    //     query.cate_id = id
    //     query.state = state
    //     initTable()
    // })
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        query.cate_id = cate_id
        query.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })
})