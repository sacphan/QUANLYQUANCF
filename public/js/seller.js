$(".vote").click(function(){
    $(".vote").removeClass("btn-primary");
    $(".vote").removeAttr("id");
    $(this).addClass("btn-primary");
    $(this).attr("id","checked");
})
$(".edit").click(function(){
    $("#Comment").show();
    $("#showcomment").hide();
})
$(".save").click(function(){
    let UserID=$(this).data("userid");
    let SellerID=$(this).data("sellerid");
    let ProID=$(this).data("proid");
    let Comment=$("#Comment").val().trim();
    
    let Scored=$("#checked").data("value");
    if (!Scored) Scored=0;
    $.ajax({
        url:'/save_history_win',
        dataType:'json',
        type:"POST",
        data:{
            UserID:UserID,
            SellerID:SellerID,
            ProID:ProID,
            Comment:Comment,
            Scored:Scored
        }
    }).done(function(result)
    {
        $("#Comment").val(result.Comment);
        $("#showcomment").text(result.Comment);
        $("#Comment").hide();
        $("#showcomment").show();
    })
})
$(".cancel").click(function() {
    let UserID=$(this).data("userid");
    let SellerID=$(this).data("sellerid");
    let ProID=$(this).data("proid");
   
    let STT=$(this).data("stt");
    let Scored=-1;
    $.ajax({
        url:'/cacelwin',
        dataType:'json',
        type:"POST",
        data:{
            UserID:UserID,
            SellerID:SellerID,
            ProID:ProID,
            Comment:"Người thắng không thanh toán",
            Scored:Scored
        }
    }).done(function(result)
    {
       if (result.result)
       {
           console.log(result.result);
           $("#"+STT).hide();
       }
    })
})