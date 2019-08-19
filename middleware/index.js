var Campground = require("../models/campgrounds.js");
var Comment = require("../models/comments.js");
var middlewareObj = {};

//Middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be signed in to do that. Please sign in");
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
     //is the user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Sorry, Campground could not be found");
                res.redirect("back");
            } else {
            //does the user also own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
            //if not, redirect
                    req.flash("You do not have permission to do that!");
                    res.redirect("back");
                }    
            }            
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
     //is the user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Could not edit that comment");
                res.redirect("back");
            } else {
            //does the user also own the campground?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
            //if not, redirect
                    req.flash("You do not have permission to do that");
                    res.redirect("back");
                }    
            }            
        });
    } else {
        req.flash("You need to be logged in to do that");
        res.redirect("back");
    }
};

module.exports = middlewareObj; 