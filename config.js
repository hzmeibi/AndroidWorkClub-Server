/**
 * Created by Steve on 14/8/6.
 */

var ipAddress = "localhost";//默认ip,与网站（api）发布所在的服务器ip相同
var port = 3000;//本地网站端口号 默认80 或者3000

var dbIpAddress = ipAddress;//数据库ip
var mongoDbPort = 27017;//数据库端口号
var dbName = "Pic";//数据库名称
var redisIpAddress = ipAddress;//redis ip
var redisPort = 830;//redis端口号
var redisPwd = "pIctur3";//redis密码
var shoppingIpAddress = ipAddress;//shopping api的ip
var onlinePort = 3006;//shopping api的端口号
var engineIpAddress = ipAddress;//endine api 的ip
var enginePort = 8888;//shopping api的端口号
var PhotoAddressValue = ipAddress;//照片发布的ip
var photoServerPortValue = 4000;//照片发布的端口号
var syncPhotoIp = "http://192.168.8.59:3000";//同步api的ip+port

module.exports = {
    serverIp: ipAddress,
    onlinePort: onlinePort,
    webPort: port,
    CommandCenter: {
        ip: ipAddress,
        port: port
    },
    mongoDbIp: dbIpAddress,
    mongoDbName: dbName,
    mongoDbPort: mongoDbPort,
    mongoConnectString: 'mongodb://' + dbIpAddress + ':' + mongoDbPort + '/' + dbName,//数据库连接字符串

    mongoOptions: {},
    redis: {
        ip: redisIpAddress,
        port: redisPort,
        redisPwd: redisPwd
    },
    userIdLength: 4,
    passwordLength: 6,
    tokenEncyrt: 'tokenPictureworks',
    timeoutQuantity: 60 * 24 * 10,//10天后 redis过期
    authExpireTime: 60 * 24 * 10,
    AppId: 'd6c0e7997b8e46f8903d7e8460d15f2d',
    messagePageSize: 100,
    pageSize: {
        viewingTerminal: 12,
        messagePageSize: 100,
        checkPhotoCount: 12
    },
    photoServerPort: photoServerPortValue,//照片发布的端口号
    PhotoIpAddress: PhotoAddressValue,
    photoServerIp: PhotoAddressValue + ":" + photoServerPortValue,

}


