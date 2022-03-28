var mqtt = require('mqtt')
const fs = require('fs')


// var privateKey = fs.readFileSync('/var/www/html/emqttd/etc/certs/STAR_sensegiz_com_key.pem');
// var certificate = fs.readFileSync('/var/www/html/emqttd/etc/certs/STAR_sensegiz_com.crt');


var options={
	// rejectUnauthorized : false,
	// key: privateKey,
	// cert: certificate,
	username: 'sensegiz123', 
	password: 'sg12345'
}
 
var client  = mqtt.connect('mqtt://localhost:1883',options);

module.exports = client;
