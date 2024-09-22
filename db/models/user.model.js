import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        minLength: 3,
        maxLength: 15,
        trim: true,
        lowercase: true,
        unique: true // Ensure username is unique
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
