// ─── Student Pages ──────────────────────────────────────────
import DashboardPage from "@/features/student/pages/DashboardPage.vue";
import EvaluationsPage from "@/features/student/pages/EvaluationsPage.vue";
import ProjectsPage from "@/features/student/pages/ProjectsPage.vue";
import SignalsPage from "@/features/student/pages/SignalsPage.vue";
import SelfEvalPage from "@/features/student/pages/SelfEvalPage.vue";
import ReportsPage from "@/features/student/pages/ReportsPage.vue";
import NotificationsPage from "@/features/student/pages/NotificationsPage.vue";

// ─── Student Feature Components ─────────────────────────────
import CompletionRate from "@/features/student/components/CompletionRate.vue";
import StudSolution from "@/features/student/components/StudSolution.vue";
import StudReason from "@/features/student/components/StudReason.vue";
import skillsChoseen from "@/features/student/components/skillsChoseen.vue";
import evalSkills from "@/features/student/components/evalSkills.vue";
import skillsEnd from "@/features/student/components/skillsEnd.vue";
import end from "@/features/student/components/end.vue";

const studentRoutes = [
    {
        name: "dashstud",
        component: DashboardPage,
        path: "/dashstud",
        meta: { role: "student" },
    },
    {
        name: "StudEvals",
        component: EvaluationsPage,
        path: "/StudEvals",
        meta: { role: "student" },
    },
    {
        name: "StudProject",
        component: ProjectsPage,
        path: "/StudProject",
        meta: { role: "student" },
    },
    {
        name: "StudSignals",
        component: SignalsPage,
        path: "/StudSignals",
        meta: { role: "student" },
    },
    {
        name: "selfEval",
        component: SelfEvalPage,
        path: "/selfEval",
        meta: { role: "student" },
    },
    {
        name: "StudRapport",
        component: ReportsPage,
        path: "/StudRapport",
        meta: { role: "student" },
    },
    {
        name: "StudNotif",
        component: NotificationsPage,
        path: "/StudNotif",
        meta: { role: "student" },
    },
    {
        name: "CompletionRate",
        component: CompletionRate,
        path: "/CompletionRate",
        meta: { role: "student" },
    },
    {
        name: "StudSolution",
        component: StudSolution,
        path: "/StudSolution",
        meta: { role: "student" },
    },
    {
        name: "StudReason",
        component: StudReason,
        path: "/StudReason",
        meta: { role: "student" },
    },
    {
        name: "skillsChoseen",
        component: skillsChoseen,
        path: "/skillsChoseen",
        meta: { role: "student" },
    },
    {
        name: "evalSkills",
        component: evalSkills,
        path: "/evalSkills",
        meta: { role: "student" },
    },
    {
        name: "skillsEnd",
        component: skillsEnd,
        path: "/skillsEnd",
        meta: { role: "student" },
    },
    {
        name: "end",
        component: end,
        path: "/end",
        meta: { role: "student" },
    },
];

export default studentRoutes;
