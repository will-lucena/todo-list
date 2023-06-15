export const routeNames = {
    LOGIN: {
      path: '/',
      name: 'Login'
    },
    HOME: {
      path: '/home',
      name: 'Home'
    },
    TASKS: {
      path: '/home/tasks/:taskGroupId',
      name: 'Tasks'
    },
    TASK_GROUPS: {
      path: '/home/taskGroups/',
      name: 'TaskGroups'
    }
}

export const routes = [
    {
      ...routeNames.LOGIN,
      component: () => import ('@/views/Login.vue')
    },
    {
      ...routeNames.HOME,
      component: () => import('@/views/Home.vue'),
      children: [
        {
          ...routeNames.TASKS,
          component: () => import('@/views/List.vue'),
          props: true
        },
        {
          ...routeNames.TASK_GROUPS,
          component: () => import('@/views/TaskGroups.vue')
        }
      ]
    }
  ]