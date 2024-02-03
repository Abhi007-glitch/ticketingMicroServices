import express from "express";

const router = express.Router();

router.post("/api/users/signout",()=>{console.log("signout Router")});

export {router as signoutRouter};