const express =require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');//56
const listing=require("../models/listing.js");//13
const {isLoggedIn ,isOwner}=require("../middleware.js")
const {validateListing}=require("../middleware.js");
const ListingController=require('../controllers/listing.js');


router.route("/")
.get(wrapAsync(ListingController.index))
.post(validateListing,isLoggedIn,wrapAsync(ListingController.createListing));


//new route
router.get("/new",isLoggedIn,(ListingController.renderNewForm));

router.route("/:id")
.get(wrapAsync(ListingController.showListing))
.put(validateListing,isLoggedIn,isOwner,wrapAsync(ListingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(ListingController.destroyListing))




//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.renderEditForm));


module.exports=router;

