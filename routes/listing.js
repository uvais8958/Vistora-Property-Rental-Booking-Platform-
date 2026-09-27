const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
const {listingSchema}=require("../schemaJoi.js");
const Listing=require("../models/listing.js");




// Validation listing

const validationListing=(req,res,next)=>{
    
let  {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }

}

//Index Route
router.get("/",validationListing, async (req,res)=>{
    const allListings= await Listing.find({});
        res.render("listings/index.ejs",{allListings});
})

// New Route
router.get("/new",(req,res)=>{
    res.render("listings/new");
})


// Show Route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    if(!listing){
       req.flash("error","Listing you requested does not exist!");
       res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}))


// create route
router.post("/",
    validationListing,
    wrapAsync(async (req,res,err)=>{
  const newListing = new Listing(req.body.listing);
     await newListing.save();
     req.flash("success","New Listing Created!");
     res.redirect("/listings");   
}
)
)


// Update Route
router.put("/:id",
    validationListing,
    wrapAsync (async(req,res)=>{
    //  if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing")
    // }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing  Updated");
    
    res.redirect(`/listings/${id}`);
}))


// Delete Route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted !");
    res.redirect("/listings");
}));



// Edit Route
router.get("/:id/edit",validationListing,
    wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    req.flash("success","New Listing Edited!");
    res.render("listings/edit.ejs",{listing});
}))

module.exports=router;