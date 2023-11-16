// users
import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLoginOut } from '@/API'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    code: '',
    userInfo: {},
    token: getToken()
}
const mutations = {

    GETCODE(state, code) {
        state.code = code
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    LOGINOUT(state) {
        // 清除仓库的数据和本地token
        state.token = ''
        state.userInfo = ''
        removeToken()
    }

}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 请求注册
    async getRegister({ commit }, data) {
        let result = await reqRegister(data)
        if (result.code === 200) {
            return 'ok'
        } else {

            return Promise.reject(new Error('faile'))
        }
    },
    // 请求登录,登录成功后保存服务器发来的token
    async userLogin({ commit }, data) {
        let result = await reqLogin(data)
        if (result.code === 200) {
            // 把服务器返回的token持久化，以后还要带着token去找服务器要用户信息
            // 它是唯一标识，告诉服务器你是谁
            commit('USERLOGIN', result.data.token)
            // 存储到本地
            setToken(result.data.token)

            return 'ok'
        } else {

            return Promise.reject(new Error('faile'))
        }
    },
    // 登录后获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            commit('GETUSERINFO', result.data)
            console.log(result.data)
            return 'ok'
        } else {
            console.log(result)
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登陆
    async loginOut({ commit }) {

        let result = await reqLoginOut()
        if (result.code === 200) {
            // 清除本地的token
            commit('LOGINOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }

}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}