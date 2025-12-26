import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: Number,

  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"   // Teacher is also User
  }
});

export const Subject = mongoose.model("Subject", subjectSchema);
