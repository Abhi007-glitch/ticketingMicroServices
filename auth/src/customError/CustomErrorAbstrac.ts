 export abstract class CustomError extends Error{
   abstract statusCode :number;
   constructor(message:string)
   {
    super(message);// if any message we want to use for loggging
    Object.setPrototypeOf(this,CustomError.prototype);
  }
  

  abstract serializeErrors():{message:string}[];

 }


 