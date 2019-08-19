var express  = require("express");
var router   = express.Router();
var User     = require("../models/user");
var passport = require("passport");

//RESTFul Routes
router.get("/", function(req, res){
    res.render("landing");
});

//============
// AUTH ROUTES
//============
//Show register Form
router.get("/register", function(req, res){
    res.render("register");
});

//Handle the register logic
router.post("/register", function(req, res){
    //User.register(new User({username: req.body.username}), reg.body.password, function(err, user){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }   
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show Login Form
router.get("/login", function(req, res){
    res.render("login");
});

//Handle the login logic
router.post("/login", passport.authenticate("local", 
    {   successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), 
    function(req, res){
});

//=========
//LOGOUT
//=========

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully Logged Out. See you again soon!");
    res.redirect("/campgrounds");
});


module.exports = router;