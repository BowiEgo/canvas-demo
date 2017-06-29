import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import loading from '../pages/loading'
import loadingTest from '../pages/loadingTest'
import particleText from '../pages/particleText'
import pie from '../pages/pie'
import dropText from '../pages/dropText'
import mouseArrow from '../pages/mouseArrow'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
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
    },
    {
      path: '/dropText',
      name: 'dropText',
      component: dropText
    },
    {
      path: '/mouseArrow',
      name: 'mouseArrow',
      component: mouseArrow
    }
  ]
})
