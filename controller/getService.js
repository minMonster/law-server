const LawService = require('../db/index').LawService;

const getService = async (ctx) => {
  let service = [];
  await new Promise((resolve, reject) => {
    LawService.find((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  }).then(res => {
    service = res;
  });
  ctx.status = 200;
  ctx.body = {
    data: service
  };
};

module.exports = {
  getService
};
