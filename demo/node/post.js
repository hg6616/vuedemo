const querystring = require('querystring');
const http = require('http');

var postData = 'params= {"dlrCode": "H2901"}';
var postData2 = querystring.stringify(postData);
//console.log(postData)
var options = {
    hostname: 'dmswx.szlanyou.com',
    port: 80,
    //  hostname: '172.26.131.118',      
    //port: 8081,
    path: '/serv/base/car/brand/v1/list',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Length': Buffer.byteLength(postData)
        'Content-Length': postData.length
    }
};




var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`主体: ${chunk}`);
    });
    res.on('end', () => {
        console.log('响应中已无数据。');
    });
});



req.on('error', (e) => {
    console.log(`请求遇到问题: ${e.message}`);
});

// 写入数据到请求主体
req.write(postData + "\n");
req.end();