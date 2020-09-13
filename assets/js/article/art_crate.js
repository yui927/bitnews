$(function(){
    /*获取文章类型*/
    getCrate()
    function getCrate(){
        $.ajax({
            url:"/my/article/cates",
            type:"get",
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                console.log(res);
                // 使用模板引擎
                //数据必须是一个对象res
                var tableHtml = template("tpl-table",res)
                $("tbody").html(tableHtml)
            }         
        })
    }


    /*添加类别*/
    var index = null
    $("#btnadd").on("click",function(){
        //layui规定每弹出一个弹出层，都会返回一个索引index，作用是用来关闭弹出层
       index = layer.open({
            type: 1,
            title: '添加文章分类', 
            area: ['400px', '300px'],
            content: $("#dialog-add").html() //这里content是一个普通的String
          });
    })


    //因为这是个模板，没办法直接监听，所以使用事件委托进行添加文章分类
    $("body").on("click","#addcateFORM",function(e){
        e.preventDefault();
        $.ajax({
            method:"post",
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res){
               if(res.status!==0){
                   return layui.layer.msg("添加失败")
               }
               layui.layer.msg("添加成功")
               //关闭弹出层
               layer.close(index)
               //重新获取新闻列表
               getCrate()
            }

            
        })
    })
})