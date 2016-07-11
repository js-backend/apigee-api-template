var Membership = require('membership');

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
        res.json(result.message);
    });
}
