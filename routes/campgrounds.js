var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");

router.get("/", function(req, res){
    //Get all from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log("PROBLEM");
        } else {
           res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    }); 
});

router.post("/", middleware.isLoggedIn, function(req, res){
   //get data from form and add to the array
   // console.log(req.body)
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newSite = {name: name, price: price, image: image, description: description, author: author};
    //create a new campground and add to the database
    Campground.create(newSite, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        //redirect back to the campgrounds page
            res.redirect("/campgrounds");   
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - Shows more info about each campground

router.get("/:id", function(req, res) {
    //Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Could not find that campground");
            return res.redirect("/campgrounds");
        } else {
           // Render the show template with that campground
         res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT ROUTE 

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Could not find that campground :(");
            res.redirect("back");
        }
         res.render("campgrounds/edit", {campground: foundCampground});    
    });
});
  

//UPDATE ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err || !updatedCampground){
            req.flash("error", "Could not find that campground :(");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully updated your campground");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground Deleted!");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router; 