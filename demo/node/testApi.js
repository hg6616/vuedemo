var http = require('http');
var options = {
    method: "GET",
    hostname: 'news-at.zhihu.com',
    port: 80,
    path: '/api/4/news/latest'
};
options={};
var postData={"dlrCode":"H2901"};
 options = {
    method: "POST",
    hostname: 'dmswx.szlanyou.com',
    port: 80,
    path: '/serv/base/car/brand/v1/list',
     headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

var url='http://news-at.zhihu.com/api/4/news/latest';
url='http://dmswx.szlanyou.com/serv/base/car/brand/v1/list';
var req = http.request(options, function ( res) {
   // log(res)
    // if (error) throw new Error(error);
    // res.json(JSON.parse(body))
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