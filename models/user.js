const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const passportLocalMangoose=
require("passport-local-mongoose");

const userSchema=new Schema ({
    email:{
        type:String,
        required:true,
    },

});

//userName salting and password automatically required
userSchema.plugin(passportLocalMangoose);

module.exports=mongoose.model("User",userSchema);