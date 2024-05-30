import { CustomError } from "./CustomErrorAbstrac";


export class UnAuthorizedError extends CustomError{
  statusCode = 401;

  constructor()
  {
    super("Not authorized");
    Object.setPrototypeOf(this,UnAuthorizedError.prototype);
  }
  serializeErrors(): { message: string; }[] {
   return [{message:"Not authorized"}];
  }
}