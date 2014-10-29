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
        collection.find({},{},function(e,docs){
            res.json(docs);
        });
    });

    app.get('/create', function(req, res){
        var collection = db.get('usercollection');
        collection.insert({"name":new Date().toLocaleTimeString()});
    })

    
    app.get('/getRouteInfo', function(req, res){
        var collection = db.get('routeInfo');
        
        collection.findOne({name:"lastRoute"}).on('success', function(doc){
            res.json(doc);
        })
        

    });
    
    app.get('/saveRouteInfo', function(req, res){
        var collection = db.get('routeInfo');
        
        var promise = collection.findOne({name:"lastRoute"});
        promise.on('success', function (doc) {
            if(doc) {
                collection.update(doc._id, { $set: {  start:req.query.start, end:req.query.end}});
            }
            else {
                collection.insert({name:"lastRoute", start:req.query.start, end:req.query.end})
            }
        });
        
    
    })
    
}
