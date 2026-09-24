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
    res.render("listings/show.ejs",{listing});
}))


// create route
router.post("/",
    validationListing,
    wrapAsync(async (req,res,err)=>{
  const newListing = new Listing(req.body.listing);
     await newListing.save();
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
    res.redirect(`/listings/${id}`);
}))


// Delete Route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));



// Edit Route
router.get("/:id/edit",validationListing,
    wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}))

module.exports=router;