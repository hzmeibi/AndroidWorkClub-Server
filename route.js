/**
 * Created by vicky on 16/7/7.
 */
var accountController = require('./controllers/accountController');
var blogController = require('./controllers/blogController');
var multipart = require('connect-multiparty');
var fs = require('fs');
var multipartMiddleware = multipart();
var multer = require("multer");
var unzip = require("unzip2");
var adm_zip = require('adm-zip');
var debug = false;//true 为本地路径，false为线上服务器路径
var rootPath;
var rootFilePath = 'blogFiles/';
if (debug) {
    rootPath = '/Users/milo/Desktop/person/BlogProject/AndroidWorkClub-Client/';
} else {
    rootPath = 'D://BlogProject/AndroidWorkClub-Client/';
}


module.exports = function (app) {

    app.get('/account/initData', accountController.initData);
    app.post('/account/insertAccount', accountController.insertAccount);
    app.post('/account/getAccounts', accountController.getAccounts);
    // app.post('/account/updateAccount',accountController.updateAccount);
    app.post('/account/delAccount', accountController.delAccount);
    app.post('/account/settlement', accountController.settlement);
    app.post('/account/submitSettlement', accountController.submitSettlement);
    app.post('/account/upload', accountController.upload);

    app.post('/blog/insertBlogs', blogController.insertBlogs);
    app.post('/blog/getBlogList', blogController.getBlogList);
    app.post('/blog/searchBlogByType', blogController.searchBlogByType);

    //此处'/url'应与angular发送的路由一致，
    app.post('/blog/uploadFiles', multipartMiddleware, function (req, res, next) {

        var profile_image = req.files.file;
        var tmp_path = profile_image.path;
        var file_path = rootFilePath + profile_image.name

        //跨域传递文件
        var is = fs.createReadStream(tmp_path);
        var os = fs.createWriteStream(rootPath + rootFilePath + profile_image.name);
        is.pipe(os);

        is.on('end', function () {
            console.log(req.files.file)
            if (req.files.file.type == "application/zip") {
                //压缩
                var unzip = new adm_zip(tmp_path);
                unzip.extractAllTo(rootPath + rootFilePath);
            }
            fs.unlinkSync(tmp_path);
        });


        res.send({
            status: 200,
            fileUrl: file_path
        })

    });

}