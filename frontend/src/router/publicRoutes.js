// ─── Public Pages ───────────────────────────────────────────
import LoadingPage from "@/components/Home/LoadingPage.vue";
import TeachersGenralpage from "@/components/Home/Teachers.vue";
import Students from "@/components/Home/Students.vue";

// ─── Auth Pages ─────────────────────────────────────────────
import LoginPage from "@/features/auth/pages/LoginPage.vue";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage.vue";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage.vue";
import CheckPage from "@/features/auth/pages/CheckPage.vue";

// ─── Public Feature Pages ───────────────────────────────────
import ContactUs from "@/features/public/pages/ContactUs.vue";
import Team from "@/features/public/pages/Team.vue";
import Error from "@/features/public/pages/Error.vue";

const publicRoutes = [
    {
        name: "LoadingPage",
        component: LoadingPage,
        path: "/",
    },
    {
        name: "Error",
        component: Error,
        path: "/Error",
    },
    {
        name: "OurTeam",
        component: Team,
        path: "/OurTeam",
        meta: { DoNotrequiresAuth: true },
    },
    {
        name: "ContactUs",
        component: ContactUs,
        path: "/ContactUs",
        meta: { DoNotrequiresAuth: true },
    },
    {
        name: "TeachersGenralpage",
        component: TeachersGenralpage,
        path: "/Teachers",
        meta: { DoNotrequiresAuth: true },
    },
    {
        name: "Students general page",
        component: Students,
        path: "/Students",
        meta: { DoNotrequiresAuth: true },
    },
    {
        name: "Login",
        component: LoginPage,
        path: "/Login",
        meta: { DoNotrequiresAuth: true },
    },
    {
        name: "restepass",
        component: ResetPasswordPage,
        path: "/resetpass",
        meta: { DoNotrequiresAuth: true },
    },
    {
        name: "forgotepass",
        component: ForgotPasswordPage,
        path: "/forgotpass",
        meta: { DoNotrequiresAuth: true },
    },
    {
        name: "check",
        component: CheckPage,
        path: "/check",
        meta: { DoNotrequiresAuth: true },
    },
];

export default publicRoutes;
