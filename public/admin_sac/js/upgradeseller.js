$(".duyet").click(function(){
    let userid=$(this).data("userid");
   
   
  
    $.ajax({
        url:"/admin/upgradeseller/duyet",
        data:{userid:userid},
        type:"POST",
        dataType:"json"
    }).done(function(result){
        if (result)
        {
           location.reload();
        }
    })
})

$(".tuchoi").click(function(){
    let userid=$(this).data("userid");
   
   
  
    $.ajax({
        url:"/admin/upgradeseller/tuchoi",
        data:{userid:userid},
        type:"POST",
        dataType:"json"
    }).done(function(result){
        if (result)
        {
           location.reload();
        }
    })
})

