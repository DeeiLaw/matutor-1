import Login from '../pages/Login.vue'
import Landing from '../pages/Landing.vue'
// import RegisterLearner from '../pages/Register/RegisterLearner.vue'
// import RegisterTutor from '../pages/Register/RegisterTutor.vue'
import RegisterTutorCenter from '../pages/Register/RegisterTutorCenter.vue'
import adminDashboard from '../pages/admin/admin_dash.vue'
import adminRegistrations from '../pages/admin/admin_registrations.vue'
import adminManageUsers from '../pages/admin/admin_edit.vue'
import adminPostings from '../pages/admin/admin_posts.vue'
import adminReports from '../pages/admin/admin_reports.vue'
import tutorcenter_dashboard from '../pages/tutor_center/tc_dash.vue'
import tutorcenter_mytutors from '../pages/tutor_center/tc_tutors.vue'
import tutorcenter_reviews from '../pages/tutor_center/tc_reviews.vue'
import tutorcenter_myaccount from '../pages/tutor_center/tc_myaccount.vue'

import {createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase';
// import store from "/store";

// const ifNotAuthenticated = (to, from, next) => {
//     if (!store.state. isUserLoggedIn) {
//         next();
//         return;
//     }
//     next("/");
// };

// const ifAuthenticated = (to, from, next) => {
//     router.beforeEach
//     if (!store.state. isUserLoggedIn) {
//         next("/");
//     } else if(store.state. isUserLoggedIn) {
//         next();
//     } else {
//         next();
//     }
//     console.log(isUserLoggedIn);
//     next("/login");
// };

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
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/mytutors',
        name: 'tutorcenter_mytutors',
        component: tutorcenter_mytutors,
        //require auth as normal user here
    },
    {
        path: '/reviews',
        name: 'tutorcenter_reviews',
        component: tutorcenter_reviews,
        //require auth as normal user here
    },
    {
        path: '/myaccount',
        name: 'tutorcenter_myaccount',
        component: tutorcenter_myaccount,
        //require auth as normal user here
    },
    {
        path: '/admin/dashboard',
        name: 'admin_dashboard',
        component: adminDashboard,
        // beforeEnter: ifAuthenticated,

        meta: { requiresAuth: true }, 
        //Add meta field to indicate authentication requirement
        // beforeEnter: (to, from, next) => {
        //     // Check if the user is authenticated
        //     const user = auth.currentUser;
        //     if (user) {
        //         next(); // Continue to the route
        //     } else {
        //         next('/login'); // Redirect to the login page
        //     }
        // }
    },
    {
        path: '/admin/manage-users',
        name: 'admin_manageUsers',
        component: adminManageUsers,
        meta: { requiresAuth: true },
        // Add meta field to indicate authentication requirement
        // beforeEnter: (to, from, next) => {
        //     // Check if the user is authenticated
        //     const user = auth.currentUser;
        //     if (user) {
        //         next(); // Continue to the route
        //     } else {
        //         next('/login'); // Redirect to the login page
        //     }
        // }
    },
    {
        path: '/admin/registrations',
        name: 'admin_registrations',
        component: adminRegistrations,
        meta: { requiresAuth: true },

        // Add meta field to indicate authentication requirement
        // beforeEnter: (to, from, next) => {
        //     // Check if the user is authenticated
        //     const user = auth.currentUser;
        //     if (user) {
        //         next(); // Continue to the route
        //     } else {
        //         next('/login'); // Redirect to the login page
        //     }
        // }
    },
    {
        path: '/admin/postings',
        name: 'admin_postings',
        component: adminPostings,
        meta: { requiresAuth: true }, 
        // Add meta field to indicate authentication requirement
        // beforeEnter: (to, from, next) => {
        //     // Check if the user is authenticated
        //     const user = auth.currentUser;
        //     if (user) {
        //         next(); // Continue to the route
        //     } else {
        //         next('/login'); // Redirect to the login page
        //     }
        // }
    },
    {
        path: '/admin/reports',
        name: 'admin_reports',
        component: adminReports,
        meta: { requiresAuth: true },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const user = auth.currentUser;
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated() && !isLoggedin()) {
            next({
                name: 'Login'
            })
        } else if(isAuthenticated() && isLoggedin()) {
            next();
        } else {
            next();
        }
    } else{
        next();
    }

});

function isAuthenticated(){
    if (auth.currentUser) {
        return true;
    }
}

function isLoggedin(){
    if(localStorage.getItem("isLoggedIn") === true || localStorage.getItem("isLoggedIn") === 'true'){
        return true
    }
}

function userType(){
    if(localStorage.getItem("userType") === 'admin'){
        return 'admin'
    } else if(localStorage.getItem("userType") === 'superAdmin') {
        return 'superAdmin'
    } else if(localStorage.getItem("userType") === 'tc'){
        return 'tc'
    } else {
        return 'guess'
    }
}

// router.beforeEach((to, from, next) => {
//     const user = auth.currentUser;
//     if(to.matched.some (record => record.meta.requiresAuth)){
//         if(!user){
//             next({
//               name: "Login"  
//             });
//         }
//     } else {
//         next();
//     }
// });
// router.beforeEach((to, from, next) => {
//     const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
//     const requiresGuest = to.matched.some((x) => x.meta.requiresGuest);
//     const isLoggedin = store.state. isUserLoggedIn;

//     console.log(router);
//     if (requiresAuth && !isLoggedin) {
//       next("/");
//     } else if (requiresGuest && isLoggedin) {
//       next("/admin/dashboard");
//     }  else {
//       next();
//     }
//   });
export default router