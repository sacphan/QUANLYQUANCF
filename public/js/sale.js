
    $(".carousel-cell").click(function () {
           alert("Ok")
    })
$("#btnAddOrder").click(function()
{
    var qualitytab = $(".navorder").length;
    $(".navlinkorder").removeClass("active");
    $("#tablistorder").append(`
   
                    <li class="nav-item navorder"> <a class="nav-link active navlinkorder" data-toggle="tab" href="#hd${qualitytab+1}" role="tab"
                            aria-selected="false"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span
                                class="hidden-xs-down">Hóa đơn ${qualitytab+1}</span></a> </li>
              
    `)
    $("#tablcontentOrder").append(`
    <div class="tab-pane active navlinkorder" id="hd${qualitytab+1}" role="tabpanel">
    <div class="p-3">    
    </div>
</div>
    `)

})