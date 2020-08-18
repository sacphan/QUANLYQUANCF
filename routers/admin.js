const express = require('express');
var app = express();
const admin_router = express.Router();
var categoryRouter = require('./admin/category');
var PurchaseOrderRouter = require('./admin/PurchaseOrderR');
var productRouter = require('./admin/product')
var userRouter = require('./admin/user')

admin_router.get('/', function(req, res){
	res.render('admin/index');
});

admin_router.use('/category',categoryRouter);
admin_router.use('/PurchaseOrder',PurchaseOrderRouter);
admin_router.use('/product',productRouter);
admin_router.use('/user',userRouter);
module.exports = admin_router;