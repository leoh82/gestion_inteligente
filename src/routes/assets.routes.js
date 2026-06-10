import { Router } from "express";
import { getAllAssets, createNewAsset, removeAssets, updateAsset} from "../controllers/assets.controller.js";
import { estadoPermitido, ubicacionAssets, validateCodigoPatrimonial, validateNameAssets } from "../middlewares/validateAssets.js";
import { authenticate } from "../middlewares/auth.middleware.js";   

const router = Router();
router.get("/",authenticate,getAllAssets);
router.post("/",authenticate,validateNameAssets,validateCodigoPatrimonial, estadoPermitido, ubicacionAssets, createNewAsset);
router.delete("/:id",authenticate, removeAssets);
router.put("/:id",authenticate, updateAsset);

export default router;