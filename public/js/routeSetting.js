
function openSetting(){
    var checkboxMidStop = $("#midStop").attr("checked", false);    
    enableAddMidPoint(checkboxMidStop);
    $("#midPointContainer").empty();
    
    $("#excludeHighway").attr("checked", false);    
    
    
    $("#settingWindow").show();
    
}

function closeSetting(){
    $("#settingWindow").hide();
}

function enableAddMidPoint(element) {
    if(element.checked){
        $("#addMidPointBtn").show();
        $("#midPointContainer").show();
    }
    else {
        $("#addMidPointBtn").hide();
        $("#midPointContainer").hide();
    }
}

function addMidPoint(){
    $('<div class="form-group"><input type="text" placeholder="中途点" ></input><div  class="delete_16"></div></div>').appendTo("#midPointContainer")
}

function removeMidPoint(e){
    if(e.target.className == "delete_16")
        $(e.target).parent().remove();
}

function getSearchCondition() {
    var obj = {};
    
    obj.start = $("#start").val();
    obj.end = $("#end").val();
    
    if($("#midStop")[0].checked){
        var midPoints = $("#midPointContainer").children();
        if(midPoints.length>0){
            obj.mid = [];
            
            for(var i = 0; i<midPoints.length; i++) {
                obj.mid.push($(midPoints).children()[0].value)
            }
            
        }
    }
    
    obj.excludeHighWay = $("#excludeHighway")[0].checked;
    
    console.log(obj)
    return obj;
}

function setAutoComplete(input, panel) {
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : input
        ,"location" : map
    });
    
    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
    var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        
        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        $(panel).innerHTML = str;
    });
}

  