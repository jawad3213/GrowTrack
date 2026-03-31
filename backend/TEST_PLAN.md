# Backend Test Plan

## Overview
This test plan covers all backend components including legacy and new modular architecture.

---

## 1. AUTHENTICATION & AUTHORIZATION

### 1.1 Auth Model (`models/authModel.js`, `src/modules/auth/auth.model.js`)
- [ ] `LoginModel()` - valid credentials returns user
- [ ] `LoginModel()` - invalid credentials throws error
- [ ] `RegisterModel()` - creates new user
- [ ] `RegisterModel()` - duplicate email throws error
- [ ] Password hashing works correctly

### 1.2 Auth Controller (`controllers/authController.js`, `src/modules/auth/auth.controller.js`)
- [ ] POST /api/auth/login - success returns tokens
- [ ] POST /api/auth/login - wrong password returns 401
- [ ] POST /api/auth/logout - clears cookies
- [ ] POST /api/auth/refresh - refreshes tokens
- [ ] GET /api/auth/check - returns user info

### 1.3 Middlewares (`middlewares/VerifyToken.js`, `src/middleware/authenticate.js`)
- [ ] Valid token allows access
- [ ] Missing token returns 401
- [ ] Expired token returns 401
- [ ] Invalid token returns 401

### 1.4 Role Verification (`middlewares/verificationRole.js`, `src/middleware/authorize.js`)
- [ ] Admin access to admin routes
- [ ] Professor access to professor routes
- [ ] Student access to student routes
- [ ] Unauthorized role returns 403

---

## 2. STUDENT MODULE

### 2.1 Student Model (`models/adminModels/studentModel.js`)
- [ ] `getAllStudents()` - returns all students
- [ ] `getStudentByCin()` - returns single student
- [ ] `createStudent()` - creates new student
- [ ] `updateStudent()` - updates student
- [ ] `deleteStudent()` - deletes student
- [ ] `getStudentStats()` - returns statistics

### 2.2 Student Controller (`controllers/adminControllers/studentController.js`)
- [ ] GET /admin/students - returns paginated list
- [ ] GET /admin/students/search?cin=XXX - returns student
- [ ] POST /admin/students/create - creates student
- [ ] PATCH /admin/students/update/:id - updates student
- [ ] DELETE /admin/students/delete/:id - deletes student
- [ ] GET /admin/students/total - returns count
- [ ] GET /admin/students/class?classe=XXX - returns by class
- [ ] GET /admin/students/sector?sector=XXX - returns by sector
- [ ] GET /admin/students/stats - returns stats

---

## 3. PROFESSOR MODULE

### 3.1 Professor Model (`models/adminModels/professorModel.js`)
- [ ] `getAllProfessors()` - returns all
- [ ] `getProfessorByCin()` - returns single
- [ ] `createProfessor()` - creates new
- [ ] `updateProfessor()` - updates
- [ ] `deleteProfessor()` - deletes

### 3.2 Professor Controller (`controllers/adminControllers/professorController.js`)
- [ ] GET /admin/professors - returns list
- [ ] GET /admin/professors/search?cin=XXX - returns professor
- [ ] POST /admin/professors/create - creates professor
- [ ] PATCH /admin/professors/update/:id - updates professor
- [ ] DELETE /admin/professors/delete/:id - deletes professor

### 3.3 Professor Dashboard (`models/profModels/dashModel.js`, `controllers/profController/dashController.js`)
- [ ] GET /prof/dashboard - returns dashboard data

---

## 4. SUPERVISOR MODULE

### 4.1 Supervisor Model (`models/adminModels/supervisorModel.js`)
- [ ] `getAllSupervisors()` - returns all
- [ ] `getSupervisorByCin()` - returns single
- [ ] `createSupervisor()` - creates new
- [ ] `updateSupervisor()` - updates
- [ ] `deleteSupervisor()` - deletes

### 4.2 Supervisor Controller (`controllers/adminControllers/supervisorController.js`)
- [ ] GET /admin/supervisors - returns list
- [ ] POST /admin/supervisors/create - creates
- [ ] PATCH /admin/supervisors/update/:id - updates
- [ ] DELETE /admin/supervisors/delete/:id - deletes

---

## 5. COACH MODULE

### 5.1 Coach Model (`models/adminModels/coachModel.js`)
- [ ] `getAllCoaches()` - returns all
- [ ] `getCoachById()` - returns single
- [ ] `createCoach()` - creates new
- [ ] `updateCoach()` - updates
- [ ] `deleteCoach()` - deletes

### 5.2 Coach Controller (`controllers/adminControllers/coachController.js`)
- [ ] GET /admin/coachs - returns list
- [ ] POST /admin/coachs/create - creates
- [ ] PATCH /admin/coachs/update/:id - updates
- [ ] DELETE /admin/coachs/delete/:id - deletes

---

## 6. SKILLS MODULE

### 6.1 Skill Model (`models/adminModels/skillModel.js`, `src/modules/skills/skill.model.js`)
- [ ] `getAllSkills()` - returns all
- [ ] `getSkillById()` - returns single
- [ ] `createSkill()` - creates new
- [ ] `updateSkill()` - updates
- [ ] `deleteSkill()` - deletes

### 6.2 Skill Controller (`controllers/adminControllers/skillController.js`, `src/modules/skills/skill.controller.js`)
- [ ] GET /admin/skills - returns list
- [ ] POST /admin/skills/create - creates
- [ ] PATCH /admin/skills/update/:id - updates
- [ ] DELETE /admin/skills/delete/:id - deletes

