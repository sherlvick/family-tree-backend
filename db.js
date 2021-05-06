  
var mysql = require('mysql');
var con ; 
async function connectDb(){
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "family_tree"
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

module.exports = {connectDb};