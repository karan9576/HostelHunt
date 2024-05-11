const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    comment :String,
    rating : {
        type : number,
        min : 1,
        max : 5,
    },
    createdAt : {
        type : date,
        default : date.now()
    }
});
 module.exports=mongoose.model("review",reviewSchema);