import Vue from 'vue';
import Router from 'vue-router';
import { MenuRouter } from './menu';
import Main from '@views/Main';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
        },
        // ...MenuRouter,
    ],
});

export default router;
