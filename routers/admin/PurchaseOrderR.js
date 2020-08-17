const express = require('express');
const app = express();
const router = express.Router();
var PurchaseOrderController = require('../../controllers/admin/PurchaseOrderC');

router.get('/',function(req,res,next){
    PurchaseOrderController.index(req,res);
});

module.exports =  router;