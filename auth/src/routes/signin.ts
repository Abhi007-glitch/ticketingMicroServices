import express, {Request, Response} from "express";
import {body} from "express-validator"
import { User } from "../models/user";
import { BadRequestError } from "../customError/badRequestError";
import { Password } from "../utility/hashing";
import jwt from "jsonwebtoken"
import { validation } from "../middlewares/validationHandler";
const router = express.Router();

router.post("/api/users/signin",[ body('email').isEmail().withMessage("Email must be valid"),body("password").trim().notEmpty().withMessage("Password required to be entered")],validation ,async(req: Request,res: Response)=>{
  
   const {email,password}= req.body;

   const fetchedUser = await User.findOne({email})

   if (!fetchedUser)
    {
      throw new BadRequestError("No such user");
    }

   const isPasswordMatch = await Password.compare(fetchedUser.password,password)
   if (!isPasswordMatch)
    {
      throw new BadRequestError("Wrong Password");
    }
    
    const token =jwt.sign({"id":fetchedUser._id,"email":fetchedUser.email},process.env.JWT_SECRET_KEY!)
    
    req.session = {jwt : token}
    res.status(200).send({result : "logged in successfully"});
   
});

export {router as signinRouter};