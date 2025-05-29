import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createReq, getPendingRequests, getSuperAdminDashboard } from "../controllers/superAdmin.controller.js";
import upload from "../utils/multer.js";

const router=express.Router();

router.route("/getAllCourses").get(isAuthenticated,getSuperAdminDashboard);
router.route("/req/instructor").post(isAuthenticated,upload.single("resume"),createReq);
router.route("/req/getPendingRequests").get(isAuthenticated,getPendingRequests)                                                  ;

export default router;