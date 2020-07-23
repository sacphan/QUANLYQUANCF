sumjq = function(selector) {
    var sum = 0;
    $(selector).each(function() {
        sum += Number($(this).text());
    });
    return sum;
   
}
var totalprice = 0;
    $(".carousel-cell").click(function () {
      
        var name =$(this).children()[0].textContent;
        var prince =$(this).children()[1].textContent;
        var code = $(this).children()[3].textContent
        var Id =$(this).children()[2].textContent; 
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
                                            <td>${name}</td>
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
   
                    <li class="nav-item navorder " > <a data-discout="0" onclick="changeorder(hd${qualitytab+1},this)" class="taborder nav-link active navlinkorder " data-toggle="tab" href="#hd${qualitytab+1}" role="tab"
                            aria-selected="false"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span
                                class="hidden-xs-down">Hóa đơn ${qualitytab+1}</span></a> </li>
              
    `)
    $("#tablcontentOrder").append(`
    <div class="tab-pane active navlinkorder taborder" id="hd${qualitytab+1}" role="tabpanel">
    <table class="table">
                                <thead>
                                   
                                </thead>
                                <tbody>
                                   
                                   
                                </tbody>
                            </table>
</div>
    `)

})
function resetpaymenu()
{
    totalprice = 0;
    $("#discout").val(0);
    $("#totalquality").text("0");
    $("#totalprice").text("0");
    $("#totalresult").text("0");
    $("#givenprice").val("0")
    $("#returnedprice").text("0");
}

function changeorder(tab,e) {
   
   var discout = parseInt($(e).attr("data-discout")); 
   resetpaymenu();
   var id = $(tab).attr("id");   
    var totalquality = sumjq($(`#${id} tbody tr .quality`));
    totalprice = sumjq($(`#${id} tbody tr .total`));
    $("#discout").val(discout);
    $("#totalquality").text(totalquality);
    $("#totalprice").text(totalprice);
    $("#totalresult").text(totalprice-discout); 
}

$("#payorder").click(function(){
    let current_datetime = new Date();
    let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear()
        $("#titledate").text(`${formatted_date}`);
        $("#date").text(`Ngày ${current_datetime.getDate()} tháng ${current_datetime.getMonth() + 1} năm ${current_datetime.getFullYear()}`)
        $("#address").after($(".tab-pane.active.taborder").html());
        $("#printtotal").text($("#totalprice").text());
        $("#printck").text($("#discout").val());
        $("#printresult").text($("#totalresult").text());
       
        $("#printorder").printThis({
            importCSS: true,
            importStyle: true,
            loadCSS: "/css/print_rules_sale.css"
            });
        });
     

