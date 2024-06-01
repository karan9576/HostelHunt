if(process.env.NODE_ENV !="production"){
require('dotenv').config()
}


const express =require("express");//6
const app=express();//6
const mongoose=require("mongoose");//6


const dbUrl=process.env.ATLASDB_URL;

const path=require("path");
const methodOverride = require('method-override');//28
const ejsMate = require('ejs-mate');//34
const ExpressError=require('./utils/ExpressError.js');//59
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");//81
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');//84
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require("./models/user.js");

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
    await mongoose.connect(dbUrl); 
}


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto :{
        secret:process.env.SECRET
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
    console.log("Error is mono session store",err);
})

const sessionOptions={
    store,
    secret: process.env.SECRET,
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
app.use(passport.initialize());//97
app.use(passport.session());//97


passport.use(new LocalStrategy(User.authenticate()));//97


passport.serializeUser(User.serializeUser());//97
passport.deserializeUser(User.deserializeUser());//97


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


app.use("/listings",listingRouter);//78
app.use("/listings/:id/reviews",reviewRouter)//78
app.use("/",userRouter);


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