const express =require("express");//6
const app=express();//6
const mongoose=require("mongoose");//6
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";//10.1
const path=require("path");
const methodOverride = require('method-override');//28
const ejsMate = require('ejs-mate');//34
const ExpressError=require('./utils/ExpressError.js');//59
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");


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



app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews)



app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"Page not found !"));
})

app.use((err ,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message}); 
});


app.listen(8081,()=>{//6
    console.log("server is listening to 8081");
})