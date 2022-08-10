import express from "express";
import { createAccount, getAllUsers } from "./../controller/userController";
const router = express.Router();

/* GET users listing. */
router.route("/").get(getAllUsers);

router.post("/signup", createAccount);

export default router;
