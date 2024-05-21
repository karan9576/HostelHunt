const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";


main()
.then(()=>{
        console.log("database connected");
    })
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL); 
}

const initDB=async()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'664b6b16c5b79b9474b7ff1e'}))
    await listing.insertMany(initData.data);
    console.log("data was initialised");
}
initDB();