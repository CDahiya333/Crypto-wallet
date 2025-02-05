import express from "express";
import {allToken, addToken} from "../Controllers/authController.js";

const tokenRouter = express.Router();

tokenRouter.get("/alltoken", allToken);
tokenRouter.post("/createtoken", addToken);

export default tokenRouter;
