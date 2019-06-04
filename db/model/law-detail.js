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
  // service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LawService' }],
  service: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required:true
  },
  logo: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  introduce: {
    type: String,
    default: ''
  },
  created_time: {
    type: Number,
    required: true
  },
  fax: {
    type: String,
    default: ''
  },
  hot: {
    type: String,
    default: ''
  },
  shorthand: {
    type: String,
    default: ''
  }
});
//根据schema生成model
const LawDetail  = mongoose.model('LawDetail', lawDetail);

module.exports = LawDetail;
