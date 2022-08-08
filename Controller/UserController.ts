

var mysql = require('mysql');  
var con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "Aa123456!",
  database: "FlightUser"
});  

con.connect(function(err) {  
  if (err) throw err;  
  /*console.log("Connected!");  
  con.query("CREATE DATABASE FlightUser", function (err, result) {  
    if (err) throw err;  
    console.log("Database created");  
  });  
  var sql = "CREATE TABLE users (firstName VARCHAR(255), surName VARCHAR(255), email VARCHAR(255), password VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  var sql = "INSERT INTO users (firstName, surName, email, password) VALUES ('michal', 'roginsky', 'michal@mail.com', 'Aa123456!')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });*/

  con.query("SELECT * FROM users", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});  


var validateUser = async function (req: any, res: any) {
  let isValidUser = false;
  var email = req.body.email;
  var pass = req.body.pass;

  con.query("SELECT * FROM users WHERE (email = '"+email+"' and password = '"+pass+"')", function (err, result) {
    if (err) throw err;
    if(result.length === 1){
      isValidUser = true;
    }
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(isValidUser));
  });
}

var registerUser = async function (req: any, res: any) {
  let isValidUser = false;

  var email = req.body.email;
  var pass = req.body.pass;
  var firstName = req.body.firstName;
  var sueName = req.body.surName;

  con.query("SELECT * FROM users WHERE (email = '"+email+"')", function (err, result) {
    if (err) throw err;
    if(result.length === 0){
      var sql = "INSERT INTO users (firstName, surName, email, password) VALUES ('"+firstName+"', '"+sueName+"', '"+email+"', '"+pass+"')";
      isValidUser = true;
      con.query(sql, function (err, result) {
        if (err) throw err;
      });
    }
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(isValidUser));
  });  
}

  
exports.validateUser = validateUser;  
exports.registerUser = registerUser;