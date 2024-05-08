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


app.get("/listings",wrapAsync(async (req,res)=>{//16.index route
    const allListings=await listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
   
});

app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const Listing =await listing.findById(id);
    res.render("listings/show.ejs",{Listing});
   
}));

//create route
app.post("/listings",wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }
const newListing=new listing(req.body.listing);
await newListing.save();
res.redirect("/listings");

}));

app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const Listing =await listing.findById(id);
    res.render("listings/edit.ejs",{Listing})
}));

//update route
app.put("/listings/:id",wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
}));

app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}))


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