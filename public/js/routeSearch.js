
var routeInfo;

function searchRoute() {
    routeInfo = getSearchCondition();
    
    saveLastRoute(routeInfo);
    searchForDriving(map, routeInfo.start, routeInfo.end);
    
    closeSetting();
    
    $("#location").hide();
    $("#endRouting").show();
    $("#showParking").show();
    
}


function endCurrentRouting() {
    map.clearOverlays();
    
    $("#location").show();
    $("#endRouting").hide();
    $("#showParking").hide();
}

var parkingOverlay = [];

function searchForParking() {
    deleteOverlay(parkingOverlay);
    parkingOverlay = [];
    
    var i = map.getOverlays().length-1, j;
    
    var myGeo = new BMap.Geocoder();
    
    myGeo.getPoint(routeInfo.end, function(point){
        
        var circle = new BMap.Circle(point,2000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
        map.addOverlay(circle);
        
        var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});  
        
        var bounds = getSquareBounds(circle.getCenter(),circle.getRadius());
        local.searchInBounds("停车场",bounds); 
        
        j = map.getOverlays().length-1;        
        var overlays = map.getOverlays();        
        for(var n=i; n<=j; n++){
            parkingOverlay.push(overlays[n]);
        }
        
    });
}

function deleteOverlay(arr) {
    for(var i=0, len=arr.length ; i<len; i++)
        map.removeOverlay(arr[i]);
}

/**
 * 得到圆的内接正方形bounds
 * @param {Point} centerPoi 圆形范围的圆心
 * @param {Number} r 圆形范围的半径
 * @return 无返回值   
 */ 
function getSquareBounds(centerPoi,r){
    var a = Math.sqrt(2) * r; //正方形边长
  
    mPoi = getMecator(centerPoi);
    var x0 = mPoi.x, y0 = mPoi.y;
 
    var x1 = x0 + a / 2 , y1 = y0 + a / 2;//东北点
    var x2 = x0 - a / 2 , y2 = y0 - a / 2;//西南点
    
    var ne = getPoi(new BMap.Pixel(x1, y1)), sw = getPoi(new BMap.Pixel(x2, y2));
    return new BMap.Bounds(sw, ne);        
    
}

//根据球面坐标获得平面坐标。
function getMecator(poi){
    return map.getMapType().getProjection().lngLatToPoint(poi);
}

//根据平面坐标获得球面坐标。
function getPoi(mecator){
    return map.getMapType().getProjection().pointToLngLat(mecator);
}
