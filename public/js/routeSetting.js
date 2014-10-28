
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

  