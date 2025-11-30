import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
   description: String,
   points: Number,
   availableFrom: String,
   availableUntil: String,
   due: String,
 },
 { collection: "assignments" }
);
export default assignmentSchema;