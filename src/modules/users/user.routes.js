import express from "express";
import * as UC from './user.controller.js';

const router = express.Router();

router.post("/signUp", UC.signUp);
router.post("/signIn", UC.signIn);


export default router;
