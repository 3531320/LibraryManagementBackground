const express = require("express");
const conn = require('../mysql.js');
const router = express.Router();
//创建一个路由容器
router.get('/getpost', (req, res) => {
  let sql = "select * from books";
  conn.query(sql, (error, result) => {
    if (error) return "查询失败"
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

router.delete("/delbook", (req, res) => {
  let id = req.body.id;
  let sql = "delete from books where id=?";
  conn.query(sql, [id], (error, result) => {
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

//导出
module.exports = router;