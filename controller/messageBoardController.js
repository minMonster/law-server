const MessageBoard = require('../db/index').MessageBoard;
const moment = require('moment');
const addMessage = async (ctx) => {
  let parme = {
    ...ctx.request.body,
    created_time: moment().unix()
  };
  let messageBoard = new MessageBoard(parme);
  await new Promise((resolve, reject) => {
    messageBoard.save(err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  }).then(() => {
    ctx.status = 200;
    ctx.body = {
      message: '保存成功',
      data: {
        ...parme,
        id: messageBoard.get('id')
      }
    };
  }).catch(err => {
    ctx.status = 499;
    ctx.body = {
      error_message: err.message
    };
  });
};

module.exports = {
  addMessage
};
