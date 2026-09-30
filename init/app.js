const mongoose=require("mongoose");
const initData=require("./data");
const Listing=require("../models/listing");

  // mongoose url of
const MONGO_URL="mongodb://127.0.0.1:27017/Vistora";

main()
.then(()=>{
    console.log("connect to DB..");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}
const initDB=async ()=>{
   await Listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({...obj,owner: "6aba06694c4543ebfd826e00"}));
 await Listing.insertMany(initData.data);
 console.log("data was initialized..");    
}
initDB();