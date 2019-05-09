const mongoose = require('mongoose');
//声明schema
const messageBoard = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  contact_information: {
    type: String,
    required:true
  },
  consultation_content: {
    type: String,
    required:true
  },
  source: {
    type: String,
    default: function () {
      return 'home'
    }
  },
  created_time: {
    type: Number,
    required: true
  }
});
//根据schema生成model
const MessageBoard  = mongoose.model('MessageBoard', messageBoard);

module.exports = MessageBoard;
