/**
 * Created by ly-yangqingcong on 2016/10/14.
 */
var urlPrefix = "";//
//var urlDownload = window.location.host; //window.location.origin 只有高版IE本支持
var urlDownload = window.location.protocol + "//" + window.location.host

function getdata(url, parm, fn, errfn) {
    $.ajax({
        url: urlPrefix + url,
        data: parm,
        type: "POST",
        dataType: "json",
        cache: false,//不取浏览器缓存
        async: true,//异步
        success: function (data) {
            fn(data);
        }, error: function (err) {
            if (err.status == "409") {//系统定义409为session超时，转换提示信息
                alert('用户信息丢失，请重新登录!');
                //window.location.href = "/Login";
            }
            hideloading();
            //alert("出错了" + JSON.stringify(err));
            errfn && errfn(err)
        }, complete: function () {
        }
    });
}
function getHTML(url, parm, fun) {
    $.ajax({
        url: urlPrefix + url,    //请求的url地址
        dataType: "html",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: parm,    //参数值
        type: "GET",   //请求方式
        beforeSend: function () {
            //请求前的处理
        },
        success: function (req) {
            fun(req);
        },
        complete: function () {
        },
        error: function () {
            popWindow(0, '获取页面失败!', 1400);
            $("#about").modal();

        }
    });
}
function showloading() {
    $('#myModal').remove();
    $('body').after('<div id="myModal" class="loadingbagcol">' +
        '<div class="loadwrap"><span></span></div>' +
        '</div>');
}
function hideloading() {
    $('#myModal').remove()
}

//弹出框提示
function popWindow(res, msg, timeout, randomID) {
    backtotop();
    var id = "about";
    if (randomID == true) {
        id = "i" + cm.uuid();
    }
    var idSp = "#" + id;
    console.log($(idSp))
    $(idSp).remove();
    // if($('body').find('#about').length>0){
    //     $('body').find('#about').html('')
    // }else{
    // $('body').append('<div class="modal fade" id="about" data-backdrop="static"></div>');
    // }
    $('body').append('<div class="modal fade" id="' + id + '" data-backdrop="static"></div>');
    switch (res) {
        case 0:
            $(idSp).append('<div class="modal-dialog">' +
                '<div class="popWinerror"><div class="winMsg">' + msg + '</div><div><button data-dismiss="modal" type="button" class="btnPopwin"></button>' +
                '<button class="closePopwin" data-dismiss="modal" type="button"></button></div></div></div>');
            setTimeout(function () {
                $(idSp).modal("hide");
            }, timeout);
            break;
        case 1:
            $(idSp).append('<div class="modal-dialog">' +
                '<div class="popWinok"><div class="winMsg">' + msg + '</div><div><button data-dismiss="modal" type="button" class="btnPopwin"></button>' +
                '<button class="closePopwin" data-dismiss="modal" type="button"></button></div></div></div>');
            setTimeout(function () {
                $(idSp).modal("hide");
            }, timeout);
            break;
        case 2:
            $('.modal-backdrop').remove();
            $(idSp).append('<div class="modal-dialog">' +
                '<div class="popWinconfim"><div class="winMsg">' + msg +
                '</div><div><button type="button" data-dismiss="modal" id="btnConfirm" class="btnPopwinConfirm"></button>' +
                '<button data-dismiss="modal" type="button" id="btncancel" class="btnPopwinCancel"></button><button class="closePopwin" data-dismiss="modal" type="button"></button></div></div></div>');
            break;
        case 3:
            $('.modal-backdrop').remove();
            $(idSp).append('<div class="modal-dialog">' +
                '<div class="popWinconfim"><div class="winMsg">' + msg +
                '</div><div><button type="button" data-dismiss="modal" id="btnConfirm" class="btnPopwinConfirm"></button>' +
                '<button data-dismiss="modal" type="button" id="btncancel" class="btnPopwinCancel"></button><button class="closePopwin" data-dismiss="modal" type="button"></button></div></div></div>');
            break;
        /*$('.modal-backdrop').remove(); 如连续操作还有阴影层，添加这句*/
    }
    return id;
}

function backtotop() {
    window.parent.scrollTo(0, 0);
}

//用于重新计算iframe高度
function setIframeHeght() {
    var iframe = parent.document.getElementById('iframe1');
    if ($(iframe).length > 0) {
        $(iframe).height(getHeightFromIframe(iframe));
        // IE8 下该事件只触发了一次
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                //alert('onload')
                $(iframe).height(getHeightFromIframe(iframe));
            });
        } else {
            iframe.onload = function () {
                $(iframe).css("min-height", "530px");
                $(iframe).height(getHeightFromIframe(iframe));
            };
        }
    }
}
function getHeightFromIframe(selector) {
    //alert($(selector).contents().find('body').height());
    return $(selector).contents().find('body').height() + 100;
}

//模态框
function showmodals() {
    $('#modalswarp').remove();
    $('#modals').empty();
    $('body').append('<div id="modalswarp" style="min-height: 500px;" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg">' +
        '<div id="modals" class="modal-content">...</div></div></div>')
}

function showmodals1() {
    $('#modalswarp1').remove();
    $('#modals1').empty();
    $('body').append('<div id="modalswarp1" style="min-height: 600px;"class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg" style="width:800px;">' +
        '<div  class="modal-content">' +
        '<div class="modal-header" style="background-color: #fff"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></div>' +
        '<div id="modals1" class="modal-body" style="padding:0px 15px 15px 15px">...</div>' +
        '</div></div></div>')
}
function showmodals2() {
    $('#modalswarp2').remove();
    $('#modals2').empty();
    $('body').append('<div id="modalswarp2" style="min-height: 500px;" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg">' +
        '<div id="modals2" class="modal-content">...</div></div></div>')
}

//只有一位数时前面补0
function appendzero(obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
}
//格式化日期
/*dateForm(new Date()) 获取当前系统时间*/
function dateForm(time) {
    var data = new Date(time);
    var year = data.getFullYear();  //获取年
    var month = data.getMonth() + 1;    //获取月
    var day = data.getDate(); //获取日
    time = year + "-" + appendzero(month) + "-" + appendzero(day);
    return time;
}
//获取当前日期前后，0，-1,1
var GetDateStr = function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
};
//获取url后面的参数值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}
//点击TR更改当前的颜色
function trChangeBgCol(ele) {
    $(ele).siblings().removeClass('danger');
    $(ele).attr('class', 'danger');
}

//模态框
function motaikuang() {
    //$('#FundProject_select').remove();
    if ($('body').find('#FundProject_select').length == 0) {
        $('body').append('<div class="modal fade" data-keyboard="false" data-backdrop="static" id="FundProject_select" tabindex="-1" role="dialog" aria-labelledby="FundProject_select" aria-hidden="true"><div class="modal-dialog" role="document" style="width: 750px;"><div class="modal-content FundProject_select"></div></div></div>')
    }
    backtotop();
}
//模态框上显示模态框
function motaikuangSecond() {
    $('#secondModal').remove();
    $('body').append('<div class="modal fade" data-keyboard="false" id="secondModal" tabindex="-1" role="dialog" aria-labelledby="secondModal" aria-hidden="true"><div class="modal-dialog" role="document" style="width: 750px;"><div class="modal-content secondModal"></div></div></div>')
    backtotop();
}

function checkHasImg() {
    getdata('/CmsDocPublish/AddTextToImg', {}, function (data) {
        if (data.RESULT_CODE == '1') {
            localStorage.imgURL = data.RESULT_DESC;
        }
    }, function (err) {

    });
}
//checkHasImg();

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function backtotop() {
    window.parent.scrollTo(0, 0);
}

/*function timepicker() {
    $('.form_datetime').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        format: 'yyyy-mm-dd',
        endDate: dateForm(new Date())
    });
}*/
function timepickerEnd(obj) {
    var obj = obj || {};
    var timeDATA = {
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        format: 'yyyy-mm-dd',
        //endDate: dateForm(new Date())
    };
    if (!!obj.Oenddata) {
        timeDATA.endDate = GetDateStr(obj.Oenddata);
    } else {
        timeDATA.endDate = dateForm(new Date());
    }
    $('.form_time').datetimepicker(timeDATA);
}

function timepicker(obj) {
    var obj = obj || {};
    var timeDATA = {
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        format: 'yyyy-mm-dd',
        //endDate: dateForm(new Date())
    };
    if (!!obj.Oenddata) {
        timeDATA.endDate = GetDateStr(obj.Oenddata);
    } else {
        timeDATA.endDate = dateForm(new Date());
    }
    $('.form_datetime').datetimepicker(timeDATA);
}


//RMP时间控件初始化,
// 开始时间： 当前日期（含今天）之后
//结束时间: 1.大于等于开始日期。 2.双月结束日之前（譬如2.28；4.30；6.30；8.31；10.31；12.31）
function timepickerRMP(obj) {
    var obj = obj || {};
    var startDate = new Date();
    var endDate='';
    //obj.time是timeUnitId
    if(obj.time!=undefined){
        endDate = new doubleMonth(obj.time);
    }else{
        endDate = new doubleMonth(startDate);
    }
    var timeDATA = {
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        format: 'yyyy-mm-dd',
        startDate: dateForm(startDate),
        endDate: dateForm(endDate)
    };
    $('.form_datetime').datetimepicker(timeDATA);

    //id 日期控件ID
    //greaterThan id大于这个greaterThan的值
    //lessThan id小于这个lessThan的值
    if (obj.greaterThan != undefined) {
        $(obj.id).bind('change', function () {
            var time=$(obj.id).val();
            if(obj.fixed != undefined){//固定传播设置开始时间不小于结束时间6个月
                time=dateForm(lessSixMonth(time));
            }
            $(obj.greaterThan).datetimepicker('setEndDate', time);
        });
    }
    if (obj.lessThan != undefined) {
        $(obj.id).bind('change', function () {
            //设置结束时间不小于开始时间
            var time2=$(obj.id).val();
            if(obj.fixed != undefined){
                time2=dateForm(moreSixMonth(time2));
            }
            $(obj.lessThan).datetimepicker('setStartDate', time2);
        });
    }
    //补报不限制开始时间，只要求结束时间大于开始时间
    if (obj.picker != undefined) {
        $(obj.picker).datetimepicker('setEndDate', "");
    }
    if (obj.picker != undefined) {
        $(obj.picker).datetimepicker('setStartDate', "");
    }
    //固定传播
    if (obj.fixed != undefined) {
        var startDate = new Date(new Date());
        var year = startDate.getFullYear();    //取当前的年份
        var firstdate='';
        var lastdate='';
        if(obj.fixed=='#d1'){
            firstdate = new Date(year, 0,1); 
            lastdate = new Date(year, 5,30); 
            $(obj.fixed).datetimepicker('setStartDate', firstdate);
            $(obj.fixed).datetimepicker('setEndDate', lastdate);
        }else if(obj.fixed=='#d2'){
             firstdate = new Date(year, 6,1); 
            lastdate = new Date(year, 11,31); 
            $(obj.fixed).datetimepicker('setStartDate', firstdate);
            $(obj.fixed).datetimepicker('setEndDate', lastdate);
        } 
    }
}

