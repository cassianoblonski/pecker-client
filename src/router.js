import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import UserShow from './views/UserShow';
import ChatList from './views/ChatList';
import UserEdit from './views/UserEdit';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      props: true,
      component: UserShow
    },
    {
      path: '/user',
      name: 'user',
      props: true,
      component: UserShow
    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatList
    },
    {
      path: '/profile/edit',
      name: 'user_edit',
      component: UserEdit
    }
  ],
});


router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/sign-up'];
  const authRequired = !publicPages.includes(to.path);

  store.dispatch("loadLocalAccount");
  let loggedIn = store.getters['isLoggedIn'];

  if(authRequired && !loggedIn) {
    return next({
      path: '/login',
      query: { returnUrl: to.path }
    });
  }

  next();
});

export default router;
