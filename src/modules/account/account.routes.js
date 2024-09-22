import express from "express";
import * as AC from './account.controller.js';
import { auth } from './../../middleware/auth.js';


const router = express.Router();

router.post("/:id", AC.createAccount);
router.post("/deposit/:id", AC.deposit);
router.post("/withdraw/:id", AC.withdraw);
router.get("/balance/:id", AC.balance);
router.get("/history/:id", AC.History);

export default router;
