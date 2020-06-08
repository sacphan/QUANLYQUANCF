

 $(".watchlist").click(function(){
  let ProID=$(this).attr("data-proid");
  let ProName=$(this).attr("data-proname");
  $.get(`/watchlist/${ProID}/${ProName}`, function(ketqua) {
    
     
        $("#swal2-title").text("Đã thêm vào danh sách yêu thích!");
    // }
    // else $("#swal2-title").text("Sản phẩm đã có trong danh sách yêu thích rồi!");
    $("#alert1").show();
  });
})
  