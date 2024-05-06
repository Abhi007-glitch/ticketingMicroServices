import { CustomError } from "./CustomErrorAbstrac";

export class NotFoundError extends CustomError
{
  statusCode=404;

  constructor()
  {
    super("Route not found !!");
   
    Object.setPrototypeOf(this,NotFoundError.prototype);

  }
  
  serializeErrors(): { message: string; }[] {
    return [{message:"Page Not Found"}];
  }
  
}