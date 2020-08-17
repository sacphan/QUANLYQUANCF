const express = require('express');
const router = express.Router();
const PurchaseOrderM = require('../../models/admin/PurchaseOrderM');
const purchaseorderstatus = require('../../models/admin/purchaseorderstatusM');
const supplierM = require('../../models/admin/SupplierM');
exports.index = async (req,res,next) =>{
    var PurchaseOrder = await PurchaseOrderM.all();
    
  
    for (let index = 0; index < PurchaseOrder.length; index++) {
        const element = PurchaseOrder[index];
        element.purchaseorderstatus =await purchaseorderstatus.getById(element.Status);     
        element.Supplier =await supplierM.getById(element.SupplierId);
        
    }
    console.log(PurchaseOrder)
   
    res.render('admin/PurchaseOrder/index',
    {
        title:"PurchaseOrder",
        layout:'layoutadmin',
        PurchaseOrder:PurchaseOrder
    });
};

