// search仓库
import { reqSearchList } from "@/API"
const state = {

    searchList: {}
}
const mutations = {
    GETSEARCH(state, searchList) {
        state.searchList = searchList
    },

}
const actions = {
    async getSearch({ commit }, data) {
        let result = await reqSearchList(data)
        if (result.code === 200) {
            commit('GETSEARCH', result.data)
        }
    },

}
const getters = {
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}