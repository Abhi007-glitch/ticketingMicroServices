import{Request,Response,NextFunction} from 'express'
import { RequestParamHandler } from 'express';
import { DataBaseConnectionError } from '../customError/dbConnectionError';
import { RequestValidationError } from '../customError/requestValidationError';
import { CustomError } from '../customError/CustomErrorAbstrac';

// defining custom cetrailized error handling middleware - for capturing  all errors in the application and returing back a consistet reposne

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction )=>{
     
     if (err instanceof CustomError) // Using RTTI // here we can use instance of with interfaces as in JS there is no interface(it;s just TS feature)
     {
        console.log('handling  validation error');
        
       return res.status(err.statusCode).send({"errors":err.serializeErrors()});
     }
 
     
     res.status(400).send({
      error:[{message:err.message}]  // for having a consistent error formate
     });
     
      
    
}