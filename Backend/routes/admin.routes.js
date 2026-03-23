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
  assignTeacherToSubject,
  deleteTeacher,
  deleteClass,
  deleteStudent,
  classStudents,
  allTeachers,
  allStudents,
  allClasses,
  classSubjects,
} from "../controller/admin.controller.js";
import { authentication } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// console.log("✅ ADMIN ROUTES LOADED");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post(
  "/admin/classroom",
  authentication,
  authorize("ADMIN"),
  adminAddClassroom
);

router.delete(
  "/admin/classroom/:id",
  authentication,
  authorize("ADMIN"),
  deleteClass
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
router.delete(
  "/admin/deleteStudent/:studentId",
  authentication,
  authorize("ADMIN"),
  deleteStudent);

router.post(
  "/admin/registerTeacher",
  authentication,
  authorize("ADMIN"),
  registerTeacher
);

router.delete(
  "/admin/deleteTeacher/:teacherId",
  authentication,
  authorize("ADMIN"),
  deleteTeacher
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

router.post(
  "/admin/asign-teacher-to-subject",
  authentication,
  authorize("ADMIN"),
  assignTeacherToSubject
);

router.get("/admin/class/:classId/students", authentication, authorize("ADMIN"), classStudents);

router.get("/admin/all-teachers", authentication, authorize("ADMIN"), allTeachers);

router.get("/admin/all-students", authentication, authorize("ADMIN"), allStudents);

router.get("/admin/all-classes", authentication, authorize("ADMIN"), allClasses);

router.get("/admin/class/:classId/subjects", authentication, authorize("ADMIN"), classSubjects)

export default router;
