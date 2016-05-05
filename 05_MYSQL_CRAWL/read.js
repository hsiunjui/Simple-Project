var request = require('request');       //请求模块
var cheerio = require('cheerio');       //DOM解析模块
var debug = require('debug')('crawl:read');
var iconv = require('iconv-lite');            //解析编码
var urlTool = require('url');

exports.category = function (url, callback) {
    debug('读取分类列表', url);
    var categroies = [];
    request({url: url, encoding: null}, function (err, res, body) {     //encoding:null表示接收二进制数据
        body = iconv.decode(body, 'gbk');
        var $ = cheerio.load(body);             //DOM解析
        $('.hd .title a').each(function(){
            var $me = $(this);
            var item = {
                name:$me.text().trim(),
                url:'http://top.baidu.com/'+$me.attr('href').slice(2)           // buzz?b=353&c=10
            }
            item.id = urlTool.parse(item.url,true).query.b;                     //353
            categroies.push(item);
        });
        callback(null,categroies);
    })
}

/*
exports.category('http://top.baidu.com/category?c=10&fr=topcategory_c10',function(err,result){
    console.log(result);
});*/

exports.articles = function(url,cid,callback){
    debug('读取分类下的书籍',url);
    var articles = [];
    request({url:url,encoding:null},function(err,res,body){
        body = iconv.decode(body,'gbk');
        var $ = cheerio.load(body);
        $('.keyword a').each(function(){
            var $me = $(this);
            var item = {
                name:$me.text().trim(),
                url:$me.attr('href'),
                cid:cid
            }
            if(item.name != 'search'){
                articles.push(item);
            }
        })
        callback(null,articles);
    })
}
/*
exports.articles('http://top.baidu.com/buzz?b=1510&c=10',151,function(err,result){
    console.log(result);
})*/
