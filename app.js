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
const session=require("express-session");//81
const flash = require('connect-flash');//84


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

const sessionOptions={
    secret: 'mysupersecretcode',
    resave: false,
    saveUninitialized: true,
    cookie :{
        expires : Date.now()+7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    }
    
  };
app.use(session(sessionOptions));
app.use(flash());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

app.get("/",(req,res)=>{//7
    res.send("hi, i am root");
})



app.use("/listings",listings);//78
app.use("/listings/:id/reviews",reviews)//78



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