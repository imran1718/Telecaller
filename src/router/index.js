import Vue from 'vue'
import VueRouter from 'vue-router'

import Agent from '../components/Agent'
import Course from '../components/Course'

Vue.use(VueRouter)

const routes = [
    
      {
        path: '/',
        name: 'Agent',
        component: Agent
      },
      {
        path: '/Course',
        name: 'Course',
        component: Course
      }
];
const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
  });
  export default router;