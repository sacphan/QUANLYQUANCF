$(".del").click(function(){
    let proid=$(this).data("proid");
    $.ajax({
        url:"/admin/products/del",
        data:{ProID:proid},
        type:"POST",
        dataType:"json"
    }).done(function(result){
        if (result)
        {
            location.reload();
        }
    })
})