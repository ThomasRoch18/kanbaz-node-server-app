import mongoose from "mongoose";
const attemptsSchema = new mongoose.Schema(
 {
   _id: String,
   quiz: { type: String, ref: "QuizModel" },
   user: { type: String, ref: "UserModel"   },
   grade: Number,
   attempt_number: Number,
   questions: [
    {
      questionId: String,      // ID of the question inside the quiz
      selectedAnswer: String,  // user-chosen answer ID or text
      correct: Boolean,
      earnedPoints: Number
    }
  ]
   
 },
 { collection: "attempts" }
);
export default attemptsSchema;