var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var model = require('./model');
var app = express();

var books = [{id:1,name:'javascript'},{id:2,name:'nodejs'}];
app.use(express.static(path.resolve('.')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'client/index.html'));
})

app.route('/books').get(function(req,res){                  //查询全部
    model.Book.find({},function(err,docs){
        if(err){
            console.log(err);
            return false;
        }else{
            res.send(docs);
        }
    })
}).post(function(req,res){                                  //添加
    if(req.body._id){
        model.Book.update({_id:req.body._id},{$set:req.body},function(err,doc){
            if(err){
                console.log(err);
                return false;
            }else{
                res.send(doc);
            }
        })
    }else{
        model.Book.create(req.body,function(err,doc){
            if(err){
                console.log(err);
                return false;
            }else{
                res.send(doc);
            }
        });
    }

}).delete(function(req,res){                                //删除
    model.Book.remove({_id:req.query._id},function(err,doc){
        if(err){
            console.log(err);
            return false;
        }else{
            res.send({});
        }
    })
}).put(function(req,res){                                   //更新
    model.Book.findOne(req.body,function(err,doc){
        if(err){
            console.log(err);
            return false;
        }else{
            res.send(doc);
        }
    })
})

app.listen(9090);
