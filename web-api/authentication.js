var express = require('express');
var session = require('express-session');
var crypto = require('crypto');
var passportStrategy = require('passport-local').Strategy;
var result = require('./model/result');
//var bookshelf = require('./model/bookshelf');
var passport = require('passport');
exports.passport = passport;

/**
 * Auth - passport library
 */
exports.init = function(){

    // auth
    app.use(session({ secret: this.getSecretKey() }));
    app.use(passport.initialize());
    app.use(passport.session());

    //==================================================================
    // Define the strategy to be used by PassportJS
    passport.use(new passportStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            process.nextTick(function () {
                new bookshelf.User({'email': email})
                    .fetch({withRelated: ['roles']})
                    .then(function(user) {
                        // md5 user password, we wouldn't want to keep user passwords in plain text, right?
                        var md5_password = crypto.createHash('md5').update(password).digest('hex');

                        // username not found or wrong password
                        if(!user || user.get('password') != md5_password)
                            return done(null, false);

                        // success
                        else
                            return done(null, user);
                    })
                    .catch(function(err){
                        // TODO: add fail-safe mechanism, send an email to admin
                        console.log("DB Error while authentication user: ", email, password, err);
                        return done(null, false);
                    });
            });
        }
    ));

    // Serialized and deserialized methods when got from session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}

// Define a middleware function to be used for every secured routes
exports.check = function(req, res, next){
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

exports.getSecretKey = function(){
    return "fallarm-app-secret-key";
}
