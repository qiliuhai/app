import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'
import store from '@/stroe'
// 改写push
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resove, reject) {
    if (resove && reject) {
        originPush.call(this, location, resove.reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
Vue.use(VueRouter)


const router = new VueRouter({
    routes,
})
// 全局路由守卫、守城门的守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.users.token
    let name = store.state.users.userInfo.name

    //如果你登录了
    if (token) {
        // ,你就不能再去登录页面
        if (to.path == '/login' || to.path == '/reginster') {
            next(false)
        } else {
            if (!name) {
                try {
                    // 发请求捞到了数据再去跳转路由
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    // 什么时候会捞不到数据呢？token过期了
                    // 先清除原有的token，再重新登录
                    await store.dispatch("loginOut");
                    next()
                }
            }

        }

    } else {
        // 未登录,游客身份
        if (to.path == '/trade' || to.path.indexOf('/pay') !== -1
            || to.path.indexOf('/center') !== -1) {
            // 在跳到登录页面时带着想“跳转的路径”以查询字符形式
            next(`/login?redirect${to.path}`)
        } else {
            next()
        }

    }
})


export default router