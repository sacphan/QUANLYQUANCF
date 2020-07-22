const express = require('express');
const router = express.Router();
const stocks = require('../models/StocksM');

router.get("/sale",async(req,res)=> 
{
    var liststocks =await stocks.all();
   
    res.render('clients/sale',
    {
        liststocks: liststocks
    });
})

module.exports = router;