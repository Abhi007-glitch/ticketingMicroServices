import express from "express";

const router = express.Router();

router.get("/api/users/currentuser",()=>{console.log("hi there!!")});

export {router as currentuserRouter};