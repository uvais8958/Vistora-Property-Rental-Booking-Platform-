const Listing=require("./models/listing");
const ExpressError=require("./utils/ExpressError");
const {listingSchema,reviewSchema}=require("./schemaJoi.js");
const Review = require("./models/reviews.js");




module.exports.isLogedIn=(req,res,next)=>{
     
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be  logged in to create Listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
 let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","You are not the owner of this listing");
     return res.redirect(`/listings/${id}`)
    }
      next();
};
module.exports.isReviewAuther=async(req,res,next)=>{
    let {id,reviewId}=req.params;
 let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","You are not the author of this review");
     return res.redirect(`/listings/${id}`)
    }
      next();
};


// Validation listing

module.exports.validationListing=(req,res,next)=>{
    
let  {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    next();

}


// Validation Review

module.exports. validationReview = (req, res, next) => {

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