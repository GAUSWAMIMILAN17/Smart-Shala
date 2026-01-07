import { StudentAnswer } from "../models/asnwersheet.js";
import { Classroom } from "../models/classroom.js";
import { StudentProfile } from "../models/studentProfile.js";
import { Test } from "../models/test.js";
import { User } from "../models/user.js";

//student dashboard
export const Dashboard = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).select("-password");
    const studentProfile = await StudentProfile.findOne({
      userId: id,
    });
    const classroom = await Classroom.findById(studentProfile.classroomId);
    // console.log(classroom)
    // console.log(studentProfile)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not login plz login",
      });
    }
    if (!studentProfile) {
      return res.status(404).json({
        success: false,
        message: "student profile not exist",
      });
    }
    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "classroom not asign this student",
      });
    }
    const testCount = await Test.countDocuments({ status: "published" });
    // console.log(testCount)

    return res.status(200).json({
      success: true,
      user,
      testCount,
      studentProfile,
      classroom,
      message: "Dashboard acess",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//view all test
export const allTest = async (req, res) => {
  try {
    const id = req.user.id;
    const studentProfile = await StudentProfile.findOne({ userId: id });
    if (!studentProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    const classId = studentProfile.classroomId;
    const allTest = await Test.find({
      status: "published",
      classroom: classId,
    });
    return res.status(200).json({
      success: true,
      allTest,
      message: "All Test Received",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//one test view
export const oneTest = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }
    return res.status(200).json({
      success: true,
      test,
      message: "Test accessed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//view quetion pepar
export const getQuestionPaper = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { testId } = req.params;
    // console.log(testId)

    // 1️⃣ Student profile
    const studentProfile = await StudentProfile.findOne({ userId: studentId });
    if (!studentProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // 2️⃣ Fetch test (class + status check)
    const test = await Test.findOne({
      _id: testId,
      classroom: studentProfile.classroomId,
      status: "published",
    });

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not available",
      });
    }

    // 3️⃣ Remove model answers before sending
    const questions = test.questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      type: q.type,
      options: q.options,
      marks: q.marks,
    }));

    return res.status(200).json({
      success: true,
      test: {
        _id: test._id,
        title: test.title,
        duration: test.duration,
        questions,
      },
      message: "Question paper fetched",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//answer submit
export const answerSubmit = async (req, res) => {
  try {
    const studentId = req.user.id;
    const {testId} = req.params;
    const answers = req.body;
    // console.log(studentId);
    // console.log(testId);
    // console.log(answers)

    // 1️⃣ Student profile
    const studentProfile = await StudentProfile.findOne({ userId: studentId });
    if (!studentProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // 2️⃣ Check test
    const test = await Test.find({
      _id: testId,
      classroom: studentProfile.classroomId,
      status: "published",
    });

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not available",
      });
    }

    // 3️⃣ Prevent multiple submissions
    const alreadySubmitted = await StudentAnswer.findOne({
      student: studentProfile._id,
      test: testId
    });

    if (alreadySubmitted) {
      return res.status(400).json({
        success: false,
        message: "Test already submitted",
      });
    }

    // 4️⃣ Save answers
    const submission = await StudentAnswer.create({
      student: studentId,
      test: testId,
      answers,
      submittedAt: new Date()
    });

    return res.status(201).json({
      success: true,
      message: "Test submitted successfully",
      submissionId: submission._id,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//see all submitted test
export const allSubmission = async (req, res) => {
  try {
    const allTestSubmission = await StudentAnswer.find().populate("student", "name email role").populate("test", "title");
    console.log(allTestSubmission);

    return res.status(200).json({
      success: true,
      allTestSubmission,
      message: "All submission received"
    })

  } catch (error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }F
}

//see one test submission
export const viewSubmission = async (req, res) => {
  try {
      const {id} = req.params;

      const submission = await StudentAnswer.findById(id).populate("student", "name email")
      if(!submission){
        return res.status(404).json({
          success: false,
          message: "not any test submited"
        })
      }

      return res.status(200).json({
        success: true,
        submission,
        message: "Submission Access"
      })


  } catch (error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }F
}