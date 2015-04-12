/**
 * Created by burhan.cokca on 1/25/15.
 */
var express = require('express'),
    http = require('http'),
    path = require('path');

// Create app
app = express();

app.use(express.static(__dirname + '/dist'));

//Upload file
//app.use(multer({ dest: './uploads/'}));


// Enables CORS
var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) res.send(200);
    else next();
};
app.use(enableCORS);



// Setup
require('./config').setupEnvironment();
require('./authentication').init();

// Define routes
require('./routes').define();
require('./other').define();

// Start the server
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
