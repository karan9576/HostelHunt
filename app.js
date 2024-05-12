const express =require("express");//6
const app=express();//6
const mongoose=require("mongoose");//6
const listing=require("./models/listing.js");//13
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";//10.1
const path=require("path");
const methodOverride = require('method-override');//28
const ejsMate = require('ejs-mate');//34
const wrapAsync=require('./utils/wrapAsync.js');//56
const ExpressError=require('./utils/ExpressError.js');//59
const {listingSchema}=require("./schema.js");//63
const Review=require("./models/review.js");//69
const {reviewSchema}=require("./schema.js");
const listings=require("./routes/listing.js");



app.set("view engine","ejs");//16
app.set("views",path.join(__dirname,"views"));//16
app.use(methodOverride('_method'))//28
app.use(express.static(path.join(__dirname,"/public")));


app.use(express.urlencoded({extended : true}));

app.engine('ejs',ejsMate);//34




main()//10.3
.then(()=>{
        console.log("database connected");
    })
.catch((err)=>{
    console.log(err);
});

async function main(){//10.2
    await mongoose.connect(MONGO_URL); 
}


app.get("/",(req,res)=>{//7
    res.send("hi, i am root");
})





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

app.use("/listings",listings);



//reviews
//post route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
let Listing =await listing.findById(req.params.id);
let newReview=new Review(req.body.review);
console.log(newReview)
Listing.reviews.push(newReview);

await newReview.save();
await Listing.save();
res.redirect(`/listings/${Listing._id}`);
}));

//review
//delete review route
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull :{reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
   res.redirect(`/listings/${id}`);
})
);

// app.get("/testlisting",async(req,res)=>{
// let samplelisting =new listing ({
//     title:"my new villa",
//     description:"nice place",
//     price:1200,
//     locatrion:"kathmandu",
//     country:"nepal",
// })
// await samplelisting.save();
// console.log("listing was saved");
// res.send("successfull testing")
// });

app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"Page not found !"));
})

app.use((err ,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message}); 
});


app.listen(8081,()=>{//6
    console.log("server is listening to 8080");
})