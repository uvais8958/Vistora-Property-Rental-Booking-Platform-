const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError");
const {reviewSchema}=require("../schemaJoi.js");
const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");




// Validation Review

const validationReview = (req, res, next) => {

    let { error } = reviewSchema.validate(req.body);

    console.log(error);

    if (error) {
        let errMsg = error.details
            .map((el) => el.message)
            .join(",");

        throw new ExpressError(400, errMsg);
    }

    next();
};





//Reviews
//POST Routes
router.post("/",validationReview,wrapAsync
     (async(req,res)=>{
       let listing=await Listing.findById(req.params.id);
       console.log("Review",req.body.review);
          let newReview=new Review(req.body.review);
         
          listing.reviews.push(newReview);
          await newReview.save();
          await listing.save();
         console.log("new reviews saved..");
        //  res.send("new review saved....");

        res.redirect(`/listings/${listing._id}`);
}));


// Reviews Post delete
router.delete("/:reviewId",
    wrapAsync(async(req,res)=>{
        let {id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/listings/${id}`);
    })
);

module.exports=router;