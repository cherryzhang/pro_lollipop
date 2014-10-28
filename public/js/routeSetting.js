
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
    $('<div class="form-group"><input type="text" placeholder="中途点" ></input></div>').appendTo("#midPointContainer")
}

function getSearchCondition() {
    
}

  