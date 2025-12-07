import mongoose from "mongoose";
import answerSchema from "../Answers/schema.js";
const questionSchema = new mongoose.Schema({
   _id: String,
   title: String,
   description: String,
   type: String,
   points: Number,
   correct_answer: String,
   answers: [answerSchema]
 },
);
export default questionSchema;