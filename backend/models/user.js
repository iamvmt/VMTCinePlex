import mongoose from "mongoose";
import User from "./user.js";

const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String, required: true}
});

const user = mongoose.model('User', userSchema);


export default user;