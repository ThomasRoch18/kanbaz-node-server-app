import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import coursesModel from "../Courses/model.js";
export default function ModulesDao(db) {
 async function createModule(module, courseId) {
  const newModule = { ...module, _id: uuidv4() };
   const status = await coursesModel.updateOne(
     { _id: courseId },
     { $push: { modules: newModule } }
   );

  return newModule;
}
async function deleteModule(courseId, moduleId) {
  const status = await coursesModel.updateOne(
     { _id: courseId },
     { $pull: { modules: { _id: moduleId } } }
   );
   return status;
}
async function updateModule(courseId, moduleId, moduleUpdates) {
  const course = await coursesModel.findById(courseId);
   const module = course.modules.id(moduleId);
  Object.assign(module, moduleUpdates);
  await course.save();
  return module;
}

 async function findModulesForCourse(courseId) {
   const course = await coursesModel.findOne({ _id: courseId });
   return course.modules;
 }
 return {
   findModulesForCourse, deleteModule, updateModule, createModule
 };
}
