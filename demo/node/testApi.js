var http = require('http');
var options = {
    method: "GET",
    hostname: 'news-at.zhihu.com',
    port: 80,
    path: '/api/4/news/latest'
};
var url='http://news-at.zhihu.com/api/4/news/latest';
// var req = http.request(options, function ( res,hh) {
//    // log(res)
//     // if (error) throw new Error(error);
//     // res.json(JSON.parse(body))
//     res.on('data', (chunk) => {
//         console.log(`主体: ${chunk}`);
//     });
//     res.on('end', () => {
//         console.log('响应中已无数据。');
//     });

// });


// req.on('error', (e) => {
//     console.log(`请求遇到问题: ${e.message}`);
// });

// // 写入数据到请求主体
// //req.write(postData);
//  req.end();
//fetch(url).then(res=>{console.log(res)}).catch(e=>log(e));

function log(t) {
    console.log(t);
}