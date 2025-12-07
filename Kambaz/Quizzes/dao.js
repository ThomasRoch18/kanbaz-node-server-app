import model from "./model.js";
export default function QuizzesDao() {

    async function fetchAllQuizzes() {
      return await model.find();
    }

    async function publishQuiz(qid) {
      return await model.findByIdAndUpdate(qid, { published: true }, { new: true });
    }

    async function unpublishQuiz(qid) {
      return await model.findByIdAndUpdate(qid, { published: false }, { new: true });
    }

    async function getQuizzesForCourse(courseId) {
        return await model.find({ course: courseId });
    };

    async function getQuiz(quizId) {
        //console.log(quizId);
        return await model.findById(quizId);
    };

    async function updateQuizData(quizId, newData) {
      //console.log(newData);
        return await model.findByIdAndUpdate(
      { _id: quizId, },
      { $set: newData },
      { new: true}
    );
    };

    async function createQuiz(quizData) {
        console.log(quizData);
        return await model.create(quizData);
    };

    async function deleteQuiz(quizId) {
        return await model.findByIdAndDelete(quizId);
    };

    async function createQuizQuestion(quizId, questionData) {
        return await model.findByIdAndUpdate(
      {_id: quizId},
      { $push: { questions: questionData } });
    };

    async function updateQuizQuestion(quizId, questionId, updatedData) {
        return await model.updateOne(
      { _id: quizId, "questions._id": questionId },
      { $set: { "questions.$": updatedData } },
      { new: true}
    );
    };

    async function deleteQuizQuestion(quizId, questionId) {
        return await model.findByIdAndUpdate(
      { _id: quizId },
      { $pull: { questions: { _id: questionId } } }
    );
    };

    async function createQuizQuestionAnswer(quizId, questionId, answerData) {
        return await model.updateOne(
      { _id: quizId, "questions._id": questionId },
      { $push: { "questions.$.answers": answerData } }
    );
    };

    async function updateQuizQuestionAnswer(quizId, questionId, answerId, updatedData) {
        return await model.updateOne(
      {
        _id: quizId,
        "questions._id": questionId,
        "questions.answers._id": answerId
      },
      {
        $set: {
          "questions.$[question].answers.$[answer]": updatedData
        }
      },
      {
        arrayFilters: [
          { "question._id": questionId },
          { "answer._id": answerId }
        ]
      },
      { new: true}
    );
    };

    async function deleteQuizQuestionAnswer(quizId, questionId, answerId) {
        return await model.updateOne(
      { _id: quizId, "questions._id": questionId },
      { $pull: { "questions.$.answers": { _id: answerId } } }
    );
    };

    return {getQuizzesForCourse, getQuiz, updateQuizData, createQuiz, deleteQuiz, 
        createQuizQuestion, updateQuizQuestion, deleteQuizQuestion, 
        createQuizQuestionAnswer, updateQuizQuestionAnswer, deleteQuizQuestionAnswer,
      publishQuiz, unpublishQuiz, fetchAllQuizzes};
}