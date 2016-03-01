var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user:'boyd',
	password:'boyd',
	database:'kbb'
});

connection.connect();

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
})