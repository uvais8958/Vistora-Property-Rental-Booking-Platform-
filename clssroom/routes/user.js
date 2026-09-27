const exxpress=require("express");
const router=exxpress.Router();


router.get("/",(req,res)=>{
    res.send("hi am root");
})

router.get("/",(req,res)=>{
    res.send("Get for users");
})

router.get("/:id",(req,res)=>{
      res.send("Get for show id")
});

router.post("/",(req,res)=>{
    res.send("POST for users");
})


router.delete("/:id",(req,res)=>{
    res.send("Delete for user id");
})

module.exports=router;