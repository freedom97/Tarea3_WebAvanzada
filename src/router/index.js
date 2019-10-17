import Vue from 'vue'
import Router from 'vue-router'
import Login from './../components/Login'
import Register from './../components/Register'
import ProfileUser from './../components/ProfileUser'
import firebase from 'firebase'


Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', component: Login },
        {
            path: '/login', component: Login,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profileUser', component: ProfileUser,

        },
        {
            path: '/register', component: Register,
        },





    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})
export default router