//固定传播开始时间不小于结束时间六个月
function lessSixMonth(time){
    var startDate = new Date(time);
    var year = startDate.getFullYear();    //取当前的年份
    var month = startDate.getMonth();//当前月份
    var date = startDate.getDate();
    var firstdate = new Date(year, month-6,date);  
    return firstdate;
}

//固定传播结束时间超过结束时间六个月
function moreSixMonth(time){
    var startDate = new Date(time);
    var year = startDate.getFullYear();    //取当前的年份
    var month = startDate.getMonth();//当前月份-1
    var date = startDate.getDate();
    var firstdate = new Date(year, month+6,date);  
    return firstdate;
}

//获取双月最后一天
function doubleMonth(time) {
    var startDate = new Date(new Date());
    var year = startDate.getFullYear();    //取当前的年份
    var month = parseInt(time);//当前月份
    if (month % 2 != 0) {//如果是单月
        month += 1;
    }
    var firstdate = new Date(year, month, 1);   //取双月中的第一天
    var endDate = (new Date(firstdate.getTime() - 1000 * 60 * 60 * 24));//获取双月最后一天
    return endDate;
}

//跳转到iframe的某个页面  //用法：1 human_resource.html 链接common.js 2 增加iframeGoPage('iframe1')
function iframeGoPage(tar) {
    var iframeGoPage = GetQueryString('iframeGoPage');
    if (iframeGoPage) {
        $('#' + tar).attr('src', 'contentmanag/' + iframeGoPage)
    }
}

function selAddText(id) {
    $(id).find('select').each(function (index, ele) {
        $(ele).prepend('<option value="">请选择</option>')
    });
}

