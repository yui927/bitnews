$(function(){
    var form = layui.form
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
    var addindex = null
    $("#btnadd").on("click",function(){
        //layui规定每弹出一个弹出层，都会返回一个索引index，作用是用来关闭弹出层
       addindex = layer.open({
            type: 1,
            title: '添加文章分类', 
            area: ['400px', '300px'],
            content: $("#dialog-add").html() //这里content是一个普通的String
          });
    })


    //因为这是个模板，没办法直接监听，所以使用事件委托进行添加文章分类
    $("body").on("submit","#addcateFORM",function(e){
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
               layer.close(addindex)
               //重新获取新闻列表
               getCrate()
            }          
        })
    })


    /*编辑模块*/ 
    //点击编辑弹框的index
    var editindex = null
    $("body").on("click","#editbtn",function(){
     editindex = layer.open({
        type: 1,
        area: ['400px', '300px'],
        content: $("#dialog-edit").html() //这里content是一个普通的String
      });

      var cateID = $(this).attr("data-id")
      console.log(cateID);
      $.ajax({
          url:`/my/article/cates/${cateID}`,
          method:"get",
          success:function(res){
            form.val("edit-form",res.data)
          }
      })

    })

    //编辑文章分类,修改form表单
    $("body").on("submit","#editcateFORM",function(e){
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/article/updatecate",
            data:$(this).serialize(),
            success:function(res){
               if(res.status!==0){
                   return layui.layer.msg("更新分类数据失败")
               }
               layui.layer.msg("更新分类数据成功")
               //关闭弹出层
               layer.close(editindex)
               //重新获取新闻列表
               getCrate()
            }          
        })
    })


    /*删除 */
    //通过代理的形式为删除按钮绑定点击事件
    $("body").on("click","#btn-delete",function(){
        var cateID = $(this).attr("data-id")
        layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                url:'/my/article/deletecate/' +cateID,
                method:"get",
                success:function(res){
                    if(res.status!==0){
                        return layui.layer.msg("删除失败")
                    }
                    layui.layer.msg("删除成功")
                    //关闭弹出层
                    layer.close(index)
                    //重新获取新闻列表
                    getCrate()
                }
            })
          });
    })
})