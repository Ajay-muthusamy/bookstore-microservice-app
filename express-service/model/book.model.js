import express from "express"
import mongoose from "mongoose";

const bookModel = new mongoose.Schema({
    bookTitle :{
        type:String
    },
    image :{
        type:String
    },
    fixedPrice :{
        type:String
    },
    actualPrice :{
        type:String
    },
    rating :{
        type : String
    },
    isSale :{
        type : Boolean,
        default: true 
    },
    isTrending :{
        type : Boolean,
        default: false 
    },
    description:{
        type: String
    }

})

const bookSchema = new mongoose.model('book',bookModel);
export default bookSchema;