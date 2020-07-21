const express = require('express');
const router = express.Router();

router.get("/sale",async(req,res)=> 
{
    res.render('clients/sale');
})

module.exports = router;