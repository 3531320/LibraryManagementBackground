const mysql = require("mysql");
//创建数据库链接
const conn = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"123456",
  database:"newdate" //数据库名称
});

conn.connect((err)=>{
  if(err) return console.log(err.message);
  console.log("数据库链接成功");
});
//导出
module.exports = conn;