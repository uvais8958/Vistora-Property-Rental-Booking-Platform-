const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const Listing=require("../models/listing.js");
const {isLogedIn,isOwner,validationListing}=require("../isAuthenticatedMiddleware.js");
const listingControllers=require("../controllers/listings.js");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })




//Index Route
router
.route("/")
.get(wrapAsync(listingControllers.index)) 
// create route
//  .post(validationListing,
//     isLogedIn,
//     wrapAsync (listingControllers.renderCreateForm));

.post(upload.single('listing[image]'),(req,res)=>{
    res.send(req.file);
})

// New Route
router.get("/new",isLogedIn, listingControllers.renderNewForm);


// Show Route
router.route("/:id")
.get(wrapAsync(listingControllers.showListing))

// Update Route
.put(
    isLogedIn,
    isOwner,
     validationListing,
    wrapAsync ,listingControllers.updateForm )
    // Edit Route
.get(validationListing,
     isLogedIn,
     isOwner,
    wrapAsync, listingControllers.editForm)
// Delete Route
.delete(
    isLogedIn,
    isOwner,
    wrapAsync , listingControllers.deleteForm);


module.exports=router;