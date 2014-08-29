var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/dinnersready');

app.use(bodyParser());

// ================== Load models ================== 
app.models = {};
require('./models/user.js')(app,mongoose);

// ================== Bind callbacks to endpoints ================== 
app.get('/', function(req, res) {
	console.log(req);
	res.send('Hello world!');
});

app.get('/users', function(req, res) {
	app.models.User.find({}, function(err, users) {
		res.send(users);
	});
	
});

app.post('/users', function(req, res) {
	console.log(req.body);
	var user = app.models.User(req.body);
	function savecallback(err, object){
		res.send(object);
	}
	user.save(savecallback);
});


// ================== Start the server ================== 
http.listen(3000, function() {
	console.log('Listening on port 3000');
});