var isTest = true;
var cm = {
    code: "RESULT_CODE"
    , desc: "RESULT_DESC"
    , emptyOptionText: "请选择"
    , auditHtml: '<select> <option value="3">通过</option><option value="-1">不通过</option></select>'
    , n: function () {
    }

    //子窗口隐藏自己
    , hideThisModal: function (cfg) {
        parent.cm.hideModal({ id: "#" + cfg.vars.inPar.ifm.modalID });
    }
    , popIframe: function (cfg) {
        var f = cfg.ifm;
        if (f.linkType) {//是链接跳转的方式
            cm.redirect(f.url, { param: cfg.cfg });
        }
        else {//弹窗
            if (cfg.ifm.max) {

            }
            else {
                var ifmHeight = $(window[f.iframeName].parent.window.document).find("#" + f.modalID).height();
                ifmHeight = window[f.iframeName].document.body.scrollHeight;
                var windowHeight = $(window).height() - 30 * 3;
                if (ifmHeight > windowHeight) {
                    $("#" + f.iframeName).height(windowHeight);
                }
                else {
                    $("#" + f.iframeName).height(ifmHeight);
                }
            }

            var modalID = "#" + f.modalID;
            var par = cfg.cfg;
            par.ifm = f;
            window[f.iframeName].window.ht.initial(par);
            $(modalID).modal();
        }

    }
    , setDisableOrNot: function (cfg) {
        var d = "disabled";
        var id = cfg.id;
        if (cfg.bool) {
            $(id).attr(d, "");
        }
        else {
            if ($(id).attr(d) != undefined) {
                $(id).removeAttr(d);
            }
        }
    }

    , setFrameHeight: function () {
        $(parent.document).find('iframe[id=iframe1]').height($(parent.window).height());
    }
    , setPageHeight: function () {
        $(parent.document).find('iframe[id=iframe1]').height($('html').height() + 30);
    }
    , uuid: function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
    , showloading: function (cfg) {
        var id = cfg.id;
        $('#' + id).remove();
        $('body').after('<div id="' + id + '" class="loadingbagcol">' +
            '<div class="loadwrap"><span></span></div>' +
            '</div>')
    }
    , hideloading: function (cfg) {
        $('#' + cfg.id).remove();
    }
    //ajax方法
    , ajax: function (cfg) {
        var par;
        if (typeof (cfg.param) == "function") {
            par = cfg.param();
        }
        else if (typeof (cfg.param) == "object") {
            par = cfg.param;
        }
        cm.getdata(cfg.url, par, cfg.suc, cfg.error, cfg);
    }
    , getdata: function (url, parm, fn, errfn, cfg) {
        var defConfig = {
            async: true
        };
        cfg = $.extend(defConfig, cfg);
        var id = "m" + cm.uuid();
        if (cfg.noloading == undefined || !cfg.noloading) {
            cm.showloading({ id: id });
        }

        url = urlPrefix + url;
        log("start" + url);
        log(parm);
        $.ajax({
            url: url,
            data: parm,
            type: "POST",
            dataType: "json",
            cache: false,//不取浏览器缓存
            async: cfg.async,//异步
            success: function (data) {
                log("--" + url + "----");
                log(data);
                log("--" + url + " end---");
                if (fn != undefined) {
                    fn(data);
                }
            }, error: function (err) {
                log(err);
                if (errfn != undefined) {
                    errfn(err);
                }
                else {
                    if (err.responseText != undefined && err.responseText.indexOf("重新登录") > -1) {
                        al('用户信息丢失，请重新登录');
                    }
                    else {
                        al("请求数据发生错误");
                    }
                }
            },
            complete: function () {
                if (cfg.noloading == undefined || !cfg.noloading) {
                    cm.hideloading({ id: id });
                }
            }
        });
    }
    , loadSelect: function (cfg) {
        var ele = $(cfg.id);
        if (ele.length == 0) {
            ele = cfg.ele;
        }
        ele.html("");
        if (cfg.valueField == undefined) {
            cfg.valueField = 'PUBLIC_VALUE';
        }
        if (cfg.textField == undefined) {
            cfg.textField = 'PUBLIC_NAME';
        }
        var data = cfg.data;
        if (data == undefined) {
            log("select data is undefined");
            return;
        }
        if (cfg.emptyText != undefined && cfg.emptyText != '') {
            ele.append('<option value="-1">' + cfg.emptyText + '</option>');
        }
        for (var i = 0; i < data.length; i++) {
            ele.append('<option value="' + data[i][cfg.valueField] + '">' + data[i][cfg.textField] + '</option>');
        }
        ele.change();
    }
    , loadSelect2: function (cfg) {
        var ele = $(cfg.id);
        cfg.valueField = ele.attr("k");
        cfg.textField = ele.attr("v");
        var d = ele.attr("dt");
        var data = cfg.data[d];
        ele.html("");
        if (cfg.emptyText != undefined && cfg.emptyText != '') {
            ele.append('<option value="-1">' + cfg.emptyText + '</option>');
        }
        for (var i = 0; i < data.length; i++) {
            ele.append('<option value="' + data[i][cfg.valueField] + '">' + data[i][cfg.textField] + '</option>');
        }
        if (cfg.nochange == undefined || cfg.nochange == false) {
            ele.change();
        }

    }
    , resetForm: function (id) {
        var ctr = $(id).find("input, select, textarea");
        for (var i = 0; i < ctr.length; i++) {
            switch (ctr[i].type) {
                case 'text':
                    $(ctr[i]).val('');
                    break;
                case 'select-one':
                    $(ctr[i]).val('');
                    break;
            }
        }
    }
    , bindSelect: function (cfg) {
        var ctr = $(cfg.id).find("select");
        for (var i = 0; i < ctr.length; i++) {
            var c = $(ctr[i]);
            var dt = c.attr("dt");
            var k = c.attr("k");
            var v = c.attr("v");
            if (k == undefined) {
                k = "PUBLIC_VALUE";
            }
            if (v == undefined) {
                v = "PUBLIC_NAME";
            }
            var emptytext = '';
            if (c.attr("required") == undefined) {
                emptytext = "请选择";
            }
            var cfg2 = { data: cfg.data[dt], valueField: k, textField: v, ele: c, emptyText: emptytext };
            cm.loadSelect(cfg2);
        }
    }
    , clearFormVal: function (cfg) {
        var selector = "input, select, textarea,p";
        if (cfg.selector != undefined) {
            selector = cfg.selector;
        }
        var ctr = $(cfg.id).find(selector);
        for (var i = 0; i < ctr.length; i++) {
            var c = $(ctr[i]);
            c.val("");
            switch (c.get(0).tagName) {
                case "INPUT":
                    if (c.attr("jd") != undefined) {
                        c.attr("jd", "");
                    }
                    break;
                case "SELECT":
                    c.html("");
                    break;
                case "TEXTAREA":
                    c.val("");
                    break;
                case "P":
                    c.html("");
                    break;
            }
        }
    }
    , bindFormVal: function (cfg) {
        var selector = "input, select, textarea";
        if (cfg.selector != undefined) {
            selector = cfg.selector;
        }
        var ctr = $(cfg.id).find(selector);
        if (cfg.data == undefined || cfg.data == null) {
            log("bindFormVal:" + "cfg.data error:" + cfg.data);
            return;
        }
        for (var i = 0; i < ctr.length; i++) {
            var c = $(ctr[i]);
            if (c.attr("name") != "" && cfg.data[c.attr("name")] != undefined) {
                var v = cfg.data[c.attr("name")];
                switch (c.get(0).tagName) {
                    case "INPUT":
                    case "SELECT":
                    case "TEXTAREA":
                        c.val(v);
                        break;
                    case "P":
                    case "SPAN":
                        c.html(v);
                        break;
                    case "IMG":
                        c.attr("src", v);
                        break;
                }

            }
        }
    }
    , getFormVal: function (cfg) {
        var ctr = $(cfg.id).find("input, select, textarea");
        var par = {};
        for (var i = 0; i < ctr.length; i++) {
            var c = $(ctr[i]);
            var n = c.attr("name");
            if (n == undefined || n == "") {
                continue;
            }
            if (c.attr("jd") != undefined) {
                par[n] = c.attr("jd");
            }
            else {
                par[n] = c.val();
            }
        }
        return par;
    }
    , getTableVal: function (cfg) {
        var trs = $(cfg.id + " tr");
        var startRow = 1;
        if (cfg.startRow != undefined) {
            startRow = cfg.startRow;
        }
        var arr = [];
        for (var i = startRow; i < trs.length; i++) {
            var p = {};
            var tds = $(trs[i]).find("input, select, textarea");
            for (var j = 0; j < tds.length; j++) {
                p[$(tds[j]).attr("name")] = $(tds[j]).val();
            }
            arr.push(p);
        }
        return arr;
    }
    , appendIframe: function (cfg) {
        var id = cm.uuid();
        var modalID = "m" + id;
        var iframeName = "i" + id;
        if (cfg.modalID != undefined) {
            modalID = cfg.modalID;
        }
        if (cfg.iframeName != undefined) {
            iframeName = cfg.iframeName;
        }
        cfg.modalID = modalID;
        cfg.iframeName = iframeName;
        if (cfg.linkType) {
            //do nothing
            cfg.url = cfg.ifSrc;
        }
        else {
            var nCfg = $.extend(cfg, { modalID: modalID, iframeName: iframeName, src: cfg.ifSrc, static: cfg.static });
            var html = cm.modalIframHtml(nCfg);
            $("body").append(html);
        }

        cfg.close = function () {
            if ($("#" + cfg.modalID).length == 0 && parent.cm != undefined) {
                parent.cm.hideAndReloadModal(cfg);
            }
            else {
                cm.hideAndReloadModal(cfg);
            }
        }
        cfg.pop = function (pcfg) {
            cm.popIframe({
                ifm: cfg
                , cfg: pcfg
            });
        }
        return cfg;
    }
    //弹出岗位
    , showStation: function (cfg) {
        var cfg1 = {
            ifSrc: '../system-setting/station_choose.html'
            , selectButton: 'btnSelectFactory'
            , type: "station"
            , not750: true
        }
        cfg = $.extend(cfg, cfg1);
        cm.showSelectWindow(cfg);
    }

    //弹出单位
    , showUnit: function (cfg) {
        var cfg1 = {
            ifSrc: '_dlr_base.html'
            , selectButton: 'btnDLRSelect'
            , type: "unit", not750: true
        }
        cfg = $.extend(cfg, cfg1);
        if (cfg.brand == "-1") {//选择'请选择' 即全部品牌
            cfg.brand = "";
        }
        cm.showSelectWindow(cfg);
    }
    //弹出部门
    , showDept: function (cfg) {
        var cfg1 = {
            ifSrc: '_department_choose.html'
            , selectButton: 'btnDeptSelect'
            , type: "dept", not750: true
        }
        cfg = $.extend(cfg, cfg1);
        cm.showSelectWindow(cfg);
    }
    , modalIframHtml: function (cfg) {
        var dropStatic = '';
        if (cfg.static != undefined && cfg.static) {
            dropStatic = 'data-backdrop="static"';
        }
        var modalCss = "width: 750px; "
        var contentCss = "width: 100%;border-radius: 10px; ";
        var iframeCss = "width: 100%; height: 600px;border-radius: 10px;"
        if (cfg.not750) {
            modalCss = "";
        }
        if (cfg.max) {
            modalCss = "margin: 0px;    width: 750px;    height: 100%;"
            contentCss = "  height: 100%;border-radius: 10px;"
            iframeCss = "width: 100%; height: 98%;border-radius: 10px;"
        }
        if (cfg.height) {
            iframeCss = "width: 100%; height: " + cfg.height + "px;border-radius: 10px;";
        }
        var modalCss2 = "modal fade bs-example-modal-lg";
        if (cfg.noFade) {
            modalCss2 = "modal bs-example-modal-lg";
        }
        return '<div id="' + cfg.modalID + '" style="min-height: 600px;" class="' + modalCss2 + '" tabindex="-1" role="dialog"'
            + ' aria-labelledby="myLargeModalLabel" aria-hidden="true" ' + dropStatic + '>'
            + '    <div class="modal-dialog modal-lg" style="' + modalCss + '">'
            + '    <div  class="modal-content" style="' + contentCss + '">'
            + '     <iframe name="' + cfg.iframeName + '" src="' + cfg.src + '" id="' + cfg.iframeName + '"'
            + '   style="' + iframeCss + '"></iframe>'
            + '      </div>'
            + '     </div>'
            + '     </div>';
    }
    //弹出岗位
    , showInterviewStation: function (cfg) {
        var cfg1 = {
            ifSrc: '../system-setting/interview_station.html'
            , selectButton: 'btnSelectFactory'
            , type: "InterviewStation", not750: true
        }
        cfg = $.extend(cfg, cfg1);
        if (cfg.carbrand == "-1") {//选择'请选择' 即全部品牌
            cfg.carbrand = "";
        }
        cm.showSelectWindow(cfg);
    }
    //弹出集团
    , showGroup: function (cfg) {
        var cfg1 = {
            ifSrc: '_jituan_checkbox.html'
            , selectButton: 'btnGroupSelect'
            , type: "group", not750: true
        }
        cfg = $.extend(cfg, cfg1);
        cm.showSelectWindow(cfg);
    }
    //弹出大区小区
    , showArea: function (cfg) {
        var cfg1 = {
            ifSrc: 'area_choose.html'
            , selectButton: 'btnDeptSelect'
            , type: "area", not750: true
        }
        if (cfg.brand == "-1") {
            cfg.brand = "";
        }
        cfg = $.extend(cfg, cfg1);
        cm.showSelectWindow(cfg);
    }
    //公共弹出选择框
    , showSelectWindow: function (cfg) {
        var id = cfg.targetID;
        var targetID = $(event.target).attr("id");
        var modalID = "m" + targetID + cfg.type;
        var iframeName = "i" + targetID + cfg.type;
        var html = cm.modalIframHtml({ modalID: modalID, iframeName: iframeName, src: cfg.ifSrc, not750: cfg.not750 });
        modalID = "#" + modalID;
        if ($(modalID).length == 0) {
            $('body').append(html);
        }
        var selectedData = $(id).attr("jd");
        if (selectedData == undefined) {
            selectedData = "";
        }
        preventDefault();
        /*
        if (event != undefined) {
            event.preventDefault();
        }*/
        var ifm = window[iframeName];
        var popWindow = ifm.window;
        var btn = $(popWindow.document).find('button[id=' + cfg.selectButton + ']').eq(0);
        var fn = function () {
            $(modalID).modal();
            if (popWindow.acceptParam != undefined) {
                switch (cfg.type) {
                    case "group":
                        popWindow.acceptParam(selectedData);
                        break;
                    case "unit":
                        popWindow.acceptParam(selectedData, cfg.brand, cfg.dlrIn);
                        break;
                    case "station":
                        popWindow.acceptParam(cfg.displayType, selectedData, '', cfg.carbrand);
                        break;
                    case "dept":
                        popWindow.acceptParam(selectedData, cfg.mode, cfg.brand);
                        break;
                    case "InterviewStation":
                        popWindow.acceptParam(selectedData, '', cfg.carbrand);
                        break;
                    case "area":
                        popWindow.acceptParam({ selectedData: selectedData, mode: cfg.mode, brand: cfg.brand });
                        break;
                }
            }

            $(popWindow.document).find('button.close').eq(0).bind('click', function () {
                $(modalID).modal('hide');
            });

            if (btn.length == 0) {
                btn = $(popWindow.document).find('button[id=' + cfg.selectButton + ']').eq(0);
            }
            if (!btn.hasClass("loaded")) {
                btn.click(function () {//点击选择按钮
                    console.log("返2回：" + JSON.stringify(popWindow.resValue()));
                    var newSelectedData = popWindow.resValue();
                    var jd = "dlr_list";
                    var val = "name_list";
                    switch (cfg.type) {
                        case "group":
                            jd = "id_list";
                            val = "name_list";
                            break;
                        case "dept":
                        case "area":
                            jd = "resValue";
                            val = "resName";
                            break;
                        case "unit":
                        case "station":
                        case "InterviewStation":
                            break;

                    }
                    $(id).attr("jd", cm.trimR(newSelectedData[jd]));
                    $(id).val(cm.trimR(newSelectedData[val]));
                    $(modalID).modal('hide');
                });
                $(id).keyup(function () {
                    if ($(this).val() == "") {
                        $(this).attr("jd", "");
                    }
                });
                btn.addClass("loaded");

            }
        }

        if (btn.length == 0) {//首次加载需等到iframe加载完成
            if (!isIE()) { //if not IE
                ifm.onload = function () {
                    fn();
                };
            } else {
                ifm.onreadystatechange = function () {
                    if (window[cfg.iframeName].readyState == "complete") {
                        fn();
                    }
                };
            }
        }
        else {
            fn();
        }
    }
    , getDateStr: function (cfg) {
        cfg = $.extend({ type: "D", offset: 0 }, cfg);
        var AddDayCount = cfg.offset;
        switch (cfg.type) {
            case "M"://todo 粗略
                AddDayCount = AddDayCount * 30;
                break;
            case "Y":
                AddDayCount = AddDayCount * 365;
                break;
        }
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1).toString() : (dd.getMonth() + 1).toString()); //获取当前月份的日期
        var d = (dd.getDate() < 10 ? "0" + (dd.getDate()).toString() : (dd.getDate()).toString());
        var r = y + "-" + m + "-" + d;
        switch (cfg.type) {
            case "M":
                ;
                r = y + "-" + m
                break;
            case "Y":
                r = y;
                break;
        }
        return r;
    }
    , trimR: function (txt) {
        return txt;
        ////
        if (txt.indexOf(',') != -1) {
            return txt.substr(0, txt.length - 1);
        }
        else {
            return txt;
        }
    }
    , tableLoadSuc: function (cfg) {//数据加载后计算iframe高度
        var iframe = parent.document.getElementById(cfg.id);
        if (iframe == null || iframe == undefined) {
            log("iframe null");
            return;
        }
        var height = getHeightFromIframe(iframe);

        /*   if (cfg.notParentHeight == undefined || cfg.notParentHeight == false) {
               height = $(parent.document).height();
           }
           */
        height = $(parent.document).height();
        //
        log("******tableLoadSuc:" + cfg.notParentHeight);
        log("tableHeight:" + height);
        $(iframe).height(height);
        // IE8 下该事件只触发了一次
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                $(iframe).height(height);
            });
        } else {
            iframe.onload = function () {
                $(iframe).css("min-height", "530px");
                $(iframe).height(height);
            };
        }
    }
    , hideModal: function (cfg) {
        $(cfg.id).modal('hide');
        if (cfg.iframeName != undefined) {
            window[cfg.iframeName].document.location.reload();
        }
    }
    , hideAndReloadModal: function (cfg) {
        $("#" + cfg.modalID).modal('hide');
        window[cfg.iframeName].document.location.reload();
    }
    , selAddTextOne: function (obj) {
        $(obj.target).prepend('<option value="">请选择</option>');
    }
    //初始化页面控件
    , initialPage: function (cfg) {
        if (true) {
            //form 初始化表单控件
            if (cfg.form == undefined || cfg.form.length == 0 || cfg.form[0].ctrl == undefined) {
                log("no form ");
            }
            else {
                for (var k = 0; k < cfg.form.length; k++) {
                    var f = cfg.form[k];
                    var validateRule = {
                        rules: {}
                    };
                    for (var i = 0; i < f.ctrl.length; i++) {
                        var c = f.ctrl[i];
                        if (c.name != undefined) {
                            if (c.type != "RADIO") {//radio用的是span来包住,设置name后,校验时会报错
                                $(c.id).attr("name", c.name);
                            }
                        }
                        switch (c.type) {
                            case "SELECT":
                                if (c.dt != undefined) {
                                    $(c.id).attr("dt", c.dt);
                                }
                                if (c.k != undefined) {
                                    $(c.id).attr("k", c.k);
                                }
                                if (c.v != undefined) {
                                    $(c.id).attr("v", c.v);
                                }
                                break;
                            case "INPUT":
                                break;
                            case "DATE":
                                var dCfg = { id: c.id };

                                if (c.greaterThan != undefined) {
                                    dCfg.greaterThan = c.greaterThan;
                                }
                                if (c.lessThan != undefined) {
                                    dCfg.lessThan = c.lessThan;
                                }
                                if (c.max != undefined) {
                                    dCfg.max = c.max;
                                }
                                if (c.min != undefined) {
                                    dCfg.min = c.min;
                                }
                                cm.initialDate({ id: c.id, config: c.config });
                                if (JSON.stringify(dCfg) != JSON.stringify({ id: c.id })) {
                                    cm.setDateRange(dCfg);
                                }
                                if (c.value != undefined) {
                                    $(c.id).val(c.value);
                                }
                                break;
                        }
                        //绑定控件的事件
                        if (c.event != undefined && c.event.length > 0) {
                            for (var j = 0; j < c.event.length; j++) {
                                var ev = c.event[j];
                                $(c.id).bind(ev.name, ev.handler);
                            }
                        }
                        //提取验证规则
                        if (c.validate != undefined) {
                            validateRule.rules[c.name] = c.validate;
                        }
                    }
                    f.validateCfg = validateRule;

                }
            }
            //button  绑定按钮的事件
            if (cfg.button != undefined) {
                for (var i = 0; i < cfg.button.length; i++) {
                    var b = cfg.button[i];
                    $(b.id).bind('click', b.handler);
                }
            }
            else {
                log("no  button");
            }
        }
        //初始化校验表单规则,只需调用一次
        cfg.initialValidate = function (index) {
            var fn = function (f) {
                if (f.validateCfg != undefined) {
                    $(f.id).validate(f.validateCfg);
                }
            }
            if (index == undefined) {
                for (var k = 0; k < cfg.form.length; k++) {
                    var f = cfg.form[k];
                    fn(f);
                }
            }
            else {
                var f = cfg.form[index];
                fn(f);
            }
        }
        cfg.validate = function (index) {
            var re = true;

            var fn = function (f) {
                if (f.validateCfg != undefined) {
                    var r = $(f.id).validate({ debug: true }).form();
                    if (!r) {
                        re = false;
                    }
                }

            }
            if (index == undefined) {
                for (var k = 0; k < cfg.form.length; k++) {
                    var f = cfg.form[k];
                    fn(f);
                }
            }
            else {
                var f = cfg.form[index];
                fn(f);
            }
            return re;
        }
        //清除表单的值
        cfg.clearFormVal = function (index) {
            var clear = function (f) {
                for (var i = 0; i < f.ctrl.length; i++) {
                    var c = $(f.ctrl[i].id);
                    c.val("");
                    switch (f.ctrl[i].type) {
                        case "INPUT":
                            if (c.attr("jd") != undefined) {
                                c.attr("jd", "");
                            }
                            break;
                        case "SELECT":
                            c.html("");
                            break;
                        case "TEXTAREA":
                            c.val("");
                            break;
                        case "P":
                        case "RADIO":
                            c.html("");
                            break;
                        case "A":
                            c.attr("href", "");
                            break;
                    }
                }
            }
            if (index == undefined) {
                for (var k = 0; k < cfg.form.length; k++) {
                    var f = cfg.form[k];
                    clear(f);
                }
            }
            else {
                var f = cfg.form[index];
                clear(f);
            }

        }
        //获取表单的值
        cfg.getFormVal = function (index) {
            var par = {};
            var getPar = function (f) {
                for (var i = 0; i < f.ctrl.length; i++) {
                    var c = f.ctrl[i];
                    var cdom = $(c.id);
                    if (cdom.attr("notParam") != undefined) {
                        continue;
                    }
                    var n = c.name;
                    if (c.paramName != undefined) {
                        n = c.paramName;
                    }
                    if (n == undefined || n == "") {
                        continue;
                    }
                    if (c.type == "RADIO") {
                        par[n] = $('input:radio[name=' + n + ']:checked').val();
                    } else {
                        if (c.jd) {
                            par[n] = cdom.attr("jd");
                        }
                        else {
                            par[n] = cdom.val();
                        }
                    }
                }
            }

            if (index == undefined) {
                for (var k = 0; k < cfg.form.length; k++) {
                    var f = cfg.form[k];
                    getPar(f);
                }
            }
            else {
                var f = cfg.form[index];
                getPar(f);
            }

            return par;
        }
        //绑定表单的值
        cfg.bindFormVal = function (data, index) {
            var bind = function (f) {
                for (var i = 0; i < f.ctrl.length; i++) {
                    var c = f.ctrl[i];
                    var n = c.name;
                    if (c.bindName != undefined) {
                        n = c.bindName;
                    }
                    var v = data[n];
                    if (v == undefined) {
                        continue;
                    }
                    var cd = $(c.id);
                    switch (c.type) {
                        case "INPUT":
                        case "TEXTAREA":
                        case "DATE":
                            cd.val(v);
                            break;
                        case "SELECT":
                            cd.val(v);
                            cd.change();
                            break;
                        case "P":
                            cd.html(v);
                            break;
                        case "IMG":
                            cd.attr("src", v);
                            break;
                        case "A":
                            cd.html(v);
                            if (c.hrefName != undefined) {
                                cd.attr("href", data[c.hrefName]);
                            }
                            break;
                        case "ACLICK":
                            cd.html(v);
                            break;
                        case "RADIO":
                            //  $('input:radio[name=' + c.name + ']').val(v);
                            $('input:radio[name=' + c.name + ']').each(function () {
                                if ($(this).val() == v) {
                                    this.checked = true;
                                }
                            });
                            break;
                    }
                }
            }
            if (index == undefined) {
                for (var k = 0; k < cfg.form.length; k++) {
                    var f = cfg.form[k];
                    bind(f);
                }
            }
            else {
                var f = cfg.form[index];
                bind(f);
            }
        }
        //绑定 单选框
        cfg.bindRadion = function (data, index) {

            var bind = function (f) {
                for (var i = 0; i < f.ctrl.length; i++) {
                    var c = f.ctrl[i];
                    var name = c.name;
                    if (c.type == "RADIO") {
                        var dt = c.dt;
                        if (dt == undefined || data[dt] == undefined) {
                            continue;
                        }

                        var k = c.k;
                        var v = c.v;
                        if (k == undefined) {
                            k = "PUBLIC_VALUE";
                        }
                        if (v == undefined) {
                            v = "PUBLIC_NAME";
                        }
                        if (data[dt].length > 0) {
                            var html = "";
                            for (var j = 0; j < data[dt].length; j++) {
                                var d = data[dt][j];
                                html += '<input type="radio" required="" class="output__text" value="' + d[k] + '" name="' + name + '">'
                                    + '<label class="label-bottom">' + d[v] + '</label>'
                            }
                            $(c.id).html(html);
                            $(c.id + ' input:radio[name=' + name + ']')[0].checked = true;

                            $(c.id + " label").click(function () {
                                if ($(this).attr("disabled") != undefined) {
                                    return;
                                }
                                var v = $(this).prev().val();
                                var n = $(this).prev().attr("name");
                                $(":radio[name='" + n + "'][value='" + v + "']").prop("checked", "checked");
                            });


                        }
                    }
                }
            }
            if (index == undefined) {
                for (var k = 0; k < cfg.form.length; k++) {
                    var f = cfg.form[k];
                    bind(f);
                }
            }
            else {
                var f = cfg.form[index];
                bind(f);
            }


        }
        //绑定表单的下拉框的值
        cfg.bindSelect = function (data, index) {
            var bind = function (f) {
                for (var i = 0; i < f.ctrl.length; i++) {
                    var c = f.ctrl[i];
                    if (c.type == "SELECT") {
                        var dt = c.dt;
                        var k = c.k;
                        var v = c.v;
                        if (k == undefined) {
                            k = "PUBLIC_VALUE";
                        }
                        if (v == undefined) {
                            v = "PUBLIC_NAME";
                        }
                        var emptytext = '';
                        if (!c.required) {
                            emptytext = "请选择";
                        }
                        cm.loadSelect({
                            data: data[dt],
                            valueField: k,
                            textField: v,
                            ele: $(c.id),
                            emptyText: emptytext
                        });
                    }
                }
            }
            if (index == undefined) {
                for (var k = 0; k < cfg.form.length; k++) {
                    var f = cfg.form[k];
                    bind(f);
                }
            }
            else {
                var f = cfg.form[index];
                bind(f);
            }


        }
        //刷新表格 index不传则刷新全部表格,index为第几个表格
        cfg.refreshTable = function (index) {
            if (cfg.table != undefined) {
                if (index == undefined) {
                    for (var i = 0; i < cfg.table.length; i++) {
                        var tb = cfg.table[i];
                        cm.refreshTable({ id: tb.id });
                    }
                }
                else {
                    var tb = cfg.table[index];
                    cm.refreshTable({ id: tb.id });
                }

            }
        }

        //初始化表格 index不传则初始化全部表格,index为第几个表格
        cfg.initialTable = function (index) {
            if (cfg.table != undefined) {
                if (index == undefined) {
                    for (var i = 0; i < cfg.table.length; i++) {
                        var tb = cfg.table[i];
                        cm.initialTable({ id: tb.id, notParentHeight: tb.notParentHeight, config: tb.config });
                    }
                }
                else {
                    var tb = cfg.table[index];
                    cm.initialTable({ id: tb.id, notParentHeight: tb.notParentHeight, config: tb.config });
                }

            }
        }
        return cfg;
    }
    //初始化表格的方法 cfg有两个参数:id表格的id;config:表格的配置,会覆盖原来的对应配置
    , initialTable: function (cfg) {
        var hg = cfg.notParentHeight;
        var tableConfigDefault = {
            responseHandler: function (res) {
                log(res);
                return {
                    "total": res.TOTAL_COUNT,
                    "rows": res.DATA
                }
            },
            queryParams: function (param) {
                var obj = cm.getFormVal({ id: "#form0" })
                obj.PAGE_SIZE = param.limit;
                obj.PAGE_NO = param.offset / param.limit + 1;
                console.log(obj);
                return obj;
            },
            striped: true,
            pagination: true, //以下添加分页
            pageNumber: 1,
            pageSize: 10,
            pageList: "[5]",
            sidePagination: "server", //以上添加分页
            method:'post',
            // uniqueId: "EMP_ID",
            onLoadSuccess: function () { //数据加载后计算iframe高度
                cm.tableLoadSuc({ id: 'iframe1', notParentHeight: hg });
            }
        };

        if (tableConfigDefault.pagination) {
            tableConfigDefault.responseHandler = function (res) {
                log(res);
                return {
                    "total": res.TOTAL_COUNT,
                    "rows": res.DATA
                }
            }
        }
        else {
            tableConfigDefault.responseHandler = function (res) {
                log(res);
                return {
                    //  "total": res.TOTAL_COUNT,
                    "rows": res.DATA
                }
            }
        }
        if (cfg.config != undefined) {
            for (o in cfg.config) {
                tableConfigDefault[o] = cfg.config[o];
            }
        }
        cm.initialTableSimple({ id: cfg.id, config: tableConfigDefault });
    }
    , initialTableSimple: function (cfg) {
        $(cfg.id).bootstrapTable(cfg.config);
        cm.refreshTableWidth({ id: cfg.id });
    }
    //初始化日期控件的方法 cfg有两个参数:id:控件的id;config:配置,会覆盖原来的对应配置
    , initialDate: function (cfg) {
        var config = {
            language: 'zh-CN',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: true,
            format: 'yyyy-mm-dd'
            , bootcssVer: 3
        }
        var sel;
        if (cfg != undefined && cfg.config != undefined) {
            for (o in cfg.config) {
                config[o] = cfg.config[o];
            }
        }
        if (cfg != undefined && cfg.id != undefined) {
            sel = cfg.id;
        }
        if (sel == undefined) {
            sel = ".mydate";
        }

        $(sel).each(function (i, o) {
            var $s = $(this);
            var css = "form-control";
            if (sel == ".mydate") {
                css = "form-control mydate";
            }
            $s.attr("class", css).css("cursor", "pointer");
            var h = $s.prop("outerHTML");
            $s.replaceWith(' <fieldset class="width100"><div class="input-group date form_datetime">' + h + '<span class="input-group-addon input-group-addon-change" style="cursor: auto"> <span class="glyphicon glyphicon-th" style="cursor: auto"></span></span></div> </fieldset>');
            $(sel).datetimepicker(config);
            if (cfg != undefined && cfg.config != undefined && cfg.config.editable == true) {
                $(sel).removeAttr("readonly");
            }
            else {
                $(sel).attr("readonly", "");
            }
            $(".input-group-addon").click(function () { $(this).prev().datetimepicker('show') });
        });

    }
    //初始化上传控件 cfg有两个参数:id:控件的id;config:配置,会覆盖原来的对应配置
    , initialUpload: function (cfg) {
        var defaultConfig = {
            language: 'zh',
            uploadUrl: urlPrefix + '/Home/UploadImg',
            allowedFileExtensions: ['png', 'jpg', 'gif', 'jpeg'],
            overwriteInitial: false,
            maxFileSize: 1000,
            maxFilesNum: 1,
            showUpload: false, //是否显示上传按钮
            showCaption: false,//是否显示标题
            browseClass: "btn button__upload", //按钮样式
            dropZoneEnabled: false,//是否显示拖拽区域
            allowedPreviewTypes: false,
            showRemove: false,
            // layoutTemplates:"preview",
            //allowedPreviewTypes: null, // set to empty, null or false to disable preview for all types
            // uploadAsync: true,
            slugCallback: function (filename) {
                getHeight();
                //未上传到后台的文件名
                return filename.replace('(', '_').replace(']', '_');
            }
        };
        var newCfg = $.extend(defaultConfig, cfg.config);
        $(cfg.id).fileinput(newCfg);
        $(cfg.id).on('fileselect', function (event, numFiles, label) {
            $('.kv-preview-data').remove();
            $('.file-preview-frame').css("height", "auto");
            $('button.kv-file-upload').remove();
            $('button.kv-file-zoom').remove();
            // $('button.kv-file-remove').remove();
            $('i.glyphicon-hand-down').remove();

        });

        var id = cfg.id;
        $(id).bind('change', function () {
            var $ele = $(id);
            if ($ele.attr("accept") != undefined) {//有限制后缀名v
                var msg = "请选择正确格式的文件:" + $ele.attr("accept");
                var fileName = $ele.val();
                if (fileName.lastIndexOf('.') == -1) {
                    $(".file-preview-error").remove();
                    //没有后缀名
                //    al(msg);
                    return;
                }
                var ext = fileName.substr(fileName.lastIndexOf('.')).toUpperCase();
                if ($ele.attr("accept").toUpperCase().indexOf(ext) == -1) {
                      $(".file-preview-error").remove();
                 //   al(msg);
                 return;
                }
            }
            $(id).fileinput('upload');
        });

        if (cfg.loadedFn != undefined) {
            //导入文件上传完成之后的事件
            $(cfg.id).on("fileuploaded", function (event, data, previewId, index) {
                //     alert(jQuery.parseJSON(data).RESULT_DESC);
                cfg.loadedFn(event, data, previewId, index, cfg);
            });
        }

    }
    //调用此方法后 右键不出现菜单 防止用户刷新iframe
    , preventRightClick: function () {
        // return;//todo
        document.oncontextmenu = function () {
            event.preventDefault();
        }
    }
    //解决bootstraptable 宽度不生效
    , refreshTableWidth: function (cfg) {
        if (cfg.id != undefined) {
            $("head").append('<style>' + cfg.id + ' tr td{ white-space: nowrap;}</style>');
            //   cfg.id.jq().find("td").css('white-space', 'nowrap');
            return;
            var id = "#tb1";
            var cfg = $(id).bootstrapTable('getOptions');
            if (cfg.columns != undefined && cfg.columns[0].length > 0) {
                var cols = cfg.columns[0];
                for (var i = 0; i < cols.length; i++) {
                    var c = cols[i];
                    if (c.width != undefined) {
                        $(id + " th[data-field='" + c.field + "']").find(".th-inner ").width(c.width);
                    }
                }
            }
            else {
                log("columns配置为空");
            }
        }
        else {
            log("缺少ID");
        }

    }
    //用于cell点击的拼凑参数
    , setParam: function (arr) {
        var r = "";
        $.each(arr, function (i, d) {
            r += "'" + d + "',";
        });
        if (arr.length > 0) {
            r = r.substring(0, r.length - 1);
        }
        return r;
    }

    //自定义确认框
    , confirm: function (cfg) {
        var cfg0 = {
            msg: "确认操作吗?"
            , fn: function () {
                log("do something");
            }
        };
        cfg = $.extend(cfg0, cfg);
        popWindow(2, cfg.msg, 3000);//3000是没用的
        "#about".jq().modal();
        $("#btnConfirm").one("click", function () {
            cfg.fn();
        });
    }
    , setDateRange: function (cfg) {
        //id 日期控件ID
        //greaterThan id大于这个greaterThan的值
        //lessThan id小于这个lessThan的值
        if (cfg.greaterThan == undefined && cfg.lessThan == undefined) {
            log("please define key 'greaterThan' or 'lessThan' ");
        }
        if (cfg.greaterThan != undefined) {
            $(cfg.id).bind('change', function () {
                $(cfg.greaterThan).datetimepicker('setEndDate', $(cfg.id).val());
            });
        }
        if (cfg.lessThan != undefined) {
            $(cfg.id).bind('change', function () {
                $(cfg.lessThan).datetimepicker('setStartDate', $(cfg.id).val());
            });
        }

        if (cfg.max != undefined) {
            $(cfg.id).datetimepicker('setEndDate', cfg.max);
        }
        if (cfg.min != undefined) {
            $(cfg.id).datetimepicker('setStartDate', cfg.min);
        }
    }
    , resizePopIframeHeight: function (offset) {
        //  return;
        var fn = function (isIE) {
            if (ht.vars.inPar.ifm != undefined && ht.vars.inPar.ifm.iframeName != undefined) {
                var parentHeight = $(parent.window.document).height() - 30 * 3;
                var windowHeight = $('html').height()
                var finalHeight = windowHeight;
                if (windowHeight > parentHeight) {
                    finalHeight = parentHeight;
                }
                if (isIE) {
                    finalHeight += 50;
                }
                else {

                }
                if (offset != undefined && !isNaN(offset)) {
                    finalHeight += offset;
                }
                parent.cm.setIfmHeight({ name: ht.vars.inPar.ifm.iframeName, height: finalHeight });
                //  $(parent.window.document).find("iframe[id=" + ht.vars.inPar.ifm.iframeName + "]").height(finalHeight);//有可能导致内存泄露
                log('set frameheight:' + finalHeight);
            }
        }


        if (!isIE()) { //if not IE
            fn(false);
        }
        else {
            setTimeout(function () {
                fn(true);
            }, 500);
        }

    }
    , setIfmHeight: function (cfg) {
        $("iframe[id=" + cfg.name + "]").height(cfg.height);
    }
    , object2String: function (obj) {
        var r = "";
        for (o in obj) {
            r += (o + "=" + obj[o] + "&");
        }
        return r.substr(0, r.length - 1);
    }
    , closePopwin: function () {
        if (ht.vars.inPar.ifm != undefined) {
            ht.vars.inPar.ifm.close();
        }
        else {
            history.back();
        }

    }
    , addCloseButton: function () {
        $("body").prepend('<button type="button" class="close close2 closeButton" data-dismiss="alert" onclick="cm.closePopwin()"> <span aria-hidden="true">×</span><span class="sr-only">Close</span></button>');
    }

    , fnSuc: function (cfg) {
        var data = cfg.data;
        var noAlert = cfg.noAlert;
        if (data[cm.code] == "0") {
            alMsgLong(data);
        }
        else if (data[cm.code] == "1") {
            if ((noAlert == undefined || noAlert == false)) {
                if (ht.vars.inPar != undefined && ht.vars.inPar.ifm != undefined) {
                    parent.alMsg(data);
                }
                else if (alMsg != undefined) {
                    alMsg(data);
                }
            }

            else if (noAlert == true) {
                //do nothing
            }
            cfg.fn(data);
        }
    }
    , findObj: function (cfg) {
        var arr = cfg.array;
        var k = cfg.key;
        var v = cfg.value;
        var r;
        if (arr.lengt == 0 || arr[0][k] == undefined) {
            return undefined;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][k] == v) {
                r = arr[i];
                break;
            }
        }
        return r;
    }
    , refreshTable: function (cfg) {
        var id = cfg.id;
        if ($(id).bootstrapTable('getData').length == 0 || $(id).bootstrapTable('getOptions').pagination == false) {
            $(id).bootstrapTable('refresh');
        } else {
            $(id).bootstrapTable('selectPage', 1);
        }
    }
    , isEmptyObj: function (obj) {
        var r = true;
        for (o in obj) {
            r = false;
            break;
        }
        return r;
    }
    , getRmpRole: function () {
        cm.ajax({
            url: "/BasData/GetRmpRole"
            , param: {}
            , suc: function (data) {
                cm.fnSuc({
                    data: data,
                    fn: function (data) {
                        return data.RMPRole;
                    }
                });
            }
        });
    }
    , redirect: function (url, cfg) {
        var param = "";
        if (cfg.param != undefined) {
            for (o in cfg.param) {
                param += (o + '=' + cfg.param[o] + '&');
            }
        }
        if (param != "") {
            param = "?" + param.substring(0, param.length - 1);
        }
        window.location.href = url + param;
    }
    , getRequest: function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    , rmpRowEditable: function (v) {
        /*
        -1 不通过
        00 返回修改
        01 未提交
        02 已提交未审核
        03 审核通过
        04  部分通过
        */
        var b = true;
        if (["-1", "03"].indexOf(v) > -1) {//这两个状态不能修改
            b = false;
        }
        return b;
    }
    , setElementDisabled: function ($ele) {
        $ele.attr("disabled", "").css("background-color", "#eeeeee");
    }
    , disableButton: function ($ele) {
        $ele.attr("disabled", "").addClass("btnDisabled");
    }
    , rmpSetController: function (type1, type2) {
        switch (type1) {
            case "budget":
                if (type2 == "repair") {
                    ht.url = "/SupplementCityBudget/";
                }
                else if (type2 == "special") {
                    ht.url = "/SpecialCityBudget/";
                }
                else {
                    ht.url = "/CityFundBudget/";
                }
                break;
            case "settle":
                if (type2 == "repair") {
                    ht.url = "/SupplementCitySettle/";
                }
                else if (type2 == "special") {
                    ht.url = "/SpecialCitySettle/";
                }
                else {
                    ht.url = "/CityFundSettle/";
                }
                break;
        }
    }
}
var sllog;
function log(t) {
    return;
   sllog=true;
    if ( sllog == true) {
        console.log(t);
    }

}
function al(t, timeout) {
    var tm = 1400;
    if (timeout != undefined) {
        tm = timeout;
    }
    var id = popWindow(0, t, tm, true);
    $("#" + id).modal('show');
}
function alOk(t, timeout) {
    var tm = 1400;
    if (timeout != undefined) {
        tm = timeout;
    }
    var id = popWindow(1, t, tm, true);
    $("#" + id).modal('show');
}
//默认的请求完数据后的提示
function alMsg(data, timeout) {
    if (data[cm.code] == 1 && data[cm.desc] != "" && data[cm.desc] != undefined) {
        alOk(data[cm.desc], timeout)
    }
    else if (data[cm.code] == 0 && data[cm.desc] != "" && data[cm.desc] != undefined) {
        al(data[cm.desc], timeout)
    }
}

