// home仓库
import { reqTypeNave, reqBanner, reqFloor } from "@/API"
const state = {
    TypeList: [],
    bannerList: [],
    floorList: []
}
const mutations = {
    CATGORYLIST(state, TypeList) {
        state.TypeList = TypeList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    async catgoryList({ commit }) {
        let result = await reqTypeNave()
        if (result.code === 200) {
            commit('CATGORYLIST', result.data)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqBanner()
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        console.log('111111111')
        let result = await reqFloor()
        if (result.code === 200) {
            commit('GETFLOORLIST', result.data)
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