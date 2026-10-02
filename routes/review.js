const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const {validationReview, isLogedIn,isReviewAuther}=require("../isAuthenticatedMiddleware.js");
const reviewController=require("../controllers/review.js");



//Reviews
//POST Routes
router.post("/",
    isLogedIn,
    validationReview, 
    wrapAsync  (reviewController.createReview ));


// Reviews Post delete
router.delete("/:reviewId",
    isLogedIn,
    isReviewAuther,
    wrapAsync ( reviewController.deleteReview));

module.exports=router;