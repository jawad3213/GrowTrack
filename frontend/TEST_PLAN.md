# Frontend Test Plan

## Current Test Status

### Tests Existing (6 files, 99 tests)
| Category | File | Tests |
|----------|------|-------|
| Stores | `student.test.js` | 20 |
| Stores | `prof.test.js` | 19 |
| Stores | `coach.test.js` | 23 |
| Stores | `contact.test.js` | 5 |
| Components | `contactUs.test.js` | 10 |
| Components | `rejected.test.js` | 22 |

---

## Test Plan

### Phase 1: Complete Store Tests (Priority: HIGH)

#### 1.1 Auth Store (`src/stores/auth.js`)
**Priority: Critical**

| Test Case | Description |
|----------|-------------|
| `login` | Should authenticate user with valid credentials |
| `login` | Should handle invalid credentials error |
| `logout` | Should clear auth state and token |
| `forgotPassword` | Should call forgot password API |
| `forgotPassword` | Should handle API errors |
| `register` | Should register new user |
| `register` | Should handle validation errors |
| `refreshToken` | Should refresh expired token |
| `refreshToken` | Should handle refresh failure |
| `Clearstatus` | Should reset error/success states |
| `checkAuth` | Should verify user is authenticated |

#### 1.2 Form Store (`src/stores/form.js`)
**Priority: High**

| Test Case | Description |
|----------|-------------|
| `sanitizeInputs` | Should trim whitespace |
| `sanitizeInputs` | Should escape HTML characters |
| `validateWithSchema` | Should validate against schema |
| `validateWithSchema` | Should return validation errors |
| `submitForm` | Should submit POST request |
| `submitForm` | Should handle network errors |
| `clearStatus` | Should reset form state |

---

### Phase 2: Authentication Pages Tests (Priority: HIGH)

#### 2.1 LoginPage (`src/features/auth/pages/LoginPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders email input | Should display email field |
| Renders password input | Should display password field |
| Renders submit button | Should display login button |
| Updates email value | Should update email on input |
| Updates password value | Should update password on input |
| Submits form | Should call auth store login |
| Shows error on failure | Should display error message |
| Navigation | Should redirect to dashboard on success |

#### 2.2 ForgotPasswordPage (`src/features/auth/pages/ForgotPasswordPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders email input | Should display email field |
| Submits form | Should call forgotPassword |
| Shows success state | Should show confirmation after submit |
| Shows error | Should display error message |

#### 2.3 ResetPasswordPage (`src/features/auth/pages/ResetPasswordPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders password inputs | Should display new/confirm password |
| Validates password match | Should error if passwords don't match |
| Submits form | Should call reset password API |

#### 2.4 CheckPage (`src/features/auth/pages/CheckPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders check email page | Should display check your email message |
| Resend link | Should allow resending reset link |

---

### Phase 3: Admin Pages Tests (Priority: MEDIUM)

#### 3.1 DashboardPage (`src/features/admin/pages/DashboardPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders stats cards | Should display admin stats |
| Loads dashboard data | Should fetch dashboard data on mount |
| Shows loading state | Should display loading spinner |
| Shows error state | Should handle fetch errors |

#### 3.2 StudentsPage (`src/features/admin/pages/StudentsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders student table | Should display student list |
| Search students | Should filter by search term |
| Add student | Should open add student modal |
| Edit student | Should open edit modal |
| Delete student | Should call delete API |
| Pagination | Should navigate pages |

#### 3.3 ProfessorsPage (`src/features/admin/pages/ProfessorsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders table | Should display professor list |
| Add professor | Should open add modal |
| Edit professor | Should open edit modal |
| Delete professor | Should call delete API |

#### 3.4 SupervisorsPage (`src/features/admin/pages/SupervisorsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders table | Should display supervisor list |
| CRUD operations | Should support add/edit/delete |

#### 3.5 SkillsPage (`src/features/admin/pages/SkillsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders skills list | Should display skills |
| Add skill | Should create new skill |
| Delete skill | Should remove skill |

#### 3.6 GroupsPage (`src/features/admin/pages/GroupsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders groups | Should display groups |
| Create group | Should create new group |
| Assign students | Should assign students to group |

#### 3.7 SignalsPage (`src/features/admin/pages/SignalsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders signals | Should display signals list |
| View signal details | Should show signal evaluation |
| Approve/reject signal | Should update signal status |

#### 3.8 ProfilePage (`src/features/admin/pages/ProfilePage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders profile | Should display admin profile |
| Updates profile | Should save profile changes |

---

### Phase 4: Professor Pages Tests (Priority: MEDIUM)

#### 4.1 DashboardPage (`src/features/professor/pages/DashboardPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders stats | Should display professor dashboard |
| Shows student progress | Should display student evaluations |

#### 4.2 ProjectManagementPage (`src/features/professor/pages/ProjectManagementPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders projects | Should display projects list |
| Add project | Should create new project |
| Edit project | Should update project |
| Delete project | Should remove project |
| View details | Should show project details |