---

## 7. CLASS MODULE

### 7.1 Class Model (`models/adminModels/classModel.js`, `src/modules/classes/class.model.js`)
- [ ] `getAllClasses()` - returns all
- [ ] `getClassById()` - returns single
- [ ] `createClass()` - creates new
- [ ] `updateClass()` - updates
- [ ] `deleteClass()` - deletes

### 7.2 Class Controller (`controllers/adminControllers/classController.js`, `src/modules/classes/class.controller.js`)
- [ ] GET /admin/class - returns list
- [ ] POST /admin/class/create - creates
- [ ] PATCH /admin/class/update/:id - updates
- [ ] DELETE /admin/class/delete/:id - deletes

---

## 8. SIGNALS MODULE

### 8.1 Signal Model (`models/adminModels/signalModel.js`, `src/modules/signals/signal.model.js`)
- [ ] `getAllSignals()` - returns all
- [ ] `getSignalById()` - returns single
- [ ] `createSignal()` - creates new
- [ ] `updateSignal()` - updates
- [ ] `deleteSignal()` - deletes

### 8.2 Signal Controller (`controllers/adminControllers/signalConroller.js`, `src/modules/signals/signal.controller.js`)
- [ ] GET /admin/signals - returns list
- [ ] POST /admin/signals/create - creates
- [ ] PATCH /admin/signals/update/:id - updates
- [ ] DELETE /admin/signals/delete/:id - deletes

### 8.3 Professor Signal Routes (`routes/professorRoutes/signalHistoryRoute.js`, `signalClassesRoute.js`)
- [ ] GET /api/signal_history - returns signal history
- [ ] GET /api/signal_classes - returns signals by class

---

## 9. EVALUATIONS MODULE

### 9.1 Evaluation Models
- [ ] `models/profModels/evaluation_Model_history.js` - history evaluations
- [ ] `models/profModels/evaluation_Model_classes.js` - class evaluations

### 9.2 Evaluation Controllers
- [ ] GET /api/prof_evaluation_history - returns history
- [ ] GET /api/prof_evaluation_classes - returns by class

---

## 10. PROJECTS MODULE

### 10.1 Project Model (`models/studentModels/projectModel.js`, `src/modules/projects/project.model.js`)
- [ ] `getAllProjects()` - returns all
- [ ] `getProjectById()` - returns single
- [ ] `createProject()` - creates new
- [ ] `updateProject()` - updates
- [ ] `deleteProject()` - deletes

### 10.2 Project Controller (`controllers/studentControllers/projectController.js`, `src/modules/projects/project.controller.js`)
- [ ] GET /student/projects - returns list
- [ ] POST /student/projects/create - creates
- [ ] PATCH /student/projects/update/:id - updates
- [ ] DELETE /student/projects/delete/:id - deletes

### 10.3 Professor Project Management
- [ ] GET /api/prof_project_management - returns all projects

---

## 11. PROFILE MODULE

### 11.1 Profile Model (`models/adminModels/profileModel.js`, `src/modules/profile/profile.model.js`)
- [ ] `getProfile()` - returns profile
- [ ] `updateProfile()` - updates profile

### 11.2 Profile Controller (`controllers/adminControllers/profileController.js`, `src/modules/profile/profile.controller.js`)
- [ ] GET /admin/profile - returns profile
- [ ] PUT /admin/profile - updates profile

---

## 12. NOTIFICATIONS MODULE

### 12.1 Notification Model (`models/studentModels/notifiModel.js`, `src/modules/notifications/notification.model.js`)
- [ ] `getNotifications()` - returns all
- [ ] `createNotification()` - creates new
- [ ] `markAsRead()` - marks as read

### 12.2 Notification Controller (`controllers/studentControllers/notifiController.js`, `src/modules/notifications/notification.controller.js`)
- [ ] GET /student/notifications - returns notifications
- [ ] POST /student/notifications/create - creates

---

## 13. DASHBOARD MODELS

### 13.1 Admin Dashboard
- [ ] `models/adminModels/AdminDashboardModel.js` - admin stats
- [ ] `models/adminModels/GlobalOverView_Model.js` - overview stats

### 13.2 Student Dashboard
- [ ] `models/studentModels/dashModel.js` - student dashboard data

### 13.3 Professor Dashboard
- [ ] `models/profModels/dashModel.js` - professor dashboard data

---

## 14. VALIDATORS

### 14.1 Auth Validators (`validators/authrules.js`)
- [ ] Login validation rules
- [ ] Register validation rules
- [ ] Password reset validation

### 14.2 Admin Validators (`validators/adminValidation.js`, `validators/adminInputsRules.js`)
- [ ] Student input validation
- [ ] Professor input validation
- [ ] Class input validation
- [ ] Skill input validation

---

## 15. INTEGRATION TESTS

- [ ] Full login flow
- [ ] Token refresh flow
- [ ] CRUD operations flow
- [ ] Role-based access flow

---

## 16. EDGE CASES

- [ ] Empty database responses
- [ ] Invalid input handling
- [ ] Concurrent requests
- [ ] Large data sets
- [ ] Special characters in input
- [ ] Null/undefined values

---

## Test Execution Commands

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run specific test file
npm test -- --testPathPattern=studentModel.test.js

# Run with coverage
npm test -- --coverage
```

---

## Priority Order

1. **Critical** - Auth, Login, Token refresh
2. **High** - Student CRUD, Professor CRUD, Dashboard
3. **Medium** - Skills, Classes, Signals
4. **Low** - Notifications, Reports, Edge cases