$(".tabnew").click(function(){
    let id=$(this).attr("href");
    $(".tab-pane").removeClass("active");
    $(id).addClass("active");
})
$(".vote").click(function(){
    $(".vote").removeClass("btn-primary");
    $(".vote").removeAttr("id");
    $(this).addClass("btn-primary");
    $(this).attr("id","checked");
})
$("#sellerform").submit(function(e){
    e.preventDefault();
    let ID_User=$("#ID_User").val();
    let Name=$("#Name").val();
    let Scored=$("#Scored").val();
    $.get(`/upseller/${ID_User}/${Name}/${Scored}`, function(ketqua) {
       if (ketqua.result==true) 
       {
           $("#swal2-title").text("Đã gửi yêu cầu!");
       }
       else 
       {
           if (ketqua.result==-1)
           {
            $("#swal2-title").text("Bạn đã trở thành seller rồi!");
           }
           else $("#swal2-title").text("Bạn đã gửi yêu cầu rồi! Hãy chờ admin duyệt");
      
       }
       $("#alert1").show();
    });
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
        url:'/account/evaluate_list_win',
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