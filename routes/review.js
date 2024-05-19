const express = require('express');
const router = express.Router({mergeParams :true});
const wrapAsync=require('../utils/wrapAsync.js');//56
const ExpressError=require('../utils/ExpressError.js');//59
const Review=require("../models/review.js");//69
const listing=require("../models/listing.js");//13
const {validateReview, isLoggedIn}=require("../middleware.js")
const {isReviewAuthor}=require("../middleware")
const reviewController=require("../controllers/review.js")

//post review route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//review
//delete review route
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports=router;
