var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user:'boyd',
	password:'boyd',
	database:'kbb'
});

connection.connect();

var id = '1';


connection.query('select * from werknemers where id = ' + connection.escape(id), function(err, result){
		if (err) {
		console.log(err);
		return;
	}
	console.log(result);
})