import mongoose from "mongoose"
const accountSchema = new mongoose.Schema({
    balance:{
        type: Number,
    trim: true,
    default:"0"
    },
    
    userId:{
        type: String,
    trim: true,
       ref: 'User'
    }


},{
    timestamps: true,
    versionKey: false,
}) 

const accountModel = mongoose.model("account", accountSchema)
export default accountModel;


