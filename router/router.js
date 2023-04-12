const express = require("express");
const conn = require('../mysql.js');
const router = express.Router();
const moment = require('moment')
//创建一个路由容器
router.get('/getpost', (req, res) => {
  let name = req.query.name;
  let sql = "select * from books";
  if(name){
    sql = "select * from books where name like ? ";
  }
  conn.query(sql, ["%"+name+"%"],(error, result) => {
    if (error) return "查询失败";
    result.forEach(item=>{
      item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
      item.updateTime = item.updateTime?moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss"):"";
    })
    res.send({
      msg: result
    })
  })
});

router.post("/addbook", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let createTime = new Date();
  let sql = `insert into books(id,name,createTime) values(?,?,?)`;
  conn.query(sql, [id, name, createTime], (error, result) => {
    if (error) return "失败"
    console.log("添加成功");
    res.send({
      msg: "添加成功"
    })
  })
});

router.get("/delbook", (req, res) => {
  let id = req.query.id;
  console.log(id);
  conn.query(`delete from books where id in (${id})`, (error, result) => {
    if (error) return "失败"
    console.log("删除成功");
    res.send({
      msg: "删除成功"
    })
  })
})

router.post("/updatebook", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let updateTime = new Date();
  let sql = "update books set name=? , updateTime=? where id=?";
  conn.query(sql, [name, updateTime,id], (error, result) => {
    if (error) return "失败"
    console.log("更新成功");
    res.send({
      msg: "更新成功"
    })
  })
})

router.get("/bookDetail",(req,res)=>{
  let id = req.query.id;
  conn.query(`select * from books where id = ${id}`,(error,result)=>{
    if (error) return "失败";
    res.send({
      msg:result
    })
  })
})


//导出
module.exports = router;