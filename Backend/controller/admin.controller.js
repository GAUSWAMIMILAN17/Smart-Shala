import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { Classroom } from "../models/classroom.js";
import { Subject } from "../models/subject.js";
import XLSX from "xlsx";
import { StudentProfile } from "../models/studentProfile.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check existing user
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log(user);

    // 5️⃣ Response
    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(404).json({
        success: false,
        message: "Missing field required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not Exist",
      });
    }
    if (role != user.role) {
      return res.status(404).json({
        success: false,
        message: "Role is Wrong",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // console.log(token)

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true, // JS thi access nai thai
        secure: false, // production ma true (HTTPS)
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        message: "User Login Successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const adminAddClassroom = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    if (!name) {
      return res.status(404).json({
        success: false,
        message: "Class Name Is required",
      });
    }

    const existClass = await Classroom.findOne({ name });
    if (existClass) {
      return res.status(409).json({
        success: false,
        message: "Class already exists",
      });
    }

    const classroom = await Classroom.create({
      name,
    });

    return res.status(201).json({
      success: true,
      classroom,
      message: "Classroom Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const adminAddSubject = async (req, res) => {
  try {
    const { name, classroomId } = req.body;

    if (!name || !classroomId) {
      return res.status(404).json({
        success: false,
        message: "Missing Required Field",
      });
    }

    const existSubject = await Subject.findOne({ name });

    if (existSubject) {
      return res.status(404).json({
        success: false,
        message: "Subject already exist",
      });
    }

    const subject = await Subject.create({
      name,
      classroom: classroomId,
    });

    return res.status(201).json({
      success: true,
      subject,
      message: "Subject Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const assignTeacherToSubject = async (req, res) => {
  try {
    const { subjectId, teacherId } = req.body;
    if (!subjectId || !teacherId) {
      return res.status(404).json({
        success: false,
        message: "Missing Field Required",
      });
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not Found",
      });
    }

    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "TEACHER") {
      return res.status(400).json({ message: "Invalid teacher" });
    }

    subject.teacher = teacherId;

    await subject.save();

    res.json({
      success: true,
      message: "Teacher assigned successfully",
      subject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const registerTeacher = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(404).json({
        success: false,
        message: "Missing field required",
      });
    }

    const existTeacher = await User.findOne({ email });
    if (existTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher already exist",
      });
    }

    const HashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: HashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      user: {
        name,
        email,
        role,
      },
      message: "Teacher Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const { name, password, email, role, classroomId, rollNo } = req.body;

    if (!name || !email || !password || !role || !classroomId || !rollNo) {
      return res.status(404).json({
        success: false,
        message: "Missing field required",
      });
    }

    const existTeacher = await User.findOne({ email });
    if (existTeacher) {
      return res.status(404).json({
        success: false,
        message: "Student already exist",
      });
    }

    const HashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: HashedPassword,
      role,
    });

    const studentProfile = await StudentProfile.create({
      userId: user._id,
      rollNo,
      classroomId,
    });

    return res.status(201).json({
      success: true,
      user: {
        name,
        email,
        role,
      },
      studentProfile: {
        rollNo,
        classroomId
      },
      message: "Student Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    const totalClasses = await Classroom.countDocuments();

    const totalTeachers = await User.countDocuments({
      role: "TEACHER",
    });

    const totalStudents = await User.countDocuments({
      role: "STUDENT",
    });
    const classList = await Classroom.find();
    const studentList = await User.find({
      role: "STUDENT",
    });
    const teacherList = await User.find({
      role: "TEACHER",
    });

    res.json({
      totalClasses,
      totalTeachers,
      totalStudents,
      classList,
      studentList,
      teacherList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const bulkRegisterStudent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        success: false,
        message: "Excel file required",
      });
    }

    const successRecords = [];
    const failedRecords = [];

    console.log(req.file.path);
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    for (let row of rows) {
      const { name, email, password, rollNo, classroomId } = row;

      // basic validation
      if (!name || !email || !password || !classroomId || !rollNo) {
        failedRecords.push({
          row,
          reason: "Missing required fields",
        });
        continue;
      }

      // duplicate check
      const exists = await User.findOne({ email });
      if (exists) {
        failedRecords.push({
          row,
          reason: "Email already exists",
        });
        continue;
      }

      // hash password
      const hashed = await bcrypt.hash(String(password), 10);

      // create user
      const user = await User.create({
        name,
        email,
        password: hashed,
        role: "STUDENT",
      });

      // create student profile
      await StudentProfile.create({
        userId: user._id,
        rollNo,
        classroomId,
      });

      successRecords.push(email);
    }

    return res.status(201).json({
      success: true,
      message: "Bulk student registration done",
      successCount: successRecords.length,
      failedCount: failedRecords.length,
      failedRecords,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const bulkRegisterTeacher = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        success: false,
        message: "Excel file required",
      });
    }

    const successRecords = [];
    const failedRecords = [];

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    for (let row of rows) {
      const { name, email, password, role } = row;

      if (!email || !password || !name) {
        failedRecords.push({
          row,
          reason: "Missing email or password or name",
        });
        continue;
      }

      const exists = await User.findOne({ email });
      if (exists) {
        failedRecords.push({
          row,
          reason: "Email already exists",
        });
        continue;
      }

      const hashed = await bcrypt.hash(String(password), 10);

      await User.create({
        name,
        email,
        password: hashed,
        role: "TEACHER",
      });

      successRecords.push(email);
    }

    res.status(201).json({
      success: true,
      message: "Bulk teacher registration done",
      successCount: successRecords.length,
      failedCount: failedRecords.length,
      failedRecords,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
