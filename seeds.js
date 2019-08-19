var mongoose    = require("mongoose");
var Campground  = require("./models/campgrounds");
var Comment     = require("./models/comments");

var data = [
    {
        name: "Lulworth Cove",
        image: "https://www.visit-dorset.com/imageresizer/?image=%2Fdmsimgs%2Flulworth-cove-_VisitBritain-Ben_Selway-exp-03-2018-09VB34139791_1037343637.jpg&action=ProductDetail&crop=4D037816BBDE2ED4478FEA6D4E1CEA48",
        description: "The beautiful white pebble beach of Lulworth Cove, with its blue waters and easy access make it a popular destination. Low tide reveals wonderful rock pools teeming with sea creatures. Dogs are permitted on the left hand side of the slipway. The Cove offers a variety of places to eat and there is a large car park (fee payable). Make sure you visit the Heritage Centre next to the car park for all kinds of information about the area and the Jurassic Coast. There are toilets with disabled and baby changing facilities at the Heritage Centre. Boat trips are available during the summer. We recommending visiting between October and April when the beach and roads will be quieter. If you do want to visit during peak times, we recommend that you use public transport, walk or cycle, or if you are driving, it is best to arrive early or late in the day to guarantee a parking space."
    },
    {
        name: "Durdle Door",
        image: "https://discoverdorset.co.uk/wp-content/uploads/2016/10/lulworth-cove-and-durdle-door-022.jpeg",
        description: "Eroded by time and nature, Durdle Door is one of Dorset’s most photographed and iconic landmarks. It is located on the Lulworth Estate in south Dorset and is part of the Jurassic Coast. The coastline is of such international geological importance that it was designated England’s first natural World Heritage Site by UNESCO in 2001 and is now part of a family of natural wonders including America’s Grand Canyon and Australia’s Great Barrier Reef. The magnificent natural limestone arch was formed when the power of the waves eroded the rock and forged a hole through the middle. The name Durdle is derived from an old English word ‘thirl’, which means to pierce, bore or drill. As you look towards the sea, you will see Durdle Door beach on your right. Access to the pebble and shingle beach is on foot via a path and steps over the hill from Lulworth Cove or down from the Car Park (charges apply) which is located on the cliff top at Durdle Door Holiday Park."
    },
    {
        name: "Weymouth",
        image: "https://www.visit-dorset.com/imageresizer/?image=%2Fdmsimgs%2FWeymouth_Beach_2124438330.jpg&action=ProductDetail",
        description: "Packed with old fashioned amusements, large and sandy, and safe for swimmers - Weymouth's beach has been voted the very best in the UK. Flanked by a harbour and backed by an attractive row of Georgian buildings, the Dorset town's gentle curve of golden sand was named as this year’s number one “travellers choice” beach by TripAdvisor users"
    },
];

function seedDB(){
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // } else {
        //     console.log("Campgrounds have been removed");
        // }
        //     data.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             if(err){
        //                 console.log(err);
        //             } else {
        //                 console.log("added a site");
        //                 // create a comment
        //                     Comment.create({
        //                         text: "This place is a great place to relax",
        //                         author: "Mr Kingsman"
        //                     }, function(err, comment){
        //                         if(err){
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("someone left a comment");
        //                          }   
        //                     });
        //             }
        //         });
        //     });
     
    });
}

module.exports = seedDB;