function alMsgLong(data) {
    alMsg(data, 1000 * 60 * 60);
}

$(function () {
    if (isTest) {
        //  $(".testEle").hide();
    }
})
function getHeight() {
    var iframe = parent.document.getElementById('iframe1')
    //alert(iframe)
    //console.log(iframe)
    if ($(iframe).length > 0) {
        $(iframe).height(getHeightFromIframe(iframe));
        // IE8 下该事件只触发了一次
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                //alert('onload')
                $(iframe).height(getHeightFromIframe(iframe));
            });
        } else {
            iframe.onload = function () {
                //console.log('onload')
                $(iframe).css("min-height", "530px");
                $(iframe).height(getHeightFromIframe(iframe));
            };
        }
    }
    // resetScroll();
}
//select框加载相应数据
function load_data($aim, data, value, name) {
    var op = '';
    data = data || [];
    for (var i = 0; i < data.length; i++) {
        op += '<option value="' + data[i][value] + '">';
        op += data[i][name];
        op += '</option>'
    }
    $aim.html('<option value="">' + '请选择' + '</option>')
    $aim.append(op);
}
function load_input_val($aim, data, value, name, item) {
    $aim.val(item)
}
function load_data_val($aim, data, value, name, item) {
    var op = '';
    data = data || [];
    for (var i = 0; i < data.length; i++) {
        op += '<option value="' + data[i][value] + '">';
        op += data[i][name];
        op += '</option>'
    }
    $aim.html('<option value="">' + '请选择' + '</option>')
    $aim.append(op);
    item = item || ''
    $aim.val(item)
}

