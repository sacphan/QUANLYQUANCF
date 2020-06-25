$(".edit").click(function(){
    
    let id=$(this).data("catid");
    $("#catname"+id).hide();
    $("#editcatname"+id).show();
})
$(".save").click(function(){
    let id=$(this).data("catid");
    let name=$("#editcatname"+id).val();
    $.ajax({
        url:"/admin/categorydetail/edit",
        data:{id:id,name:name},
        type:"POST",
        dataType:"json"
    }).done(function(result){
        if (result)
        {
            $("#editcatname"+id).val(name);
            $("#catname"+id).text(name);
            $("#editcatname"+id).hide();
            $("#catname"+id).show();
        }
    })
})
$('.add').click(function(){
    var catid=$(this).data("catid");
   
    $("#add").show();
    $("#catnameadd").hide();
    $("#editcatnameadd").show();
    $("#saveadd").click(function(){
        let name=$("#editcatnameadd").val();
        $.ajax({
            url:"/admin/categorydetail/add",
            data:{name:name,CatID:catid},
            type:"POST",
            dataType:"json"
        }).done(function(result){
            if (result)
            {
                $("#add").hide();
                $("#editcatnameadd").empty();
                location.reload();
            }
        })
    });
})
$(".del").click(function(){
    let id=$(this).data("catid");
    
    $.ajax({
        url:"/admin/categorydetail/del",
        data:{id:id},
        type:"POST",
        dataType:"json"
    }).done(function(result){
        if (result)
        {
            location.reload();
        }
    })
})
