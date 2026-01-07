import mongoose from "mongoose";

const studentAnswerSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  test:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true
  },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      answerText: String,
    },
  ],
  submittedAt: Date,
});

export const StudentAnswer = mongoose.model(
  "StudentAnswer",
  studentAnswerSchema
);
