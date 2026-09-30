const express=require("express");
const router=express.Router();
const User =require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../isAuthenticatedMiddleware.js");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
try{
        let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);

    //login after signup
    req.login(registeredUser,(error)=>{
        if(error){
            next(error);
        }
        req.flash("success","Welcome to Vistora");
        res.redirect("/listings");
    })
       }catch(e){
       req.flash("error",e.message);
       res.redirect("/signup");

}
}))

router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
})

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),
    async(req,res)=>{
        console.log(req.user);
        req.flash("success","Welcome back to the Vistora!")
      let redirectUrl=res.locals.redirectUrl || "/listings";
      res.redirect(redirectUrl);
    }
);
router.get("/logout",(req,res,next)=>{
    req.logout((error)=>{
        if(error){
            return next(error);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
});

module.exports=router;