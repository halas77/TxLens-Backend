import express from "express";
import { getTnxDataByData } from "../controllers/tnx.c";

const router = express.Router();

router.get("/:id", getTnxDataByData);

export default router;
