const mongoose=require("mongoose");//12
const Schema=mongoose.Schema;//12
const Review=require("./review.js");
const { urlencoded } = require("express");
const listingSchema=new Schema({//12
    title :{type:String,
    required:true,
},
description:String,
image:{
   url:String,
   filename:String,
},
price:Number,
location:String,
country:String,

reviews : [
    {
        type : Schema.Types.ObjectId,
        ref : 'Review'
    }
],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
geometry : {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing)
        {
            await Review.deleteMany({_id :{$in : listing.reviews}});
            console.log("successfully delete reviews")
        }
})





const listing=mongoose.model("listing",listingSchema)//12
module.exports=listing;//12


