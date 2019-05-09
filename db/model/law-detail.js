const mongoose = require('mongoose');
//声明schema
const lawDetail = mongoose.Schema({
  area: {
    required:true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LawArea' //这里要写你指向的数据库表名字
  },
  country: {
    required:true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LawCountry' //这里要写你指向的数据库表名字
  },
  service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LawService' }],
  name: {
    type: String,
    required:true
  },
  logo: {
    type: String,
    delete: ''
  },
  address: {
    type: String,
    delete: ''
  },
  phone: {
    type: String,
    delete: ''
  },
  email: {
    type: String,
    delete: ''
  },
  website: {
    type: String,
    delete: ''
  },
  introduce: {
    type: String,
    delete: ''
  },
  created_time: {
    type: Number,
    required: true
  }
});
//根据schema生成model
const LawDetail  = mongoose.model('LawDetail', lawDetail);

module.exports = LawDetail;
