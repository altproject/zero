var express = require('express')
  , http = require('http')
  , path = require('path')
  , log4js = require('log4js')
  , i18n = require('i18next');
/*
 * GET home page.
 */

exports.index = function(req, res){
	// Access session
	var session = req.session;
	res.render('index', { title: i18n.t('index.title'), content: i18n.t('index.intro')});
};

exports.template = function(req, res){
	// Access session
	var session = req.session;
	res.render('template', {});
};