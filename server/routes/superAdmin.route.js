import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getSuperAdminDashboard } from "../controllers/superAdmin.controller.js";

const router=express.Router();

router.route("/getAllCourses").get(getSuperAdminDashboard);


export default router;