const express = require('express');
const router = express.Router();
const customerM = require('../models/CustomerM');


router.post("/search",async(req,res)=> 
{
    if (!req.session.user) {
        res.redirect("/account/login");
        return false;
    }
    var Name = req.body.Name;
    var listcustomersearch =await customerM.searchbyName(Name);
  
    res.json(listcustomersearch);
    
})

module.exports = router;