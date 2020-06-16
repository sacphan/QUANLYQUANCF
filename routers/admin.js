const express = require('express');
const admin_router = express.Router();

admin_router.get('/', function(req, res){
	res.render('pages/admin/index');
});

module.exports = admin_router;