const fs = require('fs');
let xlsx = require('node-xlsx');
let data = xlsx.parse('./law-cell.xlsx');
console.log(data[1]);
// let temple = {
//   law_area: '',
//   law_country: '',
//   law_logo: '',
//   law_name: '',
//   law_address: '',
//   law_phone: '',
//   law_fax: '',
//   law_email: '',
//   law_service: '',
//   law_website: '',
//   law_introduce: ''
// };

let newArr = data[0]['data'].map(value => {
  let temple = {};
  temple.law_area = value[0];
  temple.law_country = value[1];
  temple.law_logo = value[2];
  temple.law_name = value[3];
  temple.law_address = value[4];
  temple.law_phone = value[5];
  temple.law_fax = value[6];
  temple.law_email = value[7];
  temple.law_service = value[8];
  temple.law_website = value[9];
  temple.law_introduce = value[10];
  return temple;
});
fs.writeFile('./demo.json', JSON.stringify(newArr), function(err) {
  if (err) {
    throw err;
  }

  console.log('Hello.');

  // 写入成功后读取测试
  fs.readFile('./demo.json', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
  });
});
