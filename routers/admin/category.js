const express = require('express');
const app = express();
const router = express.Router();
var CategoryController = require('../../controllers/admin/CategoryController');

router.get('/',function(req,res,next){
    CategoryController.index(req,res);
});
router.get('/add',function(req,res,next){
    CategoryController.getAdd(req,res);
})
router.post('/add',function(req,res,next){
    CategoryController.postAdd(req,res);
})
router.get('/update/:id',function(req,res,next){
    CategoryController.getUpdate(req,res);
})
module.exports =  router;