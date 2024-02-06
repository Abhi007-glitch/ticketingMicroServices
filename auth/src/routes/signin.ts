import express from "express";

const router = express.Router();

router.post("/api/users/signin", async()=>{"hi from signin!!"});

export {router as signinRouter};