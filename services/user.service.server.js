module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.post('/api/register', createUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.post('/api/profile', updateProfile)
    app.delete("/api/profile", deleteProfile)
    app.get("/api/user/:username", findUserByUsername)

    var userModel = require('../models/user/user.model.server');

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                if (user != null) {
                    req.session['currentUser'] = user;
                    req.session.cookie.maxAge = 1800000;
                    return res.send(user);
                }
                else {
                    return res.send({invalid: true})
                }
            });
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function updateProfile(req, res) {
        var user = req.body;
        return userModel
            .updateUser(user)
            .then(response => res.send(response)
    )
        ;
    }

    function deleteProfile(req, res) {
        var user = req.session['currentUser'];
        return userModel
            .deleteProfile(user._id)
            .then(response => res.send(response)
    )
        ;
    }

    function profile(req, res) {
        var user = req.session['currentUser'];
        if (user != null) {
            userModel.findByUserName(user.username)
                .then(function (user) {
                    return res.send(user);
                })
        }
        else {
            return res.send({invalid: true})
        }
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        return userModel.findByUserName(username)
            .then(function (user) {
                if (user != null) {
                    return res.send(user);
                }
                else {
                    return res.send({invalid: true})
                }
            });
    }


    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }
}