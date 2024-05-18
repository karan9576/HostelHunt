const express =require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');//56
const listing=require("../models/listing.js");//13
const {isLoggedIn ,isOwner}=require("../middleware.js")
const {validateListing}=require("../middleware.js");


//index route
router.get("/",wrapAsync(async (req,res)=>{//16.index route
    const allListings=await listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//new route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
   
});

//show route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const Listing =await listing.findById(id).populate({path:"reviews" , populate:{path:"author",},}).populate("owner");
    if(!Listing)
        {
            req.flash('error', 'Listing you requested does not exist!')
            res.redirect("/listings");
        }
    res.render("listings/show.ejs",{Listing});
   
}));

//create route
router.post("/",validateListing,isLoggedIn,wrapAsync(async(req,res)=>{

const newListing=new listing(req.body.listing);
newListing.owner=req.user._id;
await newListing.save();
req.flash('success', 'New Listing Created')
res.redirect("/listings");

}));

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const Listing =await listing.findById(id);
    if(!Listing)
        {
            req.flash('error', 'Listing you requested does not exist!')
            res.redirect("/listings");
        }
    res.render("listings/edit.ejs",{Listing})
}));

//update route
router.put("/:id",validateListing,isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
}));
//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success', 'Listing Deleted')
    res.redirect("/listings");
}))


module.exports=router;

