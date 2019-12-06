import Vue from 'vue';
import Router from 'vue-router';
import { MenuRouter } from './menu';
import Main from '@views/Main';
import QiNiu from '@views/QiNiu';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
        },
        {
            path: '/qiniuyun',
            name: 'qiniuyun',
            component: QiNiu,
        },
        // ...MenuRouter,
    ],
});

export default router;
