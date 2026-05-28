import { Router } from "express";
import { getAllAssets } from "../controllers/assets.controller.js";

const router = Router();
router.get("/",getAllAssets);

export default router;