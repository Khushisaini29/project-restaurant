import mongoose from "mongoose";

const foodSchema=new mongoose.Schema({
    price:{
        type:Number,
        required:true,
        default:0
    },
    name:{
        type:String,
        required:true,
        minLength:4,
        maxLength:100
    },
    category:{
        type:String,
        default:"all",
        enum:{
            values:["all","breakfast","lunch","dinner","snacks","dessert","drinks"],
            message:"{VALUE} is not available"
        }
    },
    description:{
        type:String,
        maxLength:500,
        required:true
    },  //image ko store krane k lie hume ek (cloud storge chaiye) i.e Cloudinary
    image:{
        type:[String]
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
})
const Food= mongoose.model("Food",foodSchema)

export default Food