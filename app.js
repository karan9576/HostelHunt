const express =require("express");//6
const app=express();//6
const mongoose=require("mongoose");//6
const listing=require("./models/listing.js");//13

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";//10.1

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

app.get("/testlisting",async(req,res)=>{
let samplelisting =new listing ({
    title:"my new villa",
    description:"nice place",
    price:1200,
    locatrion:"kathmandu",
    country:"nepal",
})
await samplelisting.save();
console.log("listing was saved");
res.send("successfull testing")
});


app.listen(8080,()=>{//6
    console.log("server is listening to 8080");
})