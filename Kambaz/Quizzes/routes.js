import express from "express";
import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  app.get("/api/quizzes/fetch", async (req, res) => {
    const quizzes = await dao.fetchAllQuizzes();
    res.json(quizzes);
  });

  app.get("/api/quizzes/course/:courseId", async (req, res) => {
    const quizzes = await dao.getQuizzesForCourse(req.params.courseId);
    res.json(quizzes);
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    const quiz = await dao.getQuiz(req.params.quizId);
    res.json(quiz);
  });

  app.post("/api/quizzes", async (req, res) => {
    const newQuiz = await dao.createQuiz(req.body);
    res.json(newQuiz);
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const updated = await dao.updateQuizData(req.params.quizId, req.body);
    res.json(updated);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const deleted = await dao.deleteQuiz(req.params.quizId);
    res.json(deleted);
  });

  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const updated = await dao.createQuizQuestion(req.params.quizId, req.body);
    res.json(updated);
  });

  app.put("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const updated = await dao.updateQuizQuestion(
      req.params.quizId,
      req.params.questionId,
      req.body
    );
    res.json(updated);
  });

  app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const updated = await dao.deleteQuizQuestion(
      req.params.quizId,
      req.params.questionId
    );
    res.json(updated);
  });

  app.post("/api/quizzes/:quizId/questions/:questionId/answers", async (req, res) => {
    const updated = await dao.createQuizQuestionAnswer(
      req.params.quizId,
      req.params.questionId,
      req.body
    );
    res.json(updated);
  });

  app.put(
    "/api/quizzes/:quizId/questions/:questionId/answers/:answerId",
    async (req, res) => {
      const updated = await dao.updateQuizQuestionAnswer(
        req.params.quizId,
        req.params.questionId,
        req.params.answerId,
        req.body
      );
      res.json(updated);
    }
  );

  app.delete(
    "/api/quizzes/:quizId/questions/:questionId/answers/:answerId",
    async (req, res) => {
      const updated = await dao.deleteQuizQuestionAnswer(
        req.params.quizId,
        req.params.questionId,
        req.params.answerId
      );
      res.json(updated);
    }
  );

  app.put("/api/quizzes/:qid/publish", async (req, res) => {
    const quiz = await dao.publishQuiz(req.params.qid);
    res.json(quiz);
  });

  app.put("/api/quizzes/:qid/unpublish", async (req, res) => {
    const quiz = await dao.unpublishQuiz(req.params.qid);
    res.json(quiz);
  });

}