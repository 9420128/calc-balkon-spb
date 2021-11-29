import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/price',
        name: 'Price',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Price.vue'),
    },

    {
        path: '/zakaz',
        name: 'Zakaz',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Zakaz.vue'),
    },

    {
        path: '/contact',
        name: 'Contact',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Contact.vue'),
    },

    {
        path: '/edit/:id',
        name: 'edit',
        meta: { layout: 'main', auth: true },
        component: () => import('../views/Edit.vue'),
    },

    {
        path: '/login',
        name: 'Login',
        meta: { layout: 'empty' },
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/registr',
        name: 'Registr',
        meta: { layout: 'empty' },
        component: () => import('../views/Registr.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const currentUser = getAuth().currentUser
    const requireAutch = to.matched.some((record) => record.meta.auth)

    if (requireAutch && !currentUser) {
        next('/login?message=login')
    } else {
        next()
    }
})

export default router
