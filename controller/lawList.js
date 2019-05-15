const LawDetail = require('../db/index').LawDetail;
const findLawDetail = (params) => {
  let page = params.page;
  let limit = params.limit;
  let findParams = {};
  if (params.area) findParams.area = params.area;
  if (params.country) findParams.country = params.country;
  if (params.service) findParams.service = params.service;
  return new Promise((resolve, reject) => {
    LawDetail.find(findParams)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('area', 'name')
      .populate('country', 'name')
      // .populate('service', 'name')
      .exec((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
  });
};
const getLawList = async (ctx) => {
  let body = ctx.request.query;
  let page = body.page || 1;
  let limit = body.limit || 5;
  let idReg = /[a-zA-Z0-9]{24}/;
  let area = body.area;
  let country = body.country;
  let service = body.service;
  let params = {};
  let LawDetailParams = {};
  params.page = Number(page);
  params.limit = Number(limit);
  if (idReg.test(area)) {
    params.area = area;
    LawDetailParams.area = area;
  }
  if (idReg.test(country)) {
    params.country = country;
    LawDetailParams.country = country;
  }
  if (idReg.test(service)) {
    params.service = service;
    LawDetailParams.service = service;
  }
  let list = await findLawDetail(params);
  let total = await LawDetail.find(LawDetailParams).count().exec();
  ctx.status = 200;
  ctx.body = {
    data: list,
    total: total,
    page: page,
    limit: limit
  };
};
const getLawDetail = async (ctx) => {
  let country = ctx.request.query.id;
  let data = {};
  let idReg = /[a-zA-Z0-9]{24}/;
  if (idReg.test(country)) {
    await new Promise((resolve, reject) => {
      LawDetail
        .findOne({_id: country})
        .populate('area', 'name')
        .populate('country', 'name')
        // .populate('service', 'name')
        .exec((err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
    }).then(res => {
      data = res;
      console.log(data);
      ctx.status = 200;
      ctx.body = {
        data
      };
    });
  } else {
    ctx.status = 499;
    ctx.body = {
      message: 'Please fill in the correct "id"'
    };
  }
};
module.exports = {
  getLawList,
  getLawDetail
};
