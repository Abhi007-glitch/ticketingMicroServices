import express from "express";
import {json} from "body-parser";
import { currentuserRouter } from "./routes/curent_user";
import { signinRouter } from "./routes/signin";
import  { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
const app = express();

app.use(json());
app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.listen(3000,()=>{
  console.log("Auth service up and running at port number 3000")
})