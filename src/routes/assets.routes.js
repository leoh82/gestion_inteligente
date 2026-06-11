import { Router } from "express";
import { getAllAssets, createNewAsset, removeAssets, updateAsset} from "../controllers/assets.controller.js";
import { estadoPermitido, ubicacionAssets, validateCodigoPatrimonial, validateNameAssets } from "../middlewares/validateAssets.js";

import { authorize } from "../middlewares/role.middleware.js";

const router = Router();
router.get("/",authorize("administrador","operador","auditor"),getAllAssets);
router.post("/",authorize("administrador","operador"),validateNameAssets,validateCodigoPatrimonial, estadoPermitido, ubicacionAssets, createNewAsset);
router.delete("/:id",authorize("administrador"), removeAssets);
router.put("/:id",authorize("administrador","operador"), updateAsset);

export default router;