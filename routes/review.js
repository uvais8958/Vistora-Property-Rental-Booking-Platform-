const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");
const {validationReview, isLogedIn,isReviewAuther}=require("../isAuthenticatedMiddleware.js");



//Reviews
//POST Routes
router.post("/",
    isLogedIn,
    validationReview, 
    wrapAsync
     (async(req,res)=>{
       let listing=await Listing.findById(req.params.id);
          let newReview=new Review(req.body.review);
          newReview.author=req.user._id; 
          listing.reviews.push(newReview);
          await newReview.save();
          await listing.save();
          req.flash("success","New Review Created!");
         console.log("new reviews saved..");
        //  res.send("new review saved....");

        res.redirect(`/listings/${listing._id}`);
}));


// Reviews Post delete
router.delete("/:reviewId",
    isLogedIn,
    isReviewAuther,
    wrapAsync(async(req,res)=>{
        let {id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        req.flash("success","Review  Deleted");
        res.redirect(`/listings/${id}`);
    })
);

module.exports=router;