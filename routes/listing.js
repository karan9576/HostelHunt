const express =require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');//56
const {listingSchema}=require("../schema.js");//63
const {reviewSchema}=require("../schema.js");
const ExpressError=require('../utils/ExpressError.js');//59
const listing=require("../models/listing.js");//13


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};



router.get("/",wrapAsync(async (req,res)=>{//16.index route
    const allListings=await listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
   
});

//show route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const Listing =await listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{Listing});
   
}));

//create route
router.post("/",validateListing,wrapAsync(async(req,res)=>{
const newListing=new listing(req.body.listing);
await newListing.save();
res.redirect("/listings");

}));

router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const Listing =await listing.findById(id);
    res.render("listings/edit.ejs",{Listing})
}));

//update route
router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
}));
//delete route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}))


module.exports=router;

