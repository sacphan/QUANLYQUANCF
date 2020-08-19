const express = require('express');
const router = express.Router();
const User = require("../../models/admin/User");
const exphbs = require("express-handlebars");
const Category = require('../../models/admin/Category');


exports.index = async (req,res,next) =>{
    var user = await User.all();
    for(let i=0;i<user.length;i++)
    {
        let element = user[i]
        let date = new Date(element.BirthDay)
        element.BirthDay = dateFormat(date)
    }
    res.render('admin/user/index',{title: 'User', users: user, layout:'layoutadmin'});
};

exports.getAdd = async (req,res) =>{
    var category = await Category.all();
    res.render('admin/user/modal/add',{title: 'Add User',layout:false,categorys:category},function(err,html){
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
        var username  = req.body.data.username
        var fullname = req.body.data.fullname
        var password = req.body.data.password
        var repassword = req.body.data.repassword
        var email = req.body.data.email
        var birthday = req.body.data.birthday
        var address = req.body.data.address
        var phone = req.body.data.phone
        var role = req.body.data.role
        var user = {
            Id: null,
            UserName:username,
            FullName:fullname,
            Password:password,
            Email:email,
            BirthDay:birthday,
            Address:address,
            Phone:phone,
            Role: role,
        }
        // if(!password != repassword)
        //     res.json({data:null,status:-1,title:'Add User',message: 'Fail'})
        
        var nId = await User.add(user);
        user.Id = nId;
        if(nId)
        {
            res.render('admin/user/ajaxAddrow',{layout:false, user: user},function(err,html){
                if(err)
                    res.json({data:null,status:-1,title:'Add User',message: 'Fail'})
                else{
                    var data = {data:html, status:1, title:'Add User', message:'Success'}
                    res.json(data);
                }
               
            })
        }
        else{
            var data = {data:null,status:0,title:'Add User',message:'SQL Error'}
            res.json(data)
        }
            
    }
};

exports.getUpdate = async (req,res) => {
    var id = req.params.id
    var row = await User.find(id);
    let date = new Date(row[0].BirthDay)
    row[0].BirthDay = dateFormat(date)
    console.log(row[0])
    res.render('admin/user/modal/update',{layout:false,user:row[0],title: 'Update User'},(err,html) => {
        if(err)
            res.json({status:false,modal:null})
        res.json({status:'success',modal:html})
    })
};

exports.postUpdate = async (req,res) => {
    var mId = req.params.id
    
    var username  = req.body.data.username
    var fullname = req.body.data.fullname
    var password = req.body.data.password
    var repassword = req.body.data.repassword
    var email = req.body.data.email
    var birthday = req.body.data.birthday
    var address = req.body.data.address
    var phone = req.body.data.phone
    var role = req.body.data.role
    var user = {
        Id: mId,
        UserName:username,
        FullName:fullname,
        Password:password,
        Email:email,
        BirthDay:birthday,
        Address:address,
        Phone:phone,
        Role: role,
    }
    var status = await User.update('Id',user);
    user.Id = mId
    let date = new Date(birthday)
    user.BirthDay = dateFormat(date)
    res.render('admin/user/ajaxAddrow',{user:user,layout:false},function(err,html){
        if(status == true)    
        {
            return  res.json({id:mId, data:html, status: 1, message: 'Success', title:'Update User'})
        }
        return res.json({data:null,status:-1,message: 'Fail',title:'Update User'})
    })
}

exports.postDelete = async (req,res) => {
    var idArr = req.body.data.idArr
    
    for(id of idArr)
    {
        var user = await User.find(id)
        user = user[0]
        var status = await User.delete('Id',user)
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
