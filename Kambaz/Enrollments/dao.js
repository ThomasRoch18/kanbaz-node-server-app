import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import userModel from "../Users/model.js";
export default function EnrollmentsDao() {
  function enrollUserInCourse(userId, courseId) {
     return model.create({
     user: userId,
     course: courseId,
     _id: `${userId}-${courseId}`,})
  }
  function unEnrollUserInCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }
  function getAllEnrollments() {
    return model.find();
  }
  
 function unenrollAllUsersFromCourse(courseId) {
   return model.deleteMany({ course: courseId });
 }
 async function findUsersForCourse(courseId) {
    const usersForCourse = await model.aggregate([
  { $match: { course: courseId } },
  {
    $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "userInfo"
    }
  },
  { $unwind: "$userInfo" }
]);
return usersForCourse.map(e => e.userInfo);
 }

  return { enrollUserInCourse, unEnrollUserInCourse, getAllEnrollments, unenrollAllUsersFromCourse, findUsersForCourse };
}
