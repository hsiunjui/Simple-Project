var mysql = require('mysql');       //数据库连接模块
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crawl'
});
connection.connect();
exports.connection = connection;
