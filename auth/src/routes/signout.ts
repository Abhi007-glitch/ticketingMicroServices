import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signout",(req:Request,res:Response)=>{
  req.session = null; // asking browser to clear the cookie on the frontEnd
  res.send({});

});

export {router as signoutRouter};