//以下用于头部菜单
/*function showInTime($el,time){
 $el.show()
 $el.stop().animate({
 height:
 },time,function(){
 // $el.show()
 } );
 }
 function hideInTime($el,time){

 $el.stop().animate({
 height: "0"
 },time,function(){
 $el.hide()
 });
 }*/
//  $('body').off('mouseover', '.j-nb-item').off('mouseout', '.j-nb-item').on('mouseover', '.j-nb-item', function () {
//     $(this).addClass('z-act')
// }).on('mouseout', '.j-nb-item', function () {
//     $(this).removeClass('z-act')
// })
$('body').off('mouseover', '.j-nb-items-fst').on('mouseover', '.j-nb-items-fst', function () {
    $(this).find('.j-nb-item').addClass('z-act')
    $(this).find('.j-nb-items-snd').show()
    // showInTime($(this).find('.j-nb-items-snd'),500)
})
$('body').off('mouseout', '.j-nb-items-fst').on('mouseout', '.j-nb-items-fst', function () {
    $(this).find('.j-nb-item').removeClass('z-act')
    $(this).find('.j-nb-items-snd').hide()
    //hideInTime($(this).find('.j-nb-items-snd'),500)
})
$('body').off('click', '.j-nb-item-snd').on('click', '.j-nb-item-snd', function () {
    $('.j-nb-item-snd').each(function (index, el) {
        $(el).removeClass('z-act');
    })
    $(this).addClass('z-act')
    var _navbar = localStorage.navbar
    _navbar = _navbar ? JSON.parse(_navbar) : _navbar 
    var list_id = $(this).attr('listID')
    if(_navbar.data[list_id].URL_ADDRESS=='/library/Index'){
        window.location.href = "/Pages/document_center.html";
        
        return
    }
    var main_url = 'main_case.html'
    var str = getUrl()
    if (str == main_url) {
        getLeftColumnByOrder($(this).attr('listID'));
        getBreadcrumbByOrder($(this).attr('listID'));
        getHeight();
    } else {
        window.location.href = main_url + '?list_id=' + $(this).attr('listID') + '';
    }

    // $('.j-nb-item').each(function(index, el) {
    //     $(el).removeClass('z-now-act')
    // })
    // $(this).parent().parent().prev('.j-nb-item').addClass('z-now-act')
    // $(this).parent().parent().slideUp('500')
    setNavActByListId($(this).attr('listID'))
})
function setNavActByListId(listID) {
    var theId = getTheOriListIdByListId(listID)
    $('.j-nb-item').each(function (index, el) {
        $(el).removeClass('z-now-act');
        if ($(el).attr('list_id') == theId) {
            $(el).addClass('z-now-act')
        }
    });

}
//set menu 权限
function setMenu(res, index) {

    var contorl = res.data[index].IS_MENU_CONTROL_NEED
    localStorage.IS_MENU_CONTROL_NEED = contorl
}
//获取当前url
function getUrl() {
    var url = window.location.href
    var str = url
    if (url.indexOf("?") != -1) {
        str = url.substr(0, (url.indexOf("?")));
        var arr = str.split('/');
        str = arr[arr.length - 1] || arr[arr.length - 2]
    } else {
        str = url
        var arr = str.split('/');
        str = arr[arr.length - 1] || arr[arr.length - 2]
    }
    return str
}

