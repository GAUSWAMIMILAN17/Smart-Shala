import mongoose, { mongo } from "mongoose";

const classroomSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },

});

export const Classroom = mongoose.model("Classroom", classroomSchema)
