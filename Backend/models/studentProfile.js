import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rollNo: {
    type: Number,
    required: true
  },
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true
  }
});

export const StudentProfile = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);
