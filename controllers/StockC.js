const express = require('express');
const router = express.Router();
const stockM = require('../models/StocksM');

router.post("/search",async(req,res)=> 
{
    if (!req.session.user) {
        res.redirect("/account/login");
        return false;
    }
    var Name = req.body.Name;
    var liststocksearch =await stockM.searchbyName(Name);
  
    res.json(liststocksearch);
    
})

module.exports = router;