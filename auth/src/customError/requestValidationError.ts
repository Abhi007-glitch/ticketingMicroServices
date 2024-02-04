import {ValidationError} from 'express-validator';

// creating a custom validation error by deriving from Built in error class
export class RequestValidationError extends Error {
   public errors:ValidationError[];  // defining varaible with access specifier

   constructor(errors:ValidationError[])
   {
      super();  // calling parent class constructor 
      this.errors =errors;

      // adding this only because we are extending a built in class ( it's a performance optimzation based on JS engine archit.)
      Object.setPrototypeOf(this,RequestValidationError.prototype);
   }
}