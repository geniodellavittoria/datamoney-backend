import { Router } from "express";
import UserRouter from "./Users";
import DataRouter from "./Data";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/users", UserRouter);
router.use("/data", DataRouter);

// Export the base-router
export default router;
