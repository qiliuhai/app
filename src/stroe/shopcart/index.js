// shopcart
import { reqShopCartList, reqdeleteCartList, reqdChangeCheck } from '@/API'
const state = {
    cartData: []
}
const mutations = {
    GETCARTLIST(state, cartData) {
        state.cartData = cartData
    }
}
const actions = {
    // 请求购物车数据
    async getCartList({ commit }) {

        let result = await reqShopCartList()
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除商品
    async deleteCart({ commit }, skuId) {
        let result = await reqdeleteCartList(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 切换商品的勾选状态
    async ChangeCheck({ commit }, { skuId, isChecked }) {
        let result = await reqdChangeCheck(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除所有选中的商品
    deleteChange({ dispatch, getters }) {
        let arr = [];
        getters.cartList.cartInfoList.forEach((item) => {
            let p = item.isChecked == 1 ? dispatch("deleteCart", item.skuId) : '';
            arr.push(p);
        });
        // 只要一个p失败那就返回失败，都成功才返回成功
        return Promise.all(arr)
    },
    // 切换全选或者全不选
    changeAllCheck({ dispatch, getters }, isChecked) {
        let arr = []
        getters.cartList.cartInfoList.forEach((item) => {
            let p = dispatch('ChangeCheck', { skuId: item.skuId, isChecked })
            arr.push(p)
        })
        return Promise.all(arr)
    }

}
const getters = {
    cartList(state) {
        return state.cartData[0] || {}
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}