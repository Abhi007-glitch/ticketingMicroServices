import express, {Request,Response} from "express";
import {body,validationResult} from "express-validator"
import { RequestValidationError} from "../customError/requestValidationError";
import { DataBaseConnectionError } from "../customError/dbConnectionError";

const router = express.Router();

router.post("/api/users/signup",[body('email').isEmail().withMessage("Email must be valid"), body('password').trim().isLength({min:4,max:20}).withMessage("passwrod length must be between 4 and 20 char")],async(req:Request,res:Response)=>{
 
const errors = validationResult(req); // applying defined validation over the req object

if(!errors.isEmpty()) // checking if errors array is empty 
{
  //res.status(400).send(errors.array()); // sending all eror messages
  // throw new Error("Invalid Email or password");   /// will be automaticllay caught by the errorHandling middleware
  
  // throwing custom error 
  throw new RequestValidationError(errors.array()); // called based on constructor defined in the class 
  
}

  const {email,password}=req.body;

  console.log("Creating user")

  throw new DataBaseConnectionError();

  res.send({});
});


export {router as signupRouter};