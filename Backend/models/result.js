import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true
  },
  totalQuestions: Number,
  correctAnswers: Number,
  wrongAnswers: Number,
  marks: Number,
//   percentage: Number,
  status: {
    type: String,
    enum: ["pass", "fail"]
  },
  checkedBy: {
    type: String,
    enum: ["AI", "Teacher"],
    default: "AI"
  },
  published: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const Result = mongoose.model("Result", resultSchema);
