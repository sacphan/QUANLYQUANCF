const express = require('express');
const app = express();
const router = express.Router();
var UserController = require('../../controllers/admin/UserController');

router.get('/',function(req,res,next){
    UserController.index(req,res);
});
router.get('/add',function(req,res,next){
    UserController.getAdd(req,res);
})
router.post('/add',function(req,res,next){
    UserController.postAdd(req,res);
})
router.get('/update/:id',function(req,res,next){
    UserController.getUpdate(req,res);
})
router.post('/update/:id',function(req,res,next){
    UserController.postUpdate(req,res);
})
router.post('/delete',function(req,res,next){
    UserController.postDelete(req,res);
})

module.exports =  router;