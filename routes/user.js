const express = require('express');
const router = express.Router();
const user =require('../models/user.js');
const passport=require('passport');
const {saveRedirectUrl}=require('../middleware.js')

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});



router.post("/signup",async(req,res)=>{
try{
    let {username,password,email}=req.body;
    const newUser=new user({email,username});
    const registeredUser=await user.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to wander Lust");
      res.redirect("/listings");
    })
}
catch(e){
    req.flash("error",e.message);
    res.redirect("/signup")
}    
})

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login' , failureFlash:true }),async(req,res)=>{
    req.flash("success","Welcome back to wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
})

module.exports=router;