//退出
$('.j-quit').off('click').on('click', function () {
    localStorage.navbar = ''
    localStorage.styleState = 0
    getdata('/Login/OutLogin', {}, function (res) {
        // if (res.state == "success") {
        //var objStr=JSON.stringify(p)
        console.log(res)
        // }
    }, function (err) {

    })
})
//以下用于菜单

var flag = true;
function createBorder() {
    var $border = '<div class="j-border border"></div>'
    var $border2 = '<div class="j-border2 border"></div>'
    $('.j-box').append($border);
    $('.j-box').append($border2);
    $('.j-border2').delay(400).animate({
        borderRaius: "30px",
        borderWidth: 0,
        width: "60px",
        height: "60px",
        top: "-10px",
        left: "-10px"
    }, 800, function () {
        $(this).remove()

    })
    $('.j-border').animate({
        borderRaius: "30px",
        borderWidth: 0,
        width: "60px",
        height: "60px",
        top: "-10px",
        left: "-10px"
    }, 800, function () {
        $('.j-border').remove()
        if (flag) {
            createBorder()
        }
    })
}
$('.j-wave').on('mouseover', function () {
    flag = true;
    createBorder()
}).on('mouseout', function () {
    flag = false;
    $('.j-border').stop(true).remove();
    $('.j-border2').stop(true).remove();
})
$('.j-wave').on('click', function () {
    if ($('.j-menu').is(':visible')) {
        $('.j-menu').hide();
        $('.j-menu-door').show();
        $('.j-car').animate({
            left: "0"
        }, 800, function () {
            $(this).hide();
            $(this).css('zIndex', '5')
            $('.j-menu-door').hide();
            $('.iframe__container').css('marginLeft', '35px')
        })
    } else {

        $('.iframe__container').css('marginLeft', '253px')
        $('.j-menu-door').show();
        $('.j-car').show();
        $('.j-car').animate({
            left: "225px"
        }, 800, function () {
            $(this).css('zIndex', '1')
            $('.j-menu-door').hide();
            $('.j-menu').show()
        })
    }
})
//以下用于侧边栏隐藏显示
// 左侧主按钮点击显示二级菜单
$('body').off('click', '.menu__main').on('click', '.menu__main', function (e) {
    // 阻止默认事件
    e.preventDefault();
    //menuMain.removeClass('menu__main--active');
    //$(this).addClass('menu__main--active');
    $(this).toggleClass('menu__main--active');
    //主菜单右侧箭头改变方向
    /* if($(this).hasClass('menu__main--active')){
     $(this).find('.icon--more-down').addClass('z-act')
     }*/
})
// 点击二级菜单切换右侧内容
$('body').off('click', '.menu__item').on('click', '.menu__item', function (e) {
    var e = e || Window.event;
    // 阻止冒泡
    e.stopPropagation();
    // 阻止默认事件
    e.preventDefault();
    // if ($(this).hasClass('menu__item--active')) {
    //     return
    // }
    //console.log($(this));
    //console.log(document.getElementById('iframe1').getAttribute('src'))
    //console.log($(this))
    // 这里的 this 是 li 标签
    var url = $(this)[0].children[0].getAttribute('href');
    //console.log(url)
    $('#iframe1')[0].src = url
    // 改变样式

    $('.menu__item').each(function (index, el) {
        $(el).removeClass('menu__item--active');
    })
    $('.icon--circle').removeClass('icon--circle-active');
    $(this).addClass('menu__item--active');
    $(this).find('.icon--circle').addClass('icon--circle-active');

})
function getNav(act) {
    var _navbar = localStorage.navbar
    _navbar = _navbar ? JSON.parse(_navbar) : _navbar
    if (_navbar && _navbar.state == "success") {
        var res = _navbar
        loadNav(res, act)
    } else {
        getdata('/Login/GetAuthorizedMenu', {}, function (res) {
            if (res.state == "success") {
                //var objStr=JSON.stringify(p)
                localStorage.navbar = JSON.stringify(res)
                loadNav(res, act)
            }
        }, function (err) {

        })
    }
}
/*  function getNavByPost(){

 }*/
