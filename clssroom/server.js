const express=require("express");
const app=express();
const port =8080;

const User=require("./routes/user");
const posts=require("./routes/posts");
const cookieParser = require("cookie-parser");

app.use(cookieParser());



app.get("/",(req,res)=>{
  console.dir(req.cookies);
  res.send("i am root");
})
//for cookies
app.get("/setCookies",(req,res)=>{
    res.cookie("greete","salam");
    res.cookie("origin","India");
    res.cookie("name","Uvais");
    res.send("we sent you cookies");
})


app.get("/greet",(req,res)=>{
  let {name}=req.cookies;
  res.send(`Hi,${name}`);
})
app.use("/users",User);
app.use("/posts",posts);


app.listen(port,()=>{
  console.log(`app is run on the port ${port}`);
})