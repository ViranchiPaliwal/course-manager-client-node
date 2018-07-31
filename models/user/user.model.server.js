var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1});
}


function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function updateUser(user) {
    return userModel.update({
        _id: user._id
    }, {
        $set: user
    })
}

function findByUserName(username) {
    return userModel.findOne({username: username})
}

function deleteProfile(userId) {
    return userModel.remove({_id: userId})
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    findByUserName: findByUserName,
    deleteProfile: deleteProfile
};

module.exports = api;