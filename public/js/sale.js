sumjq = function(selector) {
    var sum = 0;
    $(selector).each(function() {
        sum += Number($(this).text());
    });
    return sum;
   
}
function choseStock(name,prince,code,Id)
{
    var idtab = $(".tab-pane.active.taborder").attr("id");
      
        
    var listStock = $(".active table tbody tr");
    
    if (listStock.children().length > 0 && $(`#${Id}-${idtab}-stock .Id`).text()==Id )
    {
        
        var quality = parseInt($(`#${Id}-${idtab}-stock .quality`).text());
        var price = parseInt($(`#${Id}-${idtab}-stock .price`).text());
       
        quality =quality+1;
        $(`#${Id}-${idtab}-stock .quality`).text(quality);
        $(`#${Id}-${idtab}-stock .total`).text(price*quality);
       
    }
    else
    {
        var indexStock = listStock.length ;
        $(".active tbody").append(`
        <tr id="${Id}-${idtab}-stock">
                                        <th scope="row">${indexStock+1}</th>
                                        <td class="Id" style="display:none">${Id}</td>
                                        <td class="code">${code}</td>
                                        <td class="Name">${name}</td>
                                        <td class="quality">1</td>
                                        <td class="price">${prince}</td>
                                        <td class="total">${prince}</td>
                                    </tr>
        `);
    }
  
    var totalquality = sumjq($(".active tbody tr .quality"));
    totalprice = sumjq($(".active tbody tr .total"));
    var discout = $("#discout").val();
    
    $("#totalquality").text(totalquality);
    $("#totalprice").text(totalprice);
    $("#totalresult").text(totalprice-discout);
}
var totalprice = 0;
    $(".carousel-cell").click(function () {
      
        var name =$(this).children()[0].textContent;
        var prince =$(this).children()[1].textContent;
        var code = $(this).children()[3].textContent
        var Id =$(this).children()[2].textContent; 
        
        choseStock(name,prince,code,Id);
    })
    $("#discout").change(function(){
        var discout = $("#discout").val();
        console.log(discout)
       $(".nav-link.taborder.active ").attr("data-discout",`${discout}`);
        $("#totalresult").text(totalprice-discout);
    })
    $("#givenprice").change(function(){
        $("#returnedprice").text($(this).val()-parseInt($("#totalresult").text()) );
    })
$("#btnAddOrder").click(function()
{
    resetpaymenu();
    var qualitytab = $(".navorder").length;
    $(" .taborder").removeClass("active");
 
    $("#tablistorder").append(`
   
                    <li class="nav-item navorder" > <a data-discout="0" onclick="changeorder(hd${qualitytab+1},this)" class="taborder nav-link active navlinkorder " data-toggle="tab" href="#hd${qualitytab+1}" role="tab"
                            aria-selected="false"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span
                                class="hidden-xs-down">Hóa đơn ${qualitytab+1}</span></a> </li>
              
    `)
    $("#tablcontentOrder").append(`
    <div class="tab-pane active navlinkorder taborder" id="hd${qualitytab+1}" role="tabpanel">
    <table class="table">
    <thead>
    <th>#</th>
    <th></th>
    <th>Tên</th>
    <th>Số lượng</th>
    <th>Đơn giá</th>
    <th>Thành tiền</th>
  </thead>
                                <tbody>
                                   
                                   
                                </tbody>
                            </table>
</div>
    `)
    $("#payorder").attr("data-id",qualitytab+1);

})
function resetpaymenu()
{
    totalprice = 0;
    $("#discout").val(0);
    $("#totalquality").text("0");
    $("#totalprice").text("0");
    $("#totalresult").text("0");
    $("#givenprice").val(0);
    $("#returnedprice").text("0");
}

