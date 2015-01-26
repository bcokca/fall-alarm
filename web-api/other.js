/**
 * Created by burhan.cokca on 1/25/15.
 */
var result = require('./model/result');

exports.define = function() {

    // IMPORTANT!!!
    // THIS SHOULD COME LAST - Since it is the 404 page
    app.use(function(req, res, next){
        res.status(404);

        res.send(new result.result(false, {}, ['Not found']));
        return;
    });
}