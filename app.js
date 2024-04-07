const express =require("express");//6
const app=express();//6
const mongoose=require("mongoose");//6


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";//9.1

main()//9.3
.then(()=>{
        console.log("database connected");
    })
.catch((err)=>{
    console.log(err);
});

async function main(){//9.2
    await mongoose.connect(MONGO_URL); 
}


app.get("/",(req,res)=>{//7
    res.send("hi, i am root");
})



app.listen(8080,()=>{//6
    console.log("server is listening to 8080");
})