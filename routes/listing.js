const express =require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');//56
const listing=require("../models/listing.js");//13
const {isLoggedIn ,isOwner}=require("../middleware.js")
const {validateListing}=require("../middleware.js");
const ListingController=require('../controllers/listing.js');

//index route
router.get("/",wrapAsync(ListingController.index));

//new route
router.get("/new",isLoggedIn,(ListingController.renderNewForm));

//show route
router.get("/:id",wrapAsync(ListingController.showListing));

//create route
router.post("/",validateListing,isLoggedIn,wrapAsync(ListingController.createListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.renderEditForm));

//update route
router.put("/:id",validateListing,isLoggedIn,isOwner,wrapAsync(ListingController.updateListing));


//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(ListingController.destroyListing))


module.exports=router;

