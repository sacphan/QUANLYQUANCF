const express = require('express');
const router = express.Router();
const Category = require("../../models/admin/Category");


exports.index = async (req,res,next) =>{
    var category = await Category.all();
    res.render('admin/category/index',{title: 'Category', categorys: category});
};

exports.getAdd = (req,res) =>{
    res.render('admin/category/modal/add',{title: 'Add Category',layout: false},function(err,html){
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
        category.id = nId;
        if(nId)
        {
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

exports.getUpdate = async (req,res,next) => {
    var id = req.body
    console.log(id)
    // var row = await Category.find(id);
    // console.log(row)
    // res.render('admin/category/modal/update',{layout:false,category:row},(err,html) => {
    //     if(err)
    //         res.json({status:false,modal:null})
    //     res.json({status:success,modal:html})
    // })
};