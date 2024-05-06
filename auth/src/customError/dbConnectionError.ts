import {ValidationError} from 'express-validator';

import { CustomError } from './CustomErrorAbstrac';

// creating a custom validation error by deriving from Built in error class
export class DataBaseConnectionError extends CustomError {
   public reason="Error connecting to database";  // defining varaible with access specifier
   statusCode = 500; 
   constructor()
   {
      super("Error Connceting to db ");  // calling parent class constructor 

      // adding this to inherit all the the property in the prototype of DatabaseConnection-> did this as we DatabaseConnection extends CustomError which inherit inbuilt class
      Object.setPrototypeOf(this,DataBaseConnectionError.prototype); // ( (this->object whose prototype to be updated, DataBaseConnectionError.prototype-> Prototype to be applied))
   }

   serializeErrors(){    // adding for separation of concern of formatting error within the error
      return [{message:this.reason}];
   }
   
   
}