var async = require('async');
var read = require('./read');
var save = require('./save');
var debug = require('debug')('crawl:main');
var url = 'http://top.baidu.com/category?c=10&fr=topcategory_c10';  //目标
debug('任务开始');

var categories = [];
var articles = [];

async.series([                      //串行操作
    function (done) {
        read.category(url, function (err, items) {
            categories = items;
            done(err);
        })
    },
    function (done) {
        save.category(categories,done);
    },
    function(done){
        async.forEach(categories,function(item,done){   //异步遍历
            read.articles(item.url,item.id,function(err,items){
                articles = articles.concat(items);
                done();
            })
        },done);
    },
    function(done){
        save.articles(articles,function(){
            done();
        })
    }
],function(err,result){
    if(err){
        console.log(err);
    }
    debug('所有任务执行完毕');
})

