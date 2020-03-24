import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

// const routes = [
//   { path: '/', redirect: '/login' }, // 重新定向
//   { path: '/login', component: Login },
//   { path: '/home', component: Home }
// ]

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' }, // 重新定向
  { path: '/login', component: Login },
  { path: '/home', component: Home }
  ],
  mode: 'history'// 干掉网址输入框里默认的 #
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //    next() 直接放行     next('/login')  强制跳转到login页面

  // 如果是访问登陆页面就直接放行 这个单词不要写错
  if (to.path === '/login') return next()
  // 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
