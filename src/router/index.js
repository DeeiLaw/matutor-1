import Login from '../pages/Login.vue'
import Landing from '../pages/Landing.vue'
// import RegisterLearner from '../pages/Register/RegisterLearner.vue'
// import RegisterTutor from '../pages/Register/RegisterTutor.vue'
import RegisterTutorCenter from '../pages/Register/RegisterTutorCenter.vue'
import adminDashboard from '../pages/admin/admin_dash.vue'
import adminRegistrations from '../pages/admin/admin_registrations.vue'
import adminManageUsers from '../pages/admin/admin_edit.vue'
import adminPostings from '../pages/admin/admin_posts.vue'
import tutorcenter_dashboard from '../pages/tutor_center/tc_dash.vue'
import tutorcenter_mytutors from '../pages/tutor_center/tc_tutors.vue'


import {createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase';

const ifNotAuthenticated = (to, from, next) => {
    if (!store.state. isUserLoggedIn) {
        next();
        return;
    }
    next("/");
};

const ifAuthenticated = (to, from, next) => {
    if (store.state. isUserLoggedIn) {
        next();
        return;
    }
    next("/login");
};

const routes = [
    {   
        path: '/', 
        name: 'Landing', 
        component: Landing
    },
    {
        path: '/login', 
        name: 'Login', 
        component: Login
    },
    // {
    //     path: '/register-learner', 
    //     name: 'RegisterLearner', 
    //     component: RegisterLearner
    // },
    // {
    //     path: '/register-tutor', 
    //     name: 'RegisterTutor', 
    //     component: RegisterTutor
    // },
    {
        path: '/register-tutorcenter', 
        name: 'RegisterTutorCenter', 
        component: RegisterTutorCenter
    },
    {
        path: '/dashboard',
        name: 'tutorcenter_dashboard',
        component: tutorcenter_dashboard,
        //require auth as normal user here
    },
    {
        path: '/my-tutors',
        name: 'tutorcenter_mytutors',
        component: tutorcenter_mytutors,
        //require auth as normal user here
    },
    {
        path: '/admin/dashboard',
        name: 'admin_dashboard',
        component: adminDashboard,
        beforeEnter: ifAuthenticated,
        meta: { requiresAuth: true }, 
        //Add meta field to indicate authentication requirement
        beforeEnter: (to, from, next) => {
            // Check if the user is authenticated
            const user = auth.currentUser;
            if (user) {
                next(); // Continue to the route
            } else {
                next('/login'); // Redirect to the login page
            }
        }
    },
    {
        path: '/admin/manage-users',
        name: 'admin_manageUsers',
        component: adminManageUsers,
        meta: { requiresAuth: true },
        // Add meta field to indicate authentication requirement
        beforeEnter: (to, from, next) => {
            // Check if the user is authenticated
            const user = auth.currentUser;
            if (user) {
                next(); // Continue to the route
            } else {
                next('/login'); // Redirect to the login page
            }
        }
    },
    {
        path: '/admin/registrations',
        name: 'admin_registrations',
        component: adminRegistrations,
        meta: { requiresAuth: true }, 
        // Add meta field to indicate authentication requirement
        beforeEnter: (to, from, next) => {
            // Check if the user is authenticated
            const user = auth.currentUser;
            if (user) {
                next(); // Continue to the route
            } else {
                next('/login'); // Redirect to the login page
            }
        }
    },
    {
        path: '/admin/postings',
        name: 'admin_postings',
        component: adminPostings,
        meta: { requiresAuth: true }, 
        // Add meta field to indicate authentication requirement
        beforeEnter: (to, from, next) => {
            // Check if the user is authenticated
            const user = auth.currentUser;
            if (user) {
                next(); // Continue to the route
            } else {
                next('/login'); // Redirect to the login page
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router