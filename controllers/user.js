/**
 * Created by vicky on 16/7/7.
 */
var userModel = require('../models/userModel');
var fs = require('fs');

var async = require('async');
exports.insertUser = function (req, res, next) {

    var user = new userModel();
    user.name = "vicky1";
    user.age = user.id;
    user.sax = "women"
    user.save(function (err, reply) {
        if (err) {
            return res.send({err: {type: 'insertLeftBarError', message: err}});
        } else {
            return res.send({type: 'infoReturn', message: 'inserLeftBar successful'})
        }
    });
}
exports.finds = function (req, res, next) {
    console.log("ssfinds users")

    userModel.find({}, function (err, reply) {
        if (err) {
            console.log("err" + err);
            return res.send({status: "400", info: err});
        } else {
            // console.log("reply"+reply);
            //return res.send({status: "200", resultCount: reply.length, info: reply});

            var count = 0;
            var newPhoto = [];
            async.each(reply, function (item, cb) {
                //修改商品信息
                item.name = "vicky1" + count;
                item.age = 10 + count;
                item.sax = "women" + count;

                item.save(function (err) {
                    if (err) {
                        log.error('unUpdate photos', err);
                        return res.send({status: '400', info: err});
                    }

                    newPhoto.push(item);
                    count++;
                    if (count == reply.length) {
                        return cb(newPhoto);

                    }
                })

            }, function (err) {

                if (err) {
                    return res.send({status: "400", info: err});
                } else {
                    if (newPhoto.length >= 1) {
                        return res.send({status: '200', info: newPhoto});
                    } else {
                        return res.send({status: '400', info: "no photo"});
                    }
                }
            })
        }
    });

}














