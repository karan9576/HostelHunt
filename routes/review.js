const express = require('express');
const router = express.Router({mergeParams :true});
const wrapAsync=require('../utils/wrapAsync.js');//56
const ExpressError=require('../utils/ExpressError.js');//59
const {listingSchema}=require("../schema.js");//63
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");//69
const listing=require("../models/listing.js");//13


const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

//reviews
//post route
router.post("/", validateReview, wrapAsync(async (req, res) => {
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    console.log(newReview)
    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();
    req.flash('success', 'New Review Created!')
    res.redirect(`/listings/${Listing._id}`);
}));

//review
//delete review route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review Deleted!')
    res.redirect(`/listings/${id}`);
})
);


module.exports=router;
