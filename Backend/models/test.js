import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["mcq", "short", "long"],
    required: true
  },
  options: [String], // MCQ only
  marks: {
    type: Number,
    required: true
  },
  modelAnswer: {
    answerText: String,
    keywords: [String]
  }
});

// export const Quetion = mongoose.model("Quetion", questionSchema)

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  duration: Number, // in minutes
  totalMarks: Number,
  status: {
    type: String,
    enum: ["draft", "published", "ended"],
    default: "draft"
  },
  startTime: Date,
  endTime: Date,
  questions: [questionSchema]
}, { timestamps: true });

export const Test = mongoose.model("Test", testSchema);
