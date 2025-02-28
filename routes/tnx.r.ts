import express from "express";
import { getTnxDataByData } from "../controllers/tnx.c";

const router = express.Router();

router.get("/:url", getTnxDataByData);

export default router;
