const express = require('express');
var app = express();
const admin_router = express.Router();
var categoryRouter = require('./admin/category')

admin_router.get('/', function(req, res){
	res.render('admin/index');
});

//category route
admin_router.use('/category',categoryRouter);

module.exports = admin_router;