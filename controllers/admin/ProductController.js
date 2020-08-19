const express = require('express');
const router = express.Router();
const Product = require("../../models/admin/Product");
const exphbs = require("express-handlebars");
const Category = require('../../models/admin/Category');


exports.index = async (req,res,next) =>{
    var product = await Product.all();
    var category = await Category.all();
    for(let i=0;i<product.length;i++)
    {
        let element = product[i]
        let categoryE = await Category.find(element.CatID)
        element.CategoryName = categoryE[0].Name
        let date = new Date(element.CreateDate)
        element.CreateDate = dateFormat(date)
    }
    console.log(product)
    res.render('admin/product/index',{title: 'Product', products: product, categorys:category, layout:'layoutadmin'});
};

exports.getAdd = async (req,res) =>{
    var category = await Category.all();
    res.render('admin/product/modal/add',{title: 'Add Product',layout:false,categorys:category},function(err,html){
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
        var code = req.body.data.code
        var catId = req.body.data.category
        var dateCreate = req.body.data.dateCreate
        var quantity = req.body.data.quantity
        var discount = req.body.data.discount
        var priceIn = req.body.data.priceIn
        var priceOut = req.body.data.priceOut
        let categoryName = await Category.find(catId)
        categoryName = categoryName[0].Name
        var product = {
            Id: null,
            Name:name,
            Code:code,
            CatId:catId,
            CreateDate:dateCreate,
            Quantity:quantity,
            Discount:discount,
            PriceIn: priceIn,
            PriceOut: priceOut
        }
        var nId = await Product.add(product);
        product.Id = nId;
        product.CategoryName = categoryName
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
    var category = await Category.all()
    res.render('admin/product/modal/update',{layout:false,product:row[0],title: 'Update Product',categorys:category},(err,html) => {
        if(err)
            res.json({status:false,modal:null})
        res.json({status:'success',modal:html})
    })
};

exports.postUpdate = async (req,res) => {
    var mId = req.params.id
    
    var name  = req.body.data.name
    var code = req.body.data.code
    var catId = req.body.data.category
    var dateCreate = req.body.data.dateCreate
    var quantity = req.body.data.quantity
    var discount = req.body.data.discount
    var priceIn = req.body.data.priceIn
    var priceOut = req.body.data.priceOut
    let categoryName = await Category.find(catId)
    categoryName = categoryName[0].Name
    var product = {
        Id: null,
        Name:name,
        Code:code,
        CatId:catId,
        CreateDate:dateCreate,
        Quantity:quantity,
        Discount:discount,
        PriceIn: priceIn,
        PriceOut: priceOut
    }
    var status = await Product.update('Id',product);
    product.Id = mId
    product.CategoryName = categoryName
    let date = new Date(dateCreate)
    product.CreateDate = dateFormat(date)
    console.log(product.CreateDate)
    res.render('admin/Product/ajaxAddrow',{product:product,layout:false},function(err,html){
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

function dateFormat(a)
{
    var day = a.getUTCDate()
    var month = a.getMonth()+1
    var year = a.getFullYear();
    return `${month}/${day}/${year}`
}
