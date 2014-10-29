
function searchRoute() {
    var condition = getSearchCondition();
    
    searchForDriving(map, condition.start, condition.end);
    
    closeSetting();
    
    $("#location").hide();
    $("#endRouting").show();
}

function endCurrentRouting() {
    map.clearOverlays();
    
    $("#location").show();
    $("#endRouting").hide();
}
