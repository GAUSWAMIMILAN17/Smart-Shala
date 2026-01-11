import express from "express";
import { authentication } from "../middleware/auth.middleware.js";
import {
  addModelAnswer,
  addQuestion,
  aiEvaluateSubmission,
  allSubmission,
  createTest,
  deleteQuetion,
  deleteTest,
  getAllTest,
  getTestForTeacher,
  teacherDashboard,
  updateTest,
  updateTestStatus,
  viewSubmission,
} from "../controller/teaacher.controller.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/create-test", authentication, authorize("TEACHER"), createTest);
router.post(
  "/create-test/:id/add-question",
  authentication,
  authorize("TEACHER"),
  addQuestion
);
router.delete(
  "/test/:id/question/:quetionId",
  authentication,
  authorize("TEACHER"),
  deleteQuetion
);
router.post(
  "/create-test/:id/add-question/:questionId",
  authentication,
  authorize("TEACHER"),
  addModelAnswer
);
router.get(
  "/dashboard",
  authentication,
  authorize("TEACHER"),
  teacherDashboard
);
router.post(
  "/test/:id",
  authentication,
  authorize("TEACHER"),
  updateTestStatus
);
router.get(
  "/test/:id",
  authentication,
  authorize("TEACHER"),
  getTestForTeacher
);
router.put("/updateTest/:id", authentication, authorize("TEACHER"), updateTest);
router.get("/getAllTest", authentication, authorize("TEACHER"), getAllTest);

router.delete(
  "/deleteTest/:id",
  authentication,
  authorize("TEACHER"),
  deleteTest
);

router.get("/allSubmission", authentication, authorize("TEACHER"), allSubmission);
router.get("/submission/:id", authentication, authorize("TEACHER"), viewSubmission);

export default router;
