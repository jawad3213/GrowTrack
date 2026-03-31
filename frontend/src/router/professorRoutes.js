// ─── Professor Pages ────────────────────────────────────────
import DashboardPage from "@/features/professor/pages/DashboardPage.vue";
import ClassesEvalPage from "@/features/professor/pages/ClassesEvalPage.vue";
import EvalHistoryPage from "@/features/professor/pages/EvalHistoryPage.vue";
import ProjectManagementPage from "@/features/professor/pages/ProjectManagementPage.vue";
import ProjectDetailsPage from "@/features/professor/pages/ProjectDetailsPage.vue";
import SignalClassesPage from "@/features/professor/pages/SignalClassesPage.vue";
import SignalHistoryPage from "@/features/professor/pages/SignalHistoryPage.vue";
import ReportPage from "@/features/professor/pages/ReportPage.vue";
import NotificationsPage from "@/features/professor/pages/NotificationsPage.vue";
import GeneratePdfPage from "@/features/professor/pages/GeneratePdfPage.vue";

// ─── Professor Feature Components ───────────────────────────
import AddProject from "@/features/professor/components/AddProject.vue";
import AddMembers from "@/features/professor/components/AddMembers.vue";
import GroupMembers from "@/features/professor/components/GroupMembers.vue";
import AddMemberForm from "@/features/professor/components/AddMemberForm.vue";
import ChooseSkills from "@/features/professor/components/ChooseSkills.vue";
import SkillsChoosen from "@/features/professor/components/SkillsChoosen.vue";
import courseEvaluation from "@/features/professor/components/courseEvaluation.vue";
import EndEval from "@/features/professor/components/EndEval.vue";
import Thanku from "@/features/professor/components/Thanku.vue";
import ViewEval from "@/features/professor/components/ViewEval.vue";
import NewSignal from "@/features/professor/components/NewSignal.vue";
import ViewHistory from "@/features/professor/components/ViewHistory.vue";
import SolutionSignal from "@/features/professor/components/SolutionSignal.vue";
import SolutionErrror from "@/features/professor/components/SolutionErrror.vue";

const professorRoutes = [
    {
        name: "DashboardProf",
        component: DashboardPage,
        path: "/DashboardProf",
        meta: { role: "Professor" },
    },
    {
        name: "GeneratePdf",
        component: GeneratePdfPage,
        path: "/gen",
        meta: { role: "Professor" },
    },
    {
        path: "/AddMember/:id_group",
        name: "AddMember",
        component: AddMemberForm,
        props: true,
        meta: { role: "Professor" },
    },
    {
        path: "/GroupMembers/:id_group",
        name: "GroupMembers",
        component: GroupMembers,
        meta: { role: "Professor" },
    },
    {
        name: "ClassesEval",
        component: ClassesEvalPage,
        path: "/ClassesEval",
        meta: { role: "Professor" },
    },
    {
        name: "HistoriqueEval",
        component: EvalHistoryPage,
        path: "/HistoriqueEval",
        meta: { role: "Professor" },
    },
    {
        name: "ProjectMang",
        component: ProjectManagementPage,
        path: "/ProjectMang",
        meta: { role: "Professor" },
    },
    {
        name: "ClassesSignal",
        component: SignalClassesPage,
        path: "/ClassesSignal",
        meta: { role: "Professor" },
    },
    {
        name: "HistoriqueSignal",
        component: SignalHistoryPage,
        path: "/HistoriqueSignal",
        meta: { role: "Professor" },
    },
    {
        name: "Rapport",
        component: ReportPage,
        path: "/Rapport",
        meta: { role: "Professor" },
    },
    {
        name: "Notification",
        component: NotificationsPage,
        path: "/Notification",
        meta: { role: "Professor" },
    },
    {
        name: "AddProject",
        component: AddProject,
        path: "/AddProject",
        meta: { role: "Professor" },
    },
    {
        name: "AddMembers",
        component: AddMembers,
        path: "/AddMembers",
        meta: { role: "Professor" },
    },
    {
        name: "NewSignal",
        component: NewSignal,
        path: "/newsignal",
        meta: { role: "Professor" },
    },
    {
        name: "ViewHistory",
        component: ViewHistory,
        path: "/viewhistory",
        meta: { role: "Professor" },
    },
    {
        name: "SolutionSignal",
        component: SolutionSignal,
        path: "/SolutionSignal",
        meta: { role: "Professor" },
    },
    {
        name: "SolutionError",
        component: SolutionErrror,
        path: "/SolutionError",
        meta: { role: "Professor" },
    },
    {
        name: "ChooseSkills",
        component: ChooseSkills,
        path: "/ChooseSkills",
        meta: { role: "Professor" },
    },
    {
        name: "SkillsChoosen",
        component: SkillsChoosen,
        path: "/SkillsChoosen",
        meta: { role: "Professor" },
    },
    {
        name: "courseEvaluation",
        component: courseEvaluation,
        path: "/courseEvaluation",
        meta: { role: "Professor" },
    },
    {
        name: "EndEval",
        component: EndEval,
        path: "/EndEval",
        meta: { role: "Professor" },
    },
    {
        name: "Thanku",
        component: Thanku,
        path: "/Thanku",
        meta: { role: "Professor" },
    },
    {
        name: "ViewEval",
        component: ViewEval,
        path: "/ViewEval",
        meta: { role: "Professor" },
    },
    {
        name: "ProjectDetails",
        component: ProjectDetailsPage,
        path: "/ProjectDetails",
        meta: { role: "Professor" },
    },
];

export default professorRoutes;
