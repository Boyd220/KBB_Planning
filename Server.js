 var express    = require("express");
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'boyd',
   password : 'boyd',
   database : 'kbb'
 });
 var app = express();
 
 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });
 /*
return {
    add: function(data, callback) {
        var date = new Date();
        var query = "";
        query += "INSERT INTO werknemers (achternaam, voornaam, privétel, werktel, adres, huisnr, stad, afkomst, postcode, comments) VALUES (";
        query += connection.escape(data.achternaam) + ", ";
        query += connection.escape(data.voornaam) + ", ";
        query += connection.escape(data.privétel) + ", ";
        query += connection.escape(data.werktel) + ", ";
        query += connection.escape(data.adres) + ", ";
        query += connection.escape(data.huisnr) + ", ";
        query += connection.escape(data.stad) + ", ";
        query += connection.escape(data.afkomst) + ", ";
        query += connection.escape(data.postcode) + ", ";
        query += connection.escape(data.comments) + ", ";
        query += ")";
        connection.query(query, callback);
    },
    update: function(data, callback) {
        var query = "UPDATE werknemers SET ";
        query += "achternaam=" + connection.escape(data.achternaam) + ", ";
        query += "voornaam=" + connection.escape(data.voornaam) + " ";
        query+="privétel" + connection.escape(data.privétel) + " ";
        query+="werktel" + connection.escape(data.werktel) + " ";
        query+="adres" + connection.escape(data.adres) + " ";
        query+="huisnr" + connection.escape(data.huisnr) + " ";
        query+="stad" + connection.escape(data.stad) + " ";
        query+="afkomst" + connection.escape(data.afkomst) + " ";
        query+="postcode" + connection.escape(data.postcode) + " ";
        query+="comments" + connection.escape(data.comments) + " ";
        query += "WHERE id='" + data.id + "'";
        connection.query(query, callback);
    },
    get: function(callback) {
        var query = "SELECT * FROM werknemers ORDER BY id DESC";
        connection.query(query, function(err, rows, fields) {
            if(err) {
                throw new Error("Error getting.");
            } else {
                callback(rows);
            }
        });
    },
    remove: function(id, callback) {
        var query = "DELETE FROM werknemers WHERE id='" + id + "'";
        connection.query(query, callback);
    }
}
*/

 app.get("/",function(req,res){
 connection.query('SELECT * from werknemers', function(err, rows, fields) {
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
   });
 });
 
/*
 var werknemer = {
  achternaam: 'Nagelkerke',
  voornaam: 'Danique',
  privétel:1234,
  werktel: 4321,
  adres:'Lepelaar',
  huisnr: 6,
  stad:'Bergen op Zoom',
  afkomst:'Nederlands',
  postcode:'4614PN',
  comments:'Niets'
};

var query = connection.query('insert into werknemers set ?', werknemer, function (err, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
})*/

 app.listen(3000);