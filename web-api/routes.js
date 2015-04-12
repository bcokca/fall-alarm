/**
 * Created by burhan.cokca on 1/25/15.
 */
var member = require('./handlers/member');


var passport = require('passport');
var result = require('./model/result');
//var multer = require('multer');

// Define a middleware function to be used for every secured routes
var mid_auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

exports.define = function() {

    // MEMBERSHIP Routes
    // app.post(   '/member/forgot', member.forgot);
    app.get( '/api/test', member.test);
    app.get( '/api/v1/patient/device/:device_id', member.getPatient);

    app.get( '/api/v1/patient', member.getPatients);

    app.post( '/api/v1/register', member.register);
    app.post( '/api/v1/login', passport.authenticate('local'), member.login);
    app.post( '/api/v1/logout', member.logout);
    app.get(  '/api/v1/loggedin', member.loggedin);

    app.post( '/api/v1/update-profile', mid_auth, member.updateProfile);
    app.post( '/api/v1/update-notifications', mid_auth, member.updateNotifications);
    app.post( '/api/v1/update-password', mid_auth, member.updatePassword);


};



