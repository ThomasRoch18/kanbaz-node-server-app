import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function AssignmentsDao() {
 function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  async function createAssignment(assignment, courseId) {
    const newAssignment = { ...assignment, _id: uuidv4(), course: courseId };
    return await model.create(newAssignment);
  }

  async function deleteAssignment(assignmentId) {
    return await model.deleteOne({ _id: assignmentId });
  }

  async function updateAssignment(assignmentId, assignmentUpdates) {
    return await model.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
  }
 return {
   findAssignmentsForCourse, deleteAssignment, updateAssignment, createAssignment
 };
}