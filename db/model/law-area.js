const mongoose = require('mongoose');
//声明schema
const lawArea = mongoose.Schema({
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
const LawArea  = mongoose.model('LawArea', lawArea);

module.exports = LawArea;
