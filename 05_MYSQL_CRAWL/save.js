var connection = require('./mysql').connection;
var async = require('async');
var debug = require('debug')('srawl:save');

exports.category = function(categories,callback){
    async.forEach(categories,function(category,done){
        debug('保存分类'+category.name);
        connection.query('replace into category(id,name,url) values(?,?,?)',[category.id,category.name,category.url],function(err,result){
            done(err,result);
        })
    },callback);
}

/*
exports.category([{id:1,name:'name',url:'url2'}],function(){
    console.log('done');
})*/

exports.articles = function(articles,callback){
    debug('保存文章');
    async.forEach(articles,function(article,done){
        debug('保存文章'+article.name);
        connection.query('replace into article(name,url,cid) values(?,?,?)',[article.name,article.url,article.cid],function(err,result){
            done(err,result);
        })
    },callback);
}

/*
exports.articles([{name:'name',url:'url',cid:1}],function(){
    console.log('done');
})*/
