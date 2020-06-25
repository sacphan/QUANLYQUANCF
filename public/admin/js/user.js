$(".edit").click(function(){
    
    let userid=$(this).data("userid");
    $("#Role"+userid).hide();
    $("#selectRole"+userid).show();
})
$(".save").click(function(){
    let userid=$(this).data("userid");
   
    let role=$("#selectRole"+userid+" option:selected"). val();
  
    $.ajax({
        url:"/admin/user/edit",
        data:{role:role,userid:userid},
        type:"POST",
        dataType:"json"
    }).done(function(result){
        if (result)
        {
           location.reload();
        }
    })
})