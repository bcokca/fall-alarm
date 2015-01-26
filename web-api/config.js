var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    errorhandler = require('errorhandler'),
    morgan = require('morgan'),
    http = require('http'),
    path = require('path'),
    knex = require('knex');

//var routes = require('./handlers');

/**
 * Configuration
 */
exports.setupEnvironment = function() {
    setupGlobalVars();
    setupExpress();
    setupDevMode();
    //setupBookshelf();
}

/**
 * FALLARM global object
 */
var setupGlobalVars = function(){
    FALLARM = {
        mysqlConfiguration: null
    }
}

/**
 * Expressjs setup
 */
var setupExpress = function(){
    app.set('port', process.env.FALLARM_APP_PORT || 3000);
    app.use(bodyParser());
    app.use(cookieParser());
    app.use(methodOverride());
}

/**
 * Development & Production mode setup
 */
var setupDevMode = function(){
    var env = process.env.NODE_ENV || 'development';

    // development only
    if (env === 'development') {
        console.log('Running on development mode..');
        app.use(errorhandler());

        FALLARM.mysqlConfiguration = {
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'fallarm-db',
            port     : "3306",
            charset  : 'utf8',
            multipleStatements : true
        };

        //VOICIA.bookshelf.debug = true;
        app.use(morgan('dev'));

        /**
        // ANGULAR APP
        app.use(express.static(path.join(__dirname, 'application/app')));
        app.set('views', __dirname + '/application/app/views');
        app.set('view engine', 'jade');
        app.get('/views/:name', routes.partials);
        **/
    }

    // production only
    if (env === 'server') {
        console.log('Running on server mode..');

        // app fog node-js server environment values
        var env = JSON.parse(process.env.FALLARM_SERVICES);
        var credentials = env['mysql-5.1'][0].credentials;
        FALLARM.mysqlConfiguration = {
            host     : credentials.host,
            user     : credentials.username,
            password : credentials.password,
            database : credentials.name,
            port     : credentials.port,
            charset  : 'utf8',
            multipleStatements : true
        }

        app.use(morgan('default'));

        /**
        // ANGULAR APP
        app.use(express.static(path.join(__dirname, 'application/dist')));
         **/
    }

    process.on('uncaughtException', function(err) {
        console.log('Caught exception: ' + err);
    });
};
