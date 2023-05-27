export const routeNames = {
    LOGIN: {
      path: '/',
      name: 'Login'
    },
    HOME: {
      path: '/home',
      name: 'Home'
    }
}

export const routes = [
    {
      ...routeNames.LOGIN,
      component: () => import ('@/views/Login.vue')
    },
    {
      ...routeNames.HOME,
      component: () => import('@/views/Home.vue')
    }
  ]