function loadNav(res, act) {
    console.log(res)
    var theNav = ''
    var zAct = getNavState(res.data, act);
    for (var i = 0; i < res.data.length; i++) {
        //console.log( i + ':' + (res.data[i].PARENT_MENU_ID == '-1'))
        if (trim(res.data[i].PARENT_MENU_ID) == '-1' && res.data[i].AUTHORIZED == '1') {
            theNav += '<li class="navbar__item j-nb-items-fst">'
            theNav += '<a href="'

            //theNav+= getNavsnd(res.data,res.data[i])?'javascript:void(0);':res.data[i].URL_ADDRESS
            //theNav += res.data[i].URL_ADDRESS
            theNav += getNavUrlsnd(res.data[i].MENU_NAME, res.data[i].URL_ADDRESS) || 'javascript:void(0);'
            theNav += '" class="u-navbar-item ' + zAct[i] + ' j-nb-item" ' + 'navToSnd="main_case.html"' + 'list_id="' + i + '">' + res.data[i].MENU_NAME + '</a>';
            theNav += getNavsnd(res.data, res.data[i])
            theNav += '</li>'
        }
    }
    $('.j-navbar').html('')
    $('.j-navbar').append(theNav)
}
function getNavUrlsnd(aim, dataUrl) {
    var url = ''
    switch (aim) {
        case '门户首页':
            url = 'index.html'
            break;
        default:
            url = dataUrl
            break;
    }
    return url
}
function getNavsnd(data, rightNow) {
    var theNav = ''
    //theNav += '<ul class="u-navbar-snd j-nb-items-snd f-dn">'
    for (var j = 0; j < data.length; j++) {
        if (trim(data[j].PARENT_MENU_ID) == trim(rightNow.MENU_ID) && data[j].AUTHORIZED == '1') {
            theNav += '<li class="u-nb-item-snd">'
            theNav += '<a href="'
            // theNav += 'main_case.html?list_id='+j
            theNav += 'javascript:void(0)'
            //theNav += getNavtrd(data,data[j])?getNavtrd(data,data[j]):'javascript:void(0)'
            theNav += '" class="j-nb-item-snd " listID="' + j + '">' + data[j].MENU_NAME + '</a>'
            theNav += '</li>'
        }
    }
    // theNav+='</ul>'
    if (theNav) {
        theNav = '<ul class="u-navbar-snd j-nb-items-snd f-dn"> ' + theNav + '</ul>'
    }
    return theNav
}

function getNavtrd(data, rightSnd) {
    var trdUrl = ''
    var flag = false
    //theNav += '<ul class="u-navbar-snd j-nb-items-snd f-dn">'
    for (var j = 0; j < data.length; j++) {
        if (trim(data[j].PARENT_MENU_ID) == trim(rightSnd.MENU_ID) && data[j].AUTHORIZED == '1') {
            trdUrl = data[j].URL_ADDRESS;
            flag = true;
            break;
        }
    }
    // theNav+='</ul>'
    if (flag) {
        return trdUrl
    } else {
        console.log('获取二级菜单url时 data error')
        return flag
    }
}
function getNavfth(data, rightSnd) {
    var fthUrl = ''
    var flag = false
    //theNav += '<ul class="u-navbar-snd j-nb-items-snd f-dn">'
    for (var j = 0; j < data.length; j++) {
        if (trim(data[j].PARENT_MENU_ID) == trim(rightSnd.MENU_ID) && data[j].AUTHORIZED == '1') {
            for (var k = 0; k < j < data.length; k++) {
                if (trim(data[k].PARENT_MENU_ID) == trim(data[j].MENU_ID)) {
                    fthUrl = data[j].URL_ADDRESS;
                    flag = true;
                    break;
                }
            }

            break;
        }
    }
    // theNav+='</ul>'
    if (flag) {
        return fthUrl
    } else {
        console.log('获取三级菜单url时 data error')
        return flag
    }
}
function getNavState(data, act) {
    var state = []
    for (var i = 0; i < data.length; i++) {
        if (data[i].MENU_NAME == act) {
            state.push('z-now-act')
        } else {
            state.push('')
        }
    }
    return state
}


//获取当前页所需的面包屑信息
function getBreadcrumbByOrder(index) {
    var _navbar = localStorage.navbar
    _navbar = _navbar ? JSON.parse(_navbar) : _navbar
    if (_navbar && _navbar.state == "success") {
        //if(localStorage.navbar && localStorage.navbar.state == "success"){
        var res = _navbar
        loadbreadcrumb(res, index)
    } else {
        getdata('/Login/GetAuthorizedMenu', {}, function (res) {
            if (res.state == "success") {
                localStorage.navbar = JSON.stringify(res)
                loadbreadcrumb(res, index)
            }
        }, function (err) {

        })
    }
}
//获取当前页所需的左侧栏信息
function getLeftColumnByOrder(index) {
    var _navbar = localStorage.navbar
    _navbar = _navbar ? JSON.parse(_navbar) : _navbar
    if (_navbar && _navbar.state == "success") {
        //if(localStorage.navbar && localStorage.navbar.state == "success"){
        var res = _navbar
        loadLeft(res, index)
        setMenu(res, index)
    } else {
        getdata('/Login/GetAuthorizedMenu', {}, function (res) {
            if (res.state == "success") {
                localStorage.navbar = JSON.stringify(res)
                loadLeft(res, index)
                setMenu(res, index)
            }
        }, function (err) {

        })
    }
}
/*function loadThePage(){

 } */
function loadLeft(res, index) {
    console.log(res)
    console.log(index)
    res.data[index].MENU_NAME
    //修改头部
    console.log($('title'))
    $('title').html(res.data[index].MENU_NAME)
    //生成左菜单
    //以下为第三级 ，后续再考虑第四级情况

    $('.j-menu').html('')

    var _leftObj = getLeftBylvl(res, index)

    $('.j-menu').html(_leftObj.left)
    var isShow = judgelvl(res, index)
    var url = isShow ? getNavtrd(res.data, res.data[index]) : _leftObj.url
    //得到iframe src
    $('#iframe1').attr('src', url)
    //获得当前头部
    for (var i = 0; i < res.data.length; i++) {
        if (trim(res.data[i].MENU_ID) == trim(res.data[index].PARENT_MENU_ID)) {
            getNav(trim(res.data[i].MENU_NAME));
            break;
        }
    }
}
function loadbreadcrumb(res, index) {
    var _crumbs = ''
    var indexArr = getAllParentsOrder(index)
    for (var i = indexArr.length - 1; i >= 0; i--) {
        _crumbs += '<li class="breadcrumb__item '
        _crumbs += i == 0 ? 'breadcrumb__item--active' : ''
        _crumbs += '"><span class="u-cmb">' + res.data[indexArr[i]].MENU_NAME + '</span></li>'
    }

    $('.j-breadcrumb').html(_crumbs)
}

//获得所有父模块
function getAllParentsOrder(index) {
    var indexArr = []
    var _navbar = getNavbar()
    var per_index = index
    indexArr.push(per_index)
    while (true) {
        var per_index = getParentOrder(_navbar, per_index)

        if (!per_index) {
            break;
        }
        indexArr.push(per_index)
    }
    return indexArr
}
//获取一个父模块
function getParentOrder(res, index) {
    var per_index = ''
    for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].MENU_ID == res.data[index].PARENT_MENU_ID) {
            per_index = i;
            break;
        }
    }
    return per_index
}
//判断是否有下的下

