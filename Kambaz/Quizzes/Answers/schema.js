import mongoose from "mongoose";
const answerSchema = new mongoose.Schema({
   _id: String,
   description: String,
   correct: Boolean
 },
);
export default answerSchema;