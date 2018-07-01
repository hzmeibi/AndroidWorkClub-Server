/**
 * Created by vicky on 18/3/19.
 */

var accountModel = require('../models/accountModel');
var fs = require('fs');
var async = require('async');
var moment = require('moment');

var userList = [
    {name: '雷福林', value: '雷福林'},
    {name: '张珊珊', value: '张珊珊'},
    {name: '董腾飞', value: '董腾飞'},
    {name: '付艳芳', value: '付艳芳'},
    {name: '姜小启', value: '姜小启'},
    {name: '梅小碧', value: '梅小碧'},

]

exports.initData = function (req, res) {
    accountModel.remove({isSettlement: 0}, function (err, reply) {
        if (err) {
            return res.send({status: 403, msg: '查找出错啦'});
        } else {
            for (var user = 0; user < userList.length; user++) {
                var account = new accountModel();
                account.userName = userList[user].name
                account.description = 'init';
                account.isSettlement = 1;
                account.price = 0;
                account.createdOn = new Date();
                account.createdStr = account.createdOn.toISOString().substring(0, 10)
                account.save(function (err, reply) {
                    if (err) {
                        return res.send({status: 402, msg: '新增出错'})
                    } else {
                        console.log("成功啦")
                    }
                });
            }

        }
    });

}

exports.insertAccount = function (req, res) {

    if (!req.body || !req.body.userName || !req.body.des || !req.body.price) {
        return res.send({status: 401, msg: '缺少参数'})
    }

    var account = new accountModel();
    account.userName = req.body.userName;
    account.description = req.body.des;
    account.isSettlement = 1;
    account.price = req.body.price;
    account.createdOn = new Date();
    account.createdStr = account.createdOn.toISOString().substring(0, 10)

    account.save(function (err, reply) {
        if (err) {
            return res.send({status: 402, msg: '新增出错'})
        } else {
            return res.send({status: 200, msg: '成功'})
        }
    });
}

exports.getAccounts = function (req, res, next) {

    if (!req.body.isSettlement) {
        return res.send({status: 401, msg: '缺少参数'})
    }
    accountModel.find({isSettlement: req.body.isSettlement}, function (err, reply) {
        if (err) {
            return res.send({status: 403, msg: '查找出错啦'});
        } else {
            console.log("accountModel")

            return res.send({status: 200, msg: '成功', info: reply.reverse()});
        }
    });
}

exports.delAccount = function (req, res, next) {

    if (!req.body.accountId) {
        return res.send({status: 401, msg: '缺少参数'})
    }

    var accountId = req.body.accountId;
    accountModel.remove({_id: accountId}, function (err, result) {
        if (err) {
            return res.send({status: 403, msg: '删除出错啦'});
        } else {
            return res.send({status: 200, msg: '删除成功', info: ''});
        }
    });
}

exports.updateAccount = function (req, res) {

    if (!req.body.accountId || !req.body.userName || !req.body.price || !req.body.description) {
        return res.send({status: 401, msg: '缺少参数'})
    }

    var accountId = req.body.accountId;
    accountModel.update({_id: accountId}, {
        $set: {
            userName: req.body.userName,
            description: req.body.description,
            price: req.body.price
        }
    }, function (err, result) {
        if (err) {
            return res.send({status: 403, msg: '修改出错啦'});
        } else {
            return res.send({status: 200, msg: '修改成功'});
        }
    })

}

/***
 * 结算
 * @param req
 * @param res
 */
exports.settlement = function (req, res) {

    accountModel.aggregate([{
        $match: {
            "isSettlement": {'$in': [0, 1]}
        }
    }, {
        '$group': {
            '_id': '$userName', 'count': {$sum: 1}, 'totalAmount': {
                $sum: "$price"
            }
        }
    }], function (err, result) {
        if (err) {
            return res.send({status: 403, msg: '查找出错啦', info: err});
        } else {
            if (result.length <= 0) {
                return res.send({
                    status: 200,
                    msg: '成功',
                    info: {"totalPrice": 0, averagePrice: 0, userItem: []}
                });
            } else {

                var totalPrice = 0;

                for (var i = 0; i < result.length; i++) {
                    totalPrice += result[i].totalAmount;
                }

                var averagePrice = totalPrice / result.length;

                for (var m = 0; m < result.length; m++) {
                    result[m].chargeFee = (result[m].totalAmount - averagePrice).toFixed(2);
                }

                return res.send({
                    status: 200,
                    msg: '成功',
                    info: {"totalPrice": totalPrice.toFixed(2), averagePrice: averagePrice.toFixed(2), userItem: result}
                });
            }


        }

    })

}


/**
 * 结算
 */
exports.submitSettlement = function (req, res) {
    accountModel.update({isSettlement: 1}, {
        $set: {
            isSettlement: 2
        }
    }, {multi: true}, function (err, result) {
        if (err) {
            return res.send({status: 403, msg: '修改出错啦'});
        } else {
            return res.send({status: 200, msg: '修改成功'});
        }
    })
}
exports.upload = function (req,res) {
    console.log(req,9999)

}














