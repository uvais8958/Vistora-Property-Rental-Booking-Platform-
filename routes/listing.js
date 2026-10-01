const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const Listing=require("../models/listing.js");
const {isLogedIn,isOwner,validationListing}=require("../isAuthenticatedMiddleware.js");
const { populate } = require("../models/reviews.js");






//Index Route
router.get("/",validationListing, async (req,res)=>{
    const allListings= await Listing.find({});
        res.render("listings/index.ejs",{allListings});
})

// New Route
router.get("/new",isLogedIn,(req,res)=>{
    res.render("listings/new");
})


// Show Route
router.get("/:id",
    wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:
        "reviews",populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
       req.flash("error","Listing you requested does not exist!");
       res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}))


// create route
router.post("/",
    validationListing,
    isLogedIn,
    wrapAsync(async (req,res,err)=>{
  const newListing = new Listing(req.body.listing);
  newListing.owner=req.user._id;
     await newListing.save();
     req.flash("success","New Listing Created!");
     res.redirect("/listings");   
}
)
)


// Update Route
router.put("/:id",
    isLogedIn,
    isOwner,
     validationListing,
    wrapAsync (async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing  Updated");
    
    res.redirect(`/listings/${id}`);
}))


// Delete Route
router.delete("/:id",
    isLogedIn,
    isOwner,
    wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted !");
    res.redirect("/listings");
}));



// Edit Route
router.get("/:id/edit",validationListing,
     isLogedIn,
     isOwner,
    wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    req.flash("success","New Listing Edited!");
    res.render("listings/edit.ejs",{listing});
}))

module.exports=router;