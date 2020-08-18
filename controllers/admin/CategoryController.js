const express = require('express');
const router = express.Router();
const Category = require("../../models/admin/Category");
const exphbs = require("express-handlebars");


exports.index = async (req,res,next) =>{
    var category = await Category.all();
    res.render('admin/category/index',{title: 'Category', categorys: category,layout:'layoutadmin'});
};

exports.getAdd = (req,res) =>{
    res.render('admin/category/modal/add',{title: 'Add Category',layout:false},function(err,html){
        if(err)
            res.json({status: false, modal: null});
        var data = {status: true,modal: html}
        res.json(data)
    })
    
};

exports.postAdd = async (req,res,next) =>{
    var isAjaxRequest = req.xhr;
    if(isAjaxRequest)
    {
        var name  = req.body.data.name
        var category = {
            id: null,
            name:name
        }
        var nId = await Category.add(category);
        console.log(nId)
        category.id = nId;
        if(nId)
        {
            console.log(category)
            res.render('admin/category/ajaxAddrow',{layout:false, category: category},function(err,html){
                if(err)
                    res.json({data:null,status:-1,title:'Add Category',message: 'Fail'})
                else{
                    var data = {data:html, status:1, title:'Add Category', message:'Success'}
                    res.json(data);
                }
               
            })
        }
        else{
            var data = {data:null,status:0,title:'Add Category',message:'SQL Error'}
            res.json(data)
        }
            
    }
};

exports.getUpdate = async (req,res) => {
    var id = req.params.id
    var row = await Category.find(id);
    res.render('admin/category/modal/update',{layout:false,category:row[0],title: 'Update Category'},(err,html) => {
        if(err)
            res.json({status:false,modal:null})
        res.json({status:'success',modal:html})
    })
};

exports.postUpdate = async (req,res) => {
    var mId = req.params.id
    
    var name = req.body.data.name
    var data = {
        Id: mId,
        Name: name
    }
    var status = await Category.update('Id',data);
    data.Id = mId 
    res.render('admin/category/ajaxAddrow',{category:data,layout:false},function(err,html){
        if(status == true)    
        {
            return  res.json({id:mId, data:html, status: 1, message: 'Success', title:'Update Category'})
        }
        return res.json({data:null,status:-1,message: 'Fail',title:'Update Category'})
    })
}

exports.postDelete = async (req,res) => {
    var idArr = req.body.data.idArr
    
    for(id of idArr)
    {
        var category = await Category.find(id)
        category = category[0]
        var status = await Category.delete('Id',category)
        if(status == null)
            return res.json({status:false, message: 'Fail!!', data:null})
    }
    return res.json({status:true,message:'Success', data:idArr})
}
