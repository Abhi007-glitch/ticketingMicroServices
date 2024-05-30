import { Request,Response,NextFunction } from "express";
import { UnAuthorizedError } from "../customError/unAuthorizedError";


export const authVerification = (req:Request,res:Response,next:NextFunction)=>{
  if (!req.currentUser)
    {
      throw new UnAuthorizedError();
    }

    next();
};