import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    connect:{
        type:Array,
        default:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    userDetails:{
        type:Array,
        default:[]
    },
},{timestamps:true});
export const Tweet = mongoose.model("Tweet", postSchema);