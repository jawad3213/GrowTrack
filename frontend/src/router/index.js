import { createRouter, createWebHistory } from "vue-router";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";
import professorRoutes from "./professorRoutes";
import studentRoutes from "./studentRoutes";

const routes = [
    ...publicRoutes,
    ...adminRoutes,
    ...professorRoutes,
    ...studentRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

import { useAuthStore } from '@/stores/auth';

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    if (to?.meta?.DoNotrequiresAuth) {
        return next();
    }
    if (!auth.isAuthenticated) {
        try {
            await auth.checkAuth();
            if (to?.meta?.role && to.meta.role !== auth.Role) {
                return next('/Error');
            }
            return next();
        } catch (error) {
            console.log('Authentication check failed:', error);
            return next('/Login');
        }
    } else {
        if (to?.meta?.role && to.meta.role !== auth.Role) {
            return next('/Error');
        }
        return next();
    }
});

export default router;
