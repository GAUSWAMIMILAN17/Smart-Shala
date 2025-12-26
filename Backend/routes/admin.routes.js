import express from "express";
import {
  login,
  register,
  logout,
  adminAddClassroom,
  adminAddSubject,
  registerStudent,
  registerTeacher,
  adminDashboard,
  bulkRegisterStudent,
  bulkRegisterTeacher,
} from "../controller/admin.controller.js";
import { authentication } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post(
  "/admin/classroom",
  authentication,
  authorize("ADMIN"),
  adminAddClassroom
);
router.post(
  "/admin/subject",
  authentication,
  authorize("ADMIN"),
  adminAddSubject
);

router.post(
  "/admin/registerStudent",
  authentication,
  authorize("ADMIN"),
  registerStudent
);
router.post(
  "/admin/registerTeacher",
  authentication,
  authorize("ADMIN"),
  registerTeacher
);
router.get(
  "/admin/dashboard",
  authentication,
  authorize("ADMIN"),
  adminDashboard
);

router.post(
  "/admin/bulk-register-student",
  authentication,
  authorize("ADMIN"),
  upload.single("file"),
  bulkRegisterStudent
);

router.post(
  "/admin/bulk-register-teacher",
  authentication,
  authorize("ADMIN"),
  upload.single("file"),
  bulkRegisterTeacher
);

export default router;
