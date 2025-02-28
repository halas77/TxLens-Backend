import express from "express";
import { getTnxData } from "../controllers/tnx.c";

const router = express.Router();

router.get("/", getTnxData);

export default router;
