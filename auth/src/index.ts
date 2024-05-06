import express from "express";
import 'express-async-errors'; // to handle async error thrown (as express by default only catches error thrown by a sync method ), just need to import this
import {json} from "body-parser";
import mongoose from "mongoose";
import { currentuserRouter } from "./routes/curent_user";
import { signinRouter } from "./routes/signin";
import  { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./customError/notFoundError";
const app = express();


app.use(json());
app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',async()=>{
   throw new NotFoundError();
})


app.use(errorHandler); 


const startUp = async()=>{
  
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log("Connected to database successfully.")
  } catch (error) {
    console.error(error)
  }

  // if sucessfully database connection built
  app.listen(3000,()=>{
    console.log("service up and running at port number 3000")
  })
}

startUp()

