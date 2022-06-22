const LawCommitLog = require('../db/index').LawCommitLog;
const moment = require('moment');
const NXlSX = require("node-xlsx");
const addCommitLog = async (ctx) => {
    console.log('ccccc')
    let {mobile, stock_code} = ctx.request.body;
    if (!mobile) {
        return Promise.reject(new Error('手机号必填!'));
    }
    const lawCommitLog = LawCommitLog({
        mobile: mobile,
        stock_code: stock_code,
        created_time: moment().unix()
    });

    return new Promise((resolve, reject) => {
        lawCommitLog.save((e, data) => {
            if (e) {
                reject(e);
            }
            ctx.status = 200;
            ctx.body = {
                message: '添加成功'
            }
            resolve(data);
        });
    })
}
const getCommitLog = async (ctx) => {
    let {start_time, end_time} = ctx.request.body;
    if (!start_time) {
        return Promise.reject(new Error('start_time is required!'));
    }
    if (!end_time) {
        return Promise.reject(new Error('end_time is required!'));
    }


    return new Promise((resolve, reject) => {
        LawCommitLog.find({$and: [{created_time: {$gt: moment(start_time).unix()}}, {created_time: {$lt: moment(end_time).unix()}}]}, (e, data) => {
            if (e) {
                reject(e);
            }
            ctx.status = 200;

            let dataXsl = []
            const _headers = ['创建时间', '手机号', '股票代码'];
            dataXsl = data.map(i => {
                return [moment.unix(i.created_time).format('YYYY-MM-DD HH:mm:ss'), i.mobile, i.stock_code]
            })
            dataXsl.unshift(_headers)
            let buffer = NXlSX.build([{ name: moment().format('YYYY-MM-DD HH:mm:ss') + '股票代码-手机号', data: dataXsl}]);
            // 返回buffer流到前端
            ctx.body = buffer
            resolve(data);
        })
    })
}
module.exports = {
    addCommitLog,
    getCommitLog
};
