import {ValidationError} from 'express-validator';

import { CustomError } from './CustomErrorAbstrac';

// creating a custom validation error by deriving from Built in error class
export class RequestValidationError extends CustomError {
   public errors:ValidationError[];  // defining varaible with access specifier
   statusCode=400;
   constructor(errors:ValidationError[])
   {
      super("invalid parameter passed");  // just for logggin purpose for developer
      // calling parent class constructor 
      this.errors =errors;

      // adding this only because we are extending a built in class ( it's a performance optimzation based on JS engine archit.)
      Object.setPrototypeOf(this,RequestValidationError.prototype);
   }
    
   serializeErrors()
   {
   return this.errors.map((e)=>{
        
              return {message:e.msg};
       
       });

       
   }

}