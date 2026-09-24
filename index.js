// Basic setup of Vistora Project

const express=require("express");
const app=express();
const port =8080;
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");//for boilerplate code
const ExpressError=require("./utils/ExpressError");


const listings =require("./routes/listing.js");
const reviews=require("./routes/review.js");



// mongoose url of
const MONGO_URL="mongodb://127.0.0.1:27017/Vistora";


// connect to database of mongoose

main()
.then(()=>{
    console.log("connect to DB...");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
};



app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
// data in request parse

// for put operation
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));

// route 
app.get("/",(req,res)=>{
    res.send("Hi I am root");
});




app.use("/listings",listings);

app.use("/listings/:id/reviews",reviews);
// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new House",
//         descriptiion:"By the road",
//         price:1300,
//         location:"Mumbai",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfull testing..")
// });



// app Port of this project working
// 


app.all("/{*splat}", (req,res,next)=>{
    next(new ExpressError(404,"Page is not found..!"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
   res.status(statusCode).render("error.ejs",{err});
})

app.listen(port,()=>{
    console.log(`app is running at port ${port}`);
});