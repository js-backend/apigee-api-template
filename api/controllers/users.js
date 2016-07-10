var Membership = require('membership');

module.exports = {
    register: register
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