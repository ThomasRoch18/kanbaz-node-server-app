import EnrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);
    const enrollUser = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await dao.enrollUserInCourse(uid, cid);
    res.send(status);

    }
    const unEnrollUser = async (req, res) => {
        let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await dao.unEnrollUserInCourse(uid, cid);
    res.send(status);

    }
    const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.getAllEnrollments();
    res.send(enrollments);
  }
  app.get("/api/enrollments", findAllEnrollments);
  app.delete("/api/enrollments/:uid/:cid", unEnrollUser);
  app.post("/api/enrollments/:uid/:cid", enrollUser);
}