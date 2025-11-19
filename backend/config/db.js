const mysql = require("mysql2");

const Mydata = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "comforty",
  port: 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

module.exports = Mydata.promise();
