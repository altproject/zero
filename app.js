
/**
 * https://gist.github.com/fwielstra/1025038
 * Trip diaries site
 * Module dependencies. 
 * Must be declared in the package.json
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , log4js = require('log4js')
  , i18n = require('i18next')
  , mongoose = require('mongoose')
  , routes = require('./routes/index')
  , user = require('./routes/user');

var app = express();

// Configure logger
log4js.configure({
	appenders : [ {
		type : 'console'
	}, {
		type : 'file',
		filename : 'logs/app.log',
		category : 'app'
	} ]
});
var log = log4js.getLogger('app');
log.setLevel('DEBUG');

// configure i18n
i18n.init({
    saveMissing: true,
    debug: true
});

// Connect to database
mongoose.connect('mongodb://localhost/test', function(err) {
	if(err){
		throw err;
	}
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Configuration application
app.configure(function(){
	// To format the output
	app.use(function(req, res, next){
		app.locals.pretty = true;
		next();
	});
	// Send static content from public directory
	app.use(express.static(path.join(__dirname, 'public')));
	// Replace the standard logger
	app.use(log4js.connectLogger(log, {
		level : log4js.levels.INFO,
		format : ':method :url'
	}));
	// Init sessions
	app.use(express.cookieParser());
	app.use(express.cookieSession({secret: 'GLOBEZ69Dx_I5D00'}));
	app.use(express.session({secret: 'GLOBEZ69Dx_I5D00'}));

	app.use(express.favicon());
	app.use(express.bodyParser());
	// Init translation
	app.use(i18n.handle);
	app.use(express.methodOverride());
	// Init routes
	app.use(app.router);
	
	// Init error handler
	if('development' == app.get('env')){
		app.use(express.errorHandler());
	}

	
	// Redirect page
	app.get('/', routes.index);
	app.get('/index', routes.index);
	app.get('/login', user.login);
	app.post('/connect', user.connect);
	//app.get('/newlogin', user.newlogin);

	// Users pages
//	app.get('/user/*', function(req, res) {
//		var page = pagesfromdb[key];
//		if(page !== null){
//			res.render(page.render, page.language);
//		} else {
//			res.send(404);
//		}
//	});
	
	// 404 Error page
	app.use(function(req, res, next){
		res.status(404).render('404', {
			title : i18n.t('app.error404')
		});
	});
	// 500 Error page
	app.use(function(error, req, res, next){
		res.status(500).render('500', {
			title : i18n.t('app.error500'),
			error : error
		});
	});
});
i18n.registerAppHelper(app);
//i18n.setLng('fr-FR');

// Create server
http.createServer(app).listen(app.get('port'), function(){
	log.info('Express server listening on port ' + app.get('port'));
});