function changeorder(tab,e) {
    debugger
   var discout = parseInt($(e).attr("data-discout")); 
   resetpaymenu();
   var id = $(tab).attr("id");   
    var totalquality = sumjq($(`#${id} tbody tr .quality`));
    totalprice = sumjq($(`#${id} tbody tr .total`));
    
    $("#discout").val(discout>0 ? discout:0);
    $("#totalquality").text(totalquality>0 ? totalquality:0);
    $("#totalprice").text(totalprice>0 ? totalprice:0);
    $("#totalresult").text((totalprice-discout)>0 ? (totalprice-discout):0); 
    $("#payorder").attr("data-id",id);
    
}
function formatPrintOrder()
{
    $("#titledate").text("");
        $("#date").text("")
        $("#tableorder").html("");
        $("#printtotal").text("");
        $("#printck").text("");
        $("#printresult").text("");
}
$("#payorder").click(function(){
    var CashTotal = $("#totalresult").text();

    var CashGiven =  $("#givenprice").val();
    var CashReturned = $("#returnedprice").text();
    var Note = $("#note").val();
 
    var IdCustomer= $("#searchCustomer").attr("data-id");
    var list_tr = $(".tab-pane.active.taborder tr");
  
    var listorderdetail=[];
    for (let index = 1; index < list_tr.length; index++) {
        const element = list_tr[index];
        listorderdetail.push(
            {
                Id_Stock: $(element).find(".Id").text(),
                NameStock:  $(element).find(".Name").text(),
                Quantity:  $(element).find(".quality").text(),
                Prince:   $(element).find(".price").text()
            })
        
    }
    
    if (CashTotal == 0 || CashGiven==0 || CashReturned==0 || CashReturned<0)
    {
        $("#alerterror").text("Bạn chưa nhập đúng hóa đơn");
        $("#alerterror").show();
        return false;
    }
    $.ajax({
        url: '/createorder',
        type: 'POST',
        dataType: 'json',
        data: {
            IdCustomer:IdCustomer,
            CashTotal: CashTotal,
            CashGiven: CashGiven,
            CashReturned:CashReturned,
            Note:Note,
            listorderdetail:listorderdetail
        }
    }).done(function(result) {
       if (result)
       {
        toastr.success('Hóa đơn được thành công!', 'Thông báo')
       }
      
      // formatPrintOrder();
      
        
       let current_datetime = new Date();
       let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear()
           $("#titledate").text(`${formatted_date}`);
           $("#date").text(`Ngày ${current_datetime.getDate()} tháng ${current_datetime.getMonth() + 1} năm ${current_datetime.getFullYear()}`)
           $("#tableorder").html($(".tab-pane.active.taborder").html());
           $("#printtotal").text($("#totalprice").text());
           $("#printck").text($("#discout").val());
           $("#printresult").text($("#totalresult").text());
           $("#printorder").show();
           $("#printorder").printThis({
               importCSS: true,
               importStyle: true,
               loadCSS: "/css/print_rules_sale.css",
               afterPrint: function(){
                   $("#printorder").hide();
                   $("#alerterror").hide();
               }
               });
               resetpaymenu();   
               var idtab = $("#payorder").attr("data-id"); 
               var nav = $("#"+idtab).prev();
               var tab = $(`a[href*="${idtab}"]`).closest("li").prev().find("a");
              if (idtab!="hd1")
              {
                $(".taborder.active").closest("li").remove();             
                $(".taborder.active").remove();
              }
              else
              {
                  $(`#${idtab} tbody`).html("");  
              }
              
              console.log(tab,nav)
               tab.addClass("active");
               nav.addClass("active");
               changeorder(nav,tab) ;
    });
  
           
       
        });

$(document).click(function()
{
    $(".stock-group").hide();
    $(".customer-group").hide();
})
$("#search-stock").click(function () {
    $(".stock-group").show();
    event.stopPropagation();
})
$("#searchCustomer").click(function(){
    $(".customer-group").show();
    event.stopPropagation();
})
$("#search-stock").keydown(function(event){
    var Name = $(this).val();
    $.ajax({
        url: '/stock/search',
        type: 'POST',
        dataType: 'json',
        data: {
            Name:Name
        }
    }).done(function(result) {
        console.log(result);
        $('.stock-group').html("");
        result.forEach(element => {
            $('.stock-group').append(`<li class="list-group-item stock-item" id="${element.Id}">
            <div class="row">
            <div class="col-md-4">
                <img src="${element.Img}"/>
            </div>
             <div class="col-md-8" style="font-size: 12px">
                
                <p class="Name">${element.Name}</p>
               <p> <span class="Code"> ${element.Code}</span> Giá:  <span class="PriceOut"> ${element.PriceOut}</span></p>
                <p>Tồn: <span class="Quantity"> ${element.Quantity}</span></p>
                
            </div>
        </div>
            </li>`);
        });
        $(".stock-item").hover(function(){
            $(".stock-item").removeClass("active");
            $(this).css("cursor","pointer");
            $(this).addClass("active");
        })
        $(".stock-item").click(function()
        {
            var name =$(this).find(".Name").text();
            var prince =$(this).find(".PriceOut").text();
            var code = $(this).find(".code").text();
            var Id =$(this).attr("id");
            choseStock(name,prince,code,Id); 
        })
    });

})

$("#searchCustomer").keydown(function(event){
    var Name = $(this).val();
    $.ajax({
        url: '/customer/search',
        type: 'POST',
        dataType: 'json',
        data: {
            Name:Name
        }
    }).done(function(result) {
        console.log(result);
        $('.customer-group').html("");
        result.forEach(element => {
            $('.customer-group').append(`<li class="list-group-item customer-item" id="${element.Id}">
               <span class="Name">${element.Name}</span>
            </li>`);
        });
        $(".customer-item").hover(function(){
            $(".customer-item").removeClass("active");
            $(this).css("cursor","pointer");
            $(this).addClass("active");
        })
        $(".customer-item").click(function()
        {
            var name =$(this).find(".Name").text();
            
            var Id =$(this).attr("id");
            $("#searchCustomer").val(name);
            $("#searchCustomer").attr("data-id",Id);

        })
    });

})

