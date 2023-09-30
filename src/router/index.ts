import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import SigninPage from '@/views/user/SigninPage.vue';
import SignupPage from '@/views/user/SignupPage.vue';
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
