import express from "express";

const router = express.Router();

router.post("/api/users/signin",()=>{"hi from signin!!"});

export {router as signinRouter};