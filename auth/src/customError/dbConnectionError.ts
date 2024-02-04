import {ValidationError} from 'express-validator';

// creating a custom validation error by deriving from Built in error class
export class DataBaseConnectionError extends Error {
   public reason="Erro connecting to database";  // defining varaible with access specifier

   constructor()
   {
      super();  // calling parent class constructor 

      // adding this only because we are extending a built in class ( it's a performance optimzation based on JS engine archit.)
      Object.setPrototypeOf(this,DataBaseConnectionError.prototype);
   }
}