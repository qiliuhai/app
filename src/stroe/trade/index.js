import { reqAddress, reqOrderInfo } from '@/API'
const state = {
    address: [],
    orderInfo: {}
}
const mutations = {
    GETADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    },
}
const actions = {
    async getAddress({ commit }) {
        let result = await reqAddress()
        if (result.code === 200) {
            commit('GETADDRESS', result.data)
            console.log(result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code === 200) {
            commit('GETORDERINFO', result.data)
            console.log(result.data, '@@@@@@')
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
