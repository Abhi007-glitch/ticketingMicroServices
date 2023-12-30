import express from "express";
import {json} from "body-parser";

const app = express();


app.get("/api/users/currentuser",(req,res)=>{
  res.send("hi there!!");
})
app.use(json());
app.listen(3000,()=>{
  console.log("Auth service up and running at port number 3000")
})