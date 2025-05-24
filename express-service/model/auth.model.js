import express from "express";
import mongoose from "mongoose";

const authModel = new mongoose.Schema({
    name :{
        type:String
    },
    email :{
        type:String
    },
    password :{
        type:String
    },
})

const authSchema = new mongoose.model('register-auth',authModel);
export default authSchema;