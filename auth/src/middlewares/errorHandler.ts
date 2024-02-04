import{Request,Response,NextFunction} from 'express'

// defining custom cetrailized error handling middleware - for capturing  all errors in the application and returing back a consistet reposne

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction )=>{
     console.log("something went wrong ",err);

     res.status(400).send({
      messae:err.message
     });
}