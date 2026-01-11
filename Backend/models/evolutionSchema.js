import mongoose from "mongoose";


const evaluationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    //   required: true,
    },

    totalQuestions: Number,

    aiScore: Number, // AI suggested
    teacherScore: Number, // Teacher adjusted

    aiBreakdown: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        aiMarks: Number,
        maxMarks: Number,
      },
    ],

    teacherRemarks: String,

    status: {
      type: String,
      enum: ["pending", "reviewed", "locked"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Evaluation = mongoose.model("Evaluation", evaluationSchema)