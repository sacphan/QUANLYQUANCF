const express = require('express');
const app = express();
const router = express.Router();
var PurchaseOrderController = require('../../controllers/admin/PurchaseOrderC');

router.get('/',function(req,res,next){
    PurchaseOrderController.index(req,res);
});
router.post('/Edit',function(req,res,next){
    PurchaseOrderController.Edit(req,res);
});
router.post('/Add',function(req,res,next){
    PurchaseOrderController.Add(req,res);
});
router.post('/Delete',function(req,res,next){
    PurchaseOrderController.Delete(req,res);
});

module.exports =  router;