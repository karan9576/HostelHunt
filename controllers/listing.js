const listing=require("../models/listing.js");//13


module.exports.index=(async (req,res)=>{
    const allListings=await listing.find({});
    res.render("listings/index.ejs",{allListings});
})

 module.exports.renderNewForm=((req,res)=>{
    res.render("listings/new.ejs");
})

module.exports.showListing=(async (req,res)=>{
    let {id}=req.params;
    const Listing =await listing.findById(id).populate({path:"reviews" , populate:{path:"author",},}).populate("owner");
    if(!Listing)
        {
            req.flash('error', 'Listing you requested does not exist!')
            res.redirect("/listings");
        }
    res.render("listings/show.ejs",{Listing});
   
})

module.exports.createListing=(async(req,res)=>{

    const newListing=new listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash('success', 'New Listing Created')
    res.redirect("/listings");
    
    })

   
module.exports.renderEditForm=(async (req,res)=>{
    let {id}=req.params;
    const Listing =await listing.findById(id);
    if(!Listing)
        {
            req.flash('error', 'Listing you requested does not exist!')
            res.redirect("/listings");
        }
    res.render("listings/edit.ejs",{Listing})
})


module.exports.updateListing=(async (req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
})


module.exports.destroyListing=(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success', 'Listing Deleted')
    res.redirect("/listings");
})