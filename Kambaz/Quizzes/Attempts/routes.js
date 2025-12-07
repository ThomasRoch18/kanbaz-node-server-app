import express from "express";
import AttemptsDao from "./dao.js";

export default function AttemptsRoutes(app) {
  const dao = AttemptsDao();

  app.post("/api/attempts", async (req, res) => {
    try {
      const attempt = await dao.createAttempt(req.body);
      res.json(attempt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating attempt" });
    }
  });

  app.get("/api/attempts/user/:userId/quiz/:quizId", async (req, res) => {
    try {
      const attempt = await dao.getAttemptForUser(req.params.userId, req.params.quizId);
      res.json(attempt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching attempt" });
    }
  });

  app.put("/api/attempts/:attemptId", async (req, res) => {
    try {
      const updated = await dao.updateAttemptForUser(
        req.params.attemptId,
        req.body
      );
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating attempt" });
    }
  });
}