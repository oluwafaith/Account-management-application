import express from "express";
const router = express.Router();
import Account from "../controller/transactionController";

router.route("/").get(Account.getAllTransaction);

router.route("/:account").get(Account.getTransaction);

router.post("/deposit", Account.deposit);

router.post("/withdraw", Account.withdraw);

export default router;
