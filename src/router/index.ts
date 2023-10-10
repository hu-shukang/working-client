import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import SigninPage from '@/views/user/SigninPage.vue';
import SignupPage from '@/views/user/SignupPage.vue';
import TrafficIndexPage from '@/views/traffic/TrafficIndexPage.vue';
import TrafficAddPage from '@/views/traffic/TrafficAddPage.vue';
import TrafficEditPage from '@/views/traffic/TrafficEditPage.vue';
import AttendanceIndexPage from '@/views/attendance/AttendanceIndexPage.vue';
import AttendancePage from '@/views/attendance/AttendancePage.vue';
import AttendanceWritePage from '@/views/attendance/AttendanceWritePage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import { signinGuard } from './signin.guard';
import { signupStatusGuard } from './signup-status.guard';
import { MODE, ROUTE_NAMES } from '@/utils';

const PATTERN_YYYY_MM = '\\d{4}-0[1-9]|\\d{4}-1[0-2]';

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
      {
        path: `attendance/:date(${PATTERN_YYYY_MM})`,
        name: ROUTE_NAMES.ATTENDANCE_PAGE,
        component: AttendancePage,
        beforeEnter: signupStatusGuard,
        meta: {
          mode: MODE.ADD,
        },
      },
      {
        path: `attendance/:date(${PATTERN_YYYY_MM})/write`,
        name: 'AttendanceWritePage',
        component: AttendanceWritePage,
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
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
