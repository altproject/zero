var express = require('express'), 
	mongoose = require('mongoose'), 
	Schema = mongoose.Schema;

var userSchema = new Schema({
	login : String,
	name : String,
	password : String,
	active : Boolean
});

module.exports = mongoose.model('User', userSchema);