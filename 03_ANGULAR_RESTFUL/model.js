var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books');
exports.Book = mongoose.model('books',new mongoose.Schema({
    bookNo:String,
    name:String,
    author:String,
    pubDay:{type:Date,default:Date.now()}
}))