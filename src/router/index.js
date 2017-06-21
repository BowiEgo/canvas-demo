import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import loading from '../pages/loading'
import loadingTest from '../pages/loadingTest'
import particleText from '../pages/particleText'
import pie from '../pages/pie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },
    {
      path: '/loadingTest',
      name: 'loadingTest',
      component: loadingTest
    },
    {
      path: '/particleText',
      name: 'particleText',
      component: particleText
    },
    {
      path: '/pie',
      name: 'pie',
      component: pie
    }
  ]
})
