require('dotenv').config({ path: '../.env' });
const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");
const MONGO_URL=process.env.ATLASDB_URL;


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
    initData.data=initData.data.map((obj)=>({...obj,owner:'664c3fbb244b088626e16902'}))
    await listing.insertMany(initData.data);
    console.log("data was initialised");
}
initDB();