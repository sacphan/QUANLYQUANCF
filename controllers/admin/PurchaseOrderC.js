const express = require('express');
const router = express.Router();
const PurchaseOrderM = require('../../models/admin/PurchaseOrderM');
const purchaseorderstatusM = require('../../models/admin/purchaseorderstatusM');
const supplierM = require('../../models/admin/SupplierM');
exports.index = async (req,res,next) =>{
    var PurchaseOrder = await PurchaseOrderM.all();
    var purchaseorderstatustable = await purchaseorderstatusM.all();
    var supplierAll = await supplierM.all();
    for (let index = 0; index < PurchaseOrder.length; index++) {
        const element = PurchaseOrder[index];
        element.purchaseorderstatus =await purchaseorderstatusM.getById(element.Status);     
        element.Supplier =await supplierM.getById(element.SupplierId);
        
    }
    
   
    res.render('admin/PurchaseOrder/index',
    {
        title:"PurchaseOrder",
        layout:'layoutadmin',
        PurchaseOrder:PurchaseOrder,
        purchaseorderstatustable:purchaseorderstatustable,
        supplierAll:supplierAll
    });
};
exports.Edit = async (req,res,next) =>{
    var purchaseOrder = {
        TotalPrince : req.body.totalprice,
        Discount : req.body.discount,
        GivenPriceSupplier : req.body.givenpricesupplier,
        Id:req.body.Id,
        SupplierId: req.body.idsupplier,
        Code: req.body.code,
        Status:req.body.idstatus
    }
    await PurchaseOrderM.update(purchaseOrder);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify("Thành công"));
}
exports.Add = async (req,res,next) =>{
    var purchaseOrder = {
        TotalPrince : req.body.totalprice,
        Discount : req.body.discount,
        GivenPriceSupplier : req.body.givenpricesupplier,
        SupplierId: req.body.idsupplier,
        Code: req.body.code,
        Status:req.body.idstatus
    }
    await PurchaseOrderM.add(purchaseOrder);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify("Thành công"));
}
exports.Delete = async (req,res,next) =>{
    var purchaseOrder = {
        Id:req.body.Id,
        StatusDelete: -1,
        
    }
    console.log(purchaseOrder)
    await PurchaseOrderM.update(purchaseOrder);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify("Thành công"));
}
exports.Filter = async (req,res,next) =>{
    var Top = req.body.Top;
    var KeyWord = req.body.KeyWord;
    var Status = req.body.Status;
    var StartDate =  req.body.StartDate;
    var EndDate = req.body.EndDate;
    
}