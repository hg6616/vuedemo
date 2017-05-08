require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var http = require('http');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()


var fs = require('fs');
app.get('/api/goods', function (req, res) {
  var data = JSON.parse(fs.readFileSync('json/goods.json'));
  res.send(data);
});



app.get('/api/zhihu', function (req, resOut, next) {

  var options = {
    method: "GET",
    hostname: 'news-at.zhihu.com',
    port: 80,
    path: '/api/4/news/latest'
  };
  var postData = {};
  var req = http.request(options, function (res) {
    //console.log(`STATUS: ${res.statusCode}`);
    //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log('data')
      postData = chunk;
      //  console.log(`主体: ${chunk}`);
      //resOut.send(chunk);
    });
    res.on('end', () => {
      console.log('响应中已无数据。');
      resOut.send(postData);
    });

  });


  req.on('error', (e) => {
    console.log(`请求遇到问题: ${e.message}`);
  });

  // 写入数据到请求主体
  //   req.write(postData);
  req.end();

});


app.get('/api/news/:id', function (req, resOut, next) {
  var id = req.params.id;
  console.log(id);
  var options = {
    method: "GET",
    hostname: 'news-at.zhihu.com',
    port: 80,
    path: '/api/4/news/' + id 
  };
  var postData = {};
  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', (chunk) => { 
      postData = chunk;
    });
    res.on('end', () => {
       console.log(postData)
      resOut.send(postData);
    });

  });


  req.on('error', (e) => {
    console.log(`请求遇到问题: ${e.message}`);
  });
  req.end();

});


var request = require('request');
app.get('/news/latest', function (req, res, next) {
  var options = {
    method: "GET",
    url: "http://news-at.zhihu.com/api/4/news/latest"
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.json(JSON.parse(body))
  });
});

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
