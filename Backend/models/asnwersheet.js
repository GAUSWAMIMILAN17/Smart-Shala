import mongoose from "mongoose";

const studentAnswerSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      answerText: String,
      marks: Number
    }
  ],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});


export const StudentAnswer = mongoose.model(
  "StudentAnswer",
  studentAnswerSchema
);
