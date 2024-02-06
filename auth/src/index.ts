import express from "express";
import 'express-async-errors'; // to handle async error thrown (as express by default only catches error thrown by a sync method ), just need to import this
import {json} from "body-parser";
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


app.listen(3000,()=>{
  console.log("Auth service up and running at port number 3000")
})