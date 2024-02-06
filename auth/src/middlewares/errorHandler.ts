import{Request,Response,NextFunction} from 'express'
import { RequestParamHandler } from 'express';
import { DataBaseConnectionError } from '../customError/dbConnectionError';
import { RequestValidationError } from '../customError/requestValidationError';

// defining custom cetrailized error handling middleware - for capturing  all errors in the application and returing back a consistet reposne

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction )=>{
     
     if (err instanceof RequestValidationError) // Using RTTI 
     {
        console.log('handling  validation error');
        
        res.status(err.statusCode).send(err.serializeError());
     }

     else if (err instanceof  DataBaseConnectionError)
     {
          console.log("handling database error");

          res.status(err.statusCode).send(err.serializeError()); // for having a consistent error formate
     }
     else 
     {
     res.status(400).send({
      error:[{message:err.message}]  // for having a consistent error formate
     });
     }
      
    
}