import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Tab from 'components/tab/tab'

Vue.use(Router) // 首先就要注册

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recomment'
    },
    {
      path: '/recomment',
      component: Recommend
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/tab',
      component: Tab
    },
    {
      path: '/rank',
      component: Rank
    }
  ]
})
