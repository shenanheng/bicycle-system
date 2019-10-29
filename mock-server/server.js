/*
 * @Description: 利用node作为中间层来模拟数据
   用法根据后台分的模块自行在api中哪个模块中建立相应的请求以及请求数据
 * @Author: shenah
 * @Date: 2019-10-08
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-29 20:48:42
 */
const fs = require('fs');
const path = require('path');
const apiPath = path.join(__dirname, './api/');
const _assign = require('lodash/assign');
const mock = require('mockjs');
const app = require('express')();
let port = process.argv.slice(2)[0] || 9000;
const prefix = '';
//解决跨域
app.all('*', function(req, res, next) {
  // 因为前端用了withCredentials所以不能设置为*
  // res.header('Access-Control-Allow-Origin', '*');
  // 因为这个项目需要传accessToken
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  // 当withCredentials为true的时候必须要有这个
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With,accessToken'
  );
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
// 进行app的监听
app.listen(port, function() {});
let api = {};
function getApis() {
  fs.readdir(apiPath, 'utf-8', function(err, files) {
    if (err) {
      return console.error(err);
    }
    api = {};
    var obj = {};
    files.forEach(function(file) {
      fs.readFile(apiPath + file, 'utf-8', function(_err, content) {
        let c = JSON.parse(content);
        obj = _assign(obj, c);
      });
    });
    api = obj;
  });
}
// 监听api.json变化
fs.readdir(apiPath, 'utf-8', function(err, files) {
  if (err) {
    return console.error(err);
  }
  files.forEach(function(file) {
    fs.watchFile(apiPath + file, function(curr) {
      console.log('API is updated.', curr.mtime);
      getApis();
    });
  });
});

getApis();
app.use(function(req, res) {
  var data = undefined;
  var delay = 0;
  for (var group in api) {
    if (
      api[group].find(function(reqData) {
        if (reqData.regexp) {
          if (!new RegExp(reqData.url).test(req.originalUrl)) {
            return false;
          }
        } else if (req.originalUrl.indexOf(prefix + reqData.url) !== 0) {
          return false;
        }
        var apiRes = reqData.res;
        data = reqData.mock !== false ? mock.mock(apiRes) : apiRes;
        delay = reqData.delay || 0;
        return true;
      }) !== undefined
    ) {
      break;
    }
  }
  data !== undefined
    ? setTimeout(() => res.jsonp(data), delay)
    : res.sendStatus(404);
});
