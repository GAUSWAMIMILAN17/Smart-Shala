import express from "express"
import { allSubmission, allTest, answerSubmit, Dashboard, getQuestionPaper, getStudentResult, oneTest, viewSubmission } from "../controller/student.controller.js";
import { authentication } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";


const router = express.Router();

router.get("/dashboard",authentication, authorize("STUDENT") ,Dashboard )
router.get("/allTest",authentication, authorize("STUDENT") ,allTest )
router.get("/test/:id",authentication, authorize("STUDENT") ,oneTest )
router.get("/test/:testId/pepar",authentication, authorize("STUDENT") ,getQuestionPaper )
router.post("/test/:testId/submit",authentication, authorize("STUDENT") ,answerSubmit )
router.get("/allSubmission",authentication, authorize("STUDENT") ,allSubmission )
router.get("/submission/:id",authentication, authorize("STUDENT") ,viewSubmission )
router.get("/view-result/:testId",authentication, authorize("STUDENT") ,getStudentResult )

export default router;
