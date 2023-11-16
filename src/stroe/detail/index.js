// detail仓库
import { reqGoodsInfo, reqUpdateShopCart } from '@/API'
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodsInfo: {},
    // 游客身份,其实是执行调用一下生成uuid的函数
    uuid_token: getUUID()
}
const mutations = {
    GETDETAIL(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    // 发请求商品详细信息
    async getDetail({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid)
        if (result.code === 200) {
            commit('GETDETAIL', result.data)
        }
    },
    // 添加到购物车在这里可以商品数量进行修改，不需要三连环储存数据
    async getShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqUpdateShopCart(skuId, skuNum)
        if (result.code === 200) {
            // 服务器成功收到请求
            return 'OK'
        } else {
            //加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }

}
const getters = {
    categoryView() {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo() {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}