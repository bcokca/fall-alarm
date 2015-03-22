/**
 * Created by burhan.cokca on 1/25/15.
 */

var db = require('./../model/DB');
var result = require('./../model/result');
var crypto = require('crypto');


var bookshelf = {};

exports.login = function(req, res) {
    res.send(req.user);
};

exports.loggedin = function(req, res) {
    res.send(req.isAuthenticated() ? new result.result(true, req.user) : new result.result(false, {}));
};

exports.logout = function(req, res) {
    req.logOut();
    res.send(200);
};

exports.updateProfile = function(req, res) {

    var profile = req.body.profile;

    /**

    new bookshelf.User({'id': req.user.id})
        .fetch()
        .then(function(user) {
            user.save({
                "first_name": profile.firstName,
                "last_name": profile.lastName,
                "born_year": profile.year,
                "english_level": profile.englishLevel,
                "learning_reasons": profile.options
            }, {patch: true})
                .then(function(model) {
                    // updating password successful
                    var response = new result.result(true, {});
                    res.send(response);
                })
                .catch(function(err){
                    // updating database failed
                    var response = new result.result(false, {}, ['Error occured, please contact system administrator.']);
                    res.send(response);
                });
        })
        .catch(function(err){
            // couldn't get the user from db
            var response = new result.result(false, {}, ['Error occured, please contact system administrator.']);
            res.send(response);
        }); **/

    res.send(new result.result(true, {}));

};

exports.updateNotifications = function(req, res) {

    var notifications = req.body.notifications;

    /**

    new bookshelf.User({'id': req.user.id})
        .fetch()
        .then(function(user) {
            user.save({"notifications": notifications}, {patch: true})
                .then(function(model) {
                    // updating notifications successful
                    var response = new result.result(true, {});
                    res.send(response);
                })
                .catch(function(err){
                    // updating database failed
                    var response = new result.result(false, {}, ['Error occured, please contact system administrator.']);
                    res.send(response);
                });
        })
        .catch(function(err){
            // couldn't get the user from db
            var response = new result.result(false, {}, ['Error occured, please contact system administrator.']);
            res.send(response);
        });

     */

    res.send(new result.result(true, {}));
};

exports.updatePassword = function(req, res) {

    var current = req.body.current;
    var newPassword = req.body.newPassword;
    /**

    new bookshelf.User({'id': req.user.id})
        .fetch()
        .then(function(user) {
            // md5 user password, we wouldn't want to keep user passwords in plain text, right?
            var md5_new_password = crypto.createHash('md5').update(newPassword).digest('hex');

            var md5_current_password = crypto.createHash('md5').update(current).digest('hex');

            // username not found or wrong password
            if(!user || user.get('password') != md5_current_password){
                var response = new result.result(false, {}, ['Current password is not correct.']);
                res.send(response);
            }

            // if no problem, try to update password
            else {
                user.save({"password": md5_new_password}, {patch: true})
                    .then(function(model) {
                        // updating password successful
                        var response = new result.result(true, {});
                        res.send(response);
                    })
                    .catch(function(err){
                        // updating database failed
                        var response = new result.result(false, {}, ['Error occured, please contact system administrator.']);
                        res.send(response);
                    });
            }
        })
        .catch(function(err){
            // couldn't get the user from db
            var response = new result.result(false, {}, ['Error occured, please contact system administrator.']);
            res.send(response);
        });

     **/
    var response = new result.result(true, {});
    res.send(response);
};


exports.test = function(req, res){

    res.send(new result.result(true, {burhan:'test'}))
}


exports.getPatient = function(req, res){

    //Use the db to get users information
    var device_id = req.params.device_id;

    db.execute("SELECT * FROM patients where device_id = ? " , [device_id],

        function(err, data){

            console.log('err', err);
            console.log('data', data);

            if(err) {
                var response = new result.result(false, {}, err);
                res.send(response);
            }else{
                var response = new result.result(true, data);
                res.send(response);
            }
        });


};

exports.register = function(req, res) {

    var member = req.body.member;
    var md5_password = crypto.createHash('md5').update(member.password).digest('hex');


    /**
    // TODO:
    // do all the validation of the following four fields, also
    // check if email is already in use
    new bookshelf.User({
        first_name: member.firstName,
        last_name: member.lastName,
        email: member.email,
        password: md5_password
    })
        .save()
        .then(function(model) {
            // creating user successful
            var response = new result.result(true, model);
            res.send(response);
        })
        .catch(function(err){
            // couldn't create a user
            var response = new result.result(false, {}, ['Error occured, please contact system administrator.']);
            res.send(response);
        });

     */

    var response = new result.result(true, {});
    res.send(response);
};
