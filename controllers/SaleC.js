const express = require('express');
const router = express.Router();
const stocks = require('../models/StocksM');

router.get("/sale",async(req,res)=> 
{
    if (!req.session.user) {
        res.redirect("/account/login");
        return false;
    }
    var liststocks =await stocks.all();
    
    res.render('clients/sale',
    {
        liststocks: liststocks,
        session:req.session
    });
})

module.exports = router;