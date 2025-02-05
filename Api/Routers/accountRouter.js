import express from "express";
import { allAccount, createAccount} from "../Controllers/authController.js";

const accountRouter = express.Router();

accountRouter.get("/allaccount", allAccount);
accountRouter.post("/createaccount", createAccount);

export default accountRouter;
