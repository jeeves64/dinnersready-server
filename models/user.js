module.exports = function(app, mongoose) {
	
	var userSchema = mongoose.Schema({
		name: String,
		email: String,
		token: String
	});

	app.models.User = mongoose.model('User', userSchema);

};