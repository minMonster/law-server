const MessageBoard = require('./model/message-board');
const LawArea = require('./model/law-area');
const LawCountry = require('./model/law-country');
const LawDetail = require('./model/law-detail');
const LawService = require('./model/law-service');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/autrch-serve');
let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
db.on('error', function () {
  console.log('数据库连接出错！');
});
db.on('open', function () {
  console.log('数据库连接成功！');
});
module.exports = {
  MessageBoard,
  LawArea,
  LawCountry,
  LawDetail,
  LawService
};
