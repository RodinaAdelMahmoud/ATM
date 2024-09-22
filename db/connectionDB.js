import mongoose from "mongoose";

  const connectionDB = async()=>{
return await mongoose.connect("mongodb://localhost:27017/ATM")
.then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log("database connection error",err);
})
 }

export default connectionDB;