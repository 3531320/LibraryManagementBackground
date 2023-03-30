const express = require("express");
const conn = require('../mysql.js');
const router = express.Router();
//创建一个路由容器
router.get('/getpost',(req,res)=>{
  var sql = "select * from test1";
  conn.query(sql,(error,result,fields)=>{
    if(error) return "失败"
    res.send({
      msg:result
    })
  })
});
//导出
module.exports = router;