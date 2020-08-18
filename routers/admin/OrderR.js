const express = require('express');
const app = express();
const router = express.Router();
var OrderController = require('../../controllers/admin/OrderC');

router.get('/',function(req,res,next){
    OrderController.index(req,res);
});
router.post('/Edit',function(req,res,next){
    OrderController.Edit(req,res);
});
router.post('/Add',function(req,res,next){
    OrderController.Add(req,res);
});
router.post('/Delete',function(req,res,next){
    OrderController.Delete(req,res);
});

module.exports =  router;