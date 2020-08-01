const express = require('express');
const router = express.Router();
const orderM = require('../models/OrderM');
const StocksM = require('../models/StocksM');
const orderdetail = require('../models/OrderDetailM');
router.use(async(req, res, next) => {
  
    next();
})
router.post("/createorder",async(req,res)=> 
{
    
    if (!req.session.user) res.redirect("/account/login");
   
    var listorderdetail = req.body.listorderdetail;
    var order = {        
        Id_Staff: req.session.user,
        Id_Customer:req.body.IdCustomer,
        Id_Table:req.body.IdTable,
        CashTotal:req.body.CashTotal,
        CashGiven: req.body.CashGiven,
        CashReturned: req.body.CashReturned,
      
    }
    var result =await orderM.add(order); 
    order.Code=`HD${result}`;
    order.Id=result;
   
    if (result)
    {
        await orderM.update(order);
    }
    listorderdetail.forEach(async element  =>  {
        element.Id_Order = result;
        await orderdetail.add(element);
        
    });
    
    
    res.json({result:result});
})

module.exports = router;