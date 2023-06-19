import mongoose from "mongoose";
import {config} from "./config/config"

async function db(){
const dbUrl = config.mongo.url
try{
    await mongoose
    .connect(dbUrl)
    .then(()=>{
        console.log("connected to database sucesfully")
    })
}catch(e){console.log(e)}

}

export default db