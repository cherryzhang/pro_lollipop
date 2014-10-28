exports.init = function(app, db) {

    app.get('/', function(req, res){
        res.render('map');
    });
    
    app.get('/route', function(req, res){
        res.render('drivingroute');
    });
    
    
    app.get('/driving', function(req, res){
        res.render('drivingroute');
    });
    
    app.get('/user', function(req, res){
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){ //ȡ�����еļ�������, ��Ⱦ��ҳ����,�ؼ�����userlist
            res.json(docs);
        });
    
    });
    
    app.get('/create', function(req, res){
        var collection = db.get('usercollection');
        collection.insert({"name":new Date().toLocaleTimeString()})
        
    
    })
    
}
