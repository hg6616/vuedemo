var http = require('http');
var options = {
    method: "GET",
    hostname: 'dmswx.szlanyou.com',
    port: 80,
      path: '/serv/base/car/brand/v1/list?params={"dlrCode":"H2901"}',
};


var req = http.request(options, function ( res) {

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
//req.write(postData);
 req.end();
//fetch(url).then(res=>{console.log(res)}).catch(e=>log(e));

function log(t) {
    console.log(t);
}