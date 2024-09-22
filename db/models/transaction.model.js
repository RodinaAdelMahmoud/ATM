import mongoose from "mongoose"
const transactionSchema = new mongoose.Schema({
    balance:{
        type: Number,
    trim: true
    },
    
    operationType:{
        type: String,
    enum:["deposit", "withdraw"]
    },

    userId:{
        type: String,
    trim: true,
       ref: 'user'
    }
,
date:{
    type: Date
}

},{
    timestamps: true,
    versionKey: false,
}) 

const transactionModel = mongoose.model("transaction", transactionSchema)
export default transactionModel;


