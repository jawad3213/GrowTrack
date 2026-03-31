const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
require("dotenv").config();

// Config
const { corsOptions } = require("./config/cors");
const { generateCsrfToken, doubleCsrfProtection } = require("./config/csrf");

// Middleware
const { serverLimiter } = require("./middleware/rateLimiter");
const { authenticate, authenticateResetToken } = require("./middleware/authenticate");
const { validate } = require("./middleware/validate");
const errorHandler = require("./middleware/errorHandler");

// Module routes
const authRoutes = require("./modules/auth/auth.routes");
const authValidation = require("./modules/auth/auth.validation");
const authController = require("./modules/auth/auth.controller");

// SaaS Module Routes
const studentsRoutes = require("./modules/users/students/student.routes");
const professorsRoutes = require("./modules/users/professors/professor.routes");
const supervisorsRoutes = require("./modules/users/supervisors/supervisor.routes");
const coachesRoutes = require("./modules/users/coaches/coach.routes");
const skillsRoutes = require("./modules/skills/skill.routes");
const signalsRoutes = require("./modules/signals/signal.routes");
const evaluationsRoutes = require("./modules/evaluations/evaluation.routes");
const projectsRoutes = require("./modules/projects/project.routes");
const classesRoutes = require("./modules/classes/class.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const notificationsRoutes = require("./modules/notifications/notification.routes");
const reportsRoutes = require("./modules/reports/report.routes");
const profileRoutes = require("./modules/profile/profile.routes");

// Legacy routes (will be migrated to modules over time)
const studentRoute = require("../routes/adminRoutes/studentRoute");
const professorRoute = require("../routes/adminRoutes/professorRoute");
const supervisorRoute = require("../routes/adminRoutes/supervisorRoute");
const skillRoute = require("../routes/adminRoutes/skillRoute");
const classRoute = require("../routes/adminRoutes/classRoute");
const coachRoute = require("../routes/adminRoutes/coachRoute");
const signalRoute = require("../routes/adminRoutes/signalRoute");
const profileRoute = require("../routes/adminRoutes/profileRoute");
const contactus = require("../routes/contactusRoute");
const hashRoute = require("../routes/hashRoute");
const DashAdminRoute = require("../routes/adminRoutes/adminDashboardRoute");
const EvaluationAdminRoute = require("../routes/adminRoutes/globalOverviewRoute");
const prof_evaluation_history = require("../routes/professorRoutes/evaluationHistoryRoute");
const prof_evaluation_classes = require("../routes/professorRoutes/evaluationClassesRoute");
const prof_project_management = require("../routes/professorRoutes/projectManagementRoute");
const prof_signal_history = require("../routes/professorRoutes/signalHistoryRoute");
const prof_signal_classes = require("../routes/professorRoutes/signalClassesRoute");
const dashRoute = require("../routes/professorRoutes/dashRoute");
const student_report = require("../routes/professorRoutes/studentReportRoute");
const dashstudent = require("../routes/studentRoutes/dashRoutes");
const prjectStudent = require("../routes/studentRoutes/projectRoute");
const notifiRoute = require("../routes/studentRoutes/notifiRoute");

// ─── Create Express App ──────────────────────────────────────
const app = express();

// ─── Core Middleware ─────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(doubleCsrfProtection);
app.use(
  helmet({
    hsts: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ─── CSRF Token Endpoint ────────────────────────────────────
app.get("/api/csrf-token", (req, res) => {
  const csrfToken = generateCsrfToken(req, res);
  res.status(200).json({ csrfToken, message: "CSRF token sent" });
});

// ─── Auth Module Routes ─────────────────────────────────────
app.use("/api/auth", authRoutes);

// ─── SaaS Module Routes ─────────────────────────────────────
app.use("/api/admin/students", studentsRoutes);
app.use("/api/admin/professors", professorsRoutes);
app.use("/api/admin/supervisors", supervisorsRoutes);
app.use("/api/admin/coaches", coachesRoutes);
app.use("/api/admin/skills", skillsRoutes);
app.use("/api/admin/classes", classesRoutes);
app.use("/api/signals", signalsRoutes);
app.use("/api/evaluations", evaluationsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/profile", profileRoutes);

// ─── Static Files ───────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ─── Rate Limiting ──────────────────────────────────────────
app.use(serverLimiter);

// ─── Admin Routes (Legacy) ──────────────────────────────────
app.use("/admin/students", studentRoute);
app.use("/admin/professors", professorRoute);
app.use("/admin/supervisors", supervisorRoute);
app.use("/admin/skills", skillRoute);
app.use("/admin/class", classRoute);
app.use("/admin/coachs", coachRoute);
app.use("/admin/signals", signalRoute);
app.use("/admin/profile", profileRoute);

// ─── Password Reset Routes (Legacy) ─────────────────────────
app.get("/api/validate-reset-token", authenticateResetToken, authController.check);
app.post(
  "/api/resetpass",
  validate(authValidation.Password),
  authenticateResetToken,
  authController.ResetPassEmail
);

// ─── Misc Routes (Legacy) ───────────────────────────────────
app.use("/api/contactus", contactus);
app.use("/api/hash", hashRoute);

// ─── Dashboard Routes (Legacy) ──────────────────────────────
app.use("/api/DashAdmin", DashAdminRoute);
app.use("/api/GlobalOverView", EvaluationAdminRoute);

// ─── Professor Routes (Legacy) ──────────────────────────────
app.use("/api/prof_evaluation_history", prof_evaluation_history);
app.use("/api/prof_evaluation_classes", prof_evaluation_classes);
app.use("/api/prof_project_management", prof_project_management);
app.use("/api/signal_history", prof_signal_history);
app.use("/api/signal_classes", prof_signal_classes);
app.use("/prof/dashboard", dashRoute);
app.use("/api/report", student_report);

// ─── Student Routes (Legacy) ────────────────────────────────
app.use("/student/dashboard", dashstudent);
app.use("/student/projects", prjectStudent);
app.use("/student/notifications", notifiRoute);

// ─── PDF Generation ─────────────────────────────────────────
app.post("/api/generate-pdf", async (req, res) => {
  try {
    const { profile, evale, signals, commentResults } = req.body;

    if (
      !profile || typeof profile !== "object" || Array.isArray(profile) ||
      !evale || typeof evale !== "object" || Array.isArray(evale) ||
      !signals || typeof signals !== "object" || Array.isArray(signals) ||
      !commentResults || typeof commentResults !== "object" || Array.isArray(commentResults)
    ) {
      return res.status(400).json({ error: "Invalid or missing data in request body." });
    }

    const html = await ejs.renderFile(
      path.join(__dirname, "templates", "invoice.ejs"),
      { profile, evale, signals, commentResults }
    );

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });

    await browser.close();

    res
      .status(200)
      .header("Content-Type", "application/pdf")
      .header("Content-Disposition", "attachment; filename=profile.pdf")
      .send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: "PDF generation failed." });
  }
});

// ─── Health Check ───────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ─── Global Error Handler ───────────────────────────────────
app.use(errorHandler);

module.exports = app;
