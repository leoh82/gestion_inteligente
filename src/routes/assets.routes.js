import { Router } from "express";
import { getAllAssets, createNewAsset, removeAssets, updateAsset} from "../controllers/assets.controller.js";
import { estadoPermitido, ubicacionAssets, validateCodigoPatrimonial, validateNameAssets } from "../middlewares/validateAssets.js";

import {authorize } from "../middlewares/role.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/",authenticate, authorize("administrador","operador","auditor"),getAllAssets);
router.post("/", authenticate, authorize("administrador","operador"),validateNameAssets,validateCodigoPatrimonial, estadoPermitido, ubicacionAssets, createNewAsset);
router.delete("/:id",authenticate, authorize("administrador"), removeAssets);
router.put("/:id",authenticate, authorize("administrador","operador"), updateAsset);

export default router;