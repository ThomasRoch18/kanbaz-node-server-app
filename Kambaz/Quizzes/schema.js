import mongoose from "mongoose";
import questionSchema from "./Questions/schema.js";
const quizSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
   published: Boolean,
   type: String,
   group: String,
   shuffle: Boolean,
   hasTimeLimit: Boolean,
   timeLimit: Number, // minutes
   points: Number,
   shuffleAnswers: Boolean,
   description: String,
   multiple_attempts: Boolean,
   total_attempts: Number,
   show_correct: Boolean,
   one_at_a_time: Boolean,
   access_code: String,
   webcam: Boolean,
   lock_questions: Boolean,
   dueDate: String,
   availableDate: String,
   untilDate: String,
   questions: [questionSchema]
 },
 { collection: "quizzes" }
);
export default quizSchema;