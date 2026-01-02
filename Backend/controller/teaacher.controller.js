import { Classroom } from "../models/classroom.js";
import { Subject } from "../models/subject.js";
import { Test } from "../models/test.js";
import { User } from "../models/user.js";

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
      "classroom"
    );
    console.log(subject);
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

    if (test.status === "published" && test.status !== "draft") {
      return res.status(404).json({
        success: false,
        message: "After Published not Backtrack Posible",
      });
    }

    if (test.status === "ended" && test.status !== "published") {
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

//get teachertest
export const getTestForTeacher = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const {id} = req.params;
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
      const {id} = req.params
      const teacherId = req.user.id
      const {title,totalMarks} = req.body
      // console.log(id)
      const test = await Test.findById(id)

      if(!test){
        return res.status(404).json({
          success: false,
          message: "Test not found"
        })
      }
      // console.log(test)

      if (test.status !== "draft") {
      return res.status(404).json({
        success: false,
        message: "Only DRAFT tests can be edited"
      });
    }

    if (title) test.title = title;
    if (totalMarks) test.totalMarks = totalMarks;

    await test.save();

    return res.status(200).json({
      success: true,
      message: "Test updated successfully",
      test
    });


    } catch (error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }
}

//delete Test
export const deleteTest = async (req, res) => {
  try {

    const {id} = req.params;
    const teacherId = req.user.id;

    const test = await Test.findById(id)

    if(!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found"
      })
    }

     if (test.status !== "draft") {
      return res.status(400).json({
        success: false,
        message: "Only DRAFT tests can be deleted"
      });
    }

    // 3️⃣ Delete test
    await Test.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Test deleted successfully"
    });

  } catch (error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }
}

//get all Test
export const getAllTest = async (req, res) => {
  try {

    const getAllTest = await Test.find();

    if(!getAllTest){
      return res.status(404).json({
        success: false,
        message: "Test not created"
      })
    }

    return res.status(201).json({
      success: true,
      getAllTest,
      message: "All Test Occur"
    })

  } catch (error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }
}