const mongoose=require("mongoose");//12
const Schema=mongoose.Schema;//12
const Review=require("./review.js")
const listingSchema=new Schema({//12
    title :{type:String,
    required:true,
},
description:String,
image:{
    type:String,
    set:(v) =>v===""?"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60":v,
    default :"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
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