#### 4.3 SignalHistoryPage (`src/features/professor/pages/SignalHistoryPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders history | Should display signal history |
| Filters by date | Should filter by date range |

#### 4.4 SignalClassesPage (`src/features/professor/pages/SignalClassesPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders classes | Should display class signals |
| Evaluate class | Should open evaluation modal |

#### 4.5 EvalHistoryPage (`src/features/professor/pages/EvalHistoryPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders history | Should display evaluation history |
| Filter by student | Should filter by student |

#### 4.6 ClassesEvalPage (`src/features/professor/pages/ClassesEvalPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders classes | Should display classes |
| Evaluate student | Should submit evaluation |

#### 4.7 NotificationsPage (`src/features/professor/pages/NotificationsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders notifications | Should display notifications |
| Mark as read | Should update notification status |

#### 4.8 ReportPage (`src/features/professor/pages/ReportPage.vue`)

| Test Case | Description |
|----------|-------------|
| Generate PDF | Should generate report PDF |
| Download report | Should download report |

---

### Phase 5: Student Pages Tests (Priority: MEDIUM)

#### 5.1 DashboardPage (`src/features/student/pages/DashboardPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders stats | Should display student stats |
| Shows progress | Should show completion rate |

#### 5.2 ProjectsPage (`src/features/student/pages/ProjectsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders projects | Should display assigned projects |
| Submit solution | Should submit project solution |

#### 5.3 SignalsPage (`src/features/student/pages/SignalsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders signals | Should display available signals |
| Submit signal | Should submit new signal |

#### 5.4 EvaluationsPage (`src/features/student/pages/EvaluationsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders evaluations | Should display evaluations |
| View details | Should show evaluation details |

#### 5.5 ReportsPage (`src/features/student/pages/ReportsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders reports | Should display student reports |

#### 5.6 SelfEvalPage (`src/features/student/pages/SelfEvalPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders form | Should display self-evaluation form |
| Submit evaluation | Should submit self-evaluation |

#### 5.7 NotificationsPage (`src/features/student/pages/NotificationsPage.vue`)

| Test Case | Description |
|----------|-------------|
| Renders notifications | Should display notifications |

---

### Phase 6: UI Components Tests (Priority: LOW)

| Component | Test Cases |
|-----------|------------|
| `SaaSTable.vue` | Renders, pagination, sorting, search |
| `SaaSModal.vue` | Open/close, animations |
| `SaaSButton.vue` | States, variants, disabled |
| `SaaSCard.vue` | Renders with content |
| `PaginationControl.vue` | Page navigation |
| `SearchInput.vue` | Search input value update |
| `UserAvatar.vue` | Avatar image display |
| `StatCard.vue` | Stats display |
| `ToastContainer.vue` | Display notifications |
| `ThemeToggler.vue` | Theme switching |
| `PageHeader.vue` | Header content |

---

### Phase 7: Public Pages Tests (Priority: MEDIUM)

#### 7.1 ContactUs (`src/features/public/pages/ContactUs.vue`)

(Already tested - 10 tests)

#### 7.2 AboutUs (`src/features/public/pages/AboutUs.vue`)

| Test Case | Description |
|----------|-------------|
| Renders content | Should display about page |
| Renders team | Should display team members |

#### 7.3 Team (`src/features/public/pages/Team.vue`)

| Test Case | Description |
|----------|-------------|
| Renders team | Should display team members |

#### 7.4 Error (`src/features/public/pages/Error.vue`)

| Test Case | Description |
|----------|-------------|
| Renders error | Should display error page |
| Navigation | Should have back button |

---

## Implementation Order

1. **Phase 1**: Complete stores tests (auth, form)
2. **Phase 2**: Authentication pages
3. **Phase 3**: Admin pages
4. **Phase 4**: Professor pages
5. **Phase 5**: Student pages
6. **Phase 6**: UI components (optional)
7. **Phase 7**: Public pages

## Test File Naming Convention

```
frontend/__tests__/
├── components-tests/
│   ├── auth/
│   │   ├── loginPage.test.js
│   │   ├── forgotPasswordPage.test.js
│   │   └── resetPasswordPage.test.js
│   ├── admin/
│   │   ├── dashboard.test.js
│   │   ├── studentsPage.test.js
│   │   └── ...
│   ├── professor/
│   │   ├── dashboard.test.js
│   │   └── ...
│   ├── student/
│   │   ├── dashboard.test.js
│   │   └── ...
│   └── public/
│       ├── aboutUs.test.js
│       └── ...
├── stores-tests/
│   ├── auth.test.js
│   └── form.test.js
└── components/
    ├── contactUs.test.js (existing)
    └── rejected.test.js (existing)
```

## Testing Libraries Used

- **Framework**: Vitest
- **Testing**: @vue/test-utils
- **Mocking**: vitest mocks, axios-mock-adapter
- **Assertions**: vitest expect

## Running Tests

```bash
# Run all tests
npm run test:unit

# Run specific test file
npm run test:unit -- student.test.js

# Run with coverage
npm run test:unit -- --coverage
```
