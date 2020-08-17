const express = require('express');
const router = express.Router();
const Product = require("../../models/admin/Product");
const exphbs = require("express-handlebars");
const Category = require('../../models/admin/Category');


exports.index = async (req,res,next) =>{
    var product = await Product.all();
    var category = await Category.all();
    res.render('admin/product/index',{title: 'Product', products: product, categorys:category, layout:'layoutadmin'});
};

exports.getAdd = (req,res) =>{
    res.render('admin/product/modal/add',{title: 'Add Product',layout:false},function(err,html){
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
        var product = {
            id: null,
            name:name
        }
        var nId = await Product.add(product);
        product.id = nId;
        if(nId)
        {
            console.log(product)
            res.render('admin/product/ajaxAddrow',{layout:false, product: product},function(err,html){
                if(err)
                    res.json({data:null,status:-1,title:'Add Product',message: 'Fail'})
                else{
                    var data = {data:html, status:1, title:'Add Product', message:'Success'}
                    res.json(data);
                }
               
            })
        }
        else{
            var data = {data:null,status:0,title:'Add Product',message:'SQL Error'}
            res.json(data)
        }
            
    }
};

exports.getUpdate = async (req,res) => {
    var id = req.params.id
    var row = await Product.find(id);
    res.render('admin/product/modal/update',{layout:false,product:row[0],title: 'Update Product'},(err,html) => {
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
    var status = await Product.update('Id',data);
    res.render('admin/Product/ajaxAddrow',{product:data,layout:false},function(err,html){
        if(status == true)    
        {
            return  res.json({id:mId, data:html, status: 1, message: 'Success', title:'Update Product'})
        }
        return res.json({data:null,status:-1,message: 'Fail',title:'Update Product'})
    })
}

exports.postDelete = async (req,res) => {
    var idArr = req.body.data.idArr
    
    for(id of idArr)
    {
        var product = await Product.find(id)
        product = product[0]
        var status = await Product.delete('Id',product)
        if(status == null)
            return res.json({status:false, message: 'Fail!!', data:null})
    }
    return res.json({status:true,message:'Success', data:idArr})
}
