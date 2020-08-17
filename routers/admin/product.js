const express = require('express');
const app = express();
const router = express.Router();
var ProductController = require('../../controllers/admin/ProductController');

router.get('/',function(req,res,next){
    ProductController.index(req,res);
});
router.get('/add',function(req,res,next){
    ProductController.getAdd(req,res);
})
router.post('/add',function(req,res,next){
    ProductController.postAdd(req,res);
})
router.get('/update/:id',function(req,res,next){
    ProductController.getUpdate(req,res);
})
router.post('/update/:id',function(req,res,next){
    ProductController.postUpdate(req,res);
})
router.post('/delete',function(req,res,next){
    ProductController.postDelete(req,res);
})

module.exports =  router;