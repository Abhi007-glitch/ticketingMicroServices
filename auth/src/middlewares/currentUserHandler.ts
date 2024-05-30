// middleware which check jwt token and validate it and pass the payload data by adding it to req.curretUser property

import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'


// ********************* New Concept :
// how to add/alter the type defination of predefined
// types to add new property to existing defined Types


interface UserPayload{
  id:String;
  email:String;
}


// how to access globallyb defined type variable 
// (Note no need to Extend exsisting type we can directly add new variable )
declare global{
  namespace Express{
    interface Request{
       currentUser ?: UserPayload
    }
  }
}

export const currentUserHandler = (req:Request , res:Response, next:NextFunction)=>{
  
  if(!req.session?.jwt){
    next();
    return;
  }
  
    
  try{
    const payload = jwt.verify(req.session?.jwt,process.env.JWT_SECRET_KEY!) as UserPayload; // definging the type of returned object
    req.currentUser =payload;
}catch(error)
{
   next();
}

next();

}