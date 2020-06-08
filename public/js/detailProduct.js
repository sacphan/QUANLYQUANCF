$("#requestplacebidform").click(function(e){
    e.preventDefault();
    let ID_SELLER=$(this).data("sellerid");
    let PROID=$(this).data("proid");
    let PRONAME=$(this).data("proname");
    let USERNAME=$(this).data("USERNAME");
    $.get(`/products/request_placebid/${ID_SELLER}/${PROID}/${PRONAME}/${USERNAME}`, function(ketqua) {
        if (ketqua.result) 
        {
            $("#swal2-title").text("Đã gửi yêu cầu đến seller!");
        }
        else $("#swal2-title").text("Bạn đã gửi yêu cầu đến seller rồi!");
        $("#alert1").show();
      });
})

// $("#addcomment").click(function (e) {
//     e.preventDefault();
//     let comment=$("#comment").text();
//     comment=comment+"\n\n"+moment().format("DD-MM-YYYY hh:mm:ss")+"\n\n"+$("#tinymce").html();
//     console.log(comment);
// })

$(".duyet").click(function(){
    let userid=$(this).data("userid");
    let sellerid=$(this).data("idseller");
    let proid=$(this).data("idpro");
   
  
    $.ajax({
        url:"/products/requestaution/duyet",
        data:{
            userid:userid,
            sellerid:sellerid,
            proid:proid
        },
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
    let sellerid=$(this).data("idseller");
    let proid=$(this).data("idpro");
   
  
    $.ajax({
        url:"/products/requestaution/tuchoi",
        data:{
            userid:userid,
            sellerid:sellerid,
            proid:proid
        },
        type:"POST",
        dataType:"json"
    }).done(function(result){
        if (result)
        {
           location.reload();
        }
    })
})