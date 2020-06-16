// Ajax method
function ajaxRequest(url, dt = '', method = 'POST') {
    return $.ajax({
        url: url,
        method: method,
        dataType: 'json',
        data: {
            data: dt,
            _token: $('meta[name="_token"]').attr('content'),
        }
    });
}

function getUnvalidKey(lsErrMsg) {
    let lsUnvalidKey = [];
    for ( let [key,val] of Object.entries(lsErrMsg) ){
        lsUnvalidKey.push(key);
    }
    return lsUnvalidKey;
}

// url : url to post request
// modalID: tag id containt all request field
function getAdddata(url, modalID) {
    let data = getRdata(modalID);
    let addData = {};
    addData.url = url;
    addData.data = data;

    return addData;
}

// catch event add quick in view
function addQuick(element, url, tbodyID) {
    let modalID = $(element).attr('data-target').slice(1);

    // blockUI
    blockUI();
    $.when( ajaxRequest(url,'','GET') )
        .then( data =>{
            // render modal
            $(`#${modalID}`).html(data.modal);
            // add action to post add request

            $(`#${modalID} a[name="modal-action"]`).attr('onclick', 'modifyAdd(\'' + url + '\',\'' + modalID +'\',\'' + tbodyID +'\')');
            // unblockUI
            $.unblockUI();
        })
        .catch( err =>{
            console.log("GET add error: ");
            console.log(err);
            // unblockUI
            $.unblockUI();
        });

}

function modifyAdd(url, modalID, tbodyID) {
    // get request data
    let addData = getAdddata(url,modalID);

    $.when(ajaxRequest(addData.url, addData.data))
        .then(res =>{
            clearAlert(modalID);
            // status = -1 => modify setting refused
            // status = 0 => modify setting fail
            // status = 1 => add setting success
            if (res.status === -1){
                addAlert(res.error);
            }
            else if (res.status === 1){
                // close modal
                offModal(modalID);
                // add row into beginning of the table
                $(`#${tbodyID} tr:first`).before(res.data);

                // toastr success
                toastr.success(`${res.message.toLowerCase()}`, `${res.title}`, {timeOut: "500"});
            }else{
                console.log('sql error');
                /////
            }
        })
        .catch(err => {
            console.log('Modify add ERROR:');
            console.log(err);
        });

}

function modifyUpdate(url, modalID, tbodyID) {
    // get request data
    let addData = getAdddata(url,modalID);

    $.when(ajaxRequest(addData.url, addData.data))
        .then(res =>{
            clearAlert(modalID);
            // status = -1 => modify setting refused
            // status = 0 => modify setting fail
            // status = 1 => update setting success
            if (res.status === -1){
                addAlert(res.error);
            }
            else if (res.status === 1){
                // close modal
                offModal(modalID, 1);

                // add row above edit row the table
                // then delete the current one
                let currentRow = $(`#${tbodyID} tr.${res.id}`);
                currentRow.before(res.data);
                currentRow.remove();

                // toastr success
                toastr.success(`${res.message.toLowerCase()}`, `${res.title}`, {timeOut: "500"});
            }else{
                console.log('sql error');
                /////
            }

        })
        .catch(err => {
            console.log('Modify update ERROR:');
            console.log(err);
        });
}

// add row into beginning of the table
function addTableRow(tbody_id, html) {
    $(`#${tbody_id} tr:first`).before(html);
}

