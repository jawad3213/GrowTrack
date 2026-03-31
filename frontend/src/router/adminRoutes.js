// ─── Admin Pages ────────────────────────────────────────────
import DashboardPage from "@/features/admin/pages/DashboardPage.vue";
import StudentsPage from "@/features/admin/pages/StudentsPage.vue";
import ProfessorsPage from "@/features/admin/pages/ProfessorsPage.vue";
import SupervisorsPage from "@/features/admin/pages/SupervisorsPage.vue";
import SkillsPage from "@/features/admin/pages/SkillsPage.vue";
import GroupsPage from "@/features/admin/pages/GroupsPage.vue";
import CalendarPage from "@/features/admin/pages/CalendarPage.vue";
import ProfilePage from "@/features/admin/pages/ProfilePage.vue";
import GlobalOverviewPage from "@/features/admin/pages/GlobalOverviewPage.vue";
import SignalsPage from "@/features/admin/pages/SignalsPage.vue";
import CoachesPage from "@/features/admin/pages/CoachesPage.vue";

// ─── Admin Feature Components ───────────────────────────────
import AddCoach from "@/features/admin/components/AddCoach.vue";
import EditCoach from "@/features/admin/components/EditCoach.vue";
import AddField from "@/features/admin/components/AddField.vue";
import AddProfessorModal from "@/features/admin/components/AddProfessorModal.vue";
import AddSkill from "@/features/admin/components/AddSkill.vue";
import DeleteSkill from "@/features/admin/components/DeleteSkill.vue";
import AddStudentModal from "@/features/admin/components/AddStudentModal.vue";
import AddSupervisorModal from "@/features/admin/components/AddSupervisorModal.vue";
import Evaluation from "@/features/admin/components/Evaluation.vue";
import Personalized from "@/features/admin/components/Personalized.vue";
import Solution from "@/features/admin/components/Solution.vue";
import DeleteStudent from "@/features/admin/components/DeleteStudent.vue";
import DeleteProf from "@/features/admin/components/DeleteProf.vue";
import DeleteSupervisor from "@/features/admin/components/DeleteSupervisor.vue";
import SignalEvaluationModal from "@/features/admin/components/SignalEvaluationModal.vue";

const adminRoutes = [
    {
        name: "dashboard",
        component: DashboardPage,
        path: "/dashboard",
        meta: { role: "admin" },
    },
    {
        name: "Student",
        component: StudentsPage,
        path: "/Student",
        meta: { role: "admin" },
    },
    {
        name: "Professor",
        component: ProfessorsPage,
        path: "/Professor",
        meta: { role: "admin" },
    },
    {
        name: "Supervisor",
        component: SupervisorsPage,
        path: "/Supervisor",
        meta: { role: "admin" },
    },
    {
        name: "Skills",
        component: SkillsPage,
        path: "/Skills",
        meta: { role: "admin" },
    },
    {
        name: "Group",
        component: GroupsPage,
        path: "/Group",
        meta: { role: "admin" },
    },
    {
        name: "Calendar",
        component: CalendarPage,
        path: "/Calendar",
        meta: { role: "admin" },
    },
    {
        name: "UserProfile",
        component: ProfilePage,
        path: "/UserProfile",
        meta: { role: "admin" },
    },
    {
        name: "GlobalOverview",
        component: GlobalOverviewPage,
        path: "/GlobalOverview",
        meta: { role: "admin" },
    },
    {
        name: "Signals",
        component: SignalsPage,
        path: "/Signals",
        meta: { role: "admin" },
    },
    {
        name: "Coach",
        component: CoachesPage,
        path: "/Coach",
        meta: { role: "admin" },
    },
    {
        name: "AddCoach",
        component: AddCoach,
        path: "/AddCoach",
        meta: { role: "admin" },
    },
    {
        name: "AddField",
        component: AddField,
        path: "/AddField",
        meta: { role: "admin" },
    },
    {
        name: "EditCoach",
        component: EditCoach,
        path: "/EditCoach/:id_coach",
        props: true,
        meta: { edit: true },
    },
    {
        name: "AddProfessorModal",
        component: AddProfessorModal,
        path: "/AddProfessor",
        meta: { role: "admin" },
    },
    {
        name: "AddSkill",
        component: AddSkill,
        path: "/AddSkill",
        meta: { role: "admin" },
    },
    {
        name: "EditSkill",
        component: AddSkill,
        path: "/AddSkill/:skill_name",
        props: true,
        meta: { edit: true, role: "admin" },
    },
    {
        name: "DeleteSkill",
        component: DeleteSkill,
        path: "/DeleteSkill/:id",
        props: true,
        meta: { edit: true, role: "admin" },
    },
    {
        name: "AddStudentModal",
        component: AddStudentModal,
        path: "/AddStudent",
        meta: { role: "admin" },
    },
    {
        name: "EditStudentModal",
        component: AddStudentModal,
        path: "/AddStudent/:cin",
        props: true,
        meta: { edit: true, role: "admin" },
    },
    {
        name: "AddSupervisorModal",
        component: AddSupervisorModal,
        path: "/AddSupervisor",
        meta: { role: "admin" },
    },
    {
        name: "Evaluation",
        component: Evaluation,
        path: "/Evaluation",
        meta: { role: "admin" },
    },
    {
        name: "Personalized",
        component: Personalized,
        path: "/Personalized",
        meta: { role: "admin" },
    },
    {
        name: "SignalModal/:id",
        component: SignalEvaluationModal,
        path: "/SignalModal",
        props: true,
        meta: { role: "admin" },
    },
    {
        name: "Solution",
        component: Solution,
        path: "/Solution",
        meta: { role: "admin" },
    },
    {
        name: "DeleteStudent",
        component: DeleteStudent,
        path: "/DeleteStudent/:id_member",
        meta: { role: "admin" },
    },
    {
        name: "DeleteProf",
        component: DeleteProf,
        path: "/Deleteprof/:id_member",
        meta: { role: "admin" },
    },
    {
        name: "DeleteSupervisor",
        component: DeleteSupervisor,
        path: "/DeleteSupervisor/:id_member",
        meta: { role: "admin" },
    },
];

export default adminRoutes;
