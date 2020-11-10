import Vue from 'vue'
import Router from 'vue-router'
import App from 'E:/gls/vue-template/huae/src/App.vue'

Vue.use(Router)

function createRouter() {
	const routes = [
		{
			path: '/',
			component: App, // 进入的默认首页不能用异步路由，否则会找不到
		},
		{
			path: '*',
			redirect: '/',
		},
	]

	const router = new Router({
		mode: 'history',
		routes,
	})

	return router
}

export default createRouter
