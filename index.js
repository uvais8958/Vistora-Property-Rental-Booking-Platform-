// Basic setup of Vistora Project

const express=require("express");
const app=express();
const port =8080;
const mongoose=require("mongoose");
const Listing=require("./models/listing");

const MOGO_URL="mongodb://127.0.0.1:27017/Vistora";


// connect to database of mongoose

main()
.then(()=>{
    console.log("connect to DB...");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MOGO_URL);
}
// route 
app.get("/",(req,res)=>{
    res.send("Hi I am root");
})

app.get("/testListing",async (req,res)=>{
    let sampleListing=new Listing({
        title:"My new House",
        descriptiion:"By the road",
        price:1300,
        location:"Mumbai",
        country:"India",
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successfull testing..")
})



// app Port of this project working
app.listen(port,()=>{
    console.log(`app is running at port ${port}`);
})