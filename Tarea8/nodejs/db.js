var mysql = require('mysql')
var conn = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'db',
    port: '3306'
 })
conn.connect(function(err){
    if(err)throw err
    console.log("Conn Mysql")
})

module.exports = conn;