const express = require('express');
var app = express();
const admin_router = express.Router();
var categoryRouter = require('./admin/category');
var PurchaseOrderRouter = require('./admin/PurchaseOrderR');
var productRouter = require('./admin/product')
var userRouter = require('./admin/user')

var OrderRouter = require('./admin/OrderR')
admin_router.get('/', function(req, res){
	res.render('admin/index');
});

admin_router.use('/category',categoryRouter);
admin_router.use('/PurchaseOrder',PurchaseOrderRouter);
admin_router.use('/product',productRouter);
admin_router.use('/user',userRouter);
admin_router.use('/Order',OrderRouter);
module.exports = admin_router;