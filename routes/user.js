var express = require('express')
  , http = require('http')
  , path = require('path')
  , log4js = require('log4js')
  , i18n = require('i18next')
  //, DbHelper = require('../helpers/db.js')
  , User = require('../models/user.js');

exports.login = function(req, res){
	res.render('login', {title: 'Login', content: 'Page de login', error: req.query.error });
};

exports.connect = function(req, res){
	User.findOne({
					login: req.body.login, 
					pasword: req.body.password
				}, function(err, user) {
						if(err){
							return handleError(err);
						}else{
							if(user !== null){
								res.send("Bonjour : " + user.name);
							}else{
								//res.redirect('/login?error=' + 'User not found !');
								res.send('{"response" : "error", "message" : "User not found !"}');
							}
							
						}
    			});
};

exports.create = function(req, res){
	console.log('Create user with : {login : ' + req.body.login + ', password : ' + req.body.password + ', email : ' + req.body.email + '}');
	var user = new User({ 
							login: req.body.login,
							password: req.body.password,
							email: req.body.email
						});
	user.save(function (err) {
	  if(err){
	  	res.send('{"response" : "error", "message" : "' + "" + '"}');
	  }else{
	  	res.send("Utilisateur sauvegardé : " + user.login);
	  }
	  // saved!
	})
	
};
