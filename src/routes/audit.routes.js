import { Router } from "express";
const router = Router();

router.get("/", getAllAuditLogs);

export default router;