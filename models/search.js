var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var searchSchema = new Schema({
	term: {type: String, required: true},
	timestamp: {type: Date, required: true},
});

module.exports = mongoose.model('Search', searchSchema);