// fill in modal data
function fillModal(modalID, data) {
    let lsKey = getRkey(modalID);
    lsKey.map( item =>{
        $(`#${modalID} input[name="${item}"]`).val(data[`${item}`]);
        $(`#${modalID} textarea[name="${item}"]`).val(data[`${item}`]);
    });
}
//////////////
function editSingle(element, url, tbodyID) {
    let modalID = $(element).attr('data-target').slice(1);

    // blockUI
    blockUI();
    // get element data & fill in the modal
    $.when(ajaxRequest(url, '', 'GET'))
        .then( data =>{
            // render modal
            $(`#${modalID}`).html(data.data);

            // // fill in modal
            // fillModal(modalID,data.data);

            // add action to send update request
            $(`#${modalID} a[name="modal-action"]`).attr('onclick', 'modifyUpdate(\'' + url + '\',\'' + modalID +'\',\'' + tbodyID +'\')');
            // unblockUI
            $.unblockUI();
        })
        .catch( err =>{
            console.log('getUpdate ERROR:');
            console.log(err);
            // unblockUI
            $.unblockUI();
        });

}

function switchCheckbox(element, url) {
    let isCheck = $(element).prop("checked");
    let dataType = $(element).attr('data-type');
    let dataSup = $(element).attr('data-sup');

    let reqData = {
        isCheck: isCheck,
        dataType: dataType,
        dataSup: dataSup
    };


    // get element data & fill in the modal
    $.when(ajaxRequest(url, reqData))
        .catch( err =>{
            console.log('switchCheckbox ERROR:');
            console.log(err);
        });
}


// /////////////////////
// // Delete handling
var data;
//chap nhan
function accept() {
    showConfirmModal(2)
    sendDataByAjax(data,'POST')
}
//lay du lieu 1 dong
function getOneObj(element) {
    showConfirmModal(1)
    var dataId = $(element).attr("data-id")
    var dataUrl = $(element).attr("data-url")
    var dataFlag = $(element).attr("data-flag")
    var idArr = []
    idArr.push(dataId)
    data = {idArr:idArr,url:dataUrl,flag:dataFlag};
}
//lay du lieu nhieu dong
function getAllObj(element) {
    showConfirmModal(1)
    var dataUrl = $(element).attr("data-url")
    var dataFlag = $(element).attr("data-flag")
    var idArr = getRowCheck();
    data = {idArr:idArr,url:dataUrl,flag:dataFlag};
}
//gui du lieu thong qua ajax
function sendDataByAjax(data,method)
{
    $.when(ajaxRequest(data['url'], data, method))
        .then(data =>{
            console.log(data);
            if(data['status'])
            {
                deleteRow(data['data']);
                console.log('IE co bug nha microsoft?');
                f();
                showConfirmModal(3,data['message']);
            }
            else
            {
                showConfirmModal(4,data['message']);
            }
        })
        .catch(err =>{
            console.log(err);
        });
}
//tu choi modal
function reject() {
    $('#modalConfirm').modal('hide');
}
//delete html
function deleteRow(arr)
{
    for(var id of arr)
    {
        document.getElementById('row_' + id).remove()
    }
}
//check all box
function checkAll()
{
    var value = $('#check_all').is(':checked');
    jQuery("input[name='checkbox']").each(function () {
        $(this).prop( "checked", value );
    })
}
function hideWarningModal() {
    $('#modalConfirm').modal('hide')
}
function showWarningModal() {
    $('#modalConfirm').modal('show')
}
function showConfirmModal(index,data=null) {
    switch (index) {
        case 1:
            showWarningModal()
            hideSuccessModal()
            hideErrorModal()
            hideLoadingModal()
            break;
        case 2:
            showLoadingModal()
            hideSuccessModal()
            hideErrorModal()
            hideWarningModal()
            break;
        case 3:
            showSuccessModal(data)
            hideLoadingModal()
            hideErrorModal()
            hideWarningModal()
            break;
        case 4:
            showErrorModal(data)
            hideLoadingModal()
            hideErrorModal()
            hideWarningModal()
            break;
    }
}
function f() {
    var isIE = window.ActiveXObject || "ActiveXObject" in window;
    if (isIE) {
        $('.modal').removeClass('fade');
    }
}
// xuat file pdf
function exportExcel(element) {
    var type = $(element).attr('data-type')
    var flag = $(element).attr('data-flag')
    var rowArr = getRowCheck()
    var dataUrl = $(element).attr('data-url')
    showExportCheck()
    var attrArr = getExportAttrCheck()
    if(attrArr.length>0)
    {
        if(rowArr.length>0)
            data = data = {attrArr:attrArr,rowArr:rowArr,url:dataUrl,type:type,flag:flag};
    }
    console.log(data)
    if(!(typeof data === 'undefined')) {
        sendDataByAjax(data, 'POST')
    }
}

