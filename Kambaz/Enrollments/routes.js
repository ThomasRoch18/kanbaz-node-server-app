import EnrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);
    const enrollUser = (req, res) => {
        const { userId, courseId } = req.params;

        if (!userId || !courseId) {
        return res.status(400).json({ error: "Missing userId or courseId" });
        }

        dao.enrollUserInCourse(userId, courseId);
        return res.status(201).json({ message: "User enrolled successfully" });
    }
    const unEnrollUser = (req, res) => {
        const { userId, courseId } = req.params;

        if (!userId || !courseId) {
        return res.status(400).json({ error: "Missing userId or courseId" });
        }

        dao.unEnrollUserInCourse(userId, courseId);
    
        return res.status(200).json({ message: "User unenrolled successfully" });
    }
    const findAllEnrollments = (req, res) => {
    const enrollments = dao.getAllEnrollments();
    res.send(enrollments);
  }
  app.get("/api/enrollments", findAllEnrollments);
  app.delete("/api/enrollments/:userId/:courseId", unEnrollUser);
  app.post("/api/enrollments/:userId/:courseId", enrollUser);
}