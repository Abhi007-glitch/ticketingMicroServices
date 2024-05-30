import express, { Request, Response } from "express";

import { currentUserHandler } from "../middlewares/currentUserHandler";
import { authVerification } from "../middlewares/authVerification";
const router = express.Router();

router.get("/api/users/currentuser", currentUserHandler,(req:Request,res:Response)=>{

   res.send({currentUser:req.currentUser || null });  // if we don;t put null here it can send undefined 

});

export {router as currentuserRouter};