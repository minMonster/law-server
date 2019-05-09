const mongoose = require('mongoose');
//声明schema
const lawService = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  created_time: {
    type: Number,
    required: true
  }
});
//根据schema生成model
const LawService  = mongoose.model('LawService', lawService);

module.exports = LawService;
