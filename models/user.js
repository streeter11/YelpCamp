var mongoose                = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/");
var passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

