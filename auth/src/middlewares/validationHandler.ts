import {Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../customError/requestValidationError";



export const validation = ( req:Request, res:Response, next: NextFunction)=>{
  const errors = validationResult(req); // applying defined validation over the req object

  if(!errors.isEmpty()) // checking if errors array is empty 
  {
    //res.status(400).send(errors.array()); // sending all eror messages
    // throw new Error("Invalid Email or password");   /// will be automaticllay caught by the errorHandling middleware
    
    // throwing custom error 
    throw new RequestValidationError(errors.array()); // called based on constructor defined in the class 
    
  }
  next();
}