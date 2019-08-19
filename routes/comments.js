var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middleware");

//New comment form
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by it's ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Could not find that campground :(");
            res.redirect("back");
            console.log(err);  
        } else {
          res.render("comments/new", {campground: foundCampground});  
        }
    }); 
});

//Comment post route
router.post("/", middleware.isLoggedIn, function(req, res){
    //Lookup campground by Id
    Campground.findById(req.params.id, function(err, campground){
        if(err || !campground){
            req.flash("error", "Could not find that campground :(");
            res.redirect("/campgrounds");
            console.log(err);
        } else {
            //create a comment
            Comment.create(req.body.comment, function(err, comment){
                if(err || !comment){
                    req.flash("error", "Ooops, something went wrong");
                    res.redirect("/campgrounds");
                    console.log(err);
                } else {
                    //connect the comment to the campground
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                  //redirect to the campgrounds show page
                    req.flash("success", "Thanks for your feedback!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            }); 
        }
    });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Could not find that campground :(");
            return res.redirect("back");
        } 
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
            }
        });
    });    
});

//COMMENT UPDATE ROUTE

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Your comment has been updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if (err){
           res.redirect("back");
       } else {
           req.flash("success", "Your comment was deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

module.exports = router;