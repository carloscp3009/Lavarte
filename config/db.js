const mysql = require('mysql');
const config = require('config');

const connection = mysql.createConnection(config.get('dbConfig'));
connection.connect(err => {
  if (err) throw err.message;
  console.log('DB connected..!');
});

module.exports = connection;
