import dotenv from "dotenv"
import connectDB from "./utils/data.js";
dotenv.config()

import express from "express"
import authRoute from "./routes/admin.routes.js"
import teacherRoute from "./routes/teacher.routes.js"
import studentRoute from "./routes/student.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


// db connect
connectDB();

const corsOptions = {
  origin: [
    "http://localhost:3000",
  ],
  credentials: true
};

// middleware

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Smart Shala Backend Running");
});

app.use("/api/auth", authRoute)
app.use("/api/auth/teacher", teacherRoute)
app.use("/api/auth/student", studentRoute)


app.listen(5000, () => {
  console.log("Server running on 5000");
});