function exportPdf() {

}
//lay cac truong thuoc tinh duoc check
function getExportAttrCheck() {
    var listAttrExport = []
    jQuery("input[name='checkExport']").each(function () {
        if(this.checked) {
            var value = $(this).attr('data-attr')
            listAttrExport.push(value)
        }
    })
    return listAttrExport
}
function showExportCheck() {
    jQuery("input[name='checkExport']").each(function () {
        $(this).removeAttr('hidden')
    })
}
function hideExportCheck() {
    jQuery("input[name='checkExport']").each(function () {
        $(this).attr('hidden', 'true')
    })
}

function getRowCheck() {
    var arr = []
    jQuery("input[name='checkbox']").each(function ()
    {
        if (this.checked == true)
        {
            arr.push(this.value)
        }
    })
    return arr;
}

function loadThmbImage(path)
{

}



/*
// /////////////////////
// // Delete handle
// // check_all action
// $("#checkbox_all").click(function(){
//     $("input[type=checkbox].delete-checkbox").prop('checked', $(this).prop('checked'));
// });// end check_all action
//
// // flag = 1 => delete all
// // flag = 0 => delete multiple
// let flag = 0;
// // listDelete: delete items in listDelete
// // listIgnore: delete all items ignore items in listIgnore
// const listAll = [];
// let listDelete = [];
// let listIgnore = [];
// // check_all checking
// $("#checkbox_all").click(function () {
//     listIgnore = [];
//     if($(this).prop("checked") == true){
//         // delete all
//         flag = 1;
//         // get all id
//
//     }else{
//         flag = 0;
//         listDelete = [];
//     }
// });
// // end check_all checking
//
// // check_multiple checking
// $('input[type=checkbox].delete-checkbox').click(function () {
//     if ($(this).attr('id') !== 'checkbox_all'){
//         // check item
//         if($(this).prop("checked") == true){
//             // if check_all isn't checked, change [flag]
//             if ($('#check_all').prop("checked") == false){
//                 flag = 0;
//             }
//             // add item id to listDelete
//             let id = parseInt(`${$(this).attr('id').substring(9)}`);
//             if (!isNaN(id)){
//                 listDelete.push(id);
//             }
//             // remove item in list ignore
//             listIgnore = listIgnore.filter(function (value) {
//                 return value != id;
//             });
//         }
//         // uncheck item
//         else{
//             // remove item in listDelete
//             let id = parseInt(`${$(this).attr('id').substring(9)}`);
//             listDelete = listDelete.filter(function (value) {
//                 return value != id;
//             });
//             // add item to listIgnore
//             if (!isNaN(id)){
//                 listIgnore.push(id);
//             }
//         }// uncheck item
//
//     }
// });// end check_multiple checking
//
// data = {
//     flag: flag,
//     lsDelete: listDelete,
//     lsIgnore: listIgnore
// };
//
//
// function deleteSingle(element, id, url) {
//     // sweet alert pop-up
//     $(`#${id}`).click();
//
//     // confirm delete
//     $('.swal2-confirm').click(function () {
//         $.when(ajaxRequest())
//     });
//
//     // ignore delete
//     $('.swal2-cancel').click(function () {
//
//     });
// }
//
// // flag = 1 => delete multipe
// // flag = 0 => delete multiple
// function deleteMulti(id) {
//     // sweet alert pop-up
//     $(`#${id}`).click();
//
//     console.log("ignore: " + listIgnore);
//     console.log("delete: " + listDelete);
//
// }
*/