function judgelvl(res, index) {
    //显示当前
    var isShow = true;
    var index2
    for (var i = 0; i < res.data.length; i++) {
        if (trim(res.data[i].PARENT_MENU_ID) == trim(res.data[index].MENU_ID)) {
            index2 = i
            break;
        }
    }
    for (var i = 0; i < res.data.length; i++) {
        if (trim(res.data[i].PARENT_MENU_ID) == trim(res.data[index2].MENU_ID)) {
            isShow = false;
            break;
        }
    }
    return isShow
}
//分级别加载左侧栏
function getLeftBylvl(res, index) {
    var _left = ''
    var isShow = judgelvl(res, index)
    var _url = ''
    obj = {}
    if (isShow) {

        var flag1 = true;
        _left += '<ul class="menu__main j-leftcol  '
        _left += flag1 ? 'menu__main--active' : ''
        flag1 = false;
        _left += '">'
        _left += '<a href="#" class="menu__main_title">'
        _left += '<span class="icon icon--region">'
        _left += '</span class="j-navsnd">'
        _left += res.data[index].MENU_NAME
        _left += '<span  class="icon--more-down"></span>'
        _left += '</a>'
        var flag2 = true;
        for (var i = 0; i < res.data.length; i++) {
            if (trim(res.data[i].PARENT_MENU_ID) == trim(res.data[index].MENU_ID) && res.data[i].AUTHORIZED == '1') {
                _left += '<li class="menu__item j-navtrd '
                _left += flag2 ? 'menu__item--active' : ''
                _left += '">'
                _left += '<a href="' + res.data[i].URL_ADDRESS

                _left += '" list_id="' + i + '"'
                if (res.data[i].IS_MENU_CONTROL_NEED) {
                    _left += 'IS_MENU_CONTROL_NEED="' + res.data[i].IS_MENU_CONTROL_NEED + '"'
                }
                _left += '>'
                _url = flag2 ? res.data[i].URL_ADDRESS : _url
                flag2 = false;
                _left += '<span class="icon icon--circle"></span>'
                _left += res.data[i].MENU_NAME
                _left += '</a>'
                _left += '</li>'
            }
        }
        _left += '</ul>'
    } else {

        var flag1 = true;
        var flag2 = true;
        for (var _i = 0; _i < res.data.length; _i++) {
            if (trim(res.data[_i].PARENT_MENU_ID) == trim(res.data[index].MENU_ID) && res.data[_i].AUTHORIZED == '1') {
                _left += '<ul class="menu__main j-leftcol  '
                _left += flag1 ? 'menu__main--active' : ''
                flag1 = false;
                _left += '">'
                _left += '<a href="#" class="menu__main_title">'
                _left += '<span class="icon icon--region">'
                _left += '</span class="j-navsnd">'
                _left += res.data[_i].MENU_NAME
                _left += '<span  class="icon--more-down"></span>'
                _left += '</a>'
                for (var i = 0; i < res.data.length; i++) {
                    if (trim(res.data[i].PARENT_MENU_ID) == trim(res.data[_i].MENU_ID) && res.data[i].AUTHORIZED == '1') {
                        _left += '<li class="menu__item j-navtrd '
                        _left += flag2 ? 'menu__item--active' : ''
                        _left += '">'
                        _left += '<a href="' + res.data[i].URL_ADDRESS + '" list_id="' + i + '"'

                        if (res.data[i].IS_MENU_CONTROL_NEED) {
                            _left += 'IS_MENU_CONTROL_NEED="' + res.data[i].IS_MENU_CONTROL_NEED + '"'
                        }
                        '>'
                        _url = flag2 ? res.data[i].URL_ADDRESS : _url
                        flag2 = false;
                        _left += '<span class="icon icon--circle"></span>'
                        _left += res.data[i].MENU_NAME
                        _left += '</a>'
                        _left += '</li>'
                    }
                }
                _left += '</ul>'
            }
        }
    }
    obj.left = _left;
    obj.url = _url
    return obj
}
$('body').off('click', '.j-navtrd a').on('click', '.j-navtrd a', function () {
    var contorl = $(this).attr('IS_MENU_CONTROL_NEED')
    localStorage.IS_MENU_CONTROL_NEED = contorl
    var _navbar = getNavbar()
    var index = $(this).attr('list_id')
    loadbreadcrumb(_navbar, index)
})
//去掉前后空格
var cc = 0
function trim(str) {
    var a = str
    //  console.log(cc++ +':'+a)
    return a ? a.replace(/(^\s*)|(\s*$)/g, "") : a;
    // return a
}
//iframe 加载完成时

//onIframeReady($(document.getElementById("iframe1")))
//获取url 传的值
function getParm(url) {
    parm = {}
    if (url.indexOf("?") != -1) {
        var str = url.substr(url.indexOf("?") + 1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            parm[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return parm
}

///按钮权限
function iframeIsReadyDo(aimKey) {
    var menuObj = getNavbar();//获取所有的菜单数据
    var pageName = getPageName();//获取页面名称
    $.each(menuObj.data, function (i, row) {
        if ((row.PAGE_NAME != null) && (pageName.toLocaleLowerCase() == row.PAGE_NAME.toLocaleLowerCase())) {
            if (row.AUTHORIZED == "0") {
                popWindow(1, "您无权查看此功能，请重新登录！", 2000);
                $("#about").modal();
                window.location.href = "/Login" //没有权限访问时跳转至登录界面
            }
        }
    })
    var control = localStorage[aimKey]
    if (control == "1") {
        var param = { page_name: pageName };
        getdata('/Login/GetAuthorizedButton/', param, function (data) {
            $.each(data.data, function (i, row) {
                $("#" + row.MENU_CODE).hide();
            })
        })
    }
    //在此设置 IS_MENU_CONTROL_NEED 权限
}
//获取页面名称
function getPageName() {
    var strUrl = location.href;
    var arrUrl = strUrl.split("/");
    var strPage = arrUrl[arrUrl.length - 1].split("?");
    return strPage[0];
}
//当页面加载完成
$(function () {
    iframeIsReadyDo('IS_MENU_CONTROL_NEED');
    var login_url = 'login.html'
    var str = getUrl()
    if (str == login_url) { } else {
        getdata('/Login/GetSession', {}, function (res) {
            console.log(res);
            if (res.state == "success") {
                return
            } else if (res.state == "error") {
                //window.location.href="login.html"
                if (self.frameElement && self.frameElement.tagName == "IFRAME") {
                    // 页面在iframe中时处理
                    parent.window.location.href = "/Login"
                } else {
                    window.location.href = "/Login"
                }
            } else {
                console.log(res)
            }
        }, function (err) {

        })
    }
    //select 默认选择
    // var unSelected = "#999";
    // var selected = "#333";
    // $("select").css("color", unSelected);
    // $("option").css("color", selected);
    // $("select").change(function () {
    //     var selItem = $(this).val();
    //     if (selItem == $(this).find('option:first').val()) {
    //         $(this).css("color", unSelected);
    //     } else {
    //         $(this).css("color", selected);
    //     }
    // });
    var styleState = localStorage.styleState 
      if(styleState==0){//东风日产
         $('#alModal').remove()
      } else if(styleState==1){//启辰
        var _href = $('link[rel="stylesheet"]:first').attr('href');
        var _hrefArr = _href.split('/');
        _hrefArr[_hrefArr.length-1]='qc.css';
        var _newHref = _hrefArr.join('/')
        $('head').append('<link rel="stylesheet" href="'+_newHref+'">')
        setTimeout(function(){
          changeCSS()
          $('#alModal').remove()
        },200)
       }
     function changeCSS(){
          $('title').html('启辰经销商门户');
          $('.header__title h1').html('启辰经销商门户');
          $('.header__logo img').attr('src','./images/logo_qc.png').css({
            'margin-top': '-3px',
            'width': '95px',
            'height':'120px'
          })
          $('.header__logo').css({
            'background-color':'transparent',
           })
          $('.footer p').html('Copyright Dongfeng Nissan Passenger Vehicle Company 2008 All right reserved. 粤ICP备05147638号')
      }
})
$('body').off('click', '.j-goto-item-snd').on('click', '.j-goto-item-snd', function () {
    var url = $(this).attr('list_url')
    var listID = getListIdByUrlAddr(url)
    //listID = 28;
    var main_url = 'main_case.html'
    var str = getUrl()
    if (str == main_url) {
        getLeftColumnByOrder(listID);
        getBreadcrumbByOrder(listID);
        getHeight();
    } else {
        window.location.href = main_url + '?list_id=' + listID + '';
    }
    // href="javascript:void(0)" target="_blank " class="j-goto-item-snd" list_url="/SysUser/RoleView"
    $('.j-nb-item').each(function (index, el) {
        $(el).removeClass('z-now-act')
    })
    /*$(this).parent().parent().prev('.j-nb-item').addClass('z-now-act')
     $(this).parent().parent().slideUp('500')*/
})

function getListIdByUrlAddr(_url) {
    var listID = ''
    var _navbar = localStorage.navbar
    _navbar = _navbar ? JSON.parse(_navbar) : _navbar
    if (_navbar && _navbar.state == "success") {
        //if(localStorage.navbar && localStorage.navbar.state == "success"){
        var res = _navbar
        for (var i = 0; i < _navbar.data.length; i++) {
            if (_navbar.data[i].URL_ADDRESS == _url) {
                listID = i;
                break;
            }
        }
        return listID
    } else {
        getdata('/Login/GetAuthorizedMenu', {}, function (res) {
            if (res.state == "success") {
                localStorage.navbar = JSON.stringify(res)
                for (var i = 0; i < _navbar.data.length; i++) {
                    if (_navbar.data[i].URL_ADDRESS == _url) {
                        listID = i;
                        break;
                    }
                }
                return listID
            }
        }, function (err) {

        })
    }
}
function getNavbar() {
    var _navbar = localStorage.navbar
    _navbar = _navbar ? JSON.parse(_navbar) : _navbar
    if (_navbar && _navbar.state == "success") {
        //if(localStorage.navbar && localStorage.navbar.state == "success"){
        var res = _navbar
        return res
    } else {
        getdata('/Login/GetAuthorizedMenu', {}, function (res) {
            if (res.state == "success") {
                localStorage.navbar = JSON.stringify(res)
                return res
            }
        })
        return _navbar
    }
}
function getParentListIdByListId(list_id) {
    var preListId
    var _navbar = getNavbar();
    //console.log(_navbar.data)
    for (var i = 0; i < _navbar.data.length; i++) {
        if (_navbar.data[list_id].PARENT_MENU_ID == _navbar.data[i].MENU_ID) {
            preListId = i;
            break;
        }
    }
    // console.log(preListId)
    return preListId
}
function getTheOriListIdByListId(list_id) {
    //var oriListId
    var _navbar = getNavbar();
    //console.log(_navbar.data)
    var oriList = {
        listId: list_id,
        preMenuId: ''
    };
    do {
        oriList.listId = getParentListIdByListId(oriList.listId);
        oriList.preMenuId = _navbar.data[oriList.listId].PARENT_MENU_ID
    } while (oriList.preMenuId != "-1")
    // for(var i=0;i<_navbar.data.length;i++){
    //     if(_navbar.data[list_id].PARENT_MENU_ID == _navbar.data[i].MENU_ID){
    //         oriListId = i;
    //         break;
    //     }
    // }
    // console.log(preListId)
    return oriList.listId
}
function showPath() {
    return;
    //todo 发布时清除
    //$("body").prepend(window.location.pathname);
    $("body").attr("title", window.location.pathname);
}
function preventDefault() {
    if (document.all) {
        if (window.event != null && window.event != undefined) {
            window.event.returnValue = false;
        }
    }
    else {
        if (event) {
            event.preventDefault();
        }
    }
}

function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}
/********扩展方法******/
String.prototype.jq = function () {
    return $(this.toString());
}

String.prototype.jqs = function () {
    return ("#" + this.toString()).jq();
}

Array.prototype.indexOf = function (x) {
    var r = -1;
    for (var i = 0; i < this.length; i++) {
        if (x == this[i]) {
            r = i;
            break;
        }
    }
    return r;
}

/***********扩展方法End**************/


