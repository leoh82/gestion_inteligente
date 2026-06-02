import { Router } from "express";
import { getAllAssets, createNewAsset } from "../controllers/assets.controller.js";

const router = Router();
router.get("/",getAllAssets);
router.post("/", createNewAsset);


export default router;