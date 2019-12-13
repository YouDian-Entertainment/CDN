import Vue from 'vue';
import Router from 'vue-router';
import Main from '@views/Main';
import Bucket from '@views/Bucket';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
        },
        {
            path: '/bucket',
            name: 'bucket',
            component: Bucket,
        },
    ],
});

export default router;
