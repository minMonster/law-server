const mongoose = require('mongoose');
//声明schema
const lawCountry = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LawArea' //这里要写你指向的数据库表名字
  },
  created_time: {
    type: Number,
    required: true
  }
});
//根据schema生成model
const LawCountry  = mongoose.model('LawCountry', lawCountry);

module.exports = LawCountry;
