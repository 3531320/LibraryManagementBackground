const express = require("express");
const router = require("./router/router.js");
//创建web服务器 app接收
const app = express();
//配置跨域
app.all("*",function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",'3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();//执行下一个中间件
})
app.use(router);
app.listen(9090, () => {
  console.log("app listening on port 9090")
})