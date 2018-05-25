var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var searchSchema = new Schema({
	term: {type: String, required: true},
	timestamp: {type: Date, required: true},
});

searchSchema
.virtual('dateTime')
.get(function() {
	return moment(this.timestamp).format('MMMM Do, YYYY, h:mm:ss a');
});

module.exports = mongoose.model('Search', searchSchema);