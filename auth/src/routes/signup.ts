import express, {Request,Response} from "express";
import {body} from "express-validator"
import { User } from "../models/user";
import { BadRequestError } from "../customError/badRequestError";
import jwt from "jsonwebtoken";
import { validation } from "../middlewares/validationHandler";

const router = express.Router();

router.post("/api/users/signup",[body('email').isEmail().withMessage("Email must be valid"), body('password').trim().isLength({min:4,max:20}).withMessage("passwrod length must be between 4 and 20 char")],validation,async(req:Request,res:Response)=>{
 


  const {email,password}=req.body;

  const fetchedUser = await User.findOne({email})

  if (fetchedUser)
    {
      throw new BadRequestError("Email already in use")
    }
   
  const user = User.build({email,password})
  await user.save();
  
  const jstToken = jwt.sign({email,password},process.env.JWT_SECRET_KEY!); // ! after the variable name removes the null or undefined values from expression possible value
                                                                           // if ! not added then typescript will throw error as there is possibility of env variable being not defined ( but we had make a intital check at index.js<starting point of the app> and thrown error over there if not found)

  //Note : all the data inside the token can be easily/ freely visible to everyone.
  req.session = {jwt : jstToken}; // this is sent as a base64 encoded formate to the user
  
  res.status(201).send(user);

});


export {router as signupRouter};