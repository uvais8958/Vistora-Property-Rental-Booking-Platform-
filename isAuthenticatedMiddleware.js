module.exports.isLogedIn=(req,res,next)=>{
     
    if(!req.isAuthenticated()){
        req.flash("error","you must be  logged in to create Listing");
        return res.redirect("/login");
    }
    next();
}