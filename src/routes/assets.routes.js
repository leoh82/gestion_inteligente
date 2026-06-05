import { Router } from "express";
import { getAllAssets, createNewAsset, removeAssets, updateAsset} from "../controllers/assets.controller.js";
import { estadoPermitido, ubicacionAssets, validateCodigoPatrimonial, validateNameAssets } from "../middlewares/validateAssets.js";

const router = Router();
router.get("/",getAllAssets);
router.post("/",validateNameAssets,validateCodigoPatrimonial, estadoPermitido, ubicacionAssets, createNewAsset);
router.delete("/:id", removeAssets);
router.put("/:id",updateAsset);

export default router;