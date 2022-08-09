import express from 'express';
import { getAllUsers } from './../controller/userController';
const router = express.Router();

/* GET users listing. */
router.
route('/').
get(getAllUsers);

export default router;
