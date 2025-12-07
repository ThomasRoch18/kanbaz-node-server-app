import model from "./model.js";
export default function QuizzAttemptsDao() {

    async function createAttempt(attempt) {
        return await model.create(attempt);
    };

    async function getAttemptForUser(userId, quizId) {
        return await model.findOne({ user: userId, quiz: quizId });
    };

    async function updateAttemptForUser(attemptId, attemptUpdates) {
        return await model.updateOne(
      { _id: attemptId },
      { $set: attemptUpdates }
    );
    };

    return {createAttempt, getAttemptForUser, updateAttemptForUser};
}