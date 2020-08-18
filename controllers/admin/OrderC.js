const OrderM = require('../../models/admin/OrderM');
exports.index = async (req,res,next) =>{
    var Orders =await OrderM.all();
    var AllCashTotal = 0;
    Orders.forEach(element => {
        AllCashTotal+=element.CashTotal;
    });
    Orders.AllCashTotal = AllCashTotal;
    console.log(Orders)
    res.render('admin/Order/index',
    {
        title:"PurchaseOrder",
        layout:'layoutadmin',
        Orders:Orders      
    });
}