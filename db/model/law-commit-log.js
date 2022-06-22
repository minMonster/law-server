const mongoose = require('mongoose');
//声明schema
const lawCommitLog = mongoose.Schema({
    mobile: {
        type: String,
        required:true
    },
    stock_code: {
        type: String,
        required:true
    },
    created_time: {
        type: Number,
        required: true
    }
});
//根据schema生成model
const LawCommitLog  = mongoose.model('LawCommitLog', lawCommitLog);

module.exports = LawCommitLog;
