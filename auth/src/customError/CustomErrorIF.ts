
interface CustomError{
  statusCode: number,
  serializeError():{ // defining return type's structure of method 
    message:string;
   // field?:string; // optional property
  }[]
}

export default CustomError