$(".edit").click(function(){
    
    let catid=$(this).data("catid");
    $("#catname"+catid).hide();
    $("#editcatname"+catid).show();
})
$(".save").click(function(){
    let catid=$(this).data("catid");
    let catname=$("#editcatname"+catid).val();
    $.ajax({
        url:"/admin/category/edit",
        data:{CatID:catid,CatName:catname},
        type:"POST",
        dataType:"json"
    }).done(function(result){
        if (result)
        {
            $("#editcatname"+catid).val(catname);
            $("#catname"+catid).text(catname);
            $("#editcatname"+catid).hide();
            $("#catname"+catid).show();
        }
    })
})
$('.add').click(function(){
    $("#add").show();
    $("#catnameadd").hide();
    $("#editcatnameadd").show();
    $(".save").click(function(){
        let catname=$("#editcatnameadd").val();
        $.ajax({
            url:"/admin/category/add",
            data:{CatName:catname},
            type:"POST",
            dataType:"json"
        }).done(function(result){
            if (result)
            {
                $("#add").hide();
                $("#editcatnameadd").empty();
                window.location.href = "/admin/category";
            }
        })
    });
})
$(".del").click(function(){
    let catid=$(this).data("catid");
    $.ajax({
        url:"/admin/category/del",
        data:{catid:catid},
        type:"POST",
        dataType:"json"
    }).done(function(result){
        if (result)
        {
            window.location.href = "/admin/category";
        }
    })
})
