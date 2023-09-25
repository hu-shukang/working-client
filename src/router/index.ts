import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import SigninPage from '@/views/user/SignInPage.vue';
import SignupPage from '@/views/user/SignupPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: HomePage,
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
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
