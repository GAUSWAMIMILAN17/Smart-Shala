import { StudentAnswer } from "../models/asnwersheet.js";
import { Classroom } from "../models/classroom.js";
import { Result } from "../models/result.js";
import { Subject } from "../models/subject.js";
import { Test } from "../models/test.js";
import { User } from "../models/user.js";
import { evaluateAnswerAI } from "../services/ai.service.js";

//test create
export const createTest = async (req, res) => {
  try {
    const { title, subject, classroom, duration, totalMarks } = req.body;
    const teacherId = req.user.id;
    console.log(teacherId);

    if (!title || !subject || !classroom) {
      return res.status(404).json({
        success: false,
        message: "missing field required",
      });
    }

    const existSubject = await Subject.findOne({ _id: subject });
    if (!existSubject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    const existClassroom = await Classroom.findOne({ _id: classroom });
    if (!existClassroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found",
      });
    }

    const test = await Test.create({
      title,
      subject,
      classroom,
      teacher: teacherId,
      duration,
      totalMarks,
      status: "draft",
    });

    return res.status(201).json({
      success: true,
      test,
      message: "Test created successfuly",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//quetion add
export const addQuestion = async (req, res) => {
  try {
    const { questionText, type, marks, options } = req.body;
    const { id } = req.params;
    // console.log(id);
    const existTest = await Test.findOne({ _id: id });

    if (!existTest) {
      return res.status(404).json({
        success: false,
        message: "Test not created",
      });
    }

    if (existTest.status !== "draft") {
      return res
        .status(400)
        .json({ message: "Cannot add question after publish" });
    }

    existTest.questions.push({
      questionText,
      type,
      marks,
      options,
    });
    await existTest.save();
    return res.status(201).json({
      success: true,
      existTest,
      message: "Quetion Added ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//delete quetion
export const deleteQuetion = async (req, res) => {
  try {
    const { id, quetionId } = req.params;
    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not Found",
      });
    }

    if (test.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete question from published or ended test",
      });
    }

    const questionExists = test.questions.id(quetionId);
    if (!questionExists) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    const updatedTest = await Test.findByIdAndUpdate(
      id,
      {
        $pull: {
          questions: { _id: quetionId },
        },
      },
      { new: true },
    );

    return res.status(201).json({
      success: true,
      updatedTest,
      message: "Quetion Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//addModelAnswer
export const addModelAnswer = async (req, res) => {
  try {
    const { testId, questionId } = req.params;
    const { answerText, keywords } = req.body;

    const existTest = await Test.findOne({ testId });
    // console.log(existTest)
    if (!existTest) {
      return res.status(404).json({
        success: false,
        message: "Test not Created",
      });
    }

    console.log(questionId);
    const existQuestion = existTest.questions.id(questionId);
    if (!existQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not exist",
      });
    }

    existQuestion.modelAnswer = {
      answerText,
      keywords,
    };
    await existTest.save();

    return res.status(201).json({
      success: true,
      message: "Question answer added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//teacher dashboard
export const teacherDashboard = async (req, res) => {
  try {
    const { id } = req.user;

    // console.log(id)
    const teacherInfo = await User.findById(id);
    console.log(teacherInfo);
    const subject = await Subject.findOne({ teacher: id }).populate(
      "classroom",
    );
    // console.log(subject);
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Plz Login and Try Again",
      });
    }

    if (!teacherInfo) {
      return res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
    }

    const senitizeUser = {
      name: teacherInfo.name,
      email: teacherInfo.email,
      role: teacherInfo.role,
    };
    const senitizeSubject = {
      name: subject.name,
      classroom: subject.classroom.name,
    };

    return res.status(201).json({
      success: true,
      senitizeUser,
      senitizeSubject,
      message: "User Find Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//update status
export const updateTestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findById(id);
    // console.log(test);
    const { status } = req.body;

    if (test.status === "published" && status === "draft") {
      return res.status(404).json({
        success: false,
        message: "After Published not Backtrack Posible",
      });
    }

    if (test.status === "ended" && status !== "ended") {
      return res.status(404).json({
        success: false,
        message: "After Ended not Backtrack Posible",
      });
    }

    const updated = await Test.findByIdAndUpdate(id, { status }, { new: true });

    return res.status(201).json({
      success: true,
      message: "Update Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//get one test teachertest
export const getTestForTeacher = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { id } = req.params;
    // console.log(id);
    // console.log(teacherId)
    const test = await Test.findById(id)
      .populate("classroom", "name")
      .populate("subject", "name");

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    return res.status(201).json({
      success: true,
      test,
      message: "Test Find Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//update test
export const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = req.user.id;
    const { title, totalMarks } = req.body;
    // console.log(id)
    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }
    // console.log(test)

    if (test.status !== "draft") {
      return res.status(404).json({
        success: false,
        message: "Only DRAFT tests can be edited",
      });
    }

    if (title) test.title = title;
    if (totalMarks) test.totalMarks = totalMarks;

    await test.save();

    return res.status(200).json({
      success: true,
      message: "Test updated successfully",
      test,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//delete Test
export const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = req.user.id;

    const test = await Test.findById(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    if (test.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "Only DRAFT tests can be deleted",
      });
    }

    // 3️⃣ Delete test
    await Test.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Test deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//get all Test
export const getAllTest = async (req, res) => {
  try {
    const getAllTest = await Test.find();

    if (!getAllTest) {
      return res.status(404).json({
        success: false,
        message: "Test not created",
      });
    }

    return res.status(201).json({
      success: true,
      getAllTest,
      message: "All Test Occur",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//getsAll submission
export const allSubmission = async (req, res) => {
  try {
    const allTestSubmission = await StudentAnswer.find()
      .populate("student", "name email role")
      .populate("test", "title");
    // console.log(allTestSubmission);

    return res.status(200).json({
      success: true,
      allTestSubmission,
      message: "All submission received",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
  F;
};

//get one submision
export const viewSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await StudentAnswer.findById(id).populate(
      "student",
      "name email",
    );
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "not any test submited",
      });
    }

    return res.status(200).json({
      success: true,
      submission,
      message: "Submission Access",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// //ai sugestion
// export const aiSuggestion = async (req, res) => {
//   try{

//     const {testId, studentId ,getIndex} = req.body

//     const test = await Test.findById(testId)
//     if(!test) {
//       return res.status(404).json({
//         success: false,
//         message: "Test not found"
//       })
//     }
//     const studentDoc = await StudentAnswer.findOne({
//       test: testId,
//       student: studentId
//     })
//     if(!studentDoc){
//       return res.status(404).json({
//         success: false,
//         message: "Student not attemp this test"
//       })
//     }
//     // console.log(test)

//     const question = test.questions[getIndex];

//     if (!question) {
//       return res.status(404).json({
//         success: false,
//         message: "Question not found"
//       })
//     }

//     const questionText = question.questionText
//     const modelAnswer = question.modelAnswer.answerText;
//     const studentAnswer = studentDoc.answers[getIndex].answerText

//     // console.log(questionText)
//     // console.log(modelAnswer)
//     // console.log(studentAnswer)

//     const aiResult = await evaluateAnswerAI({
//       question: questionText,
//       modelAnswer: modelAnswer,
//       studentAnswer,
//       maxMarks: question.marks
//     });
//     console.log(aiResult)

//     return res.status(200).json({
//       success: true,
//       questionText,
//       modelAnswer,
//       studentAnswer,
//       message: "model and student answer recevied"
//     })

//   }catch (error){
//     console.log(error)
//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     })
//   }
// }

//result creation
export const creatResult = async (req, res) => {
  try {
    const { testId, studentId } = req.params;
    const teacherId = req.user.id;
    const { marks } = req.body;

    // console.log(testId)
    // console.log(teacherId)

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    if (test.status !== "ended") {
      return res.status(400).json({
        success: false,
        message: "Test must be ended before result creation",
      });
    }

    const alreadyCreated = await Result.findOne({
      test: testId,
      student: studentId,
    });

    if (alreadyCreated) {
      return res.status(400).json({
        success: false,
        message: "Result already created for this student",
      });
    }

    const submission = await StudentAnswer.findOne({
      test: testId,
      student: studentId,
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }
    let totalMarks = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    marks.forEach((item) => {
      const question = test.questions[item.questionIndex];

      if (!question) return;

      const obtained = Math.min(item.marks, question.marks);
      submission.answers[item.questionIndex].marks = obtained;

      totalMarks += obtained;

      if (obtained > 0) correctAnswers++;
      else wrongAnswers++;
    });

    // await submission.save();

    const result = await Result.create({
      student: studentId,
      test: testId,
      classroom: test.classroom,
      totalQuestions: test.questions.length,
      correctAnswers,
      wrongAnswers,
      marks: totalMarks,
      published: false
    });

    console.log(result);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//result publish
export const resultPublish = async (req, res) => {
  try {
    const { testId } = req.params;

    const results = await Result.find({ test: testId });

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found for this test"
      });
    }

    // 2️⃣ Update all results → published = true
    await Result.updateMany(
      { test: testId },
      { $set: { published: true } }
    );

    return res.status(200).json({
      success: true,
      message: "All results published successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

//recheck-result
export const recheckResult = async (req, res) => {
  try {
    const { testId, studentId } = req.params;
    const { marks } = req.body;

    // 1️⃣ Find existing result (must be published)
    const result = await Result.findOne({
      test: testId,
      student: studentId
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found"
      });
    }

    // 2️⃣ Fetch test & submission
    const test = await Test.findById(testId);
    const submission = await StudentAnswer.findOne({
      test: testId,
      student: studentId
    });

    if (!test || !submission) {
      return res.status(404).json({
        success: false,
        message: "Test or submission not found"
      });
    }

    let totalMarks = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    // 3️⃣ Update marks question-wise
    marks.forEach(item => {
      const question = test.questions[item.questionIndex];
      if (!question) return;

      const obtained = Math.min(item.marks, question.marks);
      submission.answers[item.questionIndex].marks = obtained;

      totalMarks += obtained;
      if (obtained > 0) correctAnswers++;
      else wrongAnswers++;
    });

    // 4️⃣ Save updated answers
    await submission.save();

    // 5️⃣ Update Result (IMPORTANT: published untouched)
    result.correctAnswers = correctAnswers;
    result.wrongAnswers = wrongAnswers;
    result.marks = totalMarks;

    await result.save();

    return res.status(200).json({
      success: true,
      message: "Result rechecked and updated successfully",
      result
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

