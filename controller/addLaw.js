const LawArea = require('../db/index').LawArea;
const LawCountry = require('../db/index').LawCountry;
const LawDetail = require('../db/index').LawDetail;
const LawService = require('../db/index').LawService;
const moment = require('moment');

function uniq (array) {
  var temp = []; //一个新的临时数组
  for (var i = 0; i < array.length; i++) {
    if (temp.indexOf(array[i]) == -1) {
      temp.push(array[i]);
    }
  }
  return temp;
}

const findLawArea = (name) => {
  if (!name) {
    return Promise.reject(new Error('Path `Law_area` is required.'));
  }
  return new Promise((resolve, reject) => {
    LawArea.findOne({name}, (e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  });
};

const findLawCountry = (name) => {
  if (!name) {
    return Promise.reject(new Error('Path `Law_country` is required.'));
  }
  return new Promise((resolve, reject) => {
    LawCountry.findOne({name}).populate('area').exec((e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  });
};

const findLawDetail = (name) => {
  if (!name) {
    return Promise.reject(new Error('Path `Law_detail_name` is required.'));
  }
  return new Promise((resolve, reject) => {
    LawDetail.findOne({name}).populate('area').populate('country').exec((e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  });
};

const addLawArea = async (name) => {
  let old = null;
  if (!name) {
    return Promise.reject(new Error('law_area is required!'));
  }
  try {
    old = await findLawArea(name);
  } catch (e) {
    return Promise.reject(e);
  }
  if (old) {
    return Promise.resolve(old);
  }
  const lawArea = LawArea({
    name: name,
    created_time: moment().unix()
  });
  return new Promise((resolve, reject) => {
    lawArea.save((e, data) => {
      if (e) {
        reject(e);
      }
      resolve(data);
    });
  });
};

/* addLawCountry
* @desc 添加国家
* @data {object} name - 国家名称, area_id - 地区id
* */
const addLawCountry = async (params) => {
  let old = null;
  if (!params.name) {
    return Promise.reject(new Error('law_country is required!'));
  }
  if (!params.area_id) {
    return Promise.reject(new Error('area_id is required!'));
  }
  try {
    old = await findLawCountry(params.name);
  } catch (e) {
    return Promise.reject(e);
  }
  if (old) {
    if (String(old.area._id) !== String(params.area_id)) {
      return Promise.reject(new Error(`There is already an ${old.area.name} in ${params.name}.`));
    }
    return Promise.resolve(old);
  }
  const lawCountry = LawCountry({
    name: params.name,
    area: params.area_id,
    created_time: moment().unix()
  });
  return new Promise((resolve, reject) => {
    lawCountry.save((e, data) => {
      if (e) {
        reject(e);
      }
      resolve(data);
    });
  });
};

const addLawDetail = async (params) => {
  let old = null;
  if (!params.name) {
    return Promise.reject(new Error('law_detail_name is required!'));
  }
  if (!params.area_id) {
    return Promise.reject(new Error('area_id is required!'));
  }
  if (!params.country_id) {
    return Promise.reject(new Error('country_id is required!'));
  }
  try {
    old = await findLawDetail(params.name);
  } catch (e) {
    return Promise.reject(e);
  }
  if (old) {
    if (old.area._id !== params.area_id) {
      return Promise.reject(new Error('重复定义:' + params.name));
    }
    return Promise.resolve(old);
  }
  const lawDetail = LawDetail({
    name: params.name,
    area: params.area_id,
    country: params.country_id,
    created_time: moment().unix(),
    logo: params.logo || '',
    phone: params.phone || '',
    address: params.address || '',
    email: params.email || '',
    website: params.website || '',
    introduce: params.introduce || '',
    service: params.service || '',
    fax: params.fax || ''
  });
  return new Promise((resolve, reject) => {
    lawDetail.save((e, data) => {
      if (e) {
        reject(e);
      }
      resolve(data);
    });
  });
};

const getCountry = async (ctx) => {
  let area = [];
  await new Promise((resolve, reject) => {
    LawArea.find({'_id': '5ce53d108cd3ac0b0043e905'}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  }).then(res => {
    area = res;
  });
  let newArea = area.map(async (areaValue) => {
    let newVal = JSON.parse(JSON.stringify(areaValue));
    newVal.country = [];
    await new Promise((resolve, reject) => {
      LawCountry.find({area: newVal['_id']}, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    }).then(res => {
      newVal.country = res;
    });
    delete newVal['__v'];
    return newVal;
  });
  await Promise.all(newArea).then(res => {
    area = res;
  });
  ctx.status = 200;
  ctx.body = {
    data: area
  };
};
const addLawService = async (name) => {
  let old = null;
  if (!name) {
    return Promise.reject(new Error('LawService is required!'));
  }
  try {
    old = await findLawService(name);
  } catch (e) {
    return Promise.reject(e);
  }
  if (old) {
    return Promise.resolve(old);
  }
  const lawService = LawService({
    name: name,
    created_time: moment().unix()
  });
  return new Promise((resolve, reject) => {
    lawService.save((e, data) => {
      if (e) {
        reject(e);
      }
      resolve(data);
    });
  });
};
const findLawService = (name) => {
  if (!name) {
    return Promise.reject(new Error('Path `LawService` is required.'));
  }
  return new Promise((resolve, reject) => {
    LawService.findOne({name}, (e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  });
};
const addLaw = async (ctx) => {
  let body = ctx.request.body;
  let lawArea = null;
  let lawCountry = null;
  let lawDetail = null;
  // let service = [];
  // let lawService = body.law_service.split(',');
  // lawService = uniq(lawService);
  // let arr = lawService.map(async name => {
  //   return await addLawService(name);
  // });
  try {
    // service = await Promise.all(arr);
    // let newService = service.map(value => {
    //   return value._id;
    // });
    lawArea = await addLawArea(body.law_area);
    lawCountry = await addLawCountry({name: body.law_country, area_id: lawArea._id});
    lawDetail = await addLawDetail({
      name: body.law_name,
      area_id: lawArea._id,
      country_id: lawCountry._id,
      logo: body.law_logo,
      address: body.law_address,
      email: body.law_email,
      service: body.law_service,
      website: body.law_website,
      phone: body.law_phone,
      fax: body.law_fax,
      introduce: body.law_introduce
    });
  } catch (e) {
    ctx.status = 499;
    ctx.body = {
      error_message: e.message
    };
  }
  if (lawDetail) {
    ctx.status = 200;
    ctx.body = {
      data: lawDetail
    };
  }
};
const jsonData = require('../demo.json');
const Demo = async (ctx) => {
  for (let i = 0;i < jsonData.length; i++ ){
    let body = jsonData[i];
    let lawArea = null;
    let lawCountry = null;
    let lawDetail = null;
    // let service = [];
    // let lawService = body.law_service.split(',');
    // lawService = uniq(lawService);
    // let arr = lawService.map(async name => {
    //   return await addLawService(name);
    // });
    try {
      // service = await Promise.all(arr);
      // let newService = service.map(value => {
      //   return value._id;
      // });
      lawArea = await addLawArea(body.law_area);
      lawCountry = await addLawCountry({name: body.law_country, area_id: lawArea._id});
      lawDetail = await addLawDetail({
        name: body.law_name,
        area_id: lawArea._id,
        country_id: lawCountry._id,
        logo: body.law_logo,
        address: body.law_address,
        email: body.law_email,
        service: body.law_service,
        website: body.law_website,
        phone: body.law_phone,
        fax: body.law_fax,
        introduce: body.law_introduce
      });
    } catch (e) {
      ctx.status = 499;
      ctx.body = {
        error_message: e.message
      };
    }
  }
  ctx.status = 200;
  ctx.body = {
    a: jsonData
  };
};
const delll = async (ctx) => {
  let id_area = ctx.request.body.id_area;
  let id_country = ctx.request.body.id_country;
  let id_law = ctx.request.body.id_law;
  await new Promise((resolve, reject) => {
    LawArea.remove({_id: id_area}, (e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  })
  await new Promise((resolve, reject) => {
    LawCountry.remove({_id: id_country}, (e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  })
  await new Promise((resolve, reject) => {
    LawDetail.remove({_id: id_law}, (e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  }).then(res => {
    ctx.status = 200;
    ctx.body = {
      a: '删除年初'
    }
  })
};
module.exports = {
  findLawArea,
  findLawCountry,
  findLawDetail,
  addLaw,
  addLawCountry,
  addLawDetail,
  getCountry,
  Demo,
  delll
};
