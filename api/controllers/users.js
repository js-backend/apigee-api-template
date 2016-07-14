var Membership = require('membership');
var jsonWebToken = require('jsonwebtoken');

module.exports = {
    register: register,
    login: login
};

function register(req, res) {
    email = req.body.email;
    password = req.body.password;

    var storage = req.a127.config('storage');
    var membership = new Membership(storage.database);
    membership.register(email, password, password, function(err, result) {
        res.json(result.message);
    });
}

function login(req, res) {
    email = req.body.email;
    password = req.body.password;

    var storage = req.a127.config('storage');
    var membership = new Membership(storage.database);
    membership.authenticate(email, password, function(err, result) {
        if (result.success) {
            var token = jsonWebToken.sign(result.user, storage.secret, {
                expiresIn: 24 * 60 * 60 // expires in 24 hours
            });
            res.json({token: token, user: result.user, message: result.message});
        } else {
            res.status(400).json({message: result.message});
        }
    });
}
