require("dotenv").config();
const mongoose=require("mongoose")
const adminSchema=new mongoose.Schema({
    adminId:{
        type:String,
    },
    adminPassword:{
        type:String
    }
})
mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser:true,
     useCreateIndex:true,
     useUnifiedTopology:true,
     userFindAndModify:false
 })
.then(c => { console.log("Admin database  is connected") })
.catch(c => { console.log("Admin database is not connected") })
module.exports=mongoose.model("AdminInfo",adminSchema)