const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const Listing=require("../models/listing.js");
const {isLogedIn,isOwner,validationListing}=require("../isAuthenticatedMiddleware.js");
const listingControllers=require("../controllers/listings.js");






//Index Route
router.get("/",wrapAsync(listingControllers.index)); 

// New Route
router.get("/new",isLogedIn, listingControllers.renderNewForm);


// Show Route
router.get("/:id",wrapAsync(listingControllers.showListing));


// create route
router.post("/",
    validationListing,
    isLogedIn,
    wrapAsync,listingControllers.renderCreateForm);


// Update Route
router.put("/:id",
    isLogedIn,
    isOwner,
     validationListing,
    wrapAsync ,listingControllers.updateForm );



    // Edit Route
router.get("/:id/edit",validationListing,
     isLogedIn,
     isOwner,
    wrapAsync, listingControllers.editForm);

// Delete Route
router.delete("/:id",
    isLogedIn,
    isOwner,
    wrapAsync , listingControllers.deleteForm);


module.exports=router;