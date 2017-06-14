var fs = require("fs");


var config = [
    {
        type: 'SEND_AUTH_CODE',
        desc: '发送手机验证码',
        url: '/serv/base/phone/v1/validcode'
    }
];

var start = () => {
    var c = config[0];
    var data='';
    var readerStream = fs.createReadStream('actions.js');
    // 设置编码为 utf8。
    readerStream.setEncoding('UTF8');

    // 处理流事件 --> data, end, and error
    readerStream.on('data', function (chunk) {
        data += chunk;
    });

    readerStream.on('end', function () {
        console.log(data);
    });

    readerStream.on('error', function (err) {
        console.log(err.stack);
    });
}
start();