import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import SigninPage from '@/views/user/SigninPage.vue';
import SignupPage from '@/views/user/SignupPage.vue';
import TrafficIndexPage from '@/views/traffic/TrafficIndexPage.vue';
import TrafficAddPage from '@/views/traffic/TrafficAddPage.vue';
import TrafficEditPage from '@/views/traffic/TrafficEditPage.vue';
import AttendanceIndexPage from '@/views/attendance/AttendanceIndexPage.vue';
import { signinGuard } from './signin.guard';
import { signupStatusGuard } from './signup-status.guard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: HomePage,
        beforeEnter: signupStatusGuard,
      },
      {
        path: 'traffic',
        component: TrafficIndexPage,
        beforeEnter: signupStatusGuard,
      },
      {
        path: 'traffic/add',
        component: TrafficAddPage,
        beforeEnter: signupStatusGuard,
      },
      {
        path: 'traffic/:routeId/edit',
        component: TrafficEditPage,
        beforeEnter: signupStatusGuard,
      },
      {
        path: 'attendance',
        component: AttendanceIndexPage,
        beforeEnter: signupStatusGuard,
      },
    ],
  },
  {
    path: '/user/sign-in',
    component: SigninPage,
  },
  {
    path: '/user/sign-up',
    component: SignupPage,
    beforeEnter: